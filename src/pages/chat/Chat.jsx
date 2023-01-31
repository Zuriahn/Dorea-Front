import { useContext,useEffect, useState } from 'react'
import axios from "axios"
import { Context } from '../../context/Context'
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Loader from '../../components/loader/Loader'
import { Container, Row, Col, Button, Form, Image} from 'react-bootstrap'
import "./chat.css"

export default function Chat() {
const api = axios.create({  baseURL: 'https://dorea-api.herokuapp.com/api' || "http://localhost:3030/", });
const [message, setMessage] = useState("")
const location = useLocation()

const [userToChat, setUserToChat] = useState([])
const [chatId, setChatId] = useState("")
const [isChat, setIsChat] = useState(false)
const [userNameChat, setUserNameChat] = useState("")
const [usersFound, setUsersFound] = useState([])
const [userSearch, setUserSearch] = useState("")
const {user} = useContext(Context)
const [load, setLoad] = useState(false)

const [isFetching, setIsFetching] = useState(false)
const [err, setErr] = useState(false)
const [errdesc, setErrdesc] = useState("")

useEffect(() =>{
    const getUser = async () =>{
        try{
            await api.get("/chat/search/"+user.token+"/"+location.search)
            .then(response =>{
                //Si el usuario activo encuentra un usuario y existe
                if(response.data.message != null){
                    setIsChat(true)
                    setUserNameChat(response.data.message.username)

                    //Llama si existe un chat ya previo sino creara uno
                    api.get("/chat/get-chat/"+response.data.message._id+"/"+user.token)
                    .then(response =>{
                        setChatId(response.data.message)

                        //Obtiene los mensajes de dicho chat
                        api.get("/chat/get-messages/"+response.data.message+"/"+user.token).
                        then(response =>{
                            setUserToChat(response.data.message.messages)
                        })
                    })
                    
                }
                setLoad(true)
            })
        }catch(err){
            window.location.replace("/error")
        }
    }
    getUser()
},[location,user])

const searchUser = async (e) =>{
    e.preventDefault()
    setErr(false)
    setIsFetching(true)

    try{
        await api.get("/chat/user-find/"+user.token+"/"+userSearch)
        .then(response =>{
            setUsersFound(response.data.message)
            setIsFetching(false)
        })
    }catch(err){
        setErr(true)
        setIsFetching(false)
        setErrdesc(err.response.data.message)
    }
}

const doMessage = async (e) =>{
    e.preventDefault()
    setErr(false)
    setIsFetching(true)

    if(message == ""){
        setErr(true)
        setIsFetching(false)
        setErrdesc("No puedes enviar un mensaje vacio")
    }else{
        const bodymessage ={
            token: user.token,
            messg: message,
            idchat:chatId
        }
    
        try{
            await api.put("/chat/create-message",
                bodymessage
            ).then(response =>{
                setUserToChat(response.data.message.messages)
                setIsFetching(false)
            })
        }catch(err){
            setErr(true)
            setIsFetching(false)
            setErrdesc(err.response.data.message)
        }
    }
}

  return (
    <>
    <Header/>
        <Container className="chatPage">
            {load ? 
            <Row>
                <Col lg={4} md={6} sm={12} className="chatBorder mt-2 mb-2">
                    <h4 className="chatTittle">Buscar nombre de usuario</h4>
                    <div className="d-flex">
                        <Form className="d-flex" onSubmit={searchUser} method="GET">
                            <Form.Control type="text" onChange={(e) => setUserSearch(e.target.value)}></Form.Control>
                            <Button type="submit" className="chatBtnSearch" 
                                style={{ backgroundColor: "#6a46ad",
                                borderColor: "#6a46ad"}} disabled={isFetching}>Buscar</Button>
                        </Form>
                    </div>
                    <Container fluid className="mt-4 chatUsersContainer">
                        <Row>
                        {usersFound.map(f =>(
                            <div className="mt-4 d-flex chatUserFound" key={f._id}>
                                <Col md={3} className="m-2 p-0 d-flex align-items-center justify-content-center">
                                    <Image  src={f.image} thumbnail className="chatUserImage"></Image>
                                </Col>
                                <Col md={9} className="d-flex align-items-center">
                                    <div>
                                    <Link to={`/chats?user=${f.username}`} className="link" style={{color:"black"}}> <h5 className="m-2 p-0 ">{f.username}</h5> </Link>
                                    </div>
                                </Col>
                            </div>
                        ))
                        }
                        </Row>
                    </Container>
                </Col>
                <Col lg={8} md={6} sm={12} className="mt-2 mb-2">
                    {isChat &&
                    <>
                        <h3 className="chatUser">{userNameChat}</h3>
                        <Container className="border border-dark rounded chatContainer">
                            {userToChat.map(m =>(
                                <>
                                {
                                    m.username_id == user.id ?       
                                    <div className="chatUserRight" key={m.id}>
                                        <h1 className="chatTextRight">{m.desc}</h1>
                                        <h6>{new Date(m.date).toDateString()}</h6>
                                    </div>
                                    :
                                    <div className="chatUserLeft" key={m.id}>
                                        <h1 className="chatTextLeft">{m.desc}</h1>
                                        <h6>{new Date(m.date).toDateString()}</h6>
                                    </div>
                                }
                                </>
                            ))
                            }
                        </Container>
                        <Form className="d-flex m-2" onSubmit={doMessage} method="PUT">
                            <div className="d-flex w-100">
                            <Form.Control type="text" onChange={(e) =>setMessage(e.target.value)}></Form.Control>
                            <Button type="submit" className="chatBtnSearch"                           
                                    style={{ backgroundColor: "#6a46ad",
                                    borderColor: "#6a46ad"}} disabled={isFetching}>Enviar</Button>
                            </div>
                        </Form>
                    </>
                    }
                    {err && <span className="mt-2 d-block" style={{color:"red"}}>{errdesc}</span>}
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
