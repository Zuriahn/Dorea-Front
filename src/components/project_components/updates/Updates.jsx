import UpdateCmp from "../update_cmp/UpdateCmp"
import "./updates.css"
import {Container} from 'react-bootstrap'

export default function Updates({projectupdates,condUser}) {
  return (
    <>
    <Container fluid className="updates">
      {projectupdates.map(u=>(
          <UpdateCmp key={u._id} update={u} condUser={condUser}/>
        ))
      }
    </Container>
    </>
  )
}
