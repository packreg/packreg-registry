### Installing on a Mac
1) `brew update && brew install rethinkdb` or [from source](https://www.rethinkdb.com/docs/install/osx/)   
2) `brew update && brew install elasticsearch` or [download](https://www.elastic.co/downloads/elasticsearch)   
3) `brew update && brew install redis-server` or [download](http://redis.io/download)   


--

All prerequisites should be installed now.
Let's start all the services:
   
(if you installed via `brew`)   
1) `$ rethinkdb`   
2) `$ elasticsearch`   
3) `$ redis-server`   
##### DO NOT CREATE THE TABLE `Package` MANUALLY! Thinky will ensure the primary key is on `name`.  
4) populate databases by going to `localhost:3000/init`
   
You should now see ~45k packages being written to RethinkDB and being replicated to elasticsearch.
 
