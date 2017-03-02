var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 00;

var requestTimer = schedule.scheduleJob(rule, function(){

	console.log("Request Timer");

});