const kue = require('kue');
const queue = kue.createQueue();//queue for sending emails
module.exports = queue;