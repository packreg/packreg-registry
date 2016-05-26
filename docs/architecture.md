# Architecture

The `package-registry` consists of three to four parts that are as much decoupled as possible,
so that a change of technologies for each part is entirely possible. The registry's core are two databases: RethinkDB
and elasticsearch. Every write goes to RethinkDB (primary DB) and every change is automaticlly replicated to elasticsearch.
Reads are (almost) always done through elasticsearch. The actual data is provided by different collectors, which push each
package into a queue. Analyzers process every packages in the queue and write metadata into the databases.
Clients can access the registry via Falcor, which provides JSON Graph resonses via simple requests. Those requests can/will stay
the same no matter how the rest of the registry changes.

- Collectors
- Queue
- Analyzers
- Databases
- Falcor / Client API


![architecture](./images/architecture.png)
