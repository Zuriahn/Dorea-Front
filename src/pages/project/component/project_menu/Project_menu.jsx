import React from 'react'
import "./project_menu.css"

import {Container, Image, ListGroup} from 'react-bootstrap'

export default function Project_menu() {
  return (
    <>

    
   <Container className='ProjectMenu'>
      <Image fluid src='https://picsum.photos/250/250'></Image>
      <Container className='m-auto'><h6>Categoría</h6></Container>
      <ListGroup>
        <ListGroup.Item action href='http://localhost:3000/Project_Main'>Principal</ListGroup.Item>
        <ListGroup.Item action href='http://localhost:3000/Project_Task'>Tareas</ListGroup.Item>
        <ListGroup.Item action href='http://localhost:3000/Project_Request'>Solicitudes</ListGroup.Item>
        <ListGroup.Item action href='http://localhost:3000/Project_Member'>Comunidad</ListGroup.Item>
      </ListGroup>
    </Container>
         
    </>
  )
}
