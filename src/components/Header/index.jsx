const Header = () => {
    return (
        <header className="flex justify-between px-7 bg-white h-14 shadow-md" >
            <div className="">
                <h1 className="text-xl font-bold">Larvel</h1>
            </div>
            <div className="flex space-x-3 text-base font-bold text-gray-400 cursor-pointer">
                <h3>Login</h3>
                <h3>Register</h3>
            </div>
        </header>
    )
}

export default Header
