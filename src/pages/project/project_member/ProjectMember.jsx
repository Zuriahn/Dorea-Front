import React ,{  useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import Loader from '../../../components/loader/Loader'
import "./project_member.css"
import ProjectSidebar from '../../../components/project_sidebar/ProjectSidebar'
import Members from '../../../components/project_components/members/Members'
import {Container, Row, Col} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function ProjectMember() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  const [project, setProject] = useState([])
  const [members, setMembers] = useState([])
  const {user} = useContext(Context)
  const [load, setLoad] = useState(false)

  const [condUser, setCondUser] = useState(false)

  useEffect(() =>{
    const fetchMembers = async ()=>{
      try{
        await api.get("/project/get-all-members/" + path_id + "/" + user.token)
        .then(response =>{
          //Si el proyecto no existe redireccionar a pagina de error
          if(response.data.message == null){
            window.location.replace("/error")
          }else{
            setProject(response.data.message)
            setMembers(response.data.message.members)
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
    fetchMembers()
  },[path_id,user])

  return (
    <>
     <Header/>
      <Container className="projectMemberPage mt-4 mb-4">
        {load ?
        <Row>
          <Col md={4} className="projectMemberSidebarCenter">
            <ProjectSidebar projectdata={project} condUser={condUser}/>
          </Col>
          <Col md={8} className="mt-4">
            <h3 className="projectMemberTittle">MIEMBROS ACTUALES</h3>
            <Members projectmembers={members} condUser={condUser}/>
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
