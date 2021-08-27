import Header from "../Header"

const Register = () => {
    return (
        <>
            <Header />
            <div className="relative h-screen flex flex-col justify-center items-center -mt-32">
            
            <div className=" flex flex-col  bg-white absolute  mt-10 w-1/3">
                <div className="bg-gray-300 p-5 ">
                    <h2 className="text-xl ">Register</h2>
                </div>
                <form className="flex px-16 bg-white p-5 space-y-3 items-baseline">
                    <div className="flex flex-col space-y-12">
                        <label className="font-semibold" htmlFor="">Name</label>
                        <label className="font-semibold" htmlFor="">E-Mail Address</label>
                        <label className="font-semibold" htmlFor="">Passord</label>
                        <label className="font-semibold" htmlFor="">Confirm Password Passord</label>
                    </div>
                    <div className="flex flex-col space-y-6">
                      <input className="ml-5 p-3 outline-none border-2 rounded-lg  " type="text" />

                        <input className="ml-5 p-3 outline-none border-2 rounded-lg  " type="email" />

                        <input className="ml-5 p-3 outline-none border-2 rounded-lg " type="password" />
                        <input className="ml-5 p-3 outline-none border-2 rounded-lg " type="password" />
                        
                        <div className="space-x-3 ml-6">
                            <button className=" bg-blue-500 text-white p-3 rounded-lg text-xl">Register</button>
                           
                        </div>


                    </div>
                </form>

            </div>
        </div>
        </>
    )
}

export default Register
