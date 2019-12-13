var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var serviceSchema = new Schema({
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
    created_at: {
        type: Date,
        defaultValue: Date.now
    }
}, {
    timestamps: true
});

const ServiceModel = mongoose.model("ServiceModel", serviceSchema);
module.exports = ServiceModel;
