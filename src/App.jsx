import React, { useState } from "react";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Clock from "./components/Clock";
import { Grid } from "@mui/material";




function App() {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
      return JSON.parse(savedEmployees);
    } else {
      return [];
    }
  });

  const handleAddEmployee = ({ employeeName, discount, salary }) => {
    const newEmployee = {
      id: new Date().getTime().toString(),
      employeeName,
      discount,
      salary
    };
    setEmployees([...employees, newEmployee]);
    localStorage.setItem("employees", JSON.stringify([...employees, newEmployee]));
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  return (
    <div className="App"> 
      <div className="addDiscount">
        <span className="title">Calculando Mis Descuentos</span>
        <Clock/>
        <EmployeeForm onAddEmployee={handleAddEmployee} />
        <footer>Desarrollado by <span><a target={"_blank"} href="https://devsolutionsa.com/" > Devsolutionsa.com</a></span> </footer>
      </div>
      <div className="discounts">
        <EmployeeList setEmployees={setEmployees} employees={employees} onDeleteEmployee={handleDeleteEmployee} />
      </div>
    </div>
  );
}

export default App;
