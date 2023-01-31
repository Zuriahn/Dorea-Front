import "./loader.css"
import {Spinner} from 'react-bootstrap'

export default function Loader() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: "75vh"}}>
        <div className="loaderPage"> 
            <span>Cargando...</span>
            <Spinner className="d-flex align-items-center justify-content-center" animation="border" role="status">
            </Spinner>
        </div>
    </div>
  )
}
