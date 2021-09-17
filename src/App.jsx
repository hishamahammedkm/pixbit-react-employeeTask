import { useEffect } from "react";
import AdminHeader from "./components/AdminHeader";
import Employees from "./pages/employees/List";
import UserHeader from "./components/UserHeader";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CreateEmployee from "./pages/employees/Create";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Designations from "./pages/designations/List";
import CreateDesignation from "./pages/designations/Create";
// import Edit from "./components/Edit";
import EditEmployee from "./pages/employees/Edit";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem("token");

  useEffect(() => {
    const isAuth = localStorage.getItem("token");
    return ()=>{
      const isAuth = localStorage.getItem("token");
    }
  }, [isAuth])

  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route path="/login" >
          <Login  />
        </Route>
        <Route path="/register" >
          <Register />
        </Route>
        {/* <Route exact path="/employees" >
          <Employees />
        </Route> */}
        <ProtectedRoute
          exact path="/employees"
          component={Employees}
          auth={isAuth}
        />
        <ProtectedRoute
          exact path="/create_employee"
          component={CreateEmployee}
          auth={isAuth}
        />
        {/* <Route path="/create_employee" >
          <CreateEmployee />
        </Route> */}
     <ProtectedRoute
          exact path="/employees/:id/edit"
          component={EditEmployee}
          auth={isAuth}
        />
        {/* <Route exact path="/employees/:id/edit" >
          <EditEmployee />
        </Route> */}
        <ProtectedRoute
          exact path="/designations"
          component={Designations}
          auth={isAuth}
        />
        {/* <Route exact path="/designations" >
          <Designations />
        </Route> */}
        <ProtectedRoute
          exact path="/create_designation"
          component={CreateDesignation}
          auth={isAuth}
        />
        {/* <Route exact path="/create_designation" >
          <CreateDesignation />
        </Route> */}


      </Switch>
    </Router>
  );
};

export default App;
