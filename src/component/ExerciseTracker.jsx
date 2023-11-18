
import React, { useState } from 'react';

const ExerciseTracker = () => {
  //deafult value in the table
  const [exercises, setExercises] = useState([{
    id: 1,
    name: 'Priya',
    description: 'test',
    duration: '5mins',
    date: '17/11/2023',
  }]);
  //while adding new data || the default value in the inputs
  const [newExercise, setNewExercise] = useState({
    id: 0,
    name: '',
    description: '',
    duration: '',
    date: '',
  });
  const trstyle = {
     borderBottom: "1px solid grey" 
  }
  const headingstyle = {
    borderBottom: "2px solid black" 
 }

 //if any change happened in input this function will be called and saved
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExercise({
      ...newExercise,
      [name]: value
    });
  };

  //adding new exercise in default list (exercises)
  const addExercise = () => {
    if (newExercise.name && newExercise.description && newExercise.duration && newExercise.date) {
      newExercise.id = exercises.length != 0? ((exercises[exercises.length-1].id)+1):1;
      setExercises([...exercises, newExercise]);
      setNewExercise({
        id: 0,
        name: '',
        description: '',
        duration: '',
        date: '',
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  const deleteExercise = (id) => {
    const updatedExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(updatedExercises);
  };

  const editExercise = (id) => {
    const exerciseToEdit = exercises.find((exercise) => exercise.id === id);
    setNewExercise({
      ...exerciseToEdit
    });
    deleteExercise(id);
  };

  return (
    <div>
      <h1 style={{ background: "#3b3b3b", color: "white" }}>Exercise Tracker</h1>
      <div>
        <label>
          Name:
          <br />
          <input type="text" name="name" value={newExercise.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:<br />
          <input type="text" name="description" value={newExercise.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Duration (mins):<br />
          <input type="text" name="duration" value={newExercise.duration} onChange={handleChange} />
        </label><br />
        <label>
          Date:<br />
          <input type="text" name="date" value={newExercise.date} onChange={handleChange} />
        </label><br />

        <button style={{backgroundColor: "#716f6f", color:"white"}} onClick={addExercise}>Create Exercise Log</button>
      </div>
      <div>
        <h2>Logged Exercises</h2>


        <table >
          <tbody>
            <tr >
              <th style={headingstyle}>Name</th>
              <th style={headingstyle}>Description</th>
              <th style={headingstyle}>Duration</th>
              <th style={headingstyle}>Date</th>
              <th style={headingstyle}>Action</th>
            </tr>
            {exercises.map((exercise) => (
              <>
                <tr style={{ border: "2px solid black" }} key={exercise.id}>
                  <td style={trstyle}> {exercise.name}</td>
                  <td style={trstyle}> {exercise.description}</td>
                  <td style={trstyle}> {exercise.duration}</td>
                  <td style={trstyle}> {exercise.date}</td>

                  <td style={{borderBottom: "1px solid grey", display: "flex" }}>
                    <div style={{ marginRight: "2px", cursor: "pointer", textDecorationLine: 'underline' }} onClick={() => editExercise(exercise.id)}>Edit</div>
                    <div> |</div>
                    <div style={{ marginLeft: "2px", cursor: "pointer", textDecorationLine: 'underline' }} onClick={() => deleteExercise(exercise.id)}>Delete</div>
                  </td> </tr>
              </>
            ))}
          </tbody>
        </table>
        {/* {exerciseList} */}
      </div>
    </div>
  );
};

export default ExerciseTracker;
