import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from 'axios';

function Add(){
    const history = useNavigate();
    const[student,setStudent]=useState({
        name:"",
        lastName:"",
        idnumber:"",
        career:"",
        course:"",
        mean:"",
        semester:"",
        projects:""
    })
    const {name,lastName,idnumber,career,
        course,mean,semester,projects}=student;
    const handleChange=(e)=>{
        setStudent({...student,[e.target.name]: e.target.value})
    }

    const submitForm=async(e)=>{
        e.preventDefault();
        console.log(student);
        await axios.post("http://localhost/pruebatec/pruebaapp-bd/insert.php",student) 
        .then((result)=>{
            console.log(result);
        if(result.data.status=='valid'){
                history("/");
            }
        else{
            alert("Error");
        }
        });
    }

    return(
        <>
        <div className="card">
            <div className="card-header text-center">
               <h4>Agregar estudiante</h4>
            </div>
        <div className="card-body">
        <form onSubmit={e=> submitForm(e)}>
            <div className="input-group mb-3">
                <input type="text" name="name" 
                    placeholder="Nombre"
                    value={name} onChange={e=>handleChange(e)}
                    className="form-control" required/>
                <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
                <input type="text" name="lastName"
                    placeholder="Apellidos"
                    value={lastName} onChange={e=>handleChange(e)} 
                    className="form-control" required/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Matricula</span>
                <input type="number" name="idnumber"
                    value={idnumber} onChange={e=>handleChange(e)}
                    maxLength="50" className="form-control" required/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-graduation-cap"></i></span>
                <input type="text" name="career" 
                    placeholder="Carrera"
                    value={career} onChange={e=>handleChange(e)}
                    className="form-control" required/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Materia</span>
                <input type="text" name="course" 
                    value={course} onChange={e=>handleChange(e)}
                    className="form-control"  required/>
            </div>
            <div className="input-group mb-3">
                <input type="number" name="mean"
                    placeholder="Promedio" 
                    value={mean} onChange={e=>handleChange(e)}
                    className="form-control" maxLength="2" required/>
                <span className="input-group-text"><i className="fa-solid fa-hashtag"></i></span>
                <input type="number" name="semester"
                    placeholder="Semestre"
                    value={semester} onChange={e=>handleChange(e)}
                    className="form-control" maxLength="20" required/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-list-check"></i></span>
                <input type="text" name="projects" 
                    placeholder="Entregables"
                    value={projects} onChange={e=>handleChange(e)}
                    className="form-control" required/>
            </div>
            <div  className="btn-group" role="group" aria-label="">
                  <input type="submit" name="submit" value="Agregar estudiante" className="btn btn-success"/>
                  <Link to={'/'} className="btn btn-secondary">Cancelar</Link>  
            </div>
        </form>
        </div>
        </div>

        </>
    )
}

export default Add;