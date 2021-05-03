import {useState, useEffect } from 'react';
import Activity from './Activity';


const AddWorkout = ({onAdd}) => {
    const [date, setDate] = useState('')
    const [distance, setDistance] = useState('')
    const [time, setTime] = useState('')
    const [activity, setActivity] = useState('')
    const [avgSpeed, setAvgSpeed] = useState('')
    const [avgPace, setAvgPace] = useState('')
    const [error, setError] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (date === '' || distance === '' || time === '' || activity === "") {
            setError('Please enter all fields')
            activity === '' && document.querySelector('#id4').classList.add('is-invalid');
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

        onAdd({ date, distance, time, activity, avgSpeed, avgPace })

        setActivity('')
        setDate('')
        setDistance('')
        setTime('')
        setAvgSpeed('')
        setAvgPace('')
      }

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

    const clearValidation = () => {
        document.querySelector('#id1').classList.remove('is-invalid'); 
        document.querySelector('#id2').classList.remove('is-invalid'); 
        document.querySelector('#id3').classList.remove('is-invalid');
        document.querySelector('#id4').classList.remove('is-invalid');    
    }

    return (
        <>
        <div className='container' style={{color: 'black'}}>
            <div className="row">
                <div className="col"><Activity type={activity}/></div>
                <div className="col">{date.slice(0,10)}</div>
                <div className="col">{distance !== '' ? distance + 'km' : ''}</div>
                <div className="col">{time}</div>
                <div className="col">{avgPace.includes('NaN') || avgPace.includes('Infinity')  ? '' : avgPace + 'min/km'}</div>
                <div className="col">{avgSpeed.includes('NaN') || avgSpeed.includes('Infinity')  ? '' : avgSpeed + 'km/h'}</div>
            </div>
        </div>

        <div className='d-flex align-items-center justify-content-center'>      
            <form>
                <div className="input-group mb-3 mt-3">
                    <label className="input-group-text" >Activity</label>
                    <select onFocus={() => clearValidation()} className="form-select" id='id4'  onChange={(e) => setActivity(e.target.value)}>
                        <option value=''>Choose activity type</option>
                        <option value="Running">Running</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Cycling">Cycling</option>
                    </select>
                    <div className="invalid-feedback">{error}</div>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Date</span>
                    <input type="datetime-local" id='id1' value={date} onFocus={() => clearValidation()} onChange={(e) => setDate(e.target.value)} className="form-control" />
                    <div className="invalid-feedback">{error}</div>
                </div>  

                <div className="input-group mb-3">
                    <span className="input-group-text">Distance</span>
                    <input type="number" id='id2' value={distance} onFocus={() => clearValidation()} onChange={(e) => setDistance(e.target.value)} className="form-control" placeholder="Add distance in km" />
                    <div className="invalid-feedback">{error}</div>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Duration</span>
                    <input type="text" id='id3' className="form-control" onFocus={() => clearValidation()} value={time} onChange={(e) => setTime(e.target.value)} placeholder="Add duration HH:MM:SS" />
                    <div className="invalid-feedback">{error}</div>
                </div>  

                <div className="d-flex input-group align-items-center justify-content-center">
                    <input type='submit' value='Submit' id ="submitValidation" onClick={onSubmit} className='btn btn-submit mb-3' />
                </div>
            </form>
        </div>
        </>
    )
}

export default AddWorkout