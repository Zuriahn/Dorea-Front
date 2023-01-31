import { useContext, useRef, useState } from 'react'
import axios from "axios"
import { Container, Row, Button, Image, Form, Col} from 'react-bootstrap'
import { Link } from "react-router-dom";
import "./login.css"
import loginImg1 from "./images/loginImg1.svg";
import loginImg2 from "./images/loginImg2.svg";
import { Context } from '../../context/Context';

export default function Login() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const {dispatch, isFetching} = useContext(Context)
  const userRef = useRef()
  const passwordRef = useRef()
  const [err, setErr] = useState(false)
  const [errdesc, setErrdesc] = useState("")

  const loginSubmit = async (e) =>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try{
      await api.post("/user/login",
      {
        username: userRef.current.value,
        password: passwordRef.current.value
      }).then(response =>{
        dispatch({type:"LOGIN_SUCCESS", payload: response.data})
      })
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"})
      setErr(true)
      setErrdesc(err.response.data.message)
    }
  }
  
  return (
    <>
      <Container fluid className="login">
        <Row className="login">
          
          <Col lg={6} md={12} className="d-flex loginCenterPanel loginRightPanel">
            <Image className="loginImageBackground" src={loginImg2}></Image>
          </Col>

          <Col lg={6} md={12} className="d-flex loginCenterPanel">
          <div className="loginBorder">
            <Form className="loginForm" onSubmit={loginSubmit} method="POST">
              <h2 className="mb-4 text-center loginTittleDorea">BIENVENIDO A DOREA</h2>
              <h3 className="mt-4 text-center loginTittle">INGRESAR</h3>
              <Image className="mt-4 loginImageForm" src={loginImg1}></Image>

              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control placeholder="Usuario" ref={userRef} />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password"  placeholder="Contraseña" ref={passwordRef} />
              </Form.Group>

              <div className="mt-4 mb-4 text-center">
                <Button style={{ backgroundColor: "#6a46ad",
                        borderColor: "#6a46ad"}} 
                        type="submit"
                        disabled={isFetching}>
                  Entrar
                </Button>
                {err && <span className="mt-4 d-block" style={{color:"red"}}>
                 {errdesc}
              </span>}
              </div>
            </Form>
            <div className="mb-4 text-center">
               <h5>Aun no tienes una cuenta, registrate <Link to="/register" className="link">aqui</Link></h5>

            </div>
          </div>
          </Col>
          
        </Row>
      </Container>
    </>
  )
}
