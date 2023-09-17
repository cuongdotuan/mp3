import React from 'react'
import { FiShuffle, FiPlay, FiPause, FiSkipForward, FiSkipBack } from 'react-icons/fi'
import { ImLoop } from 'react-icons/im'
const Player = ({ isPlaying, onToggle, onPrev, onNext }) => {
  return (
    <>
      <div className='flex justify-evenly my-1'>
        <button>
          <FiShuffle className='text-[27px] hover:text-emerald-300' />
        </button>

        <button className='text-3xl hover:text-emerald-300' onClick={onPrev}>
          <FiSkipBack />
        </button>

        <button className='flex justify-center align-center w-24 py-2 rounded-full text-3xl bg-emerald-300' onClick={onToggle}>
          {!isPlaying ? <FiPlay /> : <FiPause />}

        </button>

        <button className='text-3xl hover:text-emerald-300' onClick={onNext}>
          <FiSkipForward />
        </button>

        <button className='text-3xl hover:text-emerald-300'>
          <ImLoop />
        </button>
      </div>
    </>
  )
}

export default Player