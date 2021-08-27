import Header from "../Header"

const Login = () => {
    return (
        <div className="relative">
            <Header />
            <div className="bg-white absolute left-1/2 mt-10 w-1/3 h-1/3">
                <div className="bg-gray-300 p-5 ">
                    <h2 className="text-xl ">Login</h2>
                </div>
                <form className="px-16 bg-white p-5 space-y-3 flex flex-col items-baseline">
                    <div className="">
                        <label htmlFor="">E-Mail Address</label>
                        <input className="ml-5 p-3 outline-none border-2 " type="text" />
                    </div>
                    <div>
                        <label htmlFor="">Passord</label>
                        <input className="ml-5 p-3 outline-none border-2 " type="password" />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login
