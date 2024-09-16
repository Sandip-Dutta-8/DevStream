import React, { useEffect, useState } from 'react'
import logo from "../assets/code.png"
import { Link, useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar';
import { BsGridFill, BsList } from "react-icons/bs";
import { api_base_url, toggleClass } from '../helper';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const NavBar = ({ isGridLayout, setIsGridLayout, changeTheme, isLightMode}) => {

    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(api_base_url + "/getUserDetails", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: localStorage.getItem("userId")
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setData(data.user);
            }
            else {
                setError(data.message);
            }
        })
    }, [])

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        window.location.reload();
    }

    return (
        <div>
            <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
                <div className="flex items-center gap-3">
                    <img className='w-[50px] cursor-pointer' src={logo} alt="logo" />
                    <h1 className='text-2xl font-semibold'>Dev Stream</h1>
                </div>
                <div className="links flex items-center gap-2">
                    <button onClick={logout} className='btnBlue bg-red-500 min-w-[120px] ml-2 hover:bg-red-600'>Logout</button>
                    <Avatar onClick={() => { toggleClass(".dropDownNavbar", "hidden") }} name={data ? data.name : ""} size="40" round="50%" className='cursor-pointer ml-2' />
                </div>

                <div className='dropDownNavbar hidden absolute right-[60px] top-[75px] shadow-lg shadow-black/50 p-[10px] rounded-lg bg-[#1A1919] w-[150px]'>
                    <div className='py-[10px] border-b-[1px] border-b-[#fff]'>
                        <h3 className='text-[17px]' style={{ lineHeight: 1 }}>{data ? data.name : ""}</h3>
                    </div>
                    <i onClick={() => { changeTheme() }} className='flex items-center gap-2 mt-3 mb-2 cursor-pointer' style={{ fontStyle: "normal" }}>{isLightMode ? <MdDarkMode className='text-[20px]' /> : <MdLightMode className='text-[20px]' />} {isLightMode ? "Dark" : "Light"} mode</i>
                    <i onClick={() => { setIsGridLayout(!isGridLayout) }} className='flex items-center gap-2 mt-3 mb-2 cursor-pointer' style={{ fontStyle: "normal" }}>{isGridLayout ? <BsList className='text-[25px]' /> : <BsGridFill className='text-[20px]' />}{isGridLayout ? "List" : "Grid"} layout</i>
                </div>
            </div>
        </div>
    )
}

export default NavBar