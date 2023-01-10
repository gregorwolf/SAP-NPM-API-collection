npm config rm @sap:registry
# rm -rf node_modules 
# mkdir node_modules
npm install
cp package.json package-original.json
cp new-package.json package.json
node update-package-json.js
jq '.' new-package.json > package.json
cp package.json new-package.json
# npm install
# Reduce list of packages to update by using diff on package.json
git diff package.json | grep + | grep "@sap" | sed 's/[^"]*"\([^"]*\).*/\1/' > packages.txt

while read package; do
  ./npm_download.sh $package
  packageNoPrefix=`echo $package | sed 's/@sap//g'`
  mkdir "apis$packageNoPrefix"
  rsync -zarv  --include "*/" --include="*.md" --exclude="*" "node_modules/$package/" "apis$packageNoPrefix"
  cp node_modules/$package/LICENS* apis$packageNoPrefix
  cp -r node_modules/$package/doc apis$packageNoPrefix/doc
done <packages.txt
#mkdocs build -f mkdocs.yml
cp package-original.json package.json
