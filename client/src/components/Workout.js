import { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import Activity from './Activity';
import EditWorkout from './EditWorkout';


const Workout = ({workout, onDelete, onEdit}) => {
    const [showEdit, setShowEdit] = useState(false)

    

    const handleModal = () => {
        setShowEdit(!showEdit)
    }

    return (
        <>  
            <div className="col"><Activity type={workout.activity}/></div>
            <div className="col">{workout.date.slice(0,4)} {workout.date.slice(5,10)}</div>
            <div className="col">{workout.distance}km</div>
            <div className="col">{workout.time}</div>
            <div className="col">{workout.avg_pace}min/km</div>
            <div className="col">{workout.avg_speed}km/h</div>
            <div className="col-1"><BiEdit style={{color: 'black', cursor: 'pointer'}}  onClick={handleModal} /></div>
            

            <EditWorkout handleModal={showEdit} onEdit={onEdit}  workoutToEdit={workout} onDelete={onDelete} toggle={() => setShowEdit(!showEdit)} />
        </>
    )
}

export default Workout


