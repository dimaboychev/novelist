const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
  title: { type: String, required: true },
  imageId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageThumbUrl: { type: String, required: true },
  content: { type: String, required: true }

});

module.exports = mongoose.model('Story', storySchema);
