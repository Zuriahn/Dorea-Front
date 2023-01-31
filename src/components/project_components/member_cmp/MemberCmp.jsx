import { useContext, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import "./member_cmp.css"
import {Container, Row, Col, Image, Form, Button} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Context } from '../../../context/Context'

export default function MemberCmp({member,condUser}) {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  const {user} = useContext(Context)

  const [memberDelete, setMemberDelete] = useState(false)
  const [memberId, setMemberId] = useState("")

  const delMember = async (e) =>{
    const deleteMember = {
      token: user.token,
      userid: memberId,
      project_id: path_id
    }

    try{
      await api.put("/project/delete-member",
      deleteMember
      ).then(response =>{
      })
    }catch(err){
      window.location.replace("/error")
    }
  }

  return (
    <Container className="p-0">
      <Row className="p-4">

        <Col md={3} className="m-0 p-0 d-flex align-items-center justify-content-center">
          <Image  src={member.image} thumbnail   className="memberCmpImage"></Image>
        </Col>
        
        <Col md={5} className="d-flex align-items-center justify-content-center">
          <div>

            <Link to={`/profile/${member._id}`} className="link" style={{color:"black"}}> <h4 className="">{member.name} </h4></Link>
            <h6 className="">{member.email}</h6>
            {member.active ? <h6 style={{color:"green"}}>Miembro Activo</h6> : <h6 style={{color:"red"}}>Miembro Inactivo</h6>}
          </div>
        </Col>
        <Col md={4} className="d-flex align-items-center justify-content-center">
          {condUser &&
          <>
            {
              memberDelete ?
              <>
              <Form onSubmit={delMember} method="PUT">
                  <Button type="submit" variant="danger" className="m-1" value={member._id} onClick={(e) => setMemberId(e.target.value)}>Confirmar</Button>
                  <Button variant="info" className="m-1" onClick={() => setMemberDelete(false)}>Cancelar</Button>
              </Form>
              </>
              :
              <Button variant="danger" className="m-4" onClick={() => setMemberDelete(true)}>Eliminar</Button>
            }
          </>           
          }
        </Col>
        
      </Row>
    </Container> 
  )
}
