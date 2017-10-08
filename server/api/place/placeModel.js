var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: { type: String },
  telephone: { type: String },
  description: { type: String },
  features: [{ type: String }],
  fbLink: [{ type: String }],
  lng: { 
    type: Number,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  from: { type: Number },
  to: { type: Number },
  images: [{ type: String }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
});

module.exports = mongoose.model('place', PlaceSchema);
