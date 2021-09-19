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
import EditEmployee from "./pages/employees/Edit";

const App = () => {
  const auth = localStorage.getItem("token");
  return (
    <Router>
      <Switch>
     
        <ProtectedRoute
          exact path="/"
          component={Home}
        />
      
        <Route path="/login" exact component={() => (!auth ? <Login /> : <Redirect to="/" />)} />
        <Route path="/register" exact component={() => (!auth ? <Register /> : <Redirect to="/" />)} />
        <ProtectedRoute
          exact path="/"
          component={Home}
        />
        <ProtectedRoute
          exact path="/employees"
          component={Employees}
        />
        <ProtectedRoute
          exact
          path="/create_employee"
          component={CreateEmployee}
        />

        <ProtectedRoute
          exact
          path="/employees/:id/edit"
          component={EditEmployee}
        />

        <ProtectedRoute exact
          path="/designations"
          component={Designations} />

        <ProtectedRoute
          exact
          path="/create_designation"
          component={CreateDesignation}
        />
        <Route>
          <Redirect from='/*' to='/login' />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
