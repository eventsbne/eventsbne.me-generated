const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const yaml = require('js-yaml');
const moment = require('moment-timezone');
const async = require('async');

const config = require('./config');

const outDir = path.resolve(__dirname, './generated');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path.join(__dirname, 'state.db'));

function toFrontMatter(row){
  const newRow = Object.assign({}, row);
  newRow.title = row.name;
  newRow.date = row.timeCreated;
  delete newRow.descriptionHtml;
  delete newRow.name;
  delete newRow.venueId;
  delete newRow.organizerId;
  return newRow;
}

function localDatestamp(date){
  return moment(new Date(date)).tz(config.timezone).format('YYYY/MM/DD');
}

const dates = {};
const datesLinear = [];

function allEvents(callback){
  const q = async.queue(function(row, queueDone) {
    const datestamp = localDatestamp(row.timeStart);
    const uri = `/events/${datestamp}/${row.id}`;
    const thisOutDir = path.join(outDir, uri);
    const outFile = path.join(thisOutDir,'index.md');
    mkdirp.sync(thisOutDir);

    async.series([
      (done) => db.get('select * from venues where id = ?', row.venueId, (error, venue) => {
        row.venue = venue || {}
        done(error);
      }),
      (done) => db.get('select * from organizers where id = ?', row.organizerId, (error, organizer) => {
        row.organizer = organizer || {}
        if(row.organizerId && !organizer) {
          throw new Error(`missing organizer for ${row.organizerId}, ${row.id}`);
        }
        done(error);
      }),
    ], function(error){
      if(error) throw error;
      if(new Date(row.timeStart) > Date.now() - (1000 * 60 * 60 * 24)){
        if(!dates[datestamp]) dates[datestamp] = [];
        const entry = {
          name: row.name,
          uri: uri || null,
          organizer: row.organizer && row.organizer.name || null,
          timeStart: row.timeStart,
          timeEnd: row.timeEnd,
        };
        dates[datestamp].push(entry);
        datesLinear.push(entry);
      }
      row.layout = 'event';
      fs.writeFileSync(outFile, `---
${yaml.safeDump(toFrontMatter(row))}
---
${row.descriptionHtml || 'No description was provided.'}
`);
    queueDone();
    });
  }, 2);

  q.drain = callback;

  // render each event
  db.each('select * from events order by timeStart asc', function(err, row){
    q.push(row);
  });
};

function dateIndexes(callback){
  fs.writeFileSync(path.join(outDir, 'upcoming.json'), JSON.stringify({
    timeUpdated: Date.now(),
    events: datesLinear,
  }));
  Object.keys(dates).forEach(function(date){
    const items = dates[date];
    const thisOutDir = path.join(outDir, 'events', date);
    const outFile = path.join(thisOutDir,'index.md');
    console.log('writing index to', outFile)
    fs.writeFileSync(outFile, `---
${yaml.safeDump({
  title: `Events for ${date}`,
  layout: 'event-index',
  events: items,
})}
---
`);
  });
}

async.auto({
  allEvents,
  dateIndexes: ['allEvents', dateIndexes]
});
