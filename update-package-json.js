const search = require("libnpmsearch");
const fs = require("fs");

(async () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  var packageDotJson = "package.json";
  var packagesTxt = "";
  let from = 0;
  let limit = 50;
  let total = 0;
  let packagesSearchResult = [];
  let packages = {};
  do {
    packagesSearchResult = await search("@sap", { from: from, limit: limit });
    total += packagesSearchResult.length;
    for (let i in packagesSearchResult) {
      var package = packagesSearchResult[i];
      // console.log(`Found ${package.name} with version ${package.version}`);
      // package name must start with @sap/
      if (package === undefined) {
        continue;
      }
      if (package.name === undefined) {
        continue;
      }
      if (!package.name.startsWith("@sap/")) {
        continue;
      }
      packages[package.name] = package.version;
    }
    from = from + limit;
    await delay(1000);
  } while (packagesSearchResult.length > 0);
  console.log(`Found ${total} package(s)`);
  // console.log(packages);
  const ordered = {};
  Object.keys(packages)
    .sort()
    .forEach(function (key) {
      ordered[key] = packages[key];
      packagesTxt += key + "\n";
    });
  fs.readFile(packageDotJson, function (err, packageData) {
    var packageJson = JSON.parse(packageData);
    packageJson.dependencies = ordered;
    fs.writeFile(
      "new-" + packageDotJson,
      JSON.stringify(packageJson),
      function (err) {
        if (err) throw err;
        console.log("The dependencies where updated");
      }
    );
    fs.writeFile("packages.txt", packagesTxt, function (err) {
      if (err) throw err;
      console.log("The file packages.txt was updated");
    });
  });
})();
