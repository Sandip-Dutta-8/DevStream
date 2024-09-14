import React, { useEffect, useState } from 'react'
import logo from "../assets/code.png"
import { Link, useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar';
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { api_base_url, toggleClass } from '../helper';

const NavBar = () => {

    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [error, setError] = useState("");;

    return (
        <>
            <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
                <div className="flex items-center gap-3">
                    <img className='w-[50px] cursor-pointer' src={logo} alt="logo" />
                    <h1 className='text-2xl font-semibold'>Dev Stream</h1>
                </div>
                <div className="links flex items-center gap-2">
                    <button onClick={() => { }} className='btnBlue bg-red-500 min-w-[120px] ml-2 hover:bg-red-600'>Logout</button>
                    <Avatar onClick={() => { toggleClass(".dropDownNavbar", "hidden") }} name="Sandip Dutta" size="40" round="50%" className='cursor-pointer ml-2' />
                </div>

                <div className='dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg bg-[#1A1919] w-[150px] h-[160px]'>
                    <div className='py-[10px] border-b-[1px] border-b-[#fff]'>
                        <h3 className='text-[17px]' style={{ lineHeight: 1 }}>Sandip Dutta</h3>
                    </div>
                    <i className='flex items-center gap-2 mt-3 mb-2 cursor-pointer' style={{ fontStyle: "normal" }}><MdLightMode className='text-[20px]' />Light mode</i>
                    <i onClick={() => {}} className='flex items-center gap-2 mt-3 mb-2 cursor-pointer' style={{ fontStyle: "normal" }}><BsGridFill className='text-[20px]' />layout</i>
                </div>
            </div>
        </>
    )
}

export default NavBar