import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <Link to="login" >login</Link>
            <Link to="register" >Register</Link>
            <Link to="employeelist" >Employee List</Link>
            <Link to="adddesignation" > Add Desg</Link>
            <Link to="addemployee" > ADD emplo</Link>
            
        </div>
    )
}

export default Home
