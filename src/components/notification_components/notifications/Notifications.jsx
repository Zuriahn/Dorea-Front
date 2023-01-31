import "./notifications.css"
import {Container} from 'react-bootstrap'
import NotificationCmp from '../notification_cmp/NotificationCmp'

export default function Notifications({notifications}) {
  return (
    <>
    <Container className="mt-3 mb-3 notifications">
      {notifications.map(n=>(
        <NotificationCmp key={n._id} notification={n}/>
      ))
      }
    </Container>
    </>
  )
}
