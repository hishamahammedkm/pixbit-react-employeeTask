import Login from "./components/Login"
import Register from "./components/Register"
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AdminTemplate from "./components/AdminTemplate";
const App = ()=> {
  return(
    <>
     <AdminTemplate />
    </>
    
    // <Router>
  
    //   <Switch>
    //     <Router path="/login">
    //       <Login />
    //     </Router>
    //     <Router path="/register">
    //       <Register />
    //     </Router>
    //   </Switch>
    // </Router>
  )

}

export default App;
