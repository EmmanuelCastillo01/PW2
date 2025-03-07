const mongoose = require('mongoose');
const uri = 'direccion';
const express = require('express'); const app = express(); const port = 8080;
const bodyParser = require('body-parser');
// support parsing of application/json type post data
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.use(bodyParser.json());
    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    const users = require('./views/users')
    app.use('/users', users)
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
      })
  .catch(error => {
    console.error('Connection fail', error);
  });