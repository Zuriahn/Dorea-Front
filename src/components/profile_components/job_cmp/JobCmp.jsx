import "./job_cmp.css"
import {Col, Container, Row, Image} from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function JobCmp({job, condUser}) {
  return (
    <div className='jobsCmp'>
      <Container fluid className='job_card pt-2 pb-2'>
        <Row>
          <Col lg={2} md={6} sm={6} align='center'>
            <Image src={job.image} rounded style={{width:'100%'}} />
          </Col>
          <Col lg={4} md={6} sm={6} className='job_name'>
            <h3 className='job_nameh3'>{job.name}
            <Link to={`/presentation/${job._id}`} className="link project_a"><i className="m-2 fa-solid fa-bars project_icon_adm"></i></Link>
            {condUser && <Link to={`/project/${job._id}/updates`} className="link project_a"><i className="m-2 fa-solid fa-arrow-right project_icon_adm"></i></Link>}
            </h3>
            <p><i className="fa-solid fa-star"></i>{job.nF}</p>
            {job.active ? <h6 style={{color:"green"}}>Proyecto Activo</h6> : <h6 style={{color:"red"}}>Proyecto Inactivo</h6>}
          </Col>
          <Col lg={2} md={6} sm={6} className='job_col'>
            <p>Miembros <i className="fa-solid fa-user"></i> {job.nM} </p>
          </Col>
          <Col lg={3} md={6} sm={6} className='job'>
            <p>Creado el {new Date(job.creation_date).toDateString()}</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
