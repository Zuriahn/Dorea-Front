import "./project_sidebar.css"
import {Image, ListGroup} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useLocation } from "react-router"

export default function ProjectSidebar({projectdata,condUser}) {
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]
  return (
    <>
    <div className="projectSidebar">
      <div className="projectSidebarBorder">  
        <Image className="projectSidebarImage" fluid src={projectdata.image}></Image>
        <h3 className="text-center projectSidebarNameP">{projectdata.name} 
        {condUser && <Link to={`/project/${path_id}/main`} className="link project_sidebar_edit"><i className="fa-solid fa-pen-to-square"></i></Link>}
        </h3>
        <h4 className="text-center projectSidebarNameC">{projectdata.creator?.name}</h4>
        <h5 className="text-center projectSidebarCategory">{projectdata.category?.name}</h5>
        <ListGroup className="text-center mt-2">
          <Link to={`/presentation/${path_id}`} className="link"><ListGroup.Item className="projectSidebarItem"> <h5>Presentación</h5> </ListGroup.Item></Link> 
          <Link to={`/project/${path_id}/updates`} className="link"><ListGroup.Item className="projectSidebarItem"> <h5>Actualizaciones</h5> </ListGroup.Item></Link> 
          <Link to={`/project/${path_id}/publications`} className="link"><ListGroup.Item className="projectSidebarItem"> <h5>Publicaciones</h5> </ListGroup.Item></Link> 
          <Link to={`/project/${path_id}/tasks`} className="link"><ListGroup.Item className="projectSidebarItem"> <h5>Tareas</h5> </ListGroup.Item></Link> 
          <Link to={`/project/${path_id}/members`} className="link"><ListGroup.Item className="projectSidebarItem"> <h5>Miembros</h5> </ListGroup.Item></Link> 
          {condUser && <Link to={`/project/${path_id}/requests`} className="link"><ListGroup.Item className="projectSidebarItem"> <h5>Solicitudes</h5> </ListGroup.Item></Link>}
        </ListGroup>
      </div>
    </div>
    </>
  )
}
