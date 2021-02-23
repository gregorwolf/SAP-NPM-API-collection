npm config rm @sap:registry
rm -rf node_modules 
mkdir node_modules
npm install libnpmsearch
node update-package-json.js
jq '.' new-package.json > package.json
rm new-package.json
# npm install
# Reduce list of packages to update by using diff on package.json
git diff package.json | grep + | grep "@sap" | sed 's/[^"]*"\([^"]*\).*/\1/' > packages.txt

while read package; do
  ./npm_download.sh $package
  packageNoPrefix=`echo $package | sed 's/@sap//g'`
  mkdir "apis$packageNoPrefix"
  cp node_modules/$package/*.md apis$packageNoPrefix
  cp node_modules/$package/LICENS* apis$packageNoPrefix
  cp -r node_modules/$package/doc apis$packageNoPrefix/doc
done <packages.txt
#mkdocs build -f mkdocs.yml
