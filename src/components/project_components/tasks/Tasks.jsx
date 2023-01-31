import TaskCmp from "../task_cmp/TaskCmp"
import "./tasks.css"
import {Container,Accordion} from 'react-bootstrap'

export default function Tasks({projecttasks}) {
  return (
    <>
    <Container fluid className="projectTaskFluidVertical">
      <Accordion>
        {projecttasks.map(t=>(
          <TaskCmp key={t._id} task={t}/>
        ))
        }
      </Accordion>
    </Container>
    </>
  )
}
