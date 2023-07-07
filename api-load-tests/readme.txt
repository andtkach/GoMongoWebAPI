k6 run sample-test.js
npx @apideck/postman-to-k6 GoMongoWebApi.postman_collection.json --separate --iterations 25 -o load-test.js
k6 run load-test.js