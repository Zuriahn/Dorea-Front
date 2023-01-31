import { useContext, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import "./task_cmp.css"
import {Button, Form,Accordion} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function TaskCmp({task}) {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  const [taskEdition, setTaskEdition] = useState(false)
  const [taskDelete, setTaskDelete] = useState(false)
  const {user} = useContext(Context)

  const [newDesc, setNewDesc] = useState("")
  const [taskId, setTaskId] = useState("")

  const updTask = async (e) =>{
    const updateTask = {
      token: user.token,
      desc: newDesc,
      task_id: taskId,
      project_id: path_id
    }

    try{
      await api.put("/task/edit",
      updateTask
      ).then(response =>{
      })
    }catch(err){
      window.location.replace("/error")
    }
  }

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

  const endTask = async (e) =>{
    const finishTask ={
      token: user.token,
      task_id: taskId,
      project_id: path_id
    }
    try{
      await api.put("/task/finish-owner",
      finishTask
      ).then(response =>{
      })
    }catch(err){
      window.location.replace("/error")
    }
  }

  return (
    <Accordion.Item eventKey={task._id}>
      <Accordion.Header>{task.name} para {task.username_id.name}</Accordion.Header>
      <Accordion.Body>
        <h6>Creado el {new Date(task.start_date).toDateString()}</h6>
        <p>{task.desc}</p>
        <div className="d-flex">
        {
            taskEdition ?
            <>
            <div>
            <Form onSubmit={updTask} method="PUT">
              <Form.Group>
                    <Form.Control onChange={(e) => setNewDesc(e.target.value)} as="textarea" rows="3" ></Form.Control>
              </Form.Group>
              <Button type="submit" value={task._id} onClick={(e)=> setTaskId(e.target.value)} className="m-2" variant="info">Confirmar edición</Button>
              <Button  className="m-2" variant="info" onClick={() => setTaskEdition(false)}>Cancelar</Button>
            </Form>
            </div>
            </>
            :
            <Button  className="m-2" variant="info" onClick={() => setTaskEdition(true)}>Editar</Button>
          }
          <Form onSubmit={endTask} method="PUT">
            <Button  className="m-2" 
                    style={{ backgroundColor: "#6a46ad",
                    borderColor: "#6a46ad"}} variant="primary" type="submit" value={task._id} onClick={(e)=> setTaskId(e.target.value)}>Finalizar</Button>
          </Form> 
          {taskDelete ?
          <>
          <Form onSubmit={delTask} method="DELETE">
            <Button type="submit" className="m-2" variant="danger"  value={task._id} onClick={(e)=> setTaskId(e.target.value)}>Confirmar eliminación</Button>
            <Button className="m-2" variant="danger" onClick={() => setTaskDelete(false)} >Cancelar</Button>
          </Form>
          </>  
          :
          <Form>
            <Button className="m-2" variant="danger" onClick={() => setTaskDelete(true)} >Eliminar </Button>
          </Form>
          }         
        </div>
      </Accordion.Body>
    </Accordion.Item>
  )
}
