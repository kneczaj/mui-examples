#/usr/bin/bash
PACKAGE_FILENAME=react-component-testing-library-client.tgz
rm ${PACKAGE_FILENAME}
set -e
wget -O ${PACKAGE_FILENAME} ${TG_SERVER_URL}/package
yarn add file:${PACKAGE_FILENAME}
npm install -g ${PACKAGE_FILENAME}
