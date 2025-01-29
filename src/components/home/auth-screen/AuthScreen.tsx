/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import HeroSection from './HeroSection'
import MasonryGrid from './MasonryGrid'
import { ModeToggle } from '@/components/ModeToggle'
import TodaysHighlight from './TodaysHighlight'
import UnderlineText from '@/components/decorators/UnderlineText'
import RotatedText from '@/components/decorators/RotatedText'
import Features from './Features'
import { Marquee } from '@/components/ui/marquee'
import { Testimonials } from './Testimonials'
import PricingPage from '@/components/Pricing'
import Team from './Team'

function AuthScreen() {
  return (
    <div className='flex flex-col'>
      <HeroSection/>
      <div className='mb-20 mt-12'>
        <div className='max-w-6xl mx-auto px-4'>
            <p className='text-3xl md:text-5xl tracking-tight mt-4 mb-8 font-semibold md:text-center'>
                Today's {" "}
                <UnderlineText className='underline-offset-8 md:underline-offset-[12px] decoration-wavy'>
                    Highlight
                </UnderlineText>
                <span className='text-2xl md:text-4xl ml-1'>✨</span>
            </p>
            {/* Featured post */}
            <div className='flex flex-col gap-10 mt-10'>
              <TodaysHighlight/>
              <div className='mt-24'>
                <p className='text-2xl md:text-5xl text-center tracking-tighter font-bold'>
                    Meet Our <RotatedText>Valued</RotatedText> Students
                </p>
                <MasonryGrid/>

              </div>
              <Features/>
              <Testimonials/>
              <PricingPage/>
              <Team/>
            </div> 
         

        </div>

      </div>
    </div>
  )
}

export default AuthScreen
