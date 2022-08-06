var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var url = require('url')
var querie = require("./queries")
var con = require("./connection")
app.use(bodyParser.urlencoded({ extended: 'true' }))
app.use(bodyParser.json())

app.get("/getContact/:id", function (req, res) {
  var sql =`select * from contact where id='${req.params.id}'`;
  con.query(sql, function (err, result) {
    if(result[0]){
    res.send(result[0])
    }
    else{
      res.send({'status':'Error','message':'Record Not Found'})
    }

  })
});

app.get("/getContact/", function (req, res) {
  var sql =`select * from contact`;
  con.query(sql, function (err, result) {
res.send(result)
  })
});

app.post("/createContact", function (req, res) {
var sql=querie.insert(req.body.data_store,req.body)
con.query(sql, function (err, result) {
  res.send({'status':'success','message':'record Inserted'})    })
})
app.post("/updateContact", function (req, res) {
  var data=req.body;
  var sql=`update ${data.data_store} set email='${data.email}' ,mobile_number='${data.mobile_number}',data_store='${data.data_store}' where id='${data.id}'`
  con.query(sql, function (err, result) {
    res.send({'status':'success','message':'record Updated'})      })
  })

  app.post("/deleteContact", function (req, res) {
   var sql=`delete from ${req.body.data_store} where id='${req.body.id}'`
    con.query(sql, function (err, result) {
      res.send({'status':'success','message':'record deleted'})
        })
    })
app.listen(2000)