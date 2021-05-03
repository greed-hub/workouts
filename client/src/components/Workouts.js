import { useState, useEffect } from 'react'
import WorkoutList from './WorkoutList'
import AddWorkout from './AddWorkout'


const Workouts = () => {
    const [workouts, setWorkouts] = useState([])
    const [showAddWorkout, setShowAddWorkout] = useState(false)
 
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

    const addWorkout = async (workout) => {
        const newWorkout = {user_id: localStorage.getItem('user_id'),...workout }
        const response = await fetch(`api/workouts`, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'X-Auth-Token' : localStorage.getItem('token')
            },
            body: JSON.stringify(newWorkout)
        })
        const data = await response.json()
        setWorkouts([...workouts, data])
    }

    const editWorkout = async (_id, dateEdit, distanceEdit, timeEdit, paceEdit, speedEdit, activityEdit) => {
        
        const updatedWorkout = {date: dateEdit, distance: distanceEdit, time: timeEdit, avgPace: paceEdit, avgSpeed: speedEdit, activity: activityEdit}

        const response = await fetch(`api/workouts/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'X-Auth-Token' : localStorage.getItem('token')
            },
            body: JSON.stringify(updatedWorkout)
        })
        const data = await response.json()
        
        setWorkouts(workouts.map((workout) => (workout._id === _id ? {...workout, date: data.date, distance: data.distance, time: data.time, activity: data.activity, avg_pace: data.avg_pace, avg_speed: data.avg_speed} : workout)))
    }

    const deleteWorkout = async (_id) => {
        await fetch(`api/workouts/${_id}`, {
            method: 'DELETE',
            headers: {
            'X-Auth-Token' : localStorage.getItem('token'),
            },
        })
        setWorkouts(workouts.filter((workout) => workout._id !== _id))
    }

    return (

        <div className='appcontainer'>



            {workouts.length > 0 ? 
            
            <button className="btn" onClick={() => setShowAddWorkout(!showAddWorkout)}>{showAddWorkout ? "Close" : "Add"}</button> :   
            
                showAddWorkout ? <button className="btn" onClick={() => setShowAddWorkout(!showAddWorkout)}>Close</button> : 
                
                <div style={{ textAlign: 'center', paddingTop: '150px', paddingBottom: '150px'}}><h3>Go ahead and <button className="btn" onClick={() => setShowAddWorkout(!showAddWorkout)}>Add</button> some workouts!</h3></div>

            }

            {showAddWorkout ? <AddWorkout onAdd={addWorkout} /> : ''}
            {workouts.length > 0 ? <WorkoutList workouts={workouts} onDelete={deleteWorkout} onEdit={editWorkout} /> : ''}

        </div>

    )
}

export default Workouts
