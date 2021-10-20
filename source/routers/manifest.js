const express = require('express');

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    const returnObj = {
      name: 'Portal CMS',
      short_name: 'cmsPortal',
      dir: 'ltr',
      lang: 'en',
      start_url: '/',
      display: 'minimal-ui',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      description: '',
    };
    res.status(200).send(returnObj);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
