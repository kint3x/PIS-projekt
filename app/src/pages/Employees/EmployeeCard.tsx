
import { EmployeeModel } from "../../store/ducks/employee/types";
import "primeicons/primeicons.css";

const employeeCard = (
    employee : EmployeeModel,
    onEditClick : any,
) => {

    return(
        <>
        <div className="col-xl-3 col-sm-6 mb-5 card">
            <div className="bg-white rounded shadow-sm py-5 px-4">
                <img src={ (employee.image && (employee.image != "")) ? employee.image : "https://bootdey.com/img/Content/avatar/avatar6.png"} alt="" width="100" 
                className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
            <h5 className="mb-0">{employee.name} {employee.surname}</h5><span className="small text-uppercase text-muted">{employee.type}</span>
            </div>

            <div className="card-icons">
                <i onClick={()=> onEditClick(employee.id)} className="pi pi-pencil" style={{ fontSize: '1.5rem' }}></i>
            </div>
        </div>
        </>
    );
};

export default employeeCard;