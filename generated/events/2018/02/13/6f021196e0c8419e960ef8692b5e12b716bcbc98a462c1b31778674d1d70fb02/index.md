---
id: 6f021196e0c8419e960ef8692b5e12b716bcbc98a462c1b31778674d1d70fb02
remoteId: '247501332'
remoteIdType: meetup
status: upcoming
timeStart: '2018-02-13T08:00:00.000Z'
timeEnd: null
timeCreated: '2018-02-09T11:24:17.001Z'
timeUpdated: '2018-02-09T11:24:17.001Z'
countAttending: '11'
countCapacity: null
countWaitlist: '0'
price: null
url: 'https://www.meetup.com/Rust-Brisbane/events/247501332/'
image: null
venue: {}
organizer:
  id: f6f781e561309cf8415a6c9176e8f81d6fc6ef5950dd34c26e88e22bd748efa7
  remoteId: '19884717'
  remoteIdType: meetup
  name: Rust Brisbane
  url: 'https://meetup.com/Rust-Brisbane'
  description: null
  codeOfConduct: null
layout: event
title: February Meetup
date: '2018-02-09T11:24:17.001Z'

---
<p>Speed, Parallelism, Safety: Choose all three high-performance data structures for multithread applications</p> <p>William Brown</p> <p>Multithread programming is hard, and we have been forced to choose between speed, parallelism and safety: generally, we choose safety and parallelism at the cost of speed. In 2017 multithread programming is made harder by the fact that CPUs are now “out of order asynchronous task execution engines” (from the Intel 64 architecture manual). For years we have resorted to the mutex and readwrite lock to enable our parallel servers, but as the number of hardware threads has increased rapidly, these techniques just haven’t scaled. Even worse, incorrectly used mutexes cause subtle bugs and crashes that we just can’t track down.</p> <p>In this presentation, William will describe how the internals of a CPU work, how thread safety can be achieved with proper use of CPU behaviours, and will demonstrate how native multithread data structures can make LDAP servers operate without mutexes, allowing parallel reads and writes, guaranteeing reliability and safety. The numbers speak for themself:</p> <p>PL_Hashmap: min 2.03 sec, max 3.14 sec, mean 2.59 sec<br/>SDS COW Tree: min: 1.11 sec, max 3.04 sec, mean 1.89 sec</p> <p>Our event space is sponsored by Fishburners. Fishburners is Australia’s largest community of tech startups and a not for profit organisation. They support over 300 startups in their communities in Brisbane and Sydney and host more than 500 events around Australia. To apply for a membership, join a tour of the building or find upcoming events visit: www.fishburners.org</p> <p>Our food is sponsored by Datalust.</p>
