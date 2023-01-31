import "./myproject_cmp.css"
import {Col, Container, Row, Image} from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function MyprojectCmp({my_project, condUser}) {
  return (
    <div className='myprojectscmp'>
      <Container fluid className='myproject_card pt-2 pb-2'>
        <Row>
          <Col lg={2} md={6} sm={6} align='center'>
            <Image src={my_project.image} rounded style={{width:'100%', maxHeight:"350px"}} />
          </Col>
          <Col lg={4} md={6} sm={6} className='project_name'>
            <h3 className='project_nameh3'>{my_project.name} 
            <Link to={`/presentation/${my_project._id}`} className="link project_a"><i className="m-2 fa-solid fa-bars project_icon_adm"></i></Link>
            {condUser && <Link to={`/project/${my_project._id}/updates`} className="link project_a"><i className="m-2 fa-solid fa-arrow-right project_icon_adm"></i></Link>}
            </h3>
            {condUser && <p><i className="fa-solid fa-star"></i> {my_project.nF}</p>}
            {my_project.active ? <h6 style={{color:"green"}}>Proyecto Activo</h6> : <h6 style={{color:"red"}}>Proyecto Inactivo</h6>}
          </Col>
          <Col lg={2} md={6} sm={6} className='mt-2 project_col_info'>
            {condUser && 
            <div className='project_info'>
                <p>Solicitudes <i className="fa-solid fa-user-plus"></i> {my_project.nA}</p>
            </div>
            }
           <div className='project_info'>
              <p>Comunidad <i className="fa-solid fa-user"></i> {my_project.nM}</p>
           </div>
          </Col>
          <Col lg={3} md={6} sm={6} className='project_info'>
            <p>Creado el {new Date(my_project.creation_date).toDateString()}</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
