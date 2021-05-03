import { BiCheck, BiX } from 'react-icons/bi'

const DeleteWorkout = ({show, onDelete, id, closeDelete}) => {
    return (
        <>
        {show ? 
            <> 
            <div style={{display: 'block', color: '#F59927'}}><h5>Delete workout</h5></div>
                <div style={{display: 'block'}}>This action can't be reverted. Do you want to proceed?</div>
                <div style={{display: 'flex'}}>
                    <span style={{display: 'block', cursor: 'pointer', marginRight: '20px'}} onClick={() => onDelete(id)}><BiCheck /></span>
                    <span  style={{display: 'block', cursor: 'pointer', marginLeft: '20px'}} onClick={closeDelete}><BiX /></span>
                </div>
            </>
        : ''}
        </>
    )
}

export default DeleteWorkout
