import { useContext, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import "./notification_cmp.css"
import {Row,Col,Card, Form, Button} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function NotificationCmp({notification}) {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]

  const [notiId, setNotiId] = useState("")
  const {user} = useContext(Context)

  const deleteNotification = async (e) =>{
    try{
      await api.delete("/notiications/delete",
      { headers: {
        Authorization: null
      },
      data: {
        token: user.token,
        notification_id: notiId,
        username_id: path_id
      }}
      ).then(response =>{
      })
    }catch(err){
      window.location.replace("/error")
    }
  }

  return (
    <Row className="notificationCmp mt-4">
      <Col lg={3} md={3} sm={6} className="p-0 m-0">
        <Card.Img style={{height:"150px"}} variant="top" src={notification.project_id?.image}/>
      </Col>
      <Col lg={9} md={9} sm={6}>
        <Row className="notificationCmpBorderDown">
          <Col lg={10} md={10} sm={6}>
            <h3>{notification.project_id?.name}</h3>
          </Col>
          <Col lg={2} md={2} sm={6} className="d-flex align-items-center justify-content-center">
            <Form onSubmit={deleteNotification} method="DELETE">
              <Button type="submit" variant="danger" value={notification._id} onClick={(e)=> setNotiId(e.target.value)}>Eliminar</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={6}>
            {
              notification.status ?  <h4>Su solicitud fue aceptada el {new Date(notification.date).toDateString()}</h4>
              : <h4>Su solicitud fue rchazada el {new Date(notification.date).toDateString()}</h4>
            }
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
