import "./homecard_cmp.css"
import { Card } from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function HomeCardCmp({project}) {
  return (
    <div className="mt-2 mb-4">
      <Card className="homeCardBody">
        <Card.Img style={{width:"100%", maxHeight:"300px"}}  variant="top" src={project.image}/>
        <Card.Body>
          <Card.Title> <Link to={`/presentation/${project._id}`} className="link homeCardCmp_a">{project.name}</Link> </Card.Title>
          <Card.Text>
            <p className="homeCardCmpDesc">
              {project.desc}
            </p>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {project.creator.username}
        </Card.Footer>
      </Card>
    </div>
  )
}
