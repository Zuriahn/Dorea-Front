import { useContext, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import "./publication_cmp.css"
import {Button, Form, Image} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function PublicationCmp({publication}) {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  const [pubEdition, setPubEdition] = useState(false)
  const [pubDelete, setPubDelete] = useState(false)
  const {user} = useContext(Context)

  const [newDesc, setNewDesc] = useState("")
  const [pubId, setPubId] = useState("")

  const updPublication = async (e) =>{
    const updPublication = {
      token: user.token,
      desc: newDesc,
      publication_id: pubId,
      project_id: path_id
    }

    try{
      await api.put("/publication/edit",
      updPublication
      ).then(response =>{
      })
    }catch(err){
      window.location.replace("/error")
    }

  }

  const delPublication = async (e) =>{
    try{
      await api.delete("/publication/delete",
      { headers: {
        Authorization: null
      },
      data: {
        token: user.token,
        publication_id: pubId,
        project_id: path_id
      }}
      ).then(response =>{
      })
    }catch(err){
      window.location.replace("/error")
    }
  }

  return (
    <div className="mt-4 mb-4 publication_cmp">
        <div className="m-2 publicationCmpTittle d-flex">
            <Image fluid src={publication.username_id.image} thumbnail  className="publicationCmpImage"></Image>
            <h6 className="m-4 d-flex align-items-center justify-content-center">Por {publication.username_id.name} el {new Date(publication.date).toDateString()}</h6>
        </div>
        <div className="m-2">
          <p>{publication.desc}</p>
        </div>
        <div className="m-2">
          {
            publication.username_id.username == user.username &&
            <>
            { pubEdition ?
            <>
              <Form onSubmit={updPublication} method="PUT">
                <Form.Group>
                    <Form.Control as="textarea" rows="3" onChange={e=>setNewDesc(e.target.value)} ></Form.Control>
                </Form.Group>
                <Button type="submit" value={publication._id} onClick={(e)=> setPubId(e.target.value)} variant="info" className="m-2">
                  Confirmar edición
                </Button>
              </Form>
              <Button onClick={() => setPubEdition(false)} variant="info" className="m-2">
                Cancelar
              </Button>
            </>
            :
            <Button onClick={() => setPubEdition(true)} variant="info" className="m-2">
              Editar
            </Button>
              
            }
            </>
          }
          {publication.username_id.username == user.username &&
            <>
            { pubDelete ?
            <>
            <Form onSubmit={delPublication} method="DELETE">
              <Button type="submit" value={publication._id} onClick={(e) => setPubId(e.target.value)} variant="danger" className="m-2">
                Confirmar eliminación
              </Button>
              <Button onClick={() => setPubDelete(false)} variant="danger" className="m-2">
                Cancelar
              </Button>
            </Form>
            </>
            :
            <Button onClick={() => setPubDelete(true)} variant="danger" className="m-2">
              Eliminar
            </Button>

            }
            </>
          }
        </div>
    </div>
  )
}
