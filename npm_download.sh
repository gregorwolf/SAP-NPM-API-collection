#!/bin/bash
cd node_modules
package="$1"
version=$(npm show ${package} version)
archive="${package}-${version}.tgz"
curl --silent --remote-name \
  "https://registry.npmjs.org/${package}/-/${archive}"
mkdir "${package}"
tar xzf "${archive}" --strip-components 1 -C "${package}"
rm "${archive}"
cd ..