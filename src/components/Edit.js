import {Link, useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from 'axios';

function Edit(){
    let {id} = useParams();
    let history = useNavigate();
    const[student,setStudent]=useState({
        name:"",
        lastName:"",
        idnumber:"",
        career:"",
        course:"",
        mean:"",
        semester:"",
        projects:"",
        id:""
    })
    useEffect(()=>{
        loadUsers();
    },[])


    const {name,lastName,idnumber,career,
        course,mean,semester,projects}=student;
    const handleChange=(e)=>{
        setStudent({...student,[e.target.name]: e.target.value})
    }

    const updateForm=async(e)=>{
        e.preventDefault();
        console.log(student);
        await axios.post("http://localhost/pruebatec/pruebaapp-bd/update.php",student)
        .then((result)=>{
            console.log(result);
        if(result.data.status==='valid'){
                history('/list');
            }
        else{
            alert("Error");
        }
        });
    }
        const loadUsers = async()=>{
            const result = await axios.get("http://localhost/pruebatec/pruebaapp-bd/edit.php?id=" + id);
            setStudent(result.data);
        }
    return(
        <>
        <div className="card">
            <div className="card-header text-center">
               <h4>Editar estudiante</h4>
            </div>
        <div className="card-body">
        <form onSubmit={e=> updateForm(e)}>
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
                <div className="input-group">
                    <span className="input-group-text"><i className="fa-solid fa-list-check"></i></span>
                    <input type="text" name="projects" 
                        placeholder="Entregables"
                        value={projects} onChange={e=>handleChange(e)}
                        className="form-control" required/>
                </div>
                <br></br>
                <div className="btn-group" role="group" aria-label="">
                    <button type="submit" className="btn btn-success"
                        value="updateUser">Editar</button>
                    <Link to={'/list'} className="btn btn-secondary">Cancelar</Link>
                </div>
            </form>
        </div>
        </div>

        </>
    )
}

export default Edit;
