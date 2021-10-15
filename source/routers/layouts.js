const express = require('express');

const router = new express.Router();

const { Layout } = require('../models');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const {
    user,
    body,
  } = req;
  const {
    _id: owner,
  } = user;
  const layout = new Layout({
    ...body,
    createdUser: owner,
  });
  try {
    await layout.save();
    res.status(201).send(layout);
  } catch (error) {
    res.status(400).send(error);
  }
});

const getLayoutsBy = async (req, res, type) => {
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
    const layouts = user[type];
    res.send(layouts);
  } catch (error) {
    res.status(500).send();
  }
};

router.get('/created', auth, (req, res) => {
  getLayoutsBy(req, res, 'createdLayouts');
});

router.get('/updated', auth, (req, res) => {
  getLayoutsBy(req, res, 'updatedLayouts');
});

router.get('/:id', auth, async (req, res) => {
  const {
    params,
  } = req;
  const {
    id: _id,
  } = params;
  try {
    const layout = await Layout.findOne({
      _id,
    });
    if (!layout) {
      return res.status(404).send();
    }
    await layout.populate({
      path: 'createdUser',
    });
    await layout.populate({
      path: 'updatedUser',
    });
    res.send(layout);
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
  const allowedUpdates = ['name', 'live'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid updates to layout',
    });
  }
  try {
    const layout = await Layout.findOne({
      _id,
    });
    if (!layout) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      layout[update] = body[update];
    });
    layout.updatedUser = updatedUser;
    await layout.save();
    await layout.populate({
      path: 'createdUser',
    });
    await layout.populate({
      path: 'updatedUser',
    });
    res.send(layout);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
