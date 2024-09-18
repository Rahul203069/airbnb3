import React from 'react'

const Nodata = () => {
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-3'>
        <div className='text-2xl font-medium'>No exact matches</div>
        <div className='text-gray-500'>Try changing or removing some of your filters</div>
        <button className='text-sm p-3 border-2 border-black rounded-md '>Remove all filters</button>
      </div>
    </>
  )
}

export default Nodata
