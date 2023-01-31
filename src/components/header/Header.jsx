import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import "./header.css"
import {Container, Row, Col, Form, Button, Dropdown} from 'react-bootstrap';

export default function Header() {
  const { user, dispatch } = useContext(Context);
  const [title, setTitle] = useState("")
  
  const searchSubmit = async (e) =>{
    e.preventDefault();
    window.location.replace("/search?title="+title);
  }

  const Logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <>
    <Container fluid className="m-0 p-0 header">
     <Row className="w-100">
       <Col md={3} sm={12}>
          <Form className="d-flex w-100" onSubmit={searchSubmit} method="GET">
            <Form.Control className="w-75 headerSearchButton" type="search" onChange={(e)=>setTitle(e.target.value)}/>
            <Button type="submit" className="headerSearchIcon"><i className="headerIconsSearch fa-solid fa-magnifying-glass"></i></Button>
          </Form>
       </Col>
       <Col md={6} sm={12} className="text-center">
        <h2 className="headerTittle"> <Link to="/home" className="link" style={{color:"white"}}>DOREA</Link></h2>
       </Col>
       <Col md={3} sm={12} className="d-flex align-items-center" style={{justifyContent: "right"}}>
         <Link to={`/profile/${user.id}/notifications`}  className="link headerIconsLink"><i className="headerIcons fa-solid fa-envelope"></i></Link>
         <Link to="/chats" className="link headerIconsLink"><i className="headerIcons m-2 fa-solid fa-comment"></i></Link>
         <Dropdown className="headerIconsLink">
          <Dropdown.Toggle className="headerDropdown" variant="secondary">
          <i className="m-2 fa-solid fa-user"></i>
            {user.username}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Link to={`/profile/${user.id}`} className="link" style={{color:"black"}}>
            <div className="headerDropDownItem text-center">
               Perfil 
            </div>
            </Link>
            <Link to="/create" className="link" style={{color:"black"}}>
            <div className="headerDropDownItem text-center">
               Crear proyecto
            </div>
            </Link>
            <Dropdown.Divider />
            <Link to="/login" className="link" style={{color:"black"}} onClick={Logout} >
            <div className="headerDropDownItem text-center">
               Cerrar sesión
            </div>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
       </Col>
     </Row>
    </Container>
    </>
  )
}
