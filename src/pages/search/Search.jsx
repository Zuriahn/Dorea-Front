import { useContext,useEffect, useState } from 'react'
import axios from "axios"
import { Context } from '../../context/Context'
import { useLocation } from "react-router"
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Loader from '../../components/loader/Loader'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import SearchCard from '../../components/search_components/searchcard/SearchCard'
import "./search.css"

export default function Search() {
  const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [userProject, setUserProject] = useState("")

  const location = useLocation()
  const [cats, setCats] = useState([]);
  const [users, setUsers] = useState([])
  const {user} = useContext(Context)
  const [load, setLoad] = useState(false)

  const [getSearchProject, setGetSearchProject] = useState([])
  const [err, setErr] = useState(true)
  const [errdesc, setErrdesc] = useState("")

  useEffect(() => {
    const getProjectSearch = async () =>{
      setErr(false)
      try{
        const getCats = api.get("/category/get-all/" + user.token)
        const getUsers = api.get("/user/get-creators/list/" + user.token)
        const getSearch = api.get("/project/search/" + user.token + "/" + location.search)

        await Promise.all([getCats,getUsers,getSearch])
        .then(response =>{
          setCats(response[0].data.message)
          setUsers(response[1].data.message)
          setGetSearchProject(response[2].data.message)
          setLoad(true)
        })

      }catch(err){
        setErr(true)
        setLoad(true)
        setErrdesc(err.response.data.message)
      }
    }

    getProjectSearch()
  }, [location,user]);

  const searchProject = async (e) =>{
    e.preventDefault()
    window.location.replace("/search?title="+title+"&category="+category+"&user="+userProject);
  }

  return (
    <>
    <Header/>
      <Container className="searchPage">
        {load ?
        <Row> 
        <Col  md={12} > 
          <h1 className="searchTittle">Buscador</h1>
          <Row>
              <Form className="d-flex" onSubmit={searchProject} method="GET"> 

                <Col className="m-1" md={6}>
                  <h3 className="searchQuestions">Título</h3>
                  <Form.Control type="text" onChange={(e) =>setTitle(e.target.value)} placeholder="Juegos..."></Form.Control>
                </Col>

                <Col className="m-1" md={3}>
                  <h3 className="searchQuestions">Categoria</h3>
                  <Form.Select aria-label="Default select example" value={category} onChange={e=>setCategory(e.target.value)}>
                  <option  value="">Seleccione una categoria</option>
                      {
                          cats.map((c)=>(
                            <option key={c._id} value={c._id} >{c.name}</option>
                          ))
                      }
                  </Form.Select>
                </Col>

                <Col className="m-1" md={3} >
                  <h3 className="searchQuestions">Creador</h3>

                  <div className="d-flex">
                  <Form.Select aria-label="Default select example" value={userProject} onChange={e=>setUserProject(e.target.value)}>
                  <option  value="">Seleccione un usuario</option>
                      {
                          users.map((u)=>(
                            <option key={u._id} value={u._id} >{u.username}</option>
                          ))
                      }
                  </Form.Select>
                    <Button type="submit" className="searchButton" 
                            style={{ backgroundColor: "#6a46ad",
                                  borderColor: "#6a46ad",
                                  fontSize: "1.1rem"}}>
                    Buscar</Button>
                  </div>
                </Col>

              </Form>
          </Row>
        </Col>
        <Col md={12} >
          <h1 className="searchSeparator">Proyectos encontrados</h1>    
          {err && <span className="mt-2 d-block" style={{color:"red"}}>{errdesc}</span>}
          <SearchCard projectsearch={getSearchProject}/>
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
