var fs = require('fs')

var packages = 'packages.json'
var package = 'package.json'

fs.readFile(packages, function (err, packagesData) {
  var packagesJson = JSON.parse(packagesData)
  packagesJson["@sap/portal-cf-content-deployer"] = "latest"
  packagesJson["@sap/cds-odata-v2-adapter-proxy"] = "latest"
  packagesJson["@sap/cds-hana"] = "latest"
  packagesJson["@sap/cds-dk"] = "latest"
  packagesJson["@sap/cds-messaging"] = "latest"
  packagesJson["@sap/cds-reflect"] = "latest"
  packagesJson["@sap/cds-rest"] = "latest"
  packagesJson["@sap/cds-services"] = "latest"
  packagesJson["@sap/cds-sql"] = "latest"
  packagesJson["@sap/cds-sqlite"] = "latest"
  packagesJson["@sap/xsenv"] = "latest"
  packagesJson["@sap/logging"] = "latest"
  packagesJson["@sap/hana-client"] = "latest"
  packagesJson["@sap/faas"] = "latest"
  fs.readFile(package, function (err, packageData) {
    var packageJson = JSON.parse(packageData)
    packageJson.dependencies = packagesJson
    fs.writeFile("new-" + package, JSON.stringify(packageJson), function(err){
      if (err) throw err
      console.log('The dependencies where updated')
    })
  })
})