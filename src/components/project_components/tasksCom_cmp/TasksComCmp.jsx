import { useContext, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import "./taskscom_cmp.css"
import {Button, Form,Accordion} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function TasksComCmp({taskCom}) {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  const [taskDelete, setTaskDelete] = useState(false)
  const {user} = useContext(Context)

  const [taskId, setTaskId] = useState("")
  
  const delTask = async (e) =>{
    try{
       await api.delete("/task/delete",
      { headers: {
        Authorization: null
      },
      data: {
        token: user.token,
        task_id: taskId,
        project_id: path_id
      }}
      ).then(response =>{
      })
    }catch(err){
      window.location.replace("/error")
    }
  }

  return (
    <Accordion.Item eventKey={taskCom._id}>
      <Accordion.Header>{taskCom.name} para {taskCom.username_id.name}</Accordion.Header>
      <Accordion.Body>
      <h6>Creado el {new Date(taskCom.start_date).toDateString()}</h6>
      <p>{taskCom.desc}</p>
      <h6>Finalizado el {new Date(taskCom.finish_date).toDateString()}</h6>
      <div className="d-flex">
        {taskDelete ?
        <>
        <Form onSubmit={delTask} method="DELETE">
          <Button  className="m-2" variant="danger" type="submit" value={taskCom._id} onClick={(e)=> setTaskId(e.target.value)}>Confirmar Eliminación</Button>
          <Button  className="m-2" variant="danger" onClick={() => setTaskDelete(false)}>Cancelar</Button>
        </Form>
        </> 
        :
        <Button  className="m-2" variant="danger" onClick={() => setTaskDelete(true)}>Eliminar</Button>
        }         
      </div>
      </Accordion.Body>
    </Accordion.Item>
  )
}
