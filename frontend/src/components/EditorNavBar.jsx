import React from 'react'
import logo from "../assets/code.png"
import { FiDownload } from "react-icons/fi";

const EditorNavBar = ({title, downloadCode}) => {
    return (
        <>
            <div className="EditiorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
                <div className="logo flex items-center gap-2">
                    <img className='w-[50px] cursor-pointer' src={logo} alt="logo" />
                    <h1 className='font-bold text-2xl'>Dev Stream</h1>
                </div>
                <p>File / <span className='text-[gray]'>{title}</span></p>
                <i onClick={downloadCode} className='p-[8px] btn bg-black rounded-[5px] cursor-pointer text-[20px] hover:bg-[#202020]'><FiDownload /></i>
            </div>
        </>
    )
}

export default EditorNavBar