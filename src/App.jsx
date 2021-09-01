import AdminHeader from './components/AdminHeader'
import EmployeesList from './pages/EmploeesList'
import UserHeader from './components/UserHeader'
import Login from './pages/Login'
import Register from './pages/Register'
import AddEmployee from './pages/AddEmployee'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import DesignationList from './pages/DesignationList'
import AddDesignation from './pages/AddDesignation'
const App = () => {
  const isAuth=true
  return (
    <Router>
      <Switch>
      <Route path="/" exact component={Home} />
       <Route path="/register" component={Register} />
       <Route path="/login" component={Login} />
       <ProtectedRoute path="/employeelist" component={EmployeesList} auth={ isAuth}/>
       <ProtectedRoute path="/addemployee" component={AddEmployee} auth={ isAuth}/>
       <ProtectedRoute path="/designationlist" component={DesignationList} auth={ isAuth}/>
       <ProtectedRoute path="/adddesignation" component={AddDesignation} auth={ isAuth}/>
       

      </Switch>
    </Router>

  )
}

export default App
