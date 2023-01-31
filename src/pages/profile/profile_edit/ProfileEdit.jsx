import React,{ useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router"
import axios from "axios"
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import Loader from '../../../components/loader/Loader'
import "./profile_edit.css"
import ProfileSidebar from '../../../components/profile_sidebar/ProfileSidebar'
import {Container, Row, Col, Form, Button, Modal} from 'react-bootstrap'
import { Context } from '../../../context/Context'

export default function ProfileEdit() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]

  const [hideForm, setHideform] = useState(true)
  const [modalDeshabilitarCuenta, setmodalDeshabilitarCuenta] = React.useState(false);

  const [profile, setProfile] = useState([])
  const {user, dispatch} = useContext(Context)
  const [load, setLoad] = useState(false)

  const [isFetching, setIsFetching] = useState(false)
  const [err, setErr] = useState(false)
  const [errdesc, setErrdesc] = useState("")
  const [condUser, setCondUser] = useState(false)

  const [objUserEdit, setObjUserEdit] = useState({
    name: "",
    image: null,
    desc: "",
    token: user.token,
    username_id: path_id
  })
  const [objPasswords, setObjPasswords] = useState({
    actualPassword: "",
    newPassword: "",
    confirmPassword: "",
    token: user.token,
    username_id: path_id
  })
  const [condEditPass, setCondEditPass] = useState(false)
  const [successEditPass, setSuccessEditPass] = useState("")

  useEffect(()=>{
    const fetchProfile = async ()=>{
      try{
        await api.get("/user/" + path_id + "/" + user.token)
        .then(response =>{
          //Si el usuario no existe redireccionar a pagina de error
          if(response.data.message == null){
            window.location.replace("/error")
          }else{
            setProfile(response.data.message)
            //Si el usuario buscado es igual al usuario logeado activar condicion
            if(response.data.message.username == user.username){
              setCondUser(true)
            }
            setLoad(true)
          }
        })
      }catch(err){
        window.location.replace("/error")
      }
    }
    fetchProfile()
  },[path_id,user]) 

  function DeshabilitarCuentaModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Deshabilitar perfil
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Deshabilitar perfil hara que no puedas volver acceder a tu cuenta,
            los proyectos personales y asociados continuaran estando presentes.
            Si estas seguro de realizar esta acción continue.
          </p>
        </Modal.Body>
        <Modal.Footer className="m-auto">
          <Form onSubmit={deleteUser} method="PUT">
            <Button type="submit" variant="danger">Deshabilitar cuenta</Button>
          </Form>
        </Modal.Footer>
      </Modal>
    );
  }

  const editUser = async (e) =>{
    setIsFetching(true)

    try{
      await api.put("/user/edit",
      objUserEdit
      ).then(response =>{
        setIsFetching(false)
      })
    }catch(err){
      setIsFetching(false)
      window.location.replace("/error")
    }

  }

  const editPassword = async (e) =>{
    e.preventDefault()
    setErr(false)
    setIsFetching(true)

    if(objPasswords.actualPassword == "" || objPasswords.newPassword == "" || objPasswords.confirmPassword == ""){
      setErr(true)
      setIsFetching(false)
      setErrdesc("No puede haber campos vacios")
    }else if(objPasswords.newPassword !== objPasswords.confirmPassword){
      setErr(true)
      setIsFetching(false)
      setErrdesc("Las contraseñas no son iguales")
    }else if(!objPasswords.confirmPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)){
      setErr(true)
      setIsFetching(false)
      setErrdesc("La contraseña debe ser mínimo 8 caracteres, una mayuscula, un número y un carácter especial")
    }else{
      try{
        await api.put("/user/edit-password",
        objPasswords
        ).then(response =>{
          setCondEditPass(true)
          setSuccessEditPass("Contraseña actualizada correctamente")
          setIsFetching(false)
        })
      }catch(err){
        setErr(true)
        setIsFetching(false)
        setErrdesc(err.response.data.message)
      }
    }
  }

  const deleteUser = async (e) =>{
    e.preventDefault()
    const delUser = {
      token: user.token,
      username_id: path_id
    }

    try{
      await api.put("/user/delete",
      delUser
      )
      .then(response =>{
        dispatch({ type: "LOGOUT" })
        window.location.replace("/login")
      })
    }catch(err){
      window.location.replace("/error")
    }
  }

  const handleOnChangeUserEdit = (e) =>{
    const {name, value} = e.target

    setObjUserEdit({
      ...objUserEdit,
      [name]:value
    })
  }

  const handleOnChangeUserPass = (e) =>{
    const {name, value} = e.target

    setObjPasswords({
      ...objPasswords,
      [name]:value
    })
  }

  const uploadImageRegister = async (e) =>{
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    setObjUserEdit({
      ...objUserEdit,
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
    <Header/>
        <Container fluid className="profileEdit p-0">
          {load ?
          <Row className="p-0 m-0">
            <Col md={2} className="p-0">
                <ProfileSidebar profiledata={profile} condUser={condUser}/>
            </Col>
            <Col md={10} className="mt-2">
                <h3 className="profileEditTittle">PERFIL DATOS</h3>
                {
                  hideForm ?
                  <>
                    <Form onSubmit={editUser} method="PUT">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label><h4>Nombre de perfil</h4></Form.Label>
                      <Form.Control placeholder="Nombre de perfil" onChange={handleOnChangeUserEdit} name="name"/>
                      </Form.Group>

                      <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label><h4>Imagen de perfil</h4></Form.Label>
                      <Form.Control type="file" onChange={(e) => uploadImageRegister(e)} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label><h4>Descripción del perfil</h4></Form.Label>
                      <Form.Control as="textarea" rows={3} onChange={handleOnChangeUserEdit} name="desc"/>
                      </Form.Group>
                      <Button
                          style={{ backgroundColor: "#6a46ad",
                          borderColor: "#6a46ad"}}
                          type="submit"
                          disabled={isFetching}>
                          Actualizar datos
                      </Button>
                      <Button onClick={() => setmodalDeshabilitarCuenta(true)} variant="danger" className="m-2">
                          Deshabilitar perfil
                      </Button>
                      <Button variant="info" onClick={() => setHideform(false)}>
                          Cambiar a contraseña
                      </Button>
                    </Form>
                  </>
                  :
                  <>
                  <Form onSubmit={editPassword} method="PUT">
                      <Form.Group className="mb-3">
                      <Form.Label><h4>Contraseña actual</h4></Form.Label>
                      <Form.Control type="password" onChange={handleOnChangeUserPass} name="actualPassword" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                      <Form.Label><h4>Nueva contraseña</h4></Form.Label>
                      <Form.Control type="password" onChange={handleOnChangeUserPass} name="newPassword" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                      <Form.Label><h4>Confirmar nueva contraseña</h4></Form.Label>
                      <Form.Control type="password" onChange={handleOnChangeUserPass} name="confirmPassword" />
                      </Form.Group>
                      <Button
                          style={{ backgroundColor: "#6a46ad",
                          borderColor: "#6a46ad"}}
                          type="submit"
                          disabled={isFetching}>
                          Actualizar contraseña
                      </Button>
                  </Form>
                  {err && <span className="mt-2 d-block" style={{color:"red"}}>{errdesc}</span>}
                  {condEditPass && <span className="mt-2 d-block" style={{color:"green"}}>{successEditPass}</span>}
                  <Button className="mt-4" variant="info" onClick={() => setHideform(true)}>
                          Cambiar a datos
                  </Button>
                  </>
                }
                <DeshabilitarCuentaModal
                    show={modalDeshabilitarCuenta}
                    onHide={() => setmodalDeshabilitarCuenta(false)}/>
            </Col>
          </Row>
          :
          <Loader/>
          }
        </Container>
    <Footer/>
    </>
  )
}
