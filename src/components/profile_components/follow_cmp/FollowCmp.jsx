import "./follow_cmp.css"
import {Card} from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function FollowCmp({follow}) {
  return (
    <div className="followCmp mt-2"> 
    <Card>
      <Card.Img width={'100%'} variant="top" src={follow.project_id.image} />
      <Card.Body>
        <Card.Title> <Link to={`/presentation/${follow.project_id._id}`} className="link follow_a">{follow.project_id.name}</Link></Card.Title>
        <Card.Text>
          {follow.project_id.desc}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}
