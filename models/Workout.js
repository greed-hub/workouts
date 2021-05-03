const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    distance: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    user_id : {
        type: String,
        required: true
    },
    avg_speed : {
        type: String,
        required: true
    },
    avg_pace : {
        type: String,
        required: true
    }
});

module.exports = Workout = mongoose.model('workout', WorkoutSchema);