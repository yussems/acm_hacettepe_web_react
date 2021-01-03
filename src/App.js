import {useState, useRef, useEffect} from 'react';
import uuidv4 from './utils/main';
import './App.css';
import Ana from './components/ana'

function App() {

  const [students,setStudents] = useState([]);
  const [currentName,setCurrentName] = useState(['']);
  const inputEl = useRef(null);

  useEffect(() => {
    
    fetch("http://localhost:3008/students")
    .then((response) => response.json())
    .then((students) => setStudents(students));
  }, [])

  const addStudent = () => {
    if(currentName == '') {
      alert('please enter name')
      return
    }
    const id = uuidv4()
    setStudents(prevValues => [...prevValues,{id:id,name:currentName}]);
    setCurrentName('');
    inputEl.current.focus();
    saveStudent(id , currentName);
  };

  const saveStudent = (id ,studentName) => {
    fetch("http://localhost:3008/students",{
        method :'POST',
        headers:{
            'accept' : 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:id ,name:studentName,})
    })
    .then((response) => response.json())
    .then((data) => console.log('saved', data))
    .catch((error) => console.error(error))
  }

  const handleChange = (event) => {
    
    setCurrentName(event.target.value)
  }
  const deleteStudent = (id)  => {
    var newStudent = [];
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      if(student.id === id) {
        continue;
      }
      newStudent.push(student)
    }
    setStudents(newStudent)
    fetch(`http://localhost:3008/students/${id}`,{
        method :'DELETE'
    })
    .then((response) => response.json())
    .then((data) => console.log('saved', data))
    .catch((error) => console.error(error))
  }

  return (
    <div className="App">
      <Ana students={students} deleteStudent={deleteStudent}/>
      <input type="text" 
      name='name' 
      id="myInput" 
      ref={inputEl}
      value={currentName} 
      onChange={handleChange}/>
      <button className='myBtn' onClick={ () => addStudent()} >öğrenci ekle</button>
    </div>
  );
}

export default App;
