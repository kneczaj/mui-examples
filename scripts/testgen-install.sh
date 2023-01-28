#/usr/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
WORKDIR=${SCRIPT_DIR}/..
PACKAGE=react-component-testing-library-client
rm ${WORKDIR}/${PACKAGE}*.tgz
yarn remove react-component-testing-library-client
set -e
wget --content-disposition ${TG_SERVER_URL}/package
PACKAGE_FILENAME=$(ls ${WORKDIR}/${PACKAGE}*.tgz)
yarn add file:${PACKAGE_FILENAME}
