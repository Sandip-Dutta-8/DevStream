import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import image from '../assets/sign-up3.jpg'
import logo from '../assets/code.png'

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    return (
        <>
            <div className="container w-screen min-h-screen flex items-center justify-between pl-[100px]">
                <div className="left w-[35%]">
                    <div className='flex items-center gap-3'>
                        <img className='w-[60px]' src={logo} alt="logo" />
                        <h1 className='text-3xl font-bold'>Sign Up</h1>
                    </div>
                    <form onSubmit={() => {}} className='w-full mt-[60px]'>
                        <div className="inputBox">
                            <input required onChange={(e) => { setUsername(e.target.value) }} value={username} type="text" placeholder='Username' />
                        </div>

                        <div className="inputBox">
                            <input required onChange={(e) => { setName(e.target.value) }} value={name} type="text" placeholder='Name' />
                        </div>

                        <div className="inputBox">
                            <input required onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' />
                        </div>

                        <div className="inputBox">
                            <input required onChange={(e) => { setPwd(e.target.value) }} value={pwd} type="password" placeholder='Password' />
                        </div>

                        <p className='text-[gray]'>Already have an account? <Link to="/sign-in" className='text-[#00AEEF]'>login</Link></p>

                        <p className='text-red-500 text-[14px] my-2'>{error}</p>

                        <button className="btnBlue w-full mt-[20px]">Sign Up</button>
                    </form>
                </div>
                <div className="right w-[55%]">
                    <img className='h-[100vh] w-[100%] object-cover' src={image} alt="sign-up" />
                </div>
            </div>
        </>
    )
}

export default SignUp