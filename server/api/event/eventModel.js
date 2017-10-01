var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  from: { type: Number },
  to: { type: Number },
  place: {
    type: Schema.Types.ObjectId,
    ref: 'place'
  }
});

module.exports = mongoose.model('event', EventSchema);
