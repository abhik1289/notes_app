import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AddNote from './components/AddNote';
import Archive from './components/Archive';
import BasicEdit from './components/BasicEdit';
import ChangePassword from './components/ChangePassword';
import EmailPassword from './components/EmailPassword';
import Forgot from './components/Forgot';
import ForgotVerify from './components/ForgotVerify';
import Home from './components/Home';
import Logout from './components/Logout';
import NotesView from './components/NotesView';
import Profile from './components/Profile';
import Serach from './components/Search';
import Signin from './components/Signin';
import Signup from "./components/Signup";
import Trash from './components/Trash';
import Verify from './components/Verify';

function Logo() {
  return (<>
  <BrowserRouter>
  <Routes>
<Route element={<Signup/>} path="/signup"/>
<Route element={<Verify/>} path="/verify"/>
<Route element={<Signin/>} path="/signin"/>
<Route element={<Forgot/>} path="/forgot"/>
<Route element={<ForgotVerify/>} path="/forgotVerify"/>
<Route element={<ChangePassword/>} path="/changePWD"/>
<Route element={<Home/>} path="/"/>
<Route element={<AddNote/>} path="/addNote"/>
<Route element={<Trash/>} path="/trash"/>
<Route element={<Archive/>} path="/archive"/>
<Route element={<Profile/>} path="/profile"/>
<Route element={<Logout/>} path="/logout"/>
<Route element={<NotesView/>} path="/notesView"/>
<Route element={<BasicEdit/>} path="/basicEdit"/>
<Route element={<EmailPassword/>} path="/emailPwd"/>
<Route element={<Serach/>} path="/search"/>














  </Routes>
  </BrowserRouter>

  </>);
}

export default Logo;