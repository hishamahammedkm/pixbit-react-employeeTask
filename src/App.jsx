import { useEffect } from "react";
import AdminHeader from "./components/AdminHeader";
import EmployeesList from "./pages/EmploeesList";
import UserHeader from "./components/UserHeader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEmployee from "./pages/AddEmployee";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DesignationList from "./pages/DesignationList";
import AddDesignation from "./pages/AddDesignation";
import Edit from "./components/Edit";
import EditEmployee from "./pages/EditEmployee";
import { useSelector } from "react-redux";
const App = () => {
  const user = localStorage.getItem("token");
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  console.log("isAuth----", isAuth);
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/login" />} />
        {/* <Route path="/register" component={Register} /> */}
        {/* <Route path="/login" component={Login} /> */}
        <Route
          path="/register"
          exact
          component={() =>
            !isAuth ? <Register /> : <Redirect to="/employeelist" />
          }
        />
        <Route
          path="/login"
          exact
          component={() =>
            !isAuth ? <Login /> : <Redirect to="/employeelist" />
          }
        />
        <ProtectedRoute
          path="/employeelist/edit/:id"
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
        />
      </Switch>
    </Router>
  );
};

export default App;
