rm -rf dist
mkdir dist dist/components dist/composables
cp src/components/* dist/components/
cp src/composables/* dist/composables/
cp package.json dist/
cp README.md dist/
cd dist
npm publish