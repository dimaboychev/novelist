const express = require('express');
const request = require('request');
const config = require('../config/unsplash-conf');

const Story = require('../models/story');

const router = express.Router();

router.post('', (req, res, next) => {
  const story = new Story({
    title: req.body.title,
    imageId: req.body.imageId,
    imageUrl: req.body.imageUrl,
    imageThumbUrl: req.body.imageThumbUrl,
    content: req.body.content
  });
  story.save().then(createdStory => {
    res.status(201).json({
      message: 'Story added successfully',
      storyId: createdStory._id
    });
  });
});

router.get('', (req, res, next) => {
  Story.find().then(documents => {
    res.status(200).json({
      message: 'Stories fetched successfully!',
      stories: documents
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Story.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Story deleted!' });
  });
});

router.get('/external-api', function(req, res, next) {
  request(
    `https://api.unsplash.com/search/photos?client_id=${
      config.APPLICATION_ID
    }&query=${req.query.query}&page=1&per_page=9`,
    function(error, response, body) {
      res.send(body);
    }
  );
});

module.exports = router;
