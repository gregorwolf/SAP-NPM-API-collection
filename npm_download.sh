#!/bin/bash
cd node_modules
package="$1"
version=$(npm show ${package} version)
packageNoPrefix=`echo $package | sed 's/@sap//g'`
archive="${packageNoPrefix}-${version}.tgz"
url="https://registry.npmjs.org/${package}/-/${archive}"
echo "Download URL: ${url}"
curl --silent --remote-name \
  "${url}"
mkdir -p "${package}"
tar xzf ".${archive}" --strip-components 1 -C "${package}"
rm ".${archive}"
cd ..
