import React, {  useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import Loader from '../../../components/loader/Loader'
import ProjectSidebar from '../../../components/project_sidebar/ProjectSidebar'
import {Container, Row, Col, Form, Button, Modal} from 'react-bootstrap'
import "./project_main.css"
import { Context } from '../../../context/Context'

export default function ProjectMain() {  
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]

  const [modalDeshabilitarProyecto, setmodalDeshabilitarProyecto] = React.useState(false);
  const [modalhabilitarProyecto, setmodalhabilitarProyecto] = React.useState(false);

  const [project, setProject] = useState([])
  const {user} = useContext(Context)
  const [load, setLoad] = useState(false)

  const [isFetching, setIsFetching] = useState(false)
  const [err, setErr] = useState(false)
  const [errdesc, setErrdesc] = useState("")

  const [condUser, setCondUser] = useState(false)
  const [condActive, setCondActive] = useState(false)

  const [objProject, setObjProject] = useState({
    name: "",
    image: null,
    desc: "",
    token: user.token,
    project_id: path_id
  })
  const [infoProject, setInfoProject] = useState({tasksComplete:0,tasksIncomplete:0,MembersActive:0, MembersInactive:0, NumberApplications:0})

  useEffect(() =>{
    const fetchProject = async ()=>{
      try{
        await api.get("/project/get-edit/" + path_id + "/" + user.token)
        .then(response =>{
          //Si el proyecto no existe redireccionar a pagina de error
          if(response.data.message == null){
            window.location.replace("/error")
          }else{
            setProject(response.data.message)
            //Si el proyecto buscado tiene de usuario creador el usuario logeado
            if(response.data.message.creator.username == user.username){
              setCondUser(true)
            }
            //Si el proyecto esta activo activar condicion
            if(!response.data.message.active){
              setCondActive(true)
            }
            setLoad(true)
          }
        })
      }catch(err){
        window.location.replace("/error")
      }
    }
    const dataProject = async ()=>{
      try{
        const TaskComplete = api.get("/reports/tasks-complete/"+ path_id +"/"+user.token)
        const TaskIncomplete = api.get("/reports/tasks-incomplete/"+ path_id +"/"+user.token)
        const MembersActive = api.get("/reports/members-active/"+ path_id +"/"+user.token)
        const MembersInactive = api.get("/reports/members-inactive/"+ path_id +"/"+user.token)
        const NumberApplications = api.get("/reports/requests/"+ path_id +"/"+user.token)
        await Promise.all([TaskComplete,TaskIncomplete,MembersActive,MembersInactive,NumberApplications])
        .then(response =>{
          setInfoProject({
            tasksComplete: response[0].data.message,
            tasksIncomplete: response[1].data.message,
            MembersActive: response[2].data.message,
            MembersInactive: response[3].data.message,
            NumberApplications: response[4].data.message
          })
        })
      }catch(err){
        window.location.replace("/error")
      }
    }
    
    fetchProject()
    dataProject()
  },[path_id,user])

  function DeshabilitarProyectoModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Deshabilitar proyecto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Deshabilitar proyecto hara que las personas ya no puedan
            mandar registros de solicitud para participar, pero aun podras 
            manejar las herramientas que otorga tener un proyecto
          </p>
        </Modal.Body>
        <Modal.Footer className="m-auto">
          <Form onSubmit={deleteProject} method="PUT">
            <Button type="submit" variant="danger" disabled={isFetching}>Deshabilitar proyecto</Button>
          </Form>
        </Modal.Footer>
      </Modal>
    );
  }

  function HabilitarProyectoModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Habilitar proyecto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Habilitar proyecto vuelve a poner activo a todo el proyecto
          </p>
        </Modal.Body>
        <Modal.Footer className="m-auto">
          <Form onSubmit={activeProject} method="PUT">
            <Button type="submit" variant="info" disabled={isFetching}>Habilitar proyecto</Button>
          </Form>
        </Modal.Footer>
      </Modal>
    );
  }

  const editProject = async (e) =>{
    setErr(false)
    setIsFetching(true)

    try{
      await api.put("/project/edit",
      objProject
      ).then(response =>{
        setIsFetching(false)
      })
    }catch(err){
      setErr(true)
      setIsFetching(false)
      setErrdesc(err.response.data.message)
    }
  }

  const deleteProject = async (e) =>{
    e.preventDefault()
    setIsFetching(true)

    const delProject = {
      token: user.token,
      project_id: path_id
    }

    try{
      await api.put("/project/delete",
      delProject
      ).then(response =>{
        setIsFetching(false)
        window.location.replace("/home")
      })
    }catch(err){
      setIsFetching(false)
      window.location.replace("/error")
    }
  }

  const activeProject = async (e) =>{
    setIsFetching(true)

    const delProject = {
      token: user.token,
      project_id: path_id
    }

    try{
      await api.put("/project/active",
      delProject
      ).then(response =>{
        setIsFetching(false)
        window.location.reload()
      })
    }catch(err){
      setIsFetching(false)
      window.location.replace("/error")
    }
  }

  const handleOnChangeProjectEdit = (e) =>{
    const {name, value} = e.target

    setObjProject({
      ...objProject,
      [name]:value
    })
  }

  const uploadImageRegister = async (e) =>{
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    setObjProject({
      ...objProject,
      image:base64
    })
  }

  const convertBase64 = (file) =>{
    return new Promise((resolve,reject)=>{

      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = (()=>{
        resolve(fileReader.result)
      })

      fileReader.onerror = ((error)=>{
        reject(error)
      })
    })
  }

  return (
    <>
    <Header/>
    <Container className="projectMainPage mt-4 mb-4">
      {load ?
      <Row>
        <Col md={4} className="projectMainSidebarCenter">
          <ProjectSidebar projectdata={project} condUser={condUser}/>
        </Col>

        <Col md={8} className="mt-4">
          <h3 className="projectMainTittle">INFORMACIÓN</h3>
          <Form onSubmit={editProject} method="PUT">

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label><h4>Título del proyecto</h4></Form.Label>
              <Form.Control placeholder="Título del proyecto" onChange={handleOnChangeProjectEdit} name="name"/>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label><h4>Imagen del proyecto</h4></Form.Label>
              <Form.Control type="file" onChange={(e) => uploadImageRegister(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label><h4>Descripción del proyecto</h4></Form.Label>
              <Form.Control as="textarea" rows={6} onChange={handleOnChangeProjectEdit} name="desc"/>
            </Form.Group>

              <Button
                style={{ backgroundColor: "#6a46ad",
                borderColor: "#6a46ad"}}
                type="submit"
                disabled={isFetching}>
                Actualizar
              </Button>
              {condActive ?
                <Button onClick={() => setmodalhabilitarProyecto(true)} variant="info" className="m-2">
                  Habilitar proyecto
                </Button>
              :
                <Button onClick={() => setmodalDeshabilitarProyecto(true)} variant="danger" className="m-2">
                Deshabilitar proyecto
              </Button>
              }
              {err && <span className="mt-2 d-block" style={{color:"red"}}>{errdesc}</span>}
          </Form>
          <DeshabilitarProyectoModal
                        show={modalDeshabilitarProyecto}
                        onHide={() => setmodalDeshabilitarProyecto(false)}/>
          <HabilitarProyectoModal
                        show={modalhabilitarProyecto}
                        onHide={() => setmodalhabilitarProyecto(false)}/>
          <h4 className="projectMainTittle mt-4 mb-4">DATOS DEL PROYECTO</h4>
          <h6> <i className="fa-solid fa-list-check"></i> Tareas completadas: {infoProject.tasksComplete} </h6>
          <h6> <i className="fa-solid fa-bars-progress"></i> Tareas pendientes: {infoProject.tasksIncomplete} </h6>
          <h6> <i className="fa-solid fa-user-group"></i> Miembros totales activos: {infoProject.MembersActive} </h6>
          <h6> <i className="fa-solid fa-user-group"></i> Miembros totales inactivos: {infoProject.MembersInactive} </h6>
          <h6> <i className="fa-solid fa-signs-post"></i> Solicitudes actuales: {infoProject.NumberApplications} </h6>
        </Col>
      </Row>
      :
      <Loader/>
      }
    </Container>
    <Footer/>
    </>
  )
}