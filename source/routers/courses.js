const express = require('express');

const router = new express.Router();

const { Course } = require('../models');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const {
    user,
    body,
  } = req;
  const {
    _id: owner,
  } = user;
  const course = new Course({
    ...body,
    createdUser: owner,
  });
  try {
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

const getCourseBy = async (req, res, type) => {
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
    const courses = user[type];
    res.send(courses);
  } catch (error) {
    res.status(500).send();
  }
};

router.get('/created', auth, (req, res) => {
  getCourseBy(req, res, 'createdCourse');
});

router.get('/updated', auth, (req, res) => {
  getCourseBy(req, res, 'updatedCourse');
});

router.get('/:id', auth, async (req, res) => {
  const {
    params,
  } = req;
  const {
    id: _id,
  } = params;
  try {
    const course = await Course.findOne({
      _id,
    });
    if (!course) {
      return res.status(404).send();
    }
    await course.populate({
      path: 'createdUser',
    });
    await course.populate({
      path: 'updatedUser',
    });
    res.send(course);
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
  const allowedUpdates = ['title', 'language', 'layout', 'copyright', 'flexible', 'bookmarking', 'completionCustom', 'completionPage', 'live'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid updates to course',
    });
  }
  try {
    const course = await Course.findOne({
      _id,
    });
    if (!course) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      course[update] = body[update];
    });
    course.updatedUser = updatedUser;
    await course.save();
    res.send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
