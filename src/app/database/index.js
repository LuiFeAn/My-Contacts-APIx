const { Client } = require("pg");

const client = new Client({
    host:'localhost',
    port:5432,
    user:'root',
    password:1234,
    database:'mycontacts'
});

client.connect();