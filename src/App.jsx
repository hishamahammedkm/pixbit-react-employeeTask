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
// import Designations from "./pages/DesignationList";
// import AddDesignation from "./pages/AddDesignation";
// import Edit from "./components/Edit";
// import EditEmployee from "./pages/EditEmployee";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("token");
  var isAuth = true;

  // useEffect(() => {
  //   if (user) {
  //     dispatch(setUser(user));
  //   }
  // }, [user]);
  // const isAuth = useSelector((state) => state.auth.isLoggedIn);
  // console.log("isAuth----", isAuth);
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route path="/login" >
          <Login />
        </Route>
        <Route path="/register" >
          <Register />
        </Route>
        <Route path="/employees" >
          <Employees />
        </Route>
        <Route path="/create_employee" >
          <CreateEmployee />
        </Route>
        
        {/* <Route path="/designations" >
          <Designations />
        </Route> */}
        {/* <Route path="/" exact component={() => <Redirect to="/login" />} /> */}
        {/* <Route
          path="/"
          exact
          component={() =>
            !isAuth ? <Login /> : Home 
          }
        /> */}
        {/* <Route
          path="/register"
          exact
          component={() =>
            !isAuth ? <Register /> : <Redirect to="/" />
          }
        /> */}
        {/* <Route
          path="/login"
          exact
          component={() =>
            !isAuth ? <Login /> : <Redirect to="/" />
          }
        /> */}
   
        {/* <ProtectedRoute
          // path="/employeelist/edit/:id"
          path="/employeelist/:id/edit"
          exact
          component={EditEmployee}
          auth={isAuth}
        />

        <ProtectedRoute
          path="/employeelist"
          component={EmployeesList}
          auth={isAuth}
        />

        <ProtectedRoute
          path="/addemployee"
          component={AddEmployee}
          auth={isAuth}
        />
        <ProtectedRoute
          path="/designationlist"
          component={DesignationList}
          auth={isAuth}
        />
        <ProtectedRoute
          path="/adddesignation"
          component={AddDesignation}
          auth={isAuth}
        /> */}
      </Switch>
    </Router>
  );
};

export default App;
