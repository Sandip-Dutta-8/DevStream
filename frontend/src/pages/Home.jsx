import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { MdAdd, MdLibraryAdd } from 'react-icons/md'
import GridCard from '../components/GridCard';
import ListCard from '../components/ListCard';

const Home = () => {

  const [isGridLayout, setIsGridLayout] = useState(false);

  return (
    <div>
      <NavBar isGridLayout={isGridLayout} setIsGridLayout={setIsGridLayout}/>
      <div className='flex items-center justify-between px-[100px] my-[40px]'>
        <h2 className='text-2xl'>Hi, Sandip 👋</h2>
        <div className='flex items-center gap-2'>
          {/* Search Bar */}
          <div className="inputBox !w-[350px]">
            <input
              type="text"
              placeholder='Search...'
              // value={searchQuery} // Bind search input to searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />
          </div>
          <button onClick={() => { }} className='bg-[#00AEEF] hover:bg-[#16a2d4] w-[50px] h-[45px] rounded-[10px] mb-4 flex items-center justify-center text-2xl'><MdAdd /></button>
        </div>
      </div>

      {/* Project Display */}
      <div className="cards">
        {
          isGridLayout ?
            <div className='grid px-[100px]'>
              {/* {
                filteredData.length > 0 ? filteredData.map((item, index) => (
                  <GridCard key={index} item={item} />
                )) : <p>No projects found</p>
              } */}
              <GridCard />
              <GridCard />
              <GridCard />
              <GridCard />
              <GridCard />
            </div>
            : <div className='list px-[100px]'>
              {/* {
                filteredData.length > 0 ? filteredData.map((item, index) => (
                  <ListCard key={index} item={item} />
                )) : <p>No projects found</p>
              } */}
              <ListCard />
              <ListCard />
              <ListCard />
            </div>
        }
      </div>
    </div>
  )
}

export default Home