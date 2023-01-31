import { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import { Context } from '../../context/Context'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Loader from '../../components/loader/Loader'
import "./project_presentation.css"
import {Button,Form, Container, Row, Col, Image, Tabs, Tab, Card} from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function ProjectPresentation() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  const {user} = useContext(Context)
  const [load, setLoad] = useState(false)

  const [isFetching, setIsFetching] = useState(false)
  const [err, setErr] = useState(false)
  const [errdesc, setErrdesc] = useState("")
  const [presentation, setPresentation] = useState([])

  const [condApplication, setCondapplication] = useState(false)
  const [condFollow, setCondfollow] = useState(false)
  const [condOwner, setCondOwner] = useState(false)
  const [condMember, setCondMember] = useState(false)
  const [condActive, setCondActive] = useState(true)

  useEffect(()=>{
    const getProject = async ()=>{
      try{
        await api.get("/project/presentation/" + path_id + "/" + user.token)
        .then(response =>{
          //Si no existe el proyecto mandarlo a la pagina de error
          if(response.data.message == null){
            window.location.replace("/error")
          }else{
            setPresentation(response.data.message)
            //Si el proyecto esta activo activar la condicion
            if(response.data.message.active == false){
              setCondActive(false)
            }
            //Si el proyecto el creador es el mismo que el usuario actual activar la condicion
            if(response.data.message.creator.username == user.username){
              setCondOwner(true)
              setLoad(true)
            }else{
              //Sino buscar si el usuario actual es parte del proyecto
              try{
                api.get("/project/if-member/" + path_id + "/" + user.token)
                .then(response =>{
                  //Si es parte del proyecto activar la condicion
                  if(response.data.message){
                    setCondMember(true)
                  }
                  setLoad(true)
                })
              }catch(err){
                window.location.replace("/error")
              }
            }
          }
        })
      }catch(err){
        window.location.replace("/error")
      }
    }

    const getIfApplication = async ()=>{
      try{
        await api.get("/applications/get/" + path_id + "/" + user.token)
        .then(response =>{
          //Si el usuario activo tiene una solicitud activar condicion
          if(response.data.message != null){
            setCondapplication(true)
          }
        })
      }catch(err){
        window.location.replace("/error")
      }
    }

    const getIfFollow = async ()=>{
      try{
        await api.get("/follows/get-follow/" + path_id + "/" + user.token)
        .then(response =>{
          //Si el usuario activo sigue el proyecto activar condicion
          if(response.data.message != null){
            setCondfollow(true)
          }
        })
      }catch(err){
        window.location.replace("/error")
      }
    }

    getIfApplication()
    getIfFollow()
    getProject()
  },[path_id,user])

  const projectApplication = async (e) =>{
    e.preventDefault();
    setErr(false)
    setIsFetching(true)

    const newApplication = {
      token: user.token,
      project_id: path_id
    }

    try{
      await api.post("/applications/create",
      newApplication
      ).then(response =>{
        setCondapplication(true)
        setIsFetching(false)
      })
    }catch(err){
      setErr(true)
      setIsFetching(false)
      setErrdesc(err.response.data.message)
    }
  }

  const cancelApplication = async (e) =>{
    e.preventDefault();
    setErr(false)
    setIsFetching(true)

    try{
      await api.delete("/applications/delete/user",
      {
        headers: {
          Authorization: null
        },
        data: {
          token: user.token,
          project_id: path_id
        }
      }
      ).then(response =>{
        setCondapplication(false)
        setIsFetching(false)
      })
    }catch(err){
      setErr(true)
      setIsFetching(false)
      setErrdesc(err.response.data.message)
    }

  }

  const projectFollow = async (e) =>{
    e.preventDefault();
    setErr(false)
    setIsFetching(true)

    const newFollow = {
      token: user.token,
      project_id: path_id
    }

    try{
      await api.post("/follows/create",
      newFollow
      ).then(response =>{
        setCondfollow(true)
        setIsFetching(false)
      })
    }catch(err){
      setErr(true)
      setIsFetching(false)
      setErrdesc(err.response.data.message)
    }
  }

  const cancelFollow = async (e) =>{
    e.preventDefault();
    setErr(false)
    setIsFetching(true)
    try{
        await api.delete("/follows/delete",
          {
            headers: {
              Authorization: null
            },
            data: {
              token: user.token,
              project_id: path_id
            }
          }
          ).then(response =>{
            setCondfollow(false)
            setIsFetching(false)
          })
      }catch(err){
        setErr(true)
        setIsFetching(false)
        setErrdesc(err.response.data.message)
    }
  }

  return (
    <>
     <Header/>
      <Container className="projectpresentationPage mt-4">
        {load ?
        <>
        <Row className="text-center">
          <h1 className="projectPresentationTittle">{presentation.name}</h1>
          <h4 className="projectPresentationCategory">{presentation.category?.name}</h4>
        </Row>
        <Row>
          <Col md={8} className="text-center">
            <Image className="projectPresentationImage" fluid src={presentation.image}></Image>
          </Col>
          <Col md={4}>
            <h6 className="mt-4"> <i className="fa-solid fa-splotch"></i> Creador <Link to={`/profile/${presentation.creator?._id}`} className="link projectPresentation_a">{presentation.creator?.username}</Link></h6>
            <h6 className="mt-4"> <i className="fa-solid fa-person"></i> Miembros {presentation.nM}</h6>
            <h6 className="mt-4"> <i className="fa-solid fa-calendar"></i> {new Date(presentation.creation_date).toDateString()}</h6>
            {condOwner 
            ?
              <>
                <Link to={`/project/${path_id}/updates`} className="link">
                  <Button style={{ backgroundColor: "#6a46ad",
                          borderColor: "#6a46ad"}}
                          className="projectPresentationButton w-50 rounded mt-4">Ir al proyecto principal</Button>
                </Link>
              </>
              :
              <>
              {condActive &&
                <>
                  {condFollow ? 
                  <h6 className="mt-4"> <i className="projectPresentationsStar fa-solid fa-star" onClick={cancelFollow}></i> Cancelar seguimiento</h6> 
                  : 
                  <h6 className="mt-4"> <i className="projectPresentationsStar fa-solid fa-star" onClick={projectFollow}></i> Seguir Proyecto</h6>
                  }
                  {condApplication ?             
                  <Form className="mt-4" onSubmit={cancelApplication} method="DELETE">
                    <Button style={{ backgroundColor: "#6a46ad",
                            borderColor: "#6a46ad"}}
                            className="projectPresentationButton w-50 rounded" type="submit" disabled={isFetching}>
                      Cancelar solicitud
                    </Button>
                  </Form> 
                  :
                  
                  condMember ?
                  <>
                    <Link to={`/project/${path_id}/updates`} className="link">
                      <Button style={{ backgroundColor: "#6a46ad",
                              borderColor: "#6a46ad"}}
                              className="projectPresentationButton w-50 rounded mt-4">Ir al proyecto principal</Button>
                    </Link>
                  </>
                  :
                  <Form className="mt-4" onSubmit={projectApplication} method="POST">
                    <Button style={{ backgroundColor: "#6a46ad",
                            borderColor: "#6a46ad"}}
                            className="projectPresentationButton w-50 rounded" type="submit" disabled={isFetching}>
                      Enviar Solicitud
                    </Button>
                  </Form>
                  }
                </>
              }
              {!condActive && <h6 className="mt-4" style={{color:"red"}}>Actualmente el proyecto se encuentra deshabilitado por el creador.</h6>}
              </>
            }
            {err && <span className="mt-2 d-block" style={{color:"red"}}>{errdesc}</span>}
          </Col>
        </Row>
        <Row className="mt-4">
        <Tabs defaultActiveKey="description" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="description" title="Descripción del proyecto">
            <p>
              {presentation.desc}
            </p>
          </Tab>
          <Tab eventKey="updates" title="Ultimas actualizaciones">
              {presentation.updates?.map(( upd, i)=>(
                    <Card className="mt-4 mb-4" key={upd._id}>
                        <Card.Header>Actualizacion {new Date(upd.date).toDateString()}</Card.Header>
                        <Card.Body>
                              <p>
                                {upd.desc}
                              </p>
                        </Card.Body>
                    </Card>
                  ))}
          </Tab>
        </Tabs>
        </Row>
        </>
        :
        <Loader/>
        }
      </Container>
      <Footer/>
    </>
  )
}
