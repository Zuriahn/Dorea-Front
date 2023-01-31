import "./myprojects.css"
import MyprojectCmp from '../myproject_cmp/MyprojectCmp'
import {Container} from 'react-bootstrap'

export default function Myprojects({profilemyprojects,condUser}) {
  return (
    <>
    <Container fluid className="mt-1 myprojects">
      {profilemyprojects.map(p=>(
          <MyprojectCmp key={p._id} my_project={p} condUser={condUser}/>
      ))
      }
    </Container>
    </>
  )
}
