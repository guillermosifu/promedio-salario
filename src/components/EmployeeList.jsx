import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React from "react";
import Employee from "./Employee";

const EmployeeList = ({ employees, onDeleteEmployee, setEmployees }) => {

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    localStorage.setItem("employees", JSON.stringify(result));
    return result;
  };

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { source, destination } = result;
        if (!destination) {
          return;
        }
        if (
          source.index === destination.index &&
          source.droppableId === destination.droppableId
        ) {
          return;
        }

        setEmployees((prevTasks) =>
          reorder(prevTasks, source.index, destination.index)
        );
      }}
    >
      <Droppable droppableId="tasks">
        {(droppableProvided) => (
            <div className="employee-list" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                    <Draggable key={employee.id} draggableId={employee.id} index={index}>
                      {(draggableProvided) => (
                        <div 
                        className="employee"
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                        >
                          <Employee
                            key={employee.id}
                            id={employee.id}
                            name={employee.employeeName}
                            discount={employee.discount}
                            salary={employee.salary}
                            onDeleteEmployee={onDeleteEmployee}
                          />
                        </div>
                        )}
                    </Draggable>
                  ))) : (
                    <p className="list-none-employer">No hay empleados registrados.</p>
                  )}
                  {droppableProvided.placeholder}
            </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default EmployeeList;
