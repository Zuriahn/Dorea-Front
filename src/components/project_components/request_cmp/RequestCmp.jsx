import {useContext} from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import { Context } from '../../../context/Context'
import "./request_cmp.css"
import {Container, Row, Col, Image, Form, Button} from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function RequestCmp({application}) {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  const {user} = useContext(Context)

  const applicationAnswerTrue = async (e) =>{
      let eAppId = e.split("/")[0]
      let eUserId = e.split("/")[1]
      try{
          await api.delete("/applications/delete",
          {
              headers: {
                Authorization: null
              },
              data: {
                token: user.token,
                userid: eUserId,
                application_id: eAppId,
                status: true,
                project_id: path_id
              }
            }
          ).then(response =>{
              
          })
      }catch(err){
        window.location.replace("/error")
      }
  }

  const applicationAnswerFalse = async (e) =>{
      let eAppId = e.split("/")[0]
      let eUserId = e.split("/")[1]
      try{
          await api.delete("/applications/delete",
          {
              headers: {
                Authorization: null
              },
              data: {
                token: user.token,
                userid: eUserId,
                application_id: eAppId,
                status: false,
                project_id: path_id
              }
            }
          ).then(response =>{
              
          })
      }catch(err){
        window.location.replace("/error")
      }
  }

  return (
    <Container>
        <Row >
            <Col className="mt-4">
                <Row>
                    <Col md={3} className="d-flex align-items-center justify-content-center">
                        <Image thumbnail  className="requestCmpImage" src={application.username_id.image}></Image>
                    </Col>
                    <Col md={6} className="d-flex align-items-center justify-content-center">
                    <Link to={`/profile/${application.username_id._id}`} className="link" style={{color:"black"}}> <h5 >{application.username_id.name}</h5></Link>
                    </Col>
                    <Col md={3} className="d-flex align-items-center justify-content-center">
                    <Form method="DELETE">
                        <Button type="submit"              
                                style={{ backgroundColor: "#6a46ad",
                                borderColor: "#6a46ad"}} 
                                className="w-50 m-1"
                                onClick={(e)=> applicationAnswerTrue(e.target.value)}
                                value={application._id + "/" + application.username_id._id}>Aceptar</Button>
                        <Button type="submit" 
                                variant="danger" 
                                className="w-50 m-1" 
                                onClick={(e)=> applicationAnswerFalse(e.target.value)}
                                value={application._id + "/" + application.username_id._id}>Rechazar</Button>
                    </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>  
  )
}
