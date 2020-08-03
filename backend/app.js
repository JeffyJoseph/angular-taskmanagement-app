const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join('public')));
var request = require('request');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,apptoken,usertoken"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/login", (req, res, next) => {
  var options = {
    url: 'https://staging-core-optimy.com/api/v1/login/password',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'apptoken': req.body.apptoken,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
    },
    form: {
      email: req.body.email,
      password: req.body.password,
      tenantid: req.body.tenantid,
      id_type: req.body.id_type
    }
  };
  request(options, (err, response, body) => {
    if (err) {
      console.log(err);
    } else {
        res.send(body)
    }
  })
});

app.post("/tasks", (req, res, next) => {
  var options = {
    url: 'https://staging-core-optimy.com/api/v1/task/list',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'apptoken': req.headers.apptoken,
      'usertoken':req.headers.usertoken,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
    },
    form: {
      parent_id: req.parent_id,
    }
  };
  request(options, (err, response, body) => {
    if (err) {
      console.log(err);
    } else {
      res.send(body)
    }
  })
});

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

