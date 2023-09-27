const express = require('express');
require('./db/config');

const User = require('./db/User');
const app = express();
app.use(express.json());

//signup
app.post('/signup', async (req, res) => {

  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);

});

// login
app.post('/login', async (req, res) => {

  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {

      res.send(user);
    }
    else {
      res.send({ result: "Not Authorized User" });
    }
  }
  else {
    res.send({ result: "Not  Authorized User" });
  }

});

// see connection::
app.get('/get', (req, res) => {
  res.send("Running");
})

app.listen(4000, function () {
  console.log("Server started");
});