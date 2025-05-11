import React,{useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { Container, PostCard } from '../component';
import Landing from '../component/Landing';

function Home() {

    const [posts, setPosts] = useState([])


    useEffect(()=>{
       appwriteService.getPosts().then((post)=>{
            if(post){
                setPosts(post.documents);
            }
       }) 
    },[])
    
    if(posts.length === 0){
        return (
            <>
                <div className='w-full mt-4 py-8 text-center'>
                    <Container>
                        <Landing/>
                        <div className='flex flex-wrap'>
                            <div className='p-2 w-full'>
                                <h1 className='text-2xl'>Login to read posts!</h1>
                            </div>
                        </div>
                    </Container>
                </div>
            </>
        )
    }

    return (
        <div className='py0=-8 w-full '>
            <Container>
                <Landing/>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>{
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    })}
                </div>
            </Container>
        </div>
    )
}

export default Home