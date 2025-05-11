import conf from '../conf/conf.js'; // Import your configuration file
import { Client, Account, ID } from 'appwrite';

export class AuthService  {
    client = new Client();
    account;
    constructor(){
        this.client.setEndpoint(conf.appWriteUrl) // Your API Endpoint
                    .setProject(conf.appWriteProjectId);

        this.account  = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const user = await this.account.create(ID.unique(),email,password,name);
            if(user){
                //will call another method
                this.login(email,password);
            }
            else return user;
        }catch(error){
            throw error ;
        }
    }

    async login(email,password){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }catch(error){
            console.log("Appwrite Error Occured!! -> "+ error);
        }
    }

     async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try{
            return await this.account.deleteSessions();
            ///Here i am using deleteSessions to delete alll sessions where user try to interact
            ///but there is another method called deleteSession which will delete only the session of the user
        }catch(error){

        }
    }

};

const authService = new AuthService();

export default authService;