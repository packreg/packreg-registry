
### Using packreg
- run RethinkDB
- run elasticsearch
- rund redis-server
- run /init to populate the DBs
- use [packreg](https://github.com/packreg/packreg-webapp) to query the database

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
