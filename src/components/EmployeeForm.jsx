import React, { useState } from "react";
import { Input, FormControl } from "@mui/material";
import { toast, Toaster } from "sonner";
import InputAdornment from '@mui/material/InputAdornment';
import PercentIcon from '@mui/icons-material/Percent';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoneyIcon from '@mui/icons-material/Money';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const EmployeeForm = ({ onAddEmployee }) => {
  const [employeeName, setEmployeeName] = useState("");
  const [discount, setDiscount] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!employeeName || !discount || !salary) {
      toast("Por favor verifique los campos ingresados.");
      return;
    } else if (discount > 100 || discount < 0) {
      const discountValidate =
        discount < 0
          ? toast("El descuento no puede ser menor a 0.")
          : toast("El descuento no puede ser mayor a 100.");
      return discountValidate;
    }
    console.log(employeeName, discount, salary);
    onAddEmployee({ employeeName, discount, salary });
    setEmployeeName("");
    setDiscount("");
    setSalary("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <Toaster position="top-right" />
      <label>
        <label htmlFor="employeeName">Nombre del empleado</label>
        <Input
          className="input-material"
          variant="outlined"
          color="primary"
          type="text"
          id="employeeName"
          value={employeeName}
          onChange={(event) => setEmployeeName(event.target.value)}
          placeholder="Ingrese el nombre del empleado"
          endAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </label>
      <label>
        <label htmlFor="discount">Descuento</label>
        <Input
          className="input-material"
          type="number"
          id="discount"
          value={discount}
          onChange={(event) => setDiscount(event.target.value)}
          placeholder="Ingrese el descuento"
          endAdornment={
            <InputAdornment position="start">
              <PercentIcon />
            </InputAdornment>
          }
        />
      </label>
      <label>
        <label htmlFor="salary">Salario</label>
        <Input
          className="input-material"
          type="number"
          id="salary"
          value={salary}
          onChange={(event) => setSalary(event.target.value)}
          placeholder="Ingrese el salario"
          endAdornment={
            <InputAdornment position="start">
              <MoneyIcon />
            </InputAdornment>
          }
        />
      </label>
      <button className="btn-form" type="submit">
        Agregar empleado
        <AddCircleIcon />
      </button>
    </form>
  );
};

export default EmployeeForm;
