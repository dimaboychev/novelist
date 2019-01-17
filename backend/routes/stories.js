const express = require("express");

const Story = require("../models/story");

const router = express.Router();

router.post("", (req, res, next) => {
  const story = new Story({
    title: req.body.title,
    content: req.body.content
  });
  story.save().then(createdStory => {
    res.status(201).json({
      message: "Story added successfully",
      storyId: createdStory._id
    });
  });
});

router.get("", (req, res, next) => {
  Story.find().then(documents => {
    res.status(200).json({
      message: "Stories fetched successfully!",
      stories: documents
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Story.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Story deleted!" });
  });
});

module.exports = router;
