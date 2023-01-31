import TasksComCmp from "../tasksCom_cmp/TasksComCmp"
import "./taskscom.css"
import {Container,Accordion} from 'react-bootstrap'

export default function TasksInc({projecttaskscom}) {
  return (
    <>
    <Container fluid className="projectTaskComFluidVertical">
        <Accordion>
            {projecttaskscom.map(t =>(
                <TasksComCmp  key={t._id} taskCom={t}/>
            ))
            }
        </Accordion>
    </Container>
    </>
  )
}
