import "./searchcard_cmp.css"
import { Card} from 'react-bootstrap'
import { Link } from "react-router-dom"

export default function SearchCardCmp({psearch}) {
  return (
    <div className="m-2">
      <Card>
        <Card.Img style={{width:"100%", maxHeight:"300px"}}   variant="top" src={psearch.image} />
        <Card.Body>
            <Card.Title> <Link to={`/presentation/${psearch._id}`} className="link searchCard_a"> {psearch.name} </Link> </Card.Title>
            <Card.Text>
              <p className="searchCardCmpDesc">
                {psearch.desc}
              </p>
            </Card.Text>
        </Card.Body>
        <Card.Footer>
            Por {psearch.creator?.username}
        </Card.Footer>
      </Card>
    </div>
  )
}
