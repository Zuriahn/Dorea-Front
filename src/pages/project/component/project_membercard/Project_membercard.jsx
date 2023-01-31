import React from 'react'
import "./project_membercard.css"

import {Button, Alert, Card, Form, Container, Row, Col, InputGroup, Image, ListGroup} from 'react-bootstrap'

export default function Project_membercard() {
  return (
    <>
    <Container className='p_membercard p-0'>
      <Row className='p-2'>
        <Col lg={3}>
        <Image  src='https://picsum.photos/800/507' className='profilepicture'></Image></Col>
        
        <Col lg={9}><h6>Nombre</h6>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></Col>
        
      </Row>
    </Container> 
    </>
  )
}
