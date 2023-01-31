import React ,{ useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import Loader from '../../../components/loader/Loader'
import "./project_publications.css"
import ProjectSidebar from '../../../components/project_sidebar/ProjectSidebar'
import Publications from '../../../components/project_components/publications/Publications'
import {Button, Form, Container, Row, Col} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function ProjectPublications() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]

  const [hideForm, setHideform] = useState(true)

  const [project, setProject] = useState([])
  const [publications, setPublications] = useState([])

  const {user} = useContext(Context)
  const [load, setLoad] = useState(false)
  const [objPublication, setObjPublication] = useState({
    desc: "",
    token: user.token,
    project_id: path_id
  })

  const [isFetching, setIsFetching] = useState(false)
  const [err, setErr] = useState(false)
  const [errdesc, setErrdesc] = useState("")
  const [condUser, setCondUser] = useState(false)

  useEffect(() =>{
    const fetchPublications = async ()=>{
      try{
        await api.get("/project/get-all-publications/" + path_id + "/" + user.token)
        .then(response =>{
          //Si el proyecto no existe redireccionar a pagina de error
          if(response.data.message == null){
            window.location.replace("/error")
          }else{
            setProject(response.data.message)
            setPublications(response.data.message.publications)
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
    fetchPublications()
  },[path_id,user])

  const createPublication = async (e) =>{
    e.preventDefault();
    setErr(false)
    setIsFetching(true)

    if(objPublication.desc == ""){
      setErr(true)
      setIsFetching(false)
      setErrdesc("No puede haber campos vacios")
    }else{
      try{
        await api.post("/publication/create",
        objPublication
        ).then(response =>{
          setPublications(response.data.message.publications)
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

  const handleOnChangePublication = async (e) =>{
    const {name, value} = e.target

    setObjPublication({
      ...objPublication,
      [name]:value
    })
  }

  return (
    <>
    <Header/>
        <Container className="projectPublicationsPage mt-4 mb-4">
          {load ?
          <Row>
            <Col md={4} className="projectPublicationSidebarCenter">
                <ProjectSidebar projectdata={project} condUser={condUser}/>
            </Col>
            <Col md={8} className="mt-4">
              <Row>
                <Col md={9}>
                  <h3 className="projectPublicationTittle">PUBLICACIONES DEL PROYECTO</h3>
                </Col>
                <Col md={3}>
                  {hideForm ? 
                    <Button className="w-100"
                      style={{ backgroundColor: "#6a46ad",
                      borderColor: "#6a46ad"}}
                      onClick={() => setHideform(false)}>
                      Crear una publicación
                    </Button>
                    :
                    <Button className="w-100"  
                      style={{ backgroundColor: "#6a46ad",
                      borderColor: "#6a46ad"}}
                      onClick={() => setHideform(true)}>
                      Cancelar
                    </Button>
                    }
                </Col>
              </Row>
                {
                  !hideForm &&
                  <Form onSubmit={createPublication} method="POST">
                    <Form.Group>
                      <Form.Label className='mb-0'>Descripción</Form.Label>
                      <Form.Control name="desc" onChange={handleOnChangePublication}as="textarea" rows="3"></Form.Control>
                    </Form.Group>
                    <Row className='mt-2 centeralign' >
                      <Col lg={3} className='m-auto'>
                        <Button  
                          style={{ backgroundColor: "#6a46ad",
                          borderColor: "#6a46ad"}} 
                          type="submit" disabled={isFetching}>Publicar</Button>
                      {err && <span className="mt-2 d-block" style={{color:"red"}}>
                      {errdesc}
                      </span>}
                      </Col>
                    </Row>
                  </Form>
                }
              <Publications projectpublications={publications}/>
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
