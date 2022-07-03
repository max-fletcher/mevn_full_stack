import axios from "axios"
const url = "/api/v1/posts"
const auth_url = "/api/v1/auth"

export default class API{
   static async login(authData){
      const res = await axios.post(`${auth_url}/login`, authData)
      return res.data;
   }

   static async register(authData){
      const res = await axios.post(`${auth_url}/register`, authData)
      return res.data;
   }

   static async getAllPosts(){
      const res = await axios.get(url)
      return res.data.data;
   }

   static async storePost(postData){
      const res = await axios.post(url, postData)
      return res.data;
   }

   static async getPostById(id){
      const res = await axios.get(`${url}/${id}`)
      return res.data.data;
   }

   static async updatePost(id, post){
      const res = await axios.patch(`${url}/${id}`, post)
      return res.data;
   }

   static async deletePost(id){
      const res = await axios.delete(`${url}/${id}`)
      return res.data;
   }
}

