import { Container, Row, Col } from 'react-bootstrap'
import HomeCardCmp from '../homecard_cmp/HomeCardCmp'
import "./homecard.css"

export default function HomeCard({projects}) {
  return (
    <>
    <Container fluid>
      <Row>
      {projects.map(p=>(
        <Col lg={4} md={6} sm={12} key={p._id}> 
          <HomeCardCmp key={p._id} project={p}/>
        </Col>
      ))
      }
      </Row>
    </Container>
    </>
  )
}
