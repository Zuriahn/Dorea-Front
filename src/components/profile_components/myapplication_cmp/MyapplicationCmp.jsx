import "./myapplication_cmp.css"
import {Card} from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function MyapplicationCmp({job}) {
  return (
    <div className='myapplicationsCmp mt-2'>
        <Card >
          <Card.Img width={'100%'} variant="top" src={job.project_id.image} />
          <Card.Body>
            <Card.Title className='application_card_title'><Link to={`/presentation/${job.project_id._id}`} className="link application_a"> {job.project_id.name}</Link></Card.Title>
            <Card.Text className='application_card'>
              Estatus: En espera
            </Card.Text>
          </Card.Body>
        </Card>
    </div>
  )
}
