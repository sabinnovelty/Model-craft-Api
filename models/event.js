var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image_name: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    defaultValue: "admin"
  },
  location: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    defaultValue: Date.now
  },
  isActive: {
    type: Boolean,
    defaultValue: true
  }
}, {
  timestamps: true
});

const EventModel = mongoose.model("EventModel", eventSchema);
module.exports = EventModel;
