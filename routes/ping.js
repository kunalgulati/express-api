var express = require('express');
var router = express.Router();

router.get('/ping', (req, res) => {
  let returnObj = { "success": true }
  return res.send(returnObj);
})

module.exports = router;
