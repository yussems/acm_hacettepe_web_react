import React from 'react'

const Ana = (props) =>{
    return(
        <div id="studentcontainer">
        {props.students.map(student => (
        <li key={student.id}>{student.name} 
        <button className='myBtn' onClick={() => props.deleteStudent(student.id)}>Delete</button> </li>))} 
        </div>
    )
}

export default Ana