import React from 'react'
import "./myapplications.css"
import MyapplicationCmp from '../myapplication_cmp/MyapplicationCmp'
import {Container, Row, Col} from 'react-bootstrap'

export default function Myapplications({profileapplications}) {
  return (
    <>
      <Container fluid className="myapplications">
        <Row>
          {profileapplications.map(a=>(
          <Col  lg={3} md={6} sm={12} key={a._id}>
            <MyapplicationCmp key={a._id} job={a}/>
          </Col>
          ))
          }
        </Row>
      </Container>
    </>
  )
}
