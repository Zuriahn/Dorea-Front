import "./searchcard.css"
import { Container, Row, Col } from 'react-bootstrap'
import SearchCardCmp from '../searchcard_cmp/SearchCardCmp'

export default function SearchCard({projectsearch}) {
  return (
    <>
    <Container fluid>
      <Row>
        {projectsearch.map(s=>(
          <Col lg={4} md={6} sm={12} key={s._id}>
            <SearchCardCmp key={s._id} psearch={s}/>
          </Col>
        ))
        }
      </Row>
    </Container>
    </>
  )
}
