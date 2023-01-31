import "./projects_cmp.css"
import { Container, Row, Col, Button, Tab, Tabs} from 'react-bootstrap'
import CardJob from "../jobs/Jobs"
import CardMyproject from "../myprojects/Myprojects"

export default function Projects_Cmp() {
  return (
    <div className='projects_cmp'>
      <Container fluid>
        <Row>
          <Col md={'10'}>
            <h1 className='projects_h1 mt-2 mb-3'>Proyectos</h1>
          </Col>
          <Col md={'2'} className='d-flex justify-content-end  mb-2'>
            <Button className='projects_create'>Crear Proyecto</Button>
          </Col>
          <Col md={'12'}>
            <h2 className='projects_line'></h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tabs defaultActiveKey="myproject" transition={false} className='projects_tabs'>
              <Tab eventKey="myproject" title={<span className='projects_tab_title'>Personales</span>}>          
                <CardMyproject/>
              </Tab>
              <Tab eventKey="job" title={<span className='projects_tab_title'>Colaborando</span>}>
                <CardJob/>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
