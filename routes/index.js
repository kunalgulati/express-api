const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { 
  /** Allow being catched for 8 mins */ 
  res.set('Cache-Control', 'public, max-age=480');
  res.render("index", { title: "Home" });
})

module.exports = router;
