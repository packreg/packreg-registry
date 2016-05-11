# Packreg
> Unofficial Bower registry with RethinkDB and elasticsearch   

[![bitHound Overall Score](https://www.bithound.io/github/packreg/packreg-registry/badges/score.svg)](https://www.bithound.io/github/packreg/packreg-registry)   

Packreg is a package-registry that combines packages of different package-managers like Bower and npm with statistics and an "immutable" API, which clients can easily interact with. It is built on RethinkDB and elasticsearch which are accessed through Netflix' Falcor and populated by different workers and analyzers that provide the actual metadata.

### Requirements
rethink DB 2.2.2   
elasticsearch 2.1.0   

### Using packreg
- run RethinkDB
- run elasticsearch
- run /init to populate the DBs
- use [packreg](https://github.com/packreg/packreg-webapp) to query the database

### Populating
The route `/init` will populate your databases with the included dataset in `/data`. You can always populate with newer data by fetching `$ curl http://bower.herokuapp.com/packages
` and using that JSON.

### Querying the registry :mag_right: 
Packreg uses Netflix' [Falcor](https://github.com/Netflix/falcor) to hide different routes behind one single endpoint. Every request to the database is then internally routed by Falcor and returns an on-the-fly generated JSON Graph. This means all client-side communication goes through one route like this:  

`var model = new falcor.Model({source: new falcor.HttpDataSource('http://registry.com/model.json') });`   

To communicate with the registry, you can use the following functions, provided by the endpoint:   

`registryInfo`  
```
model.get("registryInfo").then(function(response) {
  document.write(response.json.registryInfo.version);
});
```

`packages.length`   
```
model.get("packages.length").then(function(response) {
  document.write(response.json.packages.length);
});
```

`packages`  
```
model.get(["packages", "bower"]).then(function(response) {
  var res = response.json.packagesByName.bower;
  for (pack in res) {
    document.write(res[pack].name+" - "+res[pack].url+"<br>");
  }       
});
```

`packages.create`
```
model.call(["packages", "create", "bower", "git://github.com/BenMann/testrepo"]).then(function(response){        
  document.write(response.json.createPackage.test123["git://github.com/BenMann/testrepo"]);
});
```

`packages.remove`
```
model.call(["packages", "remove", "bower"]).then(function(response){        
  document.write(response.json.createPackage.test123["git://github.com/BenMann/testrepo"]);
});
```
  
`packageBy`   
```
model.get(["packageBy", "id", "4J_wSnMIbr8x"]).then(function(response) {
  document.write(response.json.packageBy["id"]);
});
```
