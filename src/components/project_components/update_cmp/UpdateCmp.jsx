import { useContext, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import "./update_cmp.css"
import {Button, Form} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function UpdateCmp({update,condUser}) {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  const [updEdition, setUpdEdition] = useState(false)
  const [updDelete, setUpdDelete] = useState(false)
  const {user} = useContext(Context)

  const [newDesc, setNewDesc] = useState("")
  const [updId, setUpdId] = useState("")

  const updUpdate = async (e) =>{
    const updUpdate = {
      token: user.token,
      desc: newDesc,
      update_id: updId,
      project_id: path_id
    }

    try{
      await api.put("/update/edit",
        updUpdate
      ).then(response =>{
      })
    }catch(err){
      window.location.replace("/error")
    }
  }

  const deleteUpdate = async (e) =>{
    try{
      await api.delete("/update/delete",
      { headers: {
        Authorization: null
      },
      data: {
        token: user.token,
        update_id: updId,
        project_id: path_id
      }}
      ).then(response =>{
      })
    }catch(err){
      window.location.replace("/error")
    }
  }

  return (
    <div className="mt-4 update_cmp">
        <div className="m-2 updateCmpTittle">
          <h6>Actualización {new Date(update.date).toDateString()}</h6>
        </div>
        <div className="m-2"> 
          <p>{update.desc}</p>
        </div>
        <div className="m-2">
          {
            condUser &&
            <>
            { updEdition ?    
            <>
              <Form onSubmit={updUpdate} method="PUT">
                <Form.Group>
                  <Form.Control onChange={e=>setNewDesc(e.target.value)} as="textarea" rows="3" ></Form.Control>
                </Form.Group>
                <Button type="submit" value={update._id} onClick={(e)=> setUpdId(e.target.value)} variant="info" className="m-2">
                Confirmar edición
                </Button>
              <Button onClick={() => setUpdEdition(false)} variant="info" className="m-2">
                Cancelar
              </Button>
              </Form>
            </>      
            :
            <Button onClick={() => setUpdEdition(true)} variant="info" className="m-2">
              Editar
            </Button>}
            </>
          }
          {
            condUser &&
            <>
            { updDelete ?
            <>
            <Form onSubmit={deleteUpdate} method="DELETE">
              <Button type="submit" value={update._id} onClick={(e) => setUpdId(e.target.value) } variant="danger" className="m-2">
                Confirmar eliminación
              </Button>
              <Button onClick={() => setUpdDelete(false)} variant="danger" className="m-2">
                Cancelar
              </Button>
            </Form>
            </>
            :
            <Button onClick={() => setUpdDelete(true)} variant="danger" className="m-2">
              Eliminar
            </Button>}
            </>
          }
        </div>
    </div>
  )
}
