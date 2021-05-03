import { useState, useEffect} from 'react';
import { BiTrash } from 'react-icons/bi';
import DeleteWorkout from './DeleteWorkout';


const EditWorkout = ({handleModal, workoutToEdit, onDelete, toggle, onEdit}) => {
    
    const [date, setDate] = useState(workoutToEdit.date)
    const [distance, setDistance] = useState(workoutToEdit.distance)
    const [time, setTime] = useState(workoutToEdit.time)
    const [avgPace, setAvgPace] = useState(workoutToEdit.avg_pace)
    const [avgSpeed, setAvgSpeed] = useState(workoutToEdit.avg_speed)
    const [activity, setActivity] = useState(workoutToEdit.activity)
    const [showDelete, setShowDelete] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const calcAvgSpeed = () => {
            let d = time.split(':')
            let c = parseFloat(distance)/(parseFloat(d[0])+parseFloat(d[1]/60)+parseFloat(d[2]/3600))
            
            return(c.toFixed(2))
        }

        const calcAvgPace = () => {
            let d = time.split(':')
            let f = parseFloat(distance) 
            let e = parseFloat(d[0]*60)+parseFloat(d[1])+parseFloat(d[2]/60)
            let st = e/f
            let nd = (st-parseInt(st))*60

            return(`${st < 10 ? '0' + parseInt(st) : parseInt(st)}:${nd < 10 ? '0' + parseInt(nd) : parseInt(nd)}`)
        }

        setAvgPace(calcAvgPace)
        setAvgSpeed(calcAvgSpeed)
    }, [distance, time])

    const onSubmit = (e) => {
        e.preventDefault();
        if (date === '' || distance === '' || time === '') {
            setError('Please enter all fields');
            date === '' && document.querySelector('#id1').classList.add('is-invalid');
            distance === '' && document.querySelector('#id2').classList.add('is-invalid');
            time === '' && document.querySelector('#id3').classList.add('is-invalid');
            return
        }

        if (!(/^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/.test(time))) {
            setError('Invalid duration format, hh:mm:ss expected')
            document.querySelector('#id3').classList.add('is-invalid');
            return
        }

        onEdit(workoutToEdit._id, date, distance, time, avgPace, avgSpeed, activity);
        toggle();
    }


    const clearValidation = () => {
        document.querySelector('#id1').classList.remove('is-invalid'); 
        document.querySelector('#id2').classList.remove('is-invalid'); 
        document.querySelector('#id3').classList.remove('is-invalid');  
    }

    return (
        <>
        {handleModal ? 
            <div className="modal-position">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Edit workout</h5>
                            <button onClick={toggle} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Activity</label>
                                    <select onChange={(e) => setActivity(e.target.value)} className="form-select">
                                        <option value="Running">Running</option>
                                        <option value="Swimming">Swimming</option>
                                        <option value="Cycling">Cycling</option>
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">Date</span>
                                    <input type="datetime-local" className="form-control" id="id1" value={date} 
                                    onFocus={() => clearValidation()} onChange={(e) => setDate(e.target.value)}/>
                                    <div className="invalid-feedback">{error}</div>
                                </div>  

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">Distance</span>
                                    <input type="number" className="form-control" id="id2" placeholder="Add distance km" value={distance} 
                                    onFocus={() => clearValidation()} onChange={(e) => setDistance(e.target.value)}/>
                                    <div className="invalid-feedback">{error}</div>
                                </div>  

                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">Duration</span>
                                    <input type="text" className="form-control" id="id3" placeholder="Add duration" value={time} 
                                    onFocus={() => clearValidation()} onChange={(e) => setTime(e.target.value)}/>
                                    <div className="invalid-feedback">{error}</div>
                                </div>  
        
                            </form>

                            <DeleteWorkout onDelete={onDelete} id={workoutToEdit._id} closeDelete={() => setShowDelete(!showDelete)} show={showDelete} />
                        </div>

                        <div className="modal-footer">
                            <div className="col"><BiTrash style={{color: 'black', cursor: 'pointer'}} onClick={() => setShowDelete(!showDelete)} /></div>
                            <button type='submit' onClick={onSubmit} className="btn" style={{backgroundColor: '#FAA156'}}>Save</button>
                            <button type="button" onClick={toggle} className="btn" style={{backgroundColor: '#FAA156'}}>Close</button>
                        </div>
                    </div>
                </div>
            </div>          
        : ''}
        </> 
    )
}

export default EditWorkout