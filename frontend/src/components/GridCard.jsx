import React, { useState } from 'react'
import deleteImg from "../assets/delete.png"
import codeImg from "../assets/project_logo.jpeg" 
import { useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';

const GridCard = ({item}) => {

    const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
    const navigate = useNavigate();

    const deleteProj = (id) => {
        fetch(api_base_url + "/deleteProject", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                progId: id,
                userId: localStorage.getItem("userId")
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setIsDeleteModelShow(false)
                window.location.reload()
            } else {
                alert(data.message)
                setIsDeleteModelShow(false)
            }
        })
    }

    return (
        <>
            <div className="gridCard bg-[#141414] w-[270px] p-[10px] h-[180px] cursor-pointer hover:bg-[#202020] rounded-lg shadow-sm shadow-black/50">
                <div onClick={() => {navigate(`/editor/${item._id}`)}}>
                    <img className="w-[100px] rounded-lg" src={codeImg} alt="project-img" />
                    <h3 className='text-[20px] w-[90%] line-clamp-1 mt-3'>{item.title}</h3>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-[14px] text-[gray]'>Created in {new Date(item.date).toDateString()}</p>
                    <img onClick={() => { setIsDeleteModelShow(true) }} className='w-[30px] cursor-pointer' src={deleteImg} alt="" />
                </div>
            </div>

            {
                isDeleteModelShow ? <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
                    <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
                        <h3 className='text-3xl'>Do you want to delete <br />
                            this project?</h3>
                        <div className='flex w-full mt-5 items-center gap-[10px]'>
                            <button onClick={() => {deleteProj(item._id)}} className='p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]'>Delete</button>
                            <button onClick={() => { setIsDeleteModelShow(false) }} className='p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]'>Cancel</button>
                        </div>
                    </div>
                </div> : ""
            }
        </>
    )
}

export default GridCard