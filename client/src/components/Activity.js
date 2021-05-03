
import { BiCycling, BiSwim, BiRun } from 'react-icons/bi'


const Activity = ({type}) => {
    return (
       
        <>{type === "Running" ? <><BiRun /><span className="hideSmart"> {type}</span></> : '' }
        {type === "Swimming" ? <><BiSwim /><span className="hideSmart"> {type}</span></> : '' }
        {type === "Cycling" ? <><BiCycling /><span className="hideSmart"> {type}</span></> : '' }</>
        
    )
}

export default Activity
