import "./follows.css"
import FollowCmp from '../follow_cmp/FollowCmp'
import {Container, Row, Col} from 'react-bootstrap'

export default function Follows({profilefollows}) {
  return (
    <>
      <Container fluid className="follows">
        <Row>
          {profilefollows.map(f=>(
          <Col lg={3} md={6} sm={12} key={f._id}>
            <FollowCmp key={f._id} follow={f}/>
          </Col>
          ))
          }
        </Row>
      </Container>
    </>
  )
}
