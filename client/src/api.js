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
      console.log(window.localStorage.getItem('auth_token'))
      const res = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token') } } )
      return res.data.data;
   }

   static async storePost(postData){
      const res = await axios.post(url, postData, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token') } } )
      return res.data;
   }

   static async getPostById(id){
      const res = await axios.get(`${url}/${id}`, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token') } } )
      return res.data.data;
   }

   static async updatePost(id, post){
      const res = await axios.patch(`${url}/${id}`, post, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token') } } )
      return res.data;
   }

   static async deletePost(id){
      const res = await axios.delete(`${url}/${id}`, { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('auth_token') } } )
      return res.data;
   }
}

