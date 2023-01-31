import { useContext, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import "./tasksmember_cmp.css"
import {Button, Form,Accordion} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function TasksMemberCmp({taskmember}) {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  const {user} = useContext(Context)
  
  const [taskId, setTaskId] = useState("")

  const finishTask = async (e) =>{
    const endTask = {
      token: user.token,
      task_id: taskId,
      project_id: path_id
    }
    try{
       await api.put("/task/finish-member",
       endTask
      ).then(response =>{
      })
    }catch(err){
      window.location.replace("/error")
    }
  }

  return (
    <Accordion.Item eventKey={taskmember._id}>
      <Accordion.Header>{taskmember.name} para {taskmember.username_id.name}</Accordion.Header>
      <Accordion.Body>
        {taskmember.desc}
        <div className="d-flex">
          {
            taskmember.status ?
            <p className="mt-4">Tarea finalizada el {new Date(taskmember.finish_date).toDateString()}</p>
            :
            <>
            <Form onSubmit={finishTask} method="PUT">
            <Button  className="m-2" style={{ backgroundColor: "#6a46ad",
                  borderColor: "#6a46ad"}} type="submit" value={taskmember._id} onClick={(e)=> setTaskId(e.target.value)}>Finalizar</Button>
            </Form>   
            </>
          }     
        </div>
      </Accordion.Body>
    </Accordion.Item>
  )
}
