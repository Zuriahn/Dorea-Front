import { useContext, useEffect, useState} from 'react'
import axios from "axios"
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import {Container, Row, Col} from 'react-bootstrap'
import HomeCard from '../../components/home_components/homecard/HomeCard'
import Loader from '../../components/loader/Loader'
import "./home.css"
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

export default function Home() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const [projects, setProjects] = useState([])
  const [projectsFeatured, setProjectsFeatured] = useState([])
  const {user} = useContext(Context)
  const [load, setLoad] = useState(false)

  useEffect(() =>{
    const fetchProjects = async ()=>{
      try{
        const getProjectHome = api.get("/project/get-home/" + user.token)
        const getProjectFeatured = api.get("/project/get-home-featured/" + user.token)
        await Promise.all([getProjectHome,getProjectFeatured])
        .then(response =>{
          setProjects(response[0].data.message)
          setProjectsFeatured(response[1].data.message)
          setLoad(true)
        })
      }catch(err){
        window.location.replace("/error")
      }
    }
    fetchProjects()
  },[user])

  return (
    <>
    <Header/>
      <Container fluid className="homePage">
        {load ?
        <>
        <Row>
          <Col md={12} className="p-0">
          <div className="homeFront mb-4">
            <h1 className="homeTitleLg">Bienvenido a Dorea</h1>
            <h3 className="homeTitleSm">Inicia proyectos personales y unete a una comunidad de creadores</h3>
             <Link to="/create" className="link mt-2 p-2 rounded"                 
                style={{ backgroundColor: "#6a46ad",
                borderColor: "#6a46ad",
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "white"}}>¡Iniciar Proyecto!</Link>
          </div>
          </Col>
        </Row>

        <Container>
        <Row>
          <Col md={12}>
            <h1 className="homeSeparator mt-4">Nuevos Proyectos</h1>      
            <HomeCard projects={projects}/>
          </Col>
          
          <Col md={12}>
            <h1 className="homeSeparator mt-4">Proyectos mas seguidos</h1>      
            <HomeCard projects={projectsFeatured}/>
          </Col>
        </Row>
        </Container>
        </>
        :
        <Loader/>
        }
      </Container>
    <Footer/>
    </>
  )
}
