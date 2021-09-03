import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <Link to="login" >login</Link>
            <Link to="register" >Register</Link>
            <Link to="employeelist" >Employee List</Link>
            <Link to="adddesignation" > Add Desg</Link>
            <Link to="addemployee" > ADD emplo</Link>
            <h1><Link to="designationlist" >Desig Table</Link></h1>
            <h1><Link to="addemployee" >Add employee</Link></h1>
            <h1><Link to="employeelist" > employeelist</Link></h1>
            
        </div>
    )
}

export default Home
