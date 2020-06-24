npm install libnpmsearch
node update-package-json.js
jq '.' new-package.json > package.json
rm new-package.json
npm install

while read package; do
  packageNoPrefix=`echo $package | sed 's/@sap//g'`
  mkdir "apis$packageNoPrefix"
  cp node_modules/$package/*.md apis$packageNoPrefix
  cp -r node_modules/$package/doc apis$packageNoPrefix/doc
done <packages.txt
