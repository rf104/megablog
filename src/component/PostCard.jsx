import React from 'react'
import appWriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

import a from '../photos/1.jpg'
import b from '../photos/2.jpg'
import c from '../photos/3.jpg'
import d from '../photos/4.jpg'
import e from '../photos/5.jpg'
import f from '../photos/6.jpg'

function PostCard({$id, title , featuredImage}) {

  const pic = [a,b,c,d,e,f];
  //appWriteService.getFilePreview(featuredImage)
  console.log(Math.round(Math.random()*(5-0+1)+0));
  return (
    <Link to = {`/post/${$id}`} >
        <div className = 'w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src = {pic[Math.round(Math.random()*(5-0+1)+0)]} alt = {title} className = 'w-full h-48 object-cover rounded-xl'/>
            </div>
            <h2 className = 'text-xl font-bold'>
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard