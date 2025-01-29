"use client"
import React from 'react'
import { CldVideoPlayer } from 'next-cloudinary'
import 'next-cloudinary/dist/cld-video-player.css'

function TodaysHighlight() {
  return (
    <div className='w-full md:w-3/4 mx-auto'>
      <CldVideoPlayer
      width="960"
      height="540"
      className='rounded-md'
      src="3209298-uhd_3840_2160_25fps_skwsgu"
      />
    </div>
  )
}

export default TodaysHighlight
