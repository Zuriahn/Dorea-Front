import "./profile_sidebar.css"
import {Image} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useLocation } from "react-router"

export default function ProfileSidebar({profiledata, condUser}) {
  const location = useLocation()
  const path_id = location.pathname.split("/")[2]

  return (
    <>
    <div className="profileSidebar">
      <div className="text-center profile_sidebar_divider">
        <Image className='profile_img' src={profiledata.image} roundedCircle/>
        {
          condUser && <h2 className="profile_username">{profiledata.name} <Link to={`/profile/${path_id}/edit`} className="link profile_sidebar_edit"><i className="fa-solid fa-pen-to-square"></i></Link> </h2>
        }
        <h5 className="profile_email">{profiledata.email}</h5>
        <p className="profileSidebarDescription">{profiledata.desc}</p>
      </div>
      <div >
        <ul className='sidebar_list_opc'>
          <Link to={`/profile/${path_id}`} className="link"><li className='sidebar_opc'><i className="fa-solid fa-lightbulb"></i> Proyectos </li></Link>
          <Link to={`/profile/${path_id}/jobs`} className="link"><li className='sidebar_opc'><i className="fa-solid fa-pencil"></i>Trabajando </li></Link> 
          <Link to={`/profile/${path_id}/follows`} className="link"><li className='sidebar_opc'><i className="fa-solid fa-user"></i> Siguendo </li></Link> 
          {condUser && <Link to={`/profile/${path_id}/applications`} className="link"><li className='sidebar_opc'><i className="fa-solid fa-arrow-right"></i> Solicitudes </li></Link> }
        </ul>
      </div>
    </div>
    </>
  )
}

