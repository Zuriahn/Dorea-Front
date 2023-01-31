import React ,{ useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import Loader from '../../../components/loader/Loader'
import "./project_updates.css"
import ProjectSidebar from '../../../components/project_sidebar/ProjectSidebar'
import Updates from '../../../components/project_components/updates/Updates'
import {Button,Form, Container, Row, Col} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function ProjectUpdates() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]

  const [hideForm, setHideform] = useState(true)

  const [project, setProject] = useState([])
  const [updates, setUpdates] = useState([])

  const {user} = useContext(Context)
  const [load, setLoad] = useState(false)
  const [objUpdate, setObjUpdate] = useState({
    desc: "",
    token: user.token,
    project_id: path_id
  })

  const [isFetching, setIsFetching] = useState(false)
  const [err, setErr] = useState(false)
  const [errdesc, setErrdesc] = useState("")
  const [condUser, setCondUser] = useState(false)

  useEffect(() =>{
    const fetchUpdates = async ()=>{
      try{
        await api.get("/project/get-all-updates/" + path_id + "/" + user.token)
        .then(response =>{
           //Si el proyecto no existe redireccionar a pagina de error
          if(response.data.message == null){
            window.location.replace("/error")
          }else{
            setProject(response.data.message)
            setUpdates(response.data.message.updates)
            //Si el proyecto buscado tiene de usuario creador el usuario logeado
            if(response.data.message.creator.username == user.username){
              setCondUser(true)
            }
            setLoad(true)
          }
        })
      }catch(err){
        window.location.replace("/error")
      }
    }
    fetchUpdates()
  },[path_id,user])

  const createUpdate = async (e) =>{
    e.preventDefault();
    setErr(false)
    setIsFetching(true)

    if(objUpdate.desc == ""){
      setErr(true)
      setIsFetching(false)
      setErrdesc("No puede haber campos vacios")
    }else{
      try{
        await api.post("/update/create",
        objUpdate
        ).then(response =>{
          setUpdates(response.data.message.updates)
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

  const handleOnChangeUpdate = (e) =>{
    const {name, value} = e.target

    setObjUpdate({
      ...objUpdate,
      [name]:value
    })
  }

  return (
    <>
    <Header/>
        <Container className="projectUpdatesPage mt-4 mb-4">
          {load ?
          <Row>
              <Col md={4} className="projectUpdatesSidebarCenter">
                  <ProjectSidebar projectdata={project} condUser={condUser}/>
              </Col>
              <Col md={8} className="mt-4">
                <Row>
                  <Col md={9}>
                    <h3 className="projectUpdatesTittle ">ACTUALIZACIONES DEL PROYECTO </h3>
                  </Col>
                  <Col md={3}>
                    {condUser &&
                    <>
                    {
                      hideForm ? 
                      <Button  className="w-100"
                        style={{ backgroundColor: "#6a46ad",
                        borderColor: "#6a46ad"}}
                        onClick={() => setHideform(false)}>
                        Crear actualización
                      </Button>
                      :
                      <Button  className="w-100"
                        style={{ backgroundColor: "#6a46ad",
                        borderColor: "#6a46ad"}}
                        onClick={() => setHideform(true)}>
                        Cancelar
                      </Button>
                    }
                    </>
                    }
                  </Col>
                </Row>
                  { !hideForm &&
                      <Form onSubmit={createUpdate} method="POST">
                        <Form.Group>
                          <Form.Label className='mb-0'>Descripción de las ultimas novedades</Form.Label>
                          <Form.Control name="desc" onChange={handleOnChangeUpdate} as="textarea" rows="3" ></Form.Control>
                        </Form.Group>
                        <Row className='mt-2' >
                          <Col lg={3} className='m-auto'>
                            <Button
                            style={{ backgroundColor: "#6a46ad",
                            borderColor: "#6a46ad"}}
                            type="submit" disabled={isFetching}>Crear actualización</Button>
                            {err && <span className="mt-2 d-block" style={{color:"red"}}>
                            {errdesc}
                            </span>}
                          </Col>
                        </Row>
                      </Form>
                    }
                  <Updates projectupdates={updates} condUser={condUser}/>
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