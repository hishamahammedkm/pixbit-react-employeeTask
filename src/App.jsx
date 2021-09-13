import { useEffect } from "react";
import AdminHeader from "./components/AdminHeader";
import EmployeesList from "./pages/EmploeesList";
import UserHeader from "./components/UserHeader";
import Login from "./pages/Login3";
import Register from "./pages/Register";
import AddEmployee from "./pages/AddEmployee3";

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
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./store/slices/authSlice";
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
        <Route path="/" exact component={() => <Redirect to="/login" />} />

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
        />
      </Switch>
    </Router>
  );
};

export default App;

// import Test from "./components/Test";
// const App = () => {
//   return (
//     <div>
//       <Test />
//     </div>
//   );
// };

// export default App;
