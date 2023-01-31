import { useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import { Context } from '../../context/Context'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Loader from '../../components/loader/Loader'
import "./notification.css"
import {Container, Row, Col} from 'react-bootstrap'
import Notifications from '../../components/notification_components/notifications/Notifications'

export default function Notification() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  const [notifications, setNotifications] = useState([])
  
  const {user} = useContext(Context)
  const [load, setLoad] = useState(false)
  
  useEffect(()=>{
    const fetchNotifications = async ()=>{
      try{
        await api.get("/notifications/get-all-user/" + path_id + "/" + user.token)
        .then(response =>{
          setNotifications(response.data.message)
          setLoad(true)
        })
      }catch(err){
        window.location.replace("/error")
      }
    }
    fetchNotifications()
  },[path_id,user])

  return (
    <>
    <Header/>
      <Container className="notificationPage">
        {load ?
        <>
        <Row className="mt-4">
          <Col md={12}>
            <h3 className="notificationTitle">NOTIFICACIONES</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Notifications notifications={notifications}/>
          </Col>
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
