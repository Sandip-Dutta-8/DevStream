import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import image from '../assets/sign-up3.jpg'
import logo from '../assets/code.png'

const SignIn = () => {

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
                        <h1 className='text-3xl font-bold'>Login</h1>
                    </div>
                    <form onSubmit={() => { }} className='w-full mt-[60px]'>
                        <div className="inputBox">
                            <input required onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder='Email' />
                        </div>

                        <div className="inputBox">
                            <input required onChange={(e) => { setPwd(e.target.value) }} value={pwd} type="password" placeholder='Password' />
                        </div>

                        <p className='text-[gray]'>Don't have an account? <Link to="/sign-up" className='text-[#00AEEF]'>Sign Up</Link></p>

                        <p className='text-red-500 text-[14px] my-2'>{error}</p>

                        <button className="btnBlue w-full mt-[20px]">Login</button>
                    </form>
                </div>
                <div className="right w-[55%]">
                    <img className='h-[100vh] w-[100%] object-cover' src={image} alt="sign-in" />
                </div>
            </div>
        </>
    )
}

export default SignIn