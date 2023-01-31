import {useContext, useEffect, useState } from 'react'
import axios from "axios"
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Loader from '../../components/loader/Loader'
import "./project_creation.css"
import {Button, Form, Container, Row, Col, Image} from 'react-bootstrap'
import { Context } from '../../context/Context'

export default function ProjectCreation() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const {user} = useContext(Context)
  const [load, setLoad] = useState(false)
  const [objProject, setObjProject] = useState({
    name: "",
    desc: "",
    image: null,
    category: "",
    token: user.token
  })

  const [cats, setCats] = useState([]);

  const [isFetching, setIsFetching] = useState(false)
  const [err, setErr] = useState(false)
  const [errdesc, setErrdesc] = useState("")

  useEffect(() => {
    const getCats = async () => {
      try{
        await api.get("/category/get-all/" + user.token)
        .then(response =>{
          setCats(response.data.message);
          setLoad(true)
        })
      }catch(err){
        window.location.replace("/error")
      }
    }
    getCats()
  }, [])

  const createProject = async (e) =>{
    e.preventDefault();
    setErr(false)
    setIsFetching(true)

    if(objProject.name == "" || objProject.desc == "" || objProject.image == null || objProject.category == ""){
      setErr(true)
      setIsFetching(false)
      setErrdesc("Error campos vacios o no validos")
      console.log(objProject)
    }else{

      try{
        await api.post("/project/create", 
        objProject
        ).then(response =>{
          setIsFetching(false)
          window.location.replace("/presentation/" + response.data.message)
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

    setObjProject({
      ...objProject,
      [name]:value
    })
  }

  const uploadImageCreateProject = async (e) =>{
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    setObjProject({
      ...objProject,
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
      <Container className="projectCreationPage mt-4">
        {load ?
        <>
        <h2 className="projectCreationTittle">Crear proyecto</h2>
        <Row className='mt-4'>
          <Form className="m-auto" onSubmit={createProject} method="POST">
            <Col md={12}>
              {objProject.image && (
                <Image className="projectCreateImage w-100" src={objProject.image}></Image>
              )}
            </Col>
            <Col md={12} className='m-auto mt-2'>
                <Form.Group>
                  <Form.Label className="mt-2 projectCreateLabels">Título del proyecto</Form.Label>
                  <Form.Control type="text" placeholder="Ingresar título" onChange={handleOnChangeInputs} name="name"></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mt-2 projectCreateLabels">Imagen de presentación</Form.Label>
                  <Form.Control type="file" onChange={(e) => uploadImageCreateProject(e)}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mt-2 projectCreateLabels">Descripción del proyecto</Form.Label>
                  <Form.Control as="textarea" rows="6" placeholder="Ingresar descripción" onChange={handleOnChangeInputs} name="desc"></Form.Control>
                </Form.Group>
                <Form.Label className="mt-2 projectCreateLabels">Categoria del proyeto</Form.Label>
                <Form.Select aria-label="Default select example" onChange={handleOnChangeInputs} name="category">
                <option  value="">Seleccione una categoria</option>
                    {
                        cats.map((c)=>(
                          <option key={c._id} value={c._id} >{c.name}</option>
                        ))
                    }
                </Form.Select>
                <Row className='m-4 text-center' >
                  <Col lg={3} className='m-auto'>
                    <Button style={{ backgroundColor: "#6a46ad",
                            borderColor: "#6a46ad",
                            fontSize: "1.1rem"}} 
                       type="submit"
                       disabled={isFetching} >
                      Crear proyecto</Button>
                  </Col>
                  {err && <span className="mt-2 d-block" style={{color:"red"}}>
                    {errdesc}
                  </span>}
                </Row>
            </Col>
          </Form>
        </Row> 
        </>
        :
        <Loader/>
        }
      </Container>
    <Footer/>
    </>
  )
}
