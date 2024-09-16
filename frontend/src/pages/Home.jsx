import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { MdAdd } from 'react-icons/md'
import GridCard from '../components/GridCard';
import ListCard from '../components/ListCard';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [projTitle, setProjTitle] = useState("");
  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const changeTheme = () => {
    const Navbar = document.querySelector(".navbar");
    if (isLightMode) {
      Navbar.style.background = "#141414";
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      Navbar.style.background = "#f4f4f4";
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
  };

  const createProj = (e) => {
    if (projTitle === "") {
      alert("Please Enter Project Title");
    } else {
      fetch(api_base_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projTitle,
          userId: localStorage.getItem("userId")
        })
      }).then(res => res.json()).then(data => {
        if (data.success) {
          setIsCreateModelShow(false);
          setProjTitle("");
          alert("Project Created Successfully");
          navigate(`/editor/${data.projectId}`);
        } else {
          alert("Something Went Wrong");
        }
      });
    }
  };

  // Filter data based on search query
  const filteredData = data ? data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case insensitive filtering
  ) : [];

  const getProj = () => {
    fetch(api_base_url + "/getProjects", {
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
        setData(data.projects);
      } else {
        setError(data.message);
      }
    });
  };

  useEffect(() => {
    getProj();
  }, []);

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
        setUserData(data.user);
      }
      else {
        setUserError(data.message);
      }
    })
  }, [])

  return (
    <>
      <NavBar isGridLayout={isGridLayout} setIsGridLayout={setIsGridLayout} changeTheme={changeTheme} isLightMode={isLightMode}/>
      <div className='flex items-center justify-between px-[100px] my-[40px]'>
        <h2 className='text-2xl'>Hi, {userData ? userData.name : ""} 👋</h2>
        <div className='flex items-center gap-2'>
          {/* Search Bar */}
          <div className="inputBox !w-[350px]">
            <input
              type="text"
              placeholder='Search...'
              value={searchQuery} // Bind search input to searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />
          </div>
          <button onClick={() => { setIsCreateModelShow(true) }} className='bg-[#00AEEF] hover:bg-[#16a2d4] w-[50px] h-[45px] rounded-[10px] mb-4 flex items-center justify-center text-2xl'><MdAdd /></button>
        </div>
      </div>

      {/* Project Display */}
      <div className="cards">
        {
          isGridLayout ?
            <div className='grid px-[100px]'>
              {
                // filteredData.length > 0 ? filteredData.map((item, index) => (
                //   <GridCard key={index} item={item} />
                // )) : <p>No projects found</p>
                data?data.map((item, index) => {
                  return <GridCard key={index} item={item} />
                }) : <p>No projects found</p>
              }
            </div>
            : <div className='list px-[100px]'>
              {
                // filteredData.length > 0 ? filteredData.map((item, index) => (
                //   <ListCard key={index} item={item} />
                // )) : <p>No projects found</p>
                data?data.map((item, index) => {
                  return <ListCard key={index} item={item} />
                }) : <p>No projects found</p>
              }
            </div>
        }
      </div>

      {isCreateModelShow &&
        <div className="createModelCon fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgb(0,0,0,0.1)] flex items-center justify-center">
          <div className="createModel w-[25vw] h-[27vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-[20px]">
            <h3 className='text-2xl'>Create New Project</h3>
            <div className="inputBox !bg-[#202020] mt-4">
              <input
                onChange={(e) => { setProjTitle(e.target.value) }}
                value={projTitle}
                type="text"
                placeholder='Project Title'
              />
            </div>
            <div className='flex items-center gap-[10px] w-full mt-2'>
              <button onClick={createProj} className='btnBlue rounded-[5px] w-[49%] mb-4 !p-[5px] !px-[10px] !py-[10px]'>Create</button>
              <button onClick={() => { setIsCreateModelShow(false) }} className='cancel btnBlue !bg-[#1A1919] rounded-[5px] mb-4 w-[49%] !p-[5px] !px-[10px] !py-[10px] hover:!bg-[#0d0d0d]'>Cancel</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Home