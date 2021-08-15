const { reconDB } = require('reconlx')
require('dotenv').config();
const client = require('./index.js')
const mongoUrl = process.env.mongoUrl;
const db = new reconDB(client, {
    uri: mongoUrl
})

module.exports = db;