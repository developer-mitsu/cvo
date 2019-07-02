FROM mongo:latest

COPY json json

CMD mongoimport --host mongodb --db myapp --collection todos --drop --jsonArray --file ./json/sample.json
