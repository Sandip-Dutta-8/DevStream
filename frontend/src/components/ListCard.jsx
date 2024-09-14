import React, { useState } from 'react'
import img from "../assets/code.png"
import deleteImg from "../assets/delete.png"
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';

const ListCard = () => {

    const navigate = useNavigate();
    const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);

    return (
        <>
            <div className="listCard mb-2 w-[full] flex items-center justify-between p-[10px] bg-[#141414] cursor-pointer rounded-lg hover:bg-[#202020]">
                <div onClick={() => { }} className='flex items-center gap-2'>
                    <img className='w-[80px]' src={img} alt="logo" />
                    <div>
                        <h3 className='text-[20px]'>Project 1</h3>
                        <p className='text-[gray] text-[14px]'>Created in {new Date().toDateString()}</p>
                    </div>
                </div>
                <div>
                    <img onClick={() => { setIsDeleteModelShow(true) }} className='w-[30px] cursor-pointer mr-4' src={deleteImg} alt="delete" />
                </div>
            </div>

            {
                isDeleteModelShow ? <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
                    <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
                        <h3 className='text-3xl'>Do you want to delete <br />
                            this project?</h3>
                        <div className='flex w-full mt-5 items-center gap-[10px]'>
                            <button onClick={() => {}} className='p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]'>Delete</button>
                            <button onClick={() => { setIsDeleteModelShow(false) }} className='p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]'>Cancel</button>
                        </div>
                    </div>
                </div> : ""
            }
        </>
    )
}

export default ListCard