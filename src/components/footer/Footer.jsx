import "./footer.css"
import { Col, Container, Row} from 'react-bootstrap';

export default function Footer() {
  return (
    <>
    <Container fluid className="footer">
      <Row className="d-flex text-center">
        <div className="mt-2 footerBorder">
          <Col md={12}>
            <h3 className="footerTittle">Dorea 2022 <i className="fa-solid fa-copyright"></i> </h3>
          </Col>
        </div>
      </Row>
      <Row className="d-inline text-center">
        <Col md={12} >
          <i className="footerIcon fab fa-facebook-square"></i>
          <i className="footerIcon fab fa-twitter-square"></i>
          <i className="footerIcon fab fa-instagram-square"></i>
        </Col>
      </Row>    
    </Container>
    </>
  )
}
