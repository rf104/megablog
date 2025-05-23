import React,{useEffect, useCallback} from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import appwriteService from '../../appwrite/config'
import {Button, Input, RTE, Select} from '../index'


function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues:{
            title:post?.title || '',
            slug:post?.slug || '',
            content:post?.content || '',
            ///featuredImage:post?.featuredImage || '',
            status:post?.status || 'active',
        }
    })

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if(post){
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if(file){
               appwriteService.deleteFIle(post.featuredImage)
            }

            const dbPost = await appwriteService.updatePost(
              post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
                if(dbPost){
                    navigate(`/post/${post.$id}`);
                }
              }
            )
        }else{
            const file = await appwriteService.uploadFile(data.image[0]);

            if(file){
              const fileId = file.$id
              
              const payload = {
                title:    data.title,
                slug:     data.slug,
                content:  data.content,
                status:   data.status,
                userId:   userData.$id,
                featuredImage: fileId,       // <-- required!
              };

              const dbPost = await appwriteService.createPost(payload)
              
              // data.featuredImage = fileId
              // const dbPost = await appwriteService.createPost(
              //   {
              //     ...data,
              //     userId: userData.$id,
              //   }
              // )
              if(dbPost){
                navigate(`/post/${dbPost.$id}`);
              }
            }
            else console.error("File upload failed, cannot create post without featuredImage");
        }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string'){
            // const slug = value.toLocaleLowerCase().replace(/ /g,'-')
            // setValue('slug', slug)
            // return slug;

            return value.trim().toLocaleLowerCase().replace(/[^a-zA-Z\d\s]+/g,'-').replace(/\s/g,'-')
          }
          return ''
  },[])


  useEffect(() => {
    const subscription = watch((val,{name})=>{
      if(name=== 'title'){
        setValue('slug', slugTransform(val.title,{shouldValidate:true}))
      }
    })

    return ()=>{
      subscription.unsubscribe()
    }
  },[watch, slugTransform, setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm