var fs = require('fs')

var packages = 'packages.json'
var package = 'package.json'

fs.readFile(packages, function (err, packagesData) {
  var packagesJson = JSON.parse(packagesData)
  packagesJson["@sap/audit-logging"] = "latest"
  packagesJson["@sap/portal-cf-content-deployer"] = "latest"
  packagesJson["@sap/cds-odata-v2-adapter-proxy"] = "latest"
  packagesJson["@sap/cds-compiler"] = "latest"
  packagesJson["@sap/cds-hana"] = "latest"
  packagesJson["@sap/generator-cds"] = "latest"
  packagesJson["@sap/cds-dk"] = "latest"
  packagesJson["@sap/cds-messaging"] = "latest"
  packagesJson["@sap/cds-mtx"] = "latest"
  packagesJson["@sap/cds-reflect"] = "latest"
  packagesJson["@sap/cds-rest"] = "latest"
  packagesJson["@sap/cds-services"] = "latest"
  packagesJson["@sap/cds-ql"] = "latest"
  packagesJson["@sap/cds-sql"] = "latest"
  packagesJson["@sap/cds-sqlite"] = "latest"
  packagesJson["@sap/dwf-core"] = "latest"
  packagesJson["@sap/edm-converters"] = "latest"
  packagesJson["@sap/edmx2csn"] = "latest"
  packagesJson["@sap/fibers"] = "latest"
  packagesJson["@sap/cloud-sdk-core"] = "latest"
  packagesJson["@sap/cloud-sdk-generator"] = "latest"
  packagesJson["@sap/cloud-sdk-util"] = "latest"
  packagesJson["@sap/xsenv"] = "latest"
  packagesJson["@sap/site-entry"] = "latest"
  packagesJson["@sap/odata-server"] = "latest"
  packagesJson["@sap/logging"] = "latest"
  packagesJson["@sap/node-jwt"] = "latest"
  packagesJson["@sap/node-vsi"] = "latest"
  packagesJson["@sap/hana-client"] = "latest"
  packagesJson["@sap/hdbext"] = "latest"
  packagesJson["@sap/hdi-dynamic-deploy"] = "latest"
  packagesJson["@sap/faas"] = "latest"
  packagesJson["@sap/xb-msg-amqp-v091"] = "latest"
  packagesJson["@sap/xb-msg-env"] = "latest"
  packagesJson["@sap/xb-msg-mqtt-v311"] = "latest"
  packagesJson["@sap/xb-msg-amqp-v100"] = "latest"
  packagesJson["@sap/xsodata"] = "latest"
  packagesJson["@sap/xsjs"] = "latest"
  fs.readFile(package, function (err, packageData) {
    var packageJson = JSON.parse(packageData)
    packageJson.dependencies = packagesJson
    fs.writeFile("new-" + package, JSON.stringify(packageJson), function(err){
      if (err) throw err
      console.log('The dependencies where updated')
    })
  })
})