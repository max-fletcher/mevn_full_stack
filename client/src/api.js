import axios from "axios"
const url = "/api/v1/posts"

export default class API{
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
      const res = await axios.delete(id)
      return res.data;
   }
}

