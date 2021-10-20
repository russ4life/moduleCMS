const express = require('express');

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    const returnObj = {
      palette: {
        type: [
          {
            label: 'Light',
            value: 'light',
          },
          {
            label: 'Dark',
            value: 'dark',
          },
        ],
      },
      typography: {
        fontFamily: 'OpenSans, Arial',
        h1: {
          fontSize: '28px',
        },
        h2: {
          fontSize: '24px',
        },
        h3: {
          fonSize: '20px',
        },
        h4: {
          fontSize: '18px',
        },
        h5: {
          fontSize: '16px',
        },
        h6: {
          fontSize: '16px',
        },
      },
      overrides: {
        MuiTableCell: {
          head: {
            backgroundColor: '##eaeaea !important',
          },
        },
        muiCardHeader: {
          root: {
            backgroundColor: '##eaeaea !important',
          },
        },
      },
    };
    res.status(200).send(returnObj);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
