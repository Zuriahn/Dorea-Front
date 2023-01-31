import { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import Loader from '../../../components/loader/Loader'
import "./profile_job.css"
import ProfileSidebar from '../../../components/profile_sidebar/ProfileSidebar'
import Jobs from '../../../components/profile_components/jobs/Jobs'
import {Container, Row, Col} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function ProfileJob() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  const [profile, setProfile] = useState([])
  const [jobs, setJobs] = useState([])
  const {user} = useContext(Context)
  const [load, setLoad] = useState(false)

  const [condUser, setCondUser] = useState(false)

  useEffect(()=>{
    const fetchProfile = async ()=>{
      try{
        await api.get("/user/get-projects/" + path_id + "/" + user.token)
        .then(response =>{
          //Si el usuario no existe redireccionar a pagina de error
          if(response.data.message == null){
            window.location.replace("/error")
          }else{
            setProfile(response.data.message)
            setJobs(response.data.message.projects)
            //Si el usuario buscado es igual al usuario logeado activar condicion
            if(response.data.message.username == user.username){
              setCondUser(true)
            }
            setLoad(true)
          }
        })
      }catch(err){
        window.location.replace("/error")
      }
    }
    fetchProfile()
  },[path_id,user]) 

  return (
    <>
    <Header/>
        <Container fluid className="profileJob p-0">
          {load ?
          <Row className="p-0 m-0">
            <Col md={2} className="p-0">
              <ProfileSidebar profiledata={profile} condUser={condUser}/>
            </Col>
            <Col md={10} className="mt-2">
            <h3 className="profileJobTittle">PROYECTOS PARTICIPANDO</h3>
              <Jobs profilejobs={jobs} condUser={condUser}/>
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
