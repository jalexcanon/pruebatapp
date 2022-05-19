import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from 'axios';

function List(){
    const [student,setStudent]=useState([]);

    useEffect(()=>{
        loadUsers();
    },
    []
    )


    const loadUsers = async()=>{
        const result = await axios.get("http://localhost/pruebatec/pruebaapp-bd/view.php")
        setStudent(result.data.records);
    }

    const deleteData=(id)=>{
        axios.delete('http://localhost/pruebatec/pruebaapp-bd/delete.php',{data:{id:id}})
        .then((result)=>{
            loadUsers();
        }).catch(()=>{
            alert('error');
        })
    }

    return(
    <div>
        <div className="card">
            <div className="card-header">
            <Link className="btn btn-success" to="/add">Agregar estudiante</Link>
        </div>
        <div className="card-body">
        <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Matricula</th>
                        <th>Carrera</th>
                        <th>Materia</th>
                        <th>Promedio</th>
                        <th>Semestre</th>
                        <th>Entregables</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((student, index)=>(
                        <tr key={index}>
                             <td>{student.name}</td>
                             <td>{student.lastName}</td>
                             <td>{student.idnumber}</td>
                             <td>{student.career}</td>
                             <td>{student.course}</td>
                             <td>{student.mean}</td>
                             <td>{student.semester}</td>
                             <td>{student.projects}</td>
                             <td>
                                <Link className="btn btn-secondary"
                                     to={"/edit/"+student.id}
                                      ><i className="fa-solid fa-pen-to-square"></i></Link>
                                <Link className="btn btn-danger"
                                     to="" onClick={()=>deleteData(student.id)}
                                     ><i className="fa-solid fa-trash"></i></Link>
                             </td>
                        </tr>

                            )
                        )
                    }
                </tbody>
            </table>
        </div>
        </div>
    </div>
    )
}

export default List;