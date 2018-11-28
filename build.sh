npm search sap --registry https://npm.sap.com --json > npm.sap.com.json
cat npm.sap.com.json | jq '.[] | .name' > packages.txt
rpl -q '"' '' packages.txt
while read package; do
  npm install $package
done <packages.txt