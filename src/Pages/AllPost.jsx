import React from 'react'
import {Container, PostCard} from '../component/index'
import appwriteService from '../appwrite/config'
import { useState , useEffect } from 'react'

function AllPost() {

    const [post, setPost] = useState([])

    useEffect(()=>{
        appwriteService.getPosts([])
        .then(
            (post)=>{
                if(post){
                    setPost(post.documents)
                }
            }
        )
    },[])

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {
                    post.map((ps)=>(
                        <div key={ps.$id}>
                            <PostCard {...ps}/>
                            {/*/console.log(ps)*/}
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  )
}

export default AllPost