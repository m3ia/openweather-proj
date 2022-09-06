import { useState, useEffect } from 'react';

const Students = (props) => {
  const [students, setStudents] = useState([]);

  const loadData = () => {
    // Fetch all the items from the backend
    fetch('http://localhost:8080/api/students')
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        setStudents(data);
      })
  }

  useEffect(() => {
    loadData();
  }, []);

    return (
      <div>
        <h1>{props.school}</h1>
        {students.map((student, index) => {
          return (
            <p key={index}>
              {student.firstname} {student.lastname}
            </p>
          )
        })}
      </div>
    )
}
  
export default Students;

