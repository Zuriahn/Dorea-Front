import TasksMemberCmp from "../tasksMember_cmp/TasksMemberCmp"
import "./tasksmember.css"
import {Container,Accordion} from 'react-bootstrap'

export default function TasksMember({projecttasksmember}) {
  return (
    <>
    <Container fluid className="projectTaskMemberFluidVertical">
        <Accordion>
            {projecttasksmember.map(t =>(
                <TasksMemberCmp  key={t._id} taskmember={t}/>
            ))
            }
        </Accordion>
    </Container>
    </>
  )
}
