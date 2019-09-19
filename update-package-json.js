var fs = require('fs')

var packages = 'packages.json'
var package = 'package.json'

fs.readFile(packages, function (err, packagesData) {
  var packagesJson = JSON.parse(packagesData)
  fs.readFile(package, function (err, packageData) {
    var packageJson = JSON.parse(packageData)
    packageJson.dependencies = packagesJson
    fs.writeFile("new-" + package, JSON.stringify(packageJson), function(err){
      if (err) throw err
      console.log('The dependencies where updated')
    })
  })
})