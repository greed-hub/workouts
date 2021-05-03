const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require("../../middleware/auth");
const Workout = require('../../models/Workout');

//@GET api/workouts/user_id
//@Get all user workouts
//@Access private
router.get('/:user', auth, (req, res) => {
    Workout.find({ user_id: req.params.user })
        .then(workouts => res.json(workouts))
});

//POST api/workouts
//@Create workout
//@Access private
router.post('/', auth, (req, res) => {
    const newWorkout = new Workout({
        date: req.body.date,
        distance: req.body.distance,
        time: req.body.time,
        activity: req.body.activity,
        user_id: req.body.user_id,
        avg_pace: req.body.avgPace,
        avg_speed: req.body.avgSpeed
    });
    newWorkout.save().then(workout => res.json(workout));
});

mongoose.set('useFindAndModify', false);

//@PUT api/workouts/workout_id
//@Update workout
//@Access private
router.put('/:id', auth, (req, res) => {
    let editWorkout = {
        date: req.body.date,
        distance: req.body.distance,
        time: req.body.time,
        activity: req.body.activity,
        avg_pace: req.body.avgPace,
        avg_speed: req.body.avgSpeed,
    }

    Workout.findOneAndUpdate({_id : req.params.id}, editWorkout, { new: true })
        .then(workout => res.json(workout));
});


//@DELETE api/workouts/workout_id
//@Delete workout
//@Access private
router.delete('/:id', auth, (req, res) => {
    Workout.findById(req.params.id)
        .then(workout => { workout.remove()
            .then(() => res.json({success: true}))
        })
        .catch(err => res.status(404).json({success: false}))
  });

module.exports = router;