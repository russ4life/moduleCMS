/* eslint-disable consistent-return */
const express = require('express');

const router = new express.Router();

const { Language } = require('../models');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const {
    user,
    body,
  } = req;
  const {
    _id: owner,
  } = user;
  const language = new Language({
    ...body,
    createdUser: owner,
  });
  try {
    await language.save();
    res.status(201).send(language);
  } catch (error) {
    res.status(400).send(error);
  }
});

const getLanguagesBy = async (req, res, type) => {
  try {
    const {
      user,
      query,
    } = req;
    const {
      live,
      limit,
      skip,
      sortBy,
    } = query;
    const match = (live) ? {
      live: live === 'true',
    } : {};
    const sort = {};
    if (sortBy) {
      const parts = sortBy.split(':');
      sort[parts[0]] = (parts[1] === 'desc') ? -1 : 1;
    }
    const options = {
      limit: parseInt(limit, 10),
      skip: parseInt(skip, 10),
      sort,
    };

    await user.populate({
      path: type,
      match,
      options,
    });
    const languages = user[type];
    res.send(languages);
  } catch (error) {
    res.status(500).send();
  }
};

router.get('/created', auth, (req, res) => {
  getLanguagesBy(req, res, 'createdLanguages');
});

router.get('/updated', auth, (req, res) => {
  getLanguagesBy(req, res, 'updatedLanguages');
});

router.get('/:id', auth, async (req, res) => {
  const {
    params,
  } = req;
  const {
    id: _id,
  } = params;
  try {
    const language = await Language.findOne({
      _id,
    });
    if (!language) {
      return res.status(404).send();
    }
    await language.populate({
      path: 'createdUser',
    });
    await language.populate({
      path: 'updatedUser',
    });
    res.send(language);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/:id', auth, async (req, res) => {
  const {
    body,
    params,
    user,
  } = req;
  const {
    id: _id,
  } = params;
  const {
    _id: updatedUser,
  } = user;
  const updates = Object.keys(body);
  const allowedUpdates = ['name', 'localName', 'code', 'live'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid updates to language',
    });
  }
  try {
    const language = await Language.findOne({
      _id,
    });
    if (!language) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      language[update] = body[update];
    });
    language.updatedUser = updatedUser;
    await language.save();
    await language.populate({
      path: 'createdUser',
    });
    await language.populate({
      path: 'updatedUser',
    });
    res.send(language);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
