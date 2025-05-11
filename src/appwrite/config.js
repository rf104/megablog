import conf from '../conf/conf.js';
import { Client, ID , Databases, Storage,Query} from 'appwrite';

export class Services{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appWriteUrl) 
                    .setProject(conf.appWriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug, // ID.unique() will create a unique id for the document here i am using slug as the id of the document
                     // but you can use ID.unique() to create a unique id for the document
                {
                    title:title,
                    content:content,
                    featuredImage:featuredImage,
                    userId:userId,
                    status:status,
                }
            );
        } catch (error) {
                console.error("Appwrite CreatePost Error:", error.response);
            if (error.response?.message) {
                console.error("  Message:", error.response.message);
            }
                if (error.response?.issues) {
                console.error("  Issues:", error.response.issues);
            }
            //console.log("Appwite Error :: CreatePost Part ",error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status,userId}){
        try {
            
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }

            )

        } catch (error) {
            console.log("Appwite Error :: UpdatePost Part ",error);
            return false;
        }
    }

    async deletePost(slug){
        try {
            
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true;
            ///After deleting the document i want to return true as an indication
            //here if i want to return the whole thing also but i am not doing that

        } catch (error) {
            console.log("Appwite Error :: DeletePost Part ",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                
            )

        } catch (error) {
            console.log("Appwite Error :: GetPost Part ",error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]){
        try {
            
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )

        } catch (error) {
            console.log("Appwite Error :: GetPosts Part ",error);
            return false;
        }

    }

    ///upload file services!!

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwite Error :: UploadFile Part ",error);
            return false;
        }
    }

    ///delete file service

    async deleteFIle(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("Appwite Error :: DeleteFile Part ",error);
            return false;
        }
    }

    getFilePreview(fileId){
        console.log(this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId,
        ))
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId,
        )
    }
}

const services = new Services();

export default services;