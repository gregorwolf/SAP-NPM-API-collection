npm search sap --registry https://npm.sap.com --json > npm.sap.com.json
cat npm.sap.com.json | jq > npm.sap.com-formatted.json
mv npm.sap.com-formatted.json npm.sap.com.json
cat npm.sap.com.json | jq '.[] | .name' > packages.txt
rpl -q '"' '' packages.txt

while read package; do
  npm install $package --no-save
done <packages.txt

while read package; do
  packageNoPrefix=`echo $package | sed 's/@sap//g'`
  mkdir "apis$packageNoPrefix"
  cp node_modules/$package/*.md apis$packageNoPrefix
  cp -r node_modules/$package/doc apis$packageNoPrefix/doc
done <packages.txt
