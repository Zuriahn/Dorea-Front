import React ,{  useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import Loader from '../../../components/loader/Loader'
import "./project_request.css"
import ProjectSidebar from '../../../components/project_sidebar/ProjectSidebar'
import Requests from '../../../components/project_components/requests/Requests'
import {Container, Row, Col} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function ProjectRequest() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  const [project, setProject] = useState([])
  const [applications, setApplications] = useState([])
  const {user} = useContext(Context)
  const [load, setLoad] = useState(false)

  const [condUser, setCondUser] = useState(false)

  useEffect(() =>{
    const fetchRequests = async ()=>{
      try{
        await api.get("/project/get-all-applications/" + path_id + "/" + user.token)
        .then(response =>{
          //Si el proyecto no existe redireccionar a pagina de error
          if(response.data.message == null){
            window.location.replace("/error")
          }else{
            setProject(response.data.message)
            setApplications(response.data.message.applications)
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
    fetchRequests()
  },[path_id,user])

  return (
    <>
    <Header/>
      <Container className="projectRequestPage mt-4 mb-4">
        {load ?
        <Row>
          <Col md={4} className="projectRequestSidebarCenter">
            <ProjectSidebar projectdata={project} condUser={condUser}/>
          </Col>
          <Col md={8} className="mt-4">
          <h3 className="projectRequestTittle">SOLICITUDES ACTUALES</h3>
            <Requests projectapplications={applications}/>
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
