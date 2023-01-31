import {useState } from "react"
import axios from "axios"
import { Container, Row, Button, Image, Form, Col} from 'react-bootstrap'
import { Link } from "react-router-dom";
import "./register.css"
import registerImg1 from "./images/registerImg1.svg";
import registerImg2 from "./images/registerImg2.svg";

export default function Register() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const [objUser, setObjUser] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    image: null,
    desc: ""
  })

  const [isFetching, setIsFetching] = useState(false)
  const [err, setErr] = useState(false)
  const [errdesc, setErrdesc] = useState("")

  const registerUser = async (e) =>{
    e.preventDefault()
    setErr(false)
    setIsFetching(true)

    if(objUser.username == "" || objUser.name == "" || objUser.email == "" || objUser.password == "" || objUser.image == null){
      setErr(true)
      setIsFetching(false)
      setErrdesc("Error campos vacios o no validos")
    }else if(!objUser.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)){
      setErr(true)
      setIsFetching(false)
      setErrdesc("La contraseña debe ser mínimo 8 caracteres, una mayuscula, un número y un carácter especial")
    }else{

      try{
        await api.post("/user/register",
        objUser
        ).then(response =>{
          setIsFetching(false)
          window.location.replace("/login")
        })
        
      }catch(err){
        setErr(true)
        setIsFetching(false)
        setErrdesc(err.response.data.message)
      }

    }
  }

  const handleOnChangeInputs = (e) =>{
    const {name, value} = e.target

    setObjUser({
      ...objUser,
      [name]:value
    })
  }

  const uploadImageRegister = async (e) =>{
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    setObjUser({
      ...objUser,
      image:base64
    })
  }

  const convertBase64 = (file) =>{
    return new Promise((resolve,reject)=>{

      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = (()=>{
        resolve(fileReader.result)
      })

      fileReader.onerror = ((error)=>{
        reject(error)
      })
    })
  }

  return (
    <>
      <Container fluid className="register">
        <Row className="register">
          
          <Col lg={6} md={12} className="d-flex registerCenterPanel">
          <div className="registerBorder">
            <Form className="registerForm" onSubmit={registerUser} method="POST">
              <h2 className="text-center registerTittle">REGISTRARSE </h2>
              {
                objUser.image ? (              
                <Image roundedCircle className="registerImageForm" src={objUser.image}>
                </Image>)
                :
                (              
                <Image roundedCircle className="registerImageForm" src={registerImg1}>
                </Image>)                
              }
              
              <Form.Group className="mb-2" >
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control placeholder="Nombre de usuario" name="username"
                onChange={handleOnChangeInputs} />
              </Form.Group>
              <Form.Group className="mb-2" >
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control  placeholder="Nombre completo" name="name"
                onChange={handleOnChangeInputs} />
              </Form.Group>
              <Form.Group>
                  <Form.Label className="mb-2">Imagen de perfil</Form.Label>
                  <Form.Control type="file" onChange={(e) => uploadImageRegister(e)}></Form.Control>
                </Form.Group>
              <Form.Group className="mb-2" >
                <Form.Label>Descripción del perfil</Form.Label>
                <Form.Control as="textarea" rows={3} name="desc"
                onChange={handleOnChangeInputs} />
              </Form.Group>
              <Form.Group className="mb-2" >
                <Form.Label>Correo electronico</Form.Label>
                <Form.Control type="email"  placeholder="Correo electronico" name="email"
                onChange={handleOnChangeInputs} />
              </Form.Group>
              <Form.Group className="mb-4" >
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password"  placeholder="Contraseña" name="password"
                onChange={handleOnChangeInputs} />
              </Form.Group>

              <div className="text-center">
                <Button style={{ backgroundColor: "#6a46ad",
                                borderColor: "#6a46ad"}} 
                              type="submit"
                              disabled={isFetching}>
                  Confirmar
                </Button>
                {err && <span className="mt-2 d-block" style={{color:"red", maxWidth: "400px"}}>
                 {errdesc}
              </span>}
              </div>
            </Form>
            <div className="mb-4 text-center">
               <h5>Ya tienes una cuenta, ingresa <Link to="/login" className="link">aqui</Link> </h5>
            </div>
          </div>
          </Col>
          
          <Col lg={6} md={12} className="d-flex registerCenterPanel registerRightPanel">
            <Image className="registerImageBackground" src={registerImg2}></Image>
          </Col>

        </Row>
      </Container>
    </>

  )
}
