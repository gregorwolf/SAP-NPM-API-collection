const search = require('libnpmsearch');
const fs = require('fs');

(async () => {
  var packageDotJson = 'package.json';
  var packagesTxt = "";
  let from = 0;
  let limit = 50;
  let packagesSearchResult = [];
  let packages = {};
  do {
    packagesSearchResult = await search('@sap', { from: from, limit: limit });
    // console.log(packagesSearchResult.length);
    for (let package in packagesSearchResult) {
      packages[packagesSearchResult[package].name] = packagesSearchResult[package].version;
    }
    from = from + limit;
  } while (packagesSearchResult.length > 0);
  const ordered = {};
  Object.keys(packages).sort().forEach(function(key) {
    ordered[key] = packages[key];
    packagesTxt += key + "\n"
  });
  fs.readFile(packageDotJson, function (err, packageData) {
    var packageJson = JSON.parse(packageData)
    packageJson.dependencies = ordered
    fs.writeFile("new-" + packageDotJson, JSON.stringify(packageJson), function(err){
      if (err) throw err
      console.log('The dependencies where updated')
    })
    fs.writeFile("packages.txt", packagesTxt, function(err){
      if (err) throw err
      console.log('The file packages.txt was updated')
    })
  })
})();