import { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import Loader from '../../../components/loader/Loader'
import "./project_task.css"
import ProjectSidebar from '../../../components/project_sidebar/ProjectSidebar'
import Tasks from "../../../components/project_components/tasks/Tasks"
import TasksCom from "../../../components/project_components/tasksCom/TasksCom"
import TasksMember from '../../../components/project_components/tasksMember/TasksMember'
import {Button, Form, Container, Row, Col} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function ProjectTask() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]

  const [hideForm, setHideform] = useState(true)
  
  const [project, setProject] = useState([])
  const [members, setMembers] = useState([])
  const [tasksCom, setTasksCom] = useState([])
  const [tasksInc, setTasksInc] = useState([])
  const [tasksMember, setTasksMember] = useState([])

  const [condUser, setCondUser] = useState(false)
  const [condTask, setCondTask] = useState(false)

  const {user} = useContext(Context)
  const [load, setLoad] = useState(false)
  const [objTask, setObjTask] = useState({
    name: "",
    desc: "",
    user: "",
    token: user.token,
    project_id: path_id
  })

  const [isFetching, setIsFetching] = useState(false)
  const [err, setErr] = useState(false)
  const [errdesc, setErrdesc] = useState("")

  useEffect(() =>{
    const fetchTasks = async ()=>{
      try{
        await api.get("/project/get-sidebar/" + path_id + "/" + user.token)
        .then(response =>{
          //Si el proyecto no existe redireccionar a pagina de error
          if(response.data.message == null){
            window.location.replace("/error")
          }else{
            setProject(response.data.message)
            //Si el proyecto buscado tiene de usuario creador el usuario logeado
            if(response.data.message.creator.username == user.username){
              setCondUser(true)
  
              api.get("/project/task-incomplete/" + path_id + "/" + user.token)
              .then(response =>{
                setTasksInc(response.data.message.tasks)
              })
  
              api.get("/project/task-complete/" + path_id + "/" + user.token)
              .then(response =>{
                setTasksCom(response.data.message.tasks)
              })
  
              api.get("/project/get-only-members/" + path_id + "/" + user.token)
              .then(response =>{
                setMembers(response.data.message)
              })
  
            }else{
              api.get("/project/task-one-member/"  + path_id + "/" + user.token)
              .then(response =>{
                setTasksMember(response.data.message.tasks)
              })
            }
            setLoad(true)
          }
        })
      }catch(err){
        window.location.replace("/error")
      }
    }

    fetchTasks()
  },[path_id,user])

  const createTask = async (e) =>{
    e.preventDefault();
    setErr(false)
    setIsFetching(true)

    if(objTask.name == "" || objTask.desc == "" || objTask.user == ""){
      setErr(true)
      setIsFetching(false)
      setErrdesc("No puede haber campos vacios")
    }else{
      try{
        await api.post("/task/create",
        objTask
        ).then(response =>{
          setTasksInc(response.data.message.tasks)
          setHideform(true)
          setIsFetching(false)
        })
      }catch(err){
        setErr(true)
        setIsFetching(false)
        setErrdesc(err.response.data.message)
      }
    }
  }

  const handleOnChangeTask = (e) =>{
    const {name, value} = e.target

    setObjTask({
      ...objTask,
      [name]:value
    })
  }

  return (
    <>
    <Header/>
      <Container className="projectTaskPage mt-4 mb-4">
        {load ?
        <Row >     
          <Col md={4} className="projectTasksSidebarCenter">
            <ProjectSidebar projectdata={project} condUser={condUser}/>
          </Col>

          <Col md={8} className="mt-4">
            <Row>
              <Col md={9}>
                <h3 className="projectTaskTitle">TAREAS</h3>
              </Col>
              <Col md={3}>
              {condUser &&
              <>
                {
                  hideForm ? 
                  <Button className="w-100"       
                  style={{ backgroundColor: "#6a46ad",
                  borderColor: "#6a46ad"}} onClick={() => setHideform(false)}>
                        Crear tarea
                  </Button>
                  :
                  <Button className="w-100"   
                  style={{ backgroundColor: "#6a46ad",
                  borderColor: "#6a46ad"}} onClick={() => setHideform(true)} >
                        Cancelar
                  </Button>
                }
              </>
              }
              </Col>
            </Row>
            {condUser &&
            <>
            { !hideForm &&
                <Form onSubmit={createTask} method="POST">
                  <Form.Group>
                    <Form.Label>Título de la tarea</Form.Label>
                    <Form.Control type="text" placeholder="Insertar título" name="name" onChange={handleOnChangeTask}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className='mb-0'>Descripción de la actividad</Form.Label>
                    <Form.Control as="textarea" rows="3" name="desc" onChange={handleOnChangeTask}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Asignar a usuario</Form.Label>
                    <Form.Select aria-label="Default select example" name="user"  onChange={handleOnChangeTask}>
                    <option  value="">Seleccione un miembro</option>
                      {members.members?.map((m)=>(
                        <option key={m._id} value={m._id}>{m.name}</option>
                      )) 
                      }
                    </Form.Select>
                  </Form.Group>
                  <Row className='mt-2' >
                    <Col lg={3} className='m-auto'>
                      <Button type="submit"    
                        style={{ backgroundColor: "#6a46ad",
                        borderColor: "#6a46ad"}} disabled={isFetching}>Crear tarea</Button>
                      {err && <span className="mt-2 d-block" style={{color:"red"}}>
                      {errdesc}
                      </span>}
                    </Col>
                  </Row>
                </Form>
            }
            </>
            }
            {condUser ?
            <>
              <Row>
              {
                condTask ?
                <>
                <Col md={7}>
                  <h4 className="mt-4 projectTaskTitle">Tareas completadas</h4>
                </Col>
                </>
                :
                <>
                <Col md={7}>
                  <h4 className="mt-4 projectTaskTitle">Tareas pendientes</h4>
                </Col>
                </>
                
              }
                <Col md={5} className="d-flex align-items-center justify-content-center">
                  <Button className="w-50 m-1"       
                    style={{ backgroundColor: "#6a46ad",
                    borderColor: "#6a46ad"}} onClick={() => setCondTask(true)}>
                    Completadas
                  </Button>
                  <Button className="w-50 m-1"       
                    style={{ backgroundColor: "#6a46ad",
                    borderColor: "#6a46ad"}} onClick={() => setCondTask(false)}>
                    Pendientes
                  </Button>
                </Col>
              </Row>
              {
                condTask ?
                <>
                  <TasksCom projecttaskscom={tasksCom}/>
                </>
                :
                <>
                  <Tasks projecttasks={tasksInc}/>
                </>
              }
            </>
            :
            <>
              <TasksMember projecttasksmember={tasksMember}/>
            </>
            }
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
