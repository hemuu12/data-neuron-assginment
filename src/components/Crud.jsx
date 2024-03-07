import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; 

const EmployeesTable = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    age: '',
   
  });
  const [editEmployee, setEditEmployee] = useState({
    name: '',
    age: '',
   
  });
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/data');
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditEmployee({ ...editEmployee, [e.target.name]: e.target.value });
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/data/add', newEmployee);
      fetchEmployees();
      setNewEmployee({ name: '', age: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const startEditing = (id) => {
    setEditEmployeeId(id);
    const employeeToEdit = employees.find((employee) => employee._id === id);
    setEditEmployee({ ...employeeToEdit });
    setShowEditModal(true);
  };

  const cancelEditing = () => {
    setEditEmployeeId(null);
    setEditEmployee({ name: '', age: ''});
    setShowEditModal(false);
  };

  const updateEmployee = async () => {
    try {
      await axios.put(`http://localhost:4000/api/data/update/${editEmployeeId}`, editEmployee);
      fetchEmployees();
      cancelEditing();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/data/delete/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">

     {/* Add employee form */}
     <div className="add-form">
     <h2>Add Employee</h2>
     <form onSubmit={addEmployee}>
       <div className="input-wrapper">
         <label >Name:</label>
         <input
           type="text"
           name="name"
           value={newEmployee.name}
           onChange={handleAddInputChange}
           placeholder="Name"
           required
         />
       </div>
       <div className="input-wrapper">
         <label >Age:</label>
         <input
           type="text"
           name="age"
           value={newEmployee.age}
           onChange={handleAddInputChange}
           placeholder="age"
           required
         />
       </div>
       <div className="button-wrapper">
         <button type="submit" className="primary">Add</button>
       </div>
     </form>
   </div>


      <h1>Employees Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>
                <button onClick={() => startEditing(employee._id)}>Edit</button>
                {/* <button onClick={() => deleteEmployee(employee._id)}>Delete</button> */}
              </td>
            </tr>

          ))}
        </tbody>
      </table>
     
      {/* Edit employee  */}
      {showEditModal && (
        <div>
          <div >
            <div>
              <h2>Edit Employee</h2>
              <form>
                <div className="input-wrapper">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={editEmployee.name}
                    onChange={handleEditInputChange}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="salary">Age:</label>
                  <input
                    type="text"
                    name="age"
                    value={editEmployee.age}
                    onChange={handleEditInputChange}
                    placeholder="age"
                    required
                  />
                </div>
              </form>
              <div className="button-wrapper">
                <button className="primary" onClick={updateEmployee}>
                  Update
                </button>
                <button className="secondary" onClick={cancelEditing}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesTable;
















