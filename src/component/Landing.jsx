import React from 'react';
import readSvg from '../photos/woman-reading-animate.svg';
import photo42 from '../photos/42.png';
import pic7 from '../photos/7.jpg'

function Landing() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row items-center justify-between ">
        <div className='flex-1 p-4'>
          Ah, the digital age! It has gifted us with a treasure trove of voices and perspectives, readily accessible at our fingertips. You're diving into the world of blogs, a vibrant landscape where thoughts bloom into articles, experiences are shared as stories, and expertise finds its audience
        </div>
        <div className='flex-1 '>
          {/* Use the imported variables as the src */}
          <img src={readSvg} alt="Woman reading illustration" className="w-100 h-auto ml-10" />
          {/**<img src={photo42} alt="Example image 42" className="w-64 h-auto mt-4" />*/}
        </div>
      </div>
      <div className='flex flex-row items-center justify-between mt-4'>
          <div className='flex-1'>
              <img src={pic7} alt="pic7" /> 
          </div>
          <div className='flex-1'>
            Ever wonder about...? Or maybe you're searching for a story that truly resonates? You've found it. This is where ideas come to life, where voices are heard, and where you can discover something new with every click. What will you explore first?
          </div>
      </div>
    </div>
  );
}

export default Landing;
