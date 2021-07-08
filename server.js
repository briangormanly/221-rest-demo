const express = require('express')
var bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json({ type: 'application/json' }));








app.listen(1337, function () {
  console.log('Example app listening on port 1337!')
})
