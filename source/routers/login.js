const express = require('express');

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    const returnObj = {
      labels: {
        loginEmail: 'Email',
        loginPassword: 'Password',
        loginTitle: 'Login',
        loginSubmit: 'Login',
        loginWelcome: 'Welecome',
        loginMessage: 'Message',
        registerTitle: 'Register',
        registerFirstname: 'First name',
        registerMiddlename: 'Middle name ',
        registerLastname: 'Last name',
        registerUsername: 'Username',
        registerUsernameNotUnique: 'Error: Username [value] has already been taken',
        registerEmail: 'Email',
        registerEmailRetype: 'Confirm email',
        registerEmailRetypeNoMatch: 'Emails must match',
        registerEmailNotUnique: 'Error: Email [value] has already been taken',
        registerPassword: 'Password',
        registerPasswordRetype: 'Confirm password',
        registerSubmit: 'Register',
        registerPasswordRetypeNoMatch: 'Passwords must match',
      },
    };
    res.status(200).send(returnObj);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
