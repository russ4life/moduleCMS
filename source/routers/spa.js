const express = require('express');

const router = new express.Router();

const auth = require('../middleware/auth');

router.get('/navigation', auth, async (req, res) => {
  try {
    const returnObjetc = {};
    res.send(returnObjetc);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/siteSettings', auth, async (req, res) => {
  try {
    const returnObjetc = {};
    res.send(returnObjetc);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
