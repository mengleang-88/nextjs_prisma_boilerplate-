/* eslint-disable */
sleep(5000);

conn = new Mongo();
db = conn.getDB('ir_db');
db.createCollection('User');