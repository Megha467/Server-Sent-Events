const express = require('express');
const app = express()
var cors = require('cors')
app.use(cors());
require("dotenv").config()

var amount=0;
app.get("/donate/:donation", (req, res)=> {
	var donation_done = req.params.donation
    var donation_done = parseInt(donation_done);
	if(donation_done>0 && amount<90){
		amount+=donation_done;
	}
    console.log(amount);
	return res.status(200).json(amount)
})

app.get("/donate", (req, res) => {
    res.json('Api is working');
})
app.get("/sse", (req, res) => {
    res.set('Content-Type', "text/event-stream")
    res.set("Connection", "keep-alive")
    res.set("Cache-Control", "no-cache")
    res.set("Access-Control-Allow-Origin", "*")
    console.log('client connected to server')
   
    setInterval(function(){  
        res.status(200).write(`data: ${JSON.stringify(amount)}\n\n`)
    }, 1000);

});



app.listen(process.env.PORT, err => {
    if(err){
        console.log('server can not listen');
        return;
    }

    console.log(`server listening is to ${process.env.PORT} port`)
})