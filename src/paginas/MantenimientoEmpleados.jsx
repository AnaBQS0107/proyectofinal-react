import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ObtenerEmpleados, EliminarEmpleado } from '../api/empleados.api';
import EditarEmpleado from '../modals/EditarEmpleado';
import '../css/MantenimientoE.styles.css';

const MantenimientoE = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await ObtenerEmpleados();
            setEmployees(data);
        } catch (error) {
            console.error('Error al cargar empleados:', error);
        }
    };

    const showSuccessToast = (message) => {
        window.toast.show({ severity: 'success', summary: 'Éxito', detail: message });
    };

    const showErrorToast = (message) => {
        window.toast.show({ severity: 'error', summary: 'Error', detail: message });
    };

    const actionBodyTemplate = (rowData) => (
        <React.Fragment>
            <Button 
                icon="pi pi-pencil" 
                className=" p-button-success p-mr-2" 
                onClick={() => editEmployee(rowData)} 
            />
            <Button 
                icon="pi pi-trash" 
                className=" p-button-danger" 
                onClick={() => deleteEmployee(rowData.Persona_idCedula)} 
            />
        </React.Fragment>
    );

    const editEmployee = (employee) => {
        setSelectedEmployee(employee);
        setIsModalVisible(true);
    };

    const deleteEmployee = async (cedula) => {
        try {
            await EliminarEmpleado(cedula);
            setEmployees(employees.filter(emp => emp.Persona_idCedula !== cedula));
            showSuccessToast('Empleado eliminado con éxito.');
        } catch (error) {
            showErrorToast('Error al eliminar empleado.');
            console.error('Error al eliminar empleado:', error);
        }
    };

    const handleUpdate = () => {
        fetchEmployees();  
    };

    return (
        <div className="crud-table-container">
            <Toast ref={(el) => (window.toast = el)} />
            <h2 className="crud-table-title">Mantenimiento de Empleados</h2>
            <DataTable value={employees}>
                <Column field="Nombre" header="Nombre" />
                <Column field="Apellido1" header="Primer apellido" />
                <Column field="Apellido2" header="segundo apellido" />
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} />
            </DataTable>

            {isModalVisible && (
                <EditarEmpleado 
                    employee={selectedEmployee} 
                    visible={isModalVisible} 
                    onHide={() => setIsModalVisible(false)} 
                    onUpdate={handleUpdate}  
                />
            )}
        </div>
    );
};

export default MantenimientoE;
