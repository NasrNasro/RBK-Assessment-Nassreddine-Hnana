const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  description: String,
  filenameData: String,
});

module.exports=mongoose.model('Image', imageSchema)