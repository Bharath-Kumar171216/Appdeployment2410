import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Leaves from './components/Leaves';
import Requests from './components/Requests';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Editprofile from './components/Editprofile';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/tasks" element={<Tasks/>}></Route>
      <Route path="/leaves" element={<Leaves/>}></Route> 
      <Route path="/requests" element={<Requests/>}></Route> 
      <Route path="/editprofile" element={<Editprofile/>}></Route>
      </Routes></BrowserRouter>
    
  );
}

export default App;
