import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

import Login from "./pages/login/Login"
import Register from "./pages/register/Register"

import Home from "./pages/home/Home"

//RUTAS PROYECTO
import ProjectMain from "./pages/project/project_main/ProjectMain"
import ProjectPresentation from "./pages/project_presentation/ProjectPresentation"
import ProjectCreation from "./pages/project_creation/ProjectCreation"
import ProjectTask from "./pages/project/project_task/ProjectTask"
import ProjectMember from "./pages/project/project_member/ProjectMember"
import ProjectRequest from "./pages/project/project_request/ProjectRequest"
import ProjectUpdates from "./pages/project/project_updates/ProjectUpdates"
import ProjectPublications from "./pages/project/project_publications/ProjectPublications"

//RUTAS PERFIL
import ProfileMain from "./pages/profile/profile_main/Profile"
import ProfileJob from "./pages/profile/profile_job/ProfileJob"
import ProfileFollow from "./pages/profile/profile_follow/ProfileFollow"
import ProfileMyapplication from "./pages/profile/profile_myapplication/ProfileMyapplication"
import Notification from "./pages/notification/Notification"
import ProfileEdit from "./pages/profile/profile_edit/ProfileEdit"

import Chat from "./pages/chat/Chat"
import Search from "./pages/search/Search"
import Error from "./pages/error/Error"
import { useContext } from "react"
import { Context} from "./context/Context";

function App() {
  const {user} = useContext(Context)
  return (
    <Router>
      <Switch>

        <Route exact path="/">
          {user ? <Home/> : <Login/>}
        </Route>

        <Route exact path="/home">
          {user ? <Home/> : <Login/>}
        </Route>

        <Route exact path="/login">
          {user ? <Home/> : <Login/>}
        </Route>

        <Route exact path="/register">
          {user ? <Home/> : <Register/>}
        </Route>

        <Route exact path="/profile/:id">
          {user ? <ProfileMain/> : <Login/>}
        </Route>

        <Route exact path="/profile/:id/edit">
          {user ? <ProfileEdit/> : <Login/>}
        </Route>

        <Route exact path="/profile/:id/jobs">
          {user ? <ProfileJob/> : <Login/>}
        </Route>

        <Route exact path="/profile/:id/follows">
          {user ? <ProfileFollow/> : <Login/>}
        </Route>

        <Route exact path="/profile/:id/applications">
          {user ? <ProfileMyapplication/> : <Login/>}
        </Route>

        <Route exact path="/profile/:id/notifications">
          {user ? <Notification/> : <Login/>}
        </Route>

        <Route exact path="/create">
          {user ? <ProjectCreation/> : <Login/>}
        </Route>

        <Route exact path="/project/:id/main">
          {user ? <ProjectMain/> : <Login/>}
        </Route>

        <Route exact path="/presentation/:id">
          {user ? <ProjectPresentation/> : <Login/>}
        </Route>

        <Route exact path="/project/:id/tasks">
          {user ? <ProjectTask/> : <Login/>}
        </Route>

        <Route exact path="/project/:id/members">
          {user ? <ProjectMember/> : <Login/>}
        </Route>

        <Route exact path="/project/:id/requests">
          {user ? <ProjectRequest/> : <Login/>}
        </Route>

        <Route exact path="/project/:id/updates">
          {user ? <ProjectUpdates/> : <Login/>}
        </Route>

        <Route exact path="/project/:id/publications">
          {user ? <ProjectPublications/> : <Login/>}
        </Route>

        <Route exact path="/search">
          {user ? <Search/> : <Login/>}
        </Route>

        <Route exact path="/chats">
          {user ? <Chat/> : <Login/>}
        </Route>

        <Route exact path="/error">
          {user ? <Error/> : <Login/>}
        </Route>

      </Switch>
    </Router>
  );
}

export default App;