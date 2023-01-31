import { Container } from 'react-bootstrap'
import "./error.css"
import Img from "./error.png"

export default function Error() {
  return (
    <div className='error'>
        <Container className='error_content'>
            <img src={Img} alt="" width={'300px'}/>
            <h1 className='error_h1'>Lo sentimos,</h1>
            <h1 className='error_h1'>Página no encontrada!</h1>
        </Container>
    </div>
  )
}
