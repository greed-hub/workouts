import Workout from './Workout';
import { useEffect, useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

const WorkoutList = ({workouts, onDelete, onEdit}) => {

    const [sorted, setSorted] = useState([])
    const [sortBy, setSortBy] = useState('date')
    const [reverse, setReverse] = useState(true)

    useEffect(() => {

            if (sortBy === 'date' || sortBy === 'activity') {
                if (reverse) {
                    setSorted([...workouts].sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1))
                } else {
                    setSorted([...workouts].sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1))
                }
            }

            if (sortBy === 'avgSpeed') {
                if (reverse) {
                    setSorted([...workouts].sort(function compare(a, b) {return parseFloat(a.avg_speed)-parseFloat(b.avg_speed)}))
                } else {
                    setSorted([...workouts].sort(function compare(a, b) {return parseFloat(b.avg_speed)-parseFloat(a.avg_speed)}))
                }
            }

            if (sortBy === 'distance') {
                if (reverse) {
                    setSorted([...workouts].sort(function compare(a, b) {return parseFloat(a.distance)-parseFloat(b.distance)}))
                } else {
                    setSorted([...workouts].sort(function compare(a, b) {return parseFloat(b.distance)-parseFloat(a.distance)}))
                }
            }

            if (sortBy === 'duration') {
                if (reverse) {
                    setSorted([...workouts].sort(function compare(a, b) {return parseFloat(a.time.replaceAll(':', ''))-parseFloat(b.time.replaceAll(':', ''))}))
                } else {
                    setSorted([...workouts].sort(function compare(a, b) {return parseFloat(b.time.replaceAll(':', ''))-parseFloat(a.time.replaceAll(':', ''))}))
                }
            }

            if (sortBy === 'avgPace') {
                if (reverse) {
                    setSorted([...workouts].sort(function compare(a, b) {return parseFloat(b.avg_pace.replaceAll(':', ''))-parseFloat(a.avg_pace.replaceAll(':', ''))}))
                } else {
                    setSorted([...workouts].sort(function compare(a, b) {return parseFloat(a.avg_pace.replaceAll(':', ''))-parseFloat(b.avg_pace.replaceAll(':', ''))}))
                }
            }

    }, [sortBy, reverse, workouts])

    const handleSort = (tag) => {
        if (tag === sortBy) {
            setReverse(!reverse)
        } else if (tag !== sortBy && tag === 'date') {
            setReverse(true)
        } else if (tag !== sortBy) {
            setReverse(false)
        }
    
        setSortBy(tag)
    }

    return (
        <div className="container-fluid" style={{color: 'black', paddingBottom: '20px'}}>

                <div className='row'>
                    <div className='col d-flex justify-content-end'>
                        <form>
                            <div className="input-group mt-3 hideDesktop">
                                <label className="input-group-text">Sort by</label>
                                <select onChange={(e) => handleSort(e.target.value)} className="form-select">
                                    <option value='date'>Date</option>
                                    <option value='activity'>Activity type</option>
                                    <option value="distance">Distance</option>
                                    <option value="duration">Duration</option>
                                    <option value="avgPace">Pace</option>
                                    <option value="avgSpeed">Speed</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="row head">
                    <hr style={{width: '100%'}}/>
                    <div className="col"> <span onClick={() => handleSort('activity')} style={{cursor: 'pointer'}}>Activity<FaChevronDown style={{color: 'black', cursor: 'pointer', fontSize: '10px'}}/></span></div>
                    <div className="col"> <span onClick={() => handleSort('date')} style={{cursor: 'pointer'}}>Date<FaChevronDown style={{color: 'black', cursor: 'pointer', fontSize: '10px'}}/></span></div>
                    <div className="col"> <span onClick={() => handleSort('distance')} style={{cursor: 'pointer'}}>Distance<FaChevronDown style={{color: 'black', cursor: 'pointer', fontSize: '10px'}}/></span></div>
                    <div className="col"> <span onClick={() => handleSort('duration')} style={{cursor: 'pointer'}}>Duration<FaChevronDown style={{color: 'black', cursor: 'pointer', fontSize: '10px'}}/></span></div>
                    <div className="col"> <span onClick={() => handleSort('avgPace')} style={{cursor: 'pointer'}}>Average Pace<FaChevronDown style={{color: 'black', cursor: 'pointer', fontSize: '10px'}}/></span></div>
                    <div className="col"> <span onClick={() => handleSort('avgSpeed')} style={{cursor: 'pointer'}}>Average Speed<FaChevronDown style={{color: 'black', cursor: 'pointer', fontSize: '10px'}}/></span></div>
                    <div className="col-1"> Edit</div>
                </div>
        
                {sorted.slice(0,20).map((workout, index) => (
                   
                    <div className="row"  key={ workout._id }>
                        <hr style={{width: '100%'}}/>
                        <Workout workout={ workout }   onDelete={ onDelete } onEdit={ onEdit } />
                    </div>
                    
                ))}

        </div>
    )
}

export default WorkoutList
