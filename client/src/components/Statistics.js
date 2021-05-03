import {useEffect, useState} from 'react'
import { BiCycling, BiSwim, BiRun } from 'react-icons/bi'

const Statistics = () => {
    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        const getWorkouts = async () => {
            const workoutsFromServer = await fetchWorkouts()
            setWorkouts(workoutsFromServer)
        }
        getWorkouts()
    }, [])

    const fetchWorkouts = async () => {
        const response = await fetch(`api/workouts/${localStorage.getItem('user_id')}`, {
            method: 'GET',
            headers: {
                'X-Auth-Token' : localStorage.getItem('token'),
            }
        })
        const data = await response.json()
        return data
      }

    const countDuration = (duration) => {
        const time = duration.split(":")
        return parseFloat(time[0])*3600 + parseFloat(time[1]) * 60 + parseFloat(time[2])
    }

    const formatDuration = (format) => {
        const hours = parseInt(format/3600)
        const minutes = parseInt((format - hours*3600)/60)
        const seconds = parseInt(format - hours*3600 - minutes*60)
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }

    const distanceRunning = workouts.reduce((total, workout) => workout.activity === 'Running' ? total + parseFloat(workout.distance) : total, 0)
    const distanceSwimming = workouts.reduce((total, workout) => workout.activity === 'Swimming' ? total + parseFloat(workout.distance) : total, 0)
    const distanceCycling = workouts.reduce((total, workout) => workout.activity === 'Cycling' ? total + parseFloat(workout.distance) : total, 0)
    const workoutsRunning = workouts.reduce((total, workout) => workout.activity === 'Running' ? total + 1 : total, 0)
    const workoutsSwimming = workouts.reduce((total, workout) => workout.activity === 'Swimming' ? total + 1 : total, 0)
    const workoutsCycling = workouts.reduce((total, workout) => workout.activity === 'Cycling' ? total + 1 : total, 0)
    const durationRunning = workouts.reduce((total, workout) => workout.activity === 'Running' ? total + countDuration(workout.time) : total, 0)
    const durationSwimming = workouts.reduce((total, workout) => workout.activity === 'Swimming' ? total + countDuration(workout.time) : total, 0)
    const durationCycling = workouts.reduce((total, workout) => workout.activity === 'Cycling' ? total + countDuration(workout.time) : total, 0)
    
    const dateNow = new Date()
    const currentMonth = `${dateNow.getFullYear()}-${dateNow.getMonth() < 9 ? '0' + (dateNow.getMonth() + 1) : (dateNow.getMonth() + 1)}`

    const distanceRunningMonth = workouts.reduce((total, workout) => workout.activity === 'Running' && workout.date.slice(0,7) === currentMonth ? total + parseFloat(workout.distance) : total, 0)
    const distanceSwimmingMonth = workouts.reduce((total, workout) => workout.activity === 'Swimming' && workout.date.slice(0,7) === currentMonth ? total + parseFloat(workout.distance) : total, 0)
    const distanceCyclingMonth = workouts.reduce((total, workout) => workout.activity === 'Cycling' && workout.date.slice(0,7) === currentMonth ? total + parseFloat(workout.distance) : total, 0)
    const workoutsRunningMonth = workouts.reduce((total, workout) => workout.activity === 'Running' && workout.date.slice(0,7) === currentMonth ? total + 1 : total, 0)
    const workoutsSwimmingMonth = workouts.reduce((total, workout) => workout.activity === 'Swimming' && workout.date.slice(0,7) === currentMonth ? total + 1 : total, 0)
    const workoutsCyclingMonth = workouts.reduce((total, workout) => workout.activity === 'Cycling' && workout.date.slice(0,7) === currentMonth ? total + 1 : total, 0)
    const durationRunningMonth = workouts.reduce((total, workout) => workout.activity === 'Running' && workout.date.slice(0,7) === currentMonth ? total + countDuration(workout.time) : total, 0)
    const durationSwimmingMonth = workouts.reduce((total, workout) => workout.activity === 'Swimming' && workout.date.slice(0,7) === currentMonth ? total + countDuration(workout.time) : total, 0)
    const durationCyclingMonth = workouts.reduce((total, workout) => workout.activity === 'Cycling' && workout.date.slice(0,7) === currentMonth ? total + countDuration(workout.time) : total, 0)

    return (
        <div className='appcontainer'>
            <div className="container statistics-container">
                <div className="row">
                    <div className="col">
                        <span><BiRun /> Running / Current month</span>
                        <span>Activities: {workoutsRunningMonth}</span>
                        <span>Distance: {distanceRunningMonth}km</span>
                        <span>Duration: {formatDuration(durationRunningMonth)}</span>
                    </div>
                    <div className="col">
                        <span><BiRun /> Running / Total</span>
                        <span>Activities: {workoutsRunning}</span>
                        <span>Distance: {distanceRunning}km</span>
                        <span>Duration: {formatDuration(durationRunning)}</span>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col">
                        <span><BiCycling /> Cycling / Current month</span>
                        <span>Activities: {workoutsCyclingMonth}</span>
                        <span>Distance: {distanceCyclingMonth}km</span>
                        <span>Duration: {formatDuration(durationCyclingMonth)}</span>
                    </div>
                    <div className="col">
                        <span><BiCycling /> Cycling / Total</span>
                        <span>Activities: {workoutsCycling}</span>
                        <span>Distance: {distanceCycling}km</span>
                        <span>Duration: {formatDuration(durationCycling)}</span>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col">
                        <span><BiSwim /> Swimming / Current month</span>
                        <span>Activities: {workoutsSwimmingMonth}</span>
                        <span>Distance: {distanceSwimmingMonth}km</span>
                        <span>Duration: {formatDuration(durationSwimmingMonth)}</span>
                    </div>
                    <div className="col">
                        <span><BiSwim /> Swimming / Total</span>
                        <span>Activities: {workoutsSwimming}</span>
                        <span>Distance: {distanceSwimming}km</span>
                        <span>Duration: {formatDuration(durationSwimming)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistics
