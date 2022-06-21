<template>
   <v-container>
      <h1>Show Posts</h1>
         <v-row no-gutters>
            <v-col sm="10" class="pa-4 mx-auto">
               <v-card class="pa-2">
                  <v-img :src="post.image_url"></v-img>

                  <v-card-actions class="pb-0">
                     <v-row class="mt-1 mx-1">
                        <v-col sm="2">
                           <v-btn small outlined color="primary">{{ post.category }}</v-btn>
                        </v-col>
                        <v-col sm="10" class="d-flex justify-end">
                           <v-btn color="success" text :to="{ name: 'UpdatePost', params: {id: post._id} }"> Edit Post </v-btn>
                           <v-btn color="error" @click="delete_post" text class="ml-3">Delete Post</v-btn>
                        </v-col>
                     </v-row>
                  </v-card-actions>

                  <v-card-subtitle class="headline">
                     <h3>{{ post.title }}</h3>
                  </v-card-subtitle>
                  
                  <v-card-text class="gray--text">
                     <p>{{ post.description }}</p>
                     <p>{{ post.createdAt }}</p>
                  </v-card-text>

               </v-card>
            </v-col>
         </v-row>
   </v-container>
</template>

<script>
   import API from "../api"
   export default {
      name: 'ShowPost',

      data() {
         return {
            post: null,
         }
      },

      components: {
         // HelloWorld,
      },

      methods: {

         async delete_post() {
            try {
               const response = await API.deletePost(this.$route.params.id);
               this.$router.push({
                  name: "Home",
                  params: { message: "Post Deleted Successfully!" },
               });
            } catch (error) {
               
               console.log(error);
               this.$router.push({
                  name: "Home",
                  params: { error_message: error.response.data.error },
               });
            }

         },
      },

      async created() {
         try {
            this.post = await API.getPostById(this.$route.params.id)
            console.log(this.post, this.$route.params.id);
         } catch (error) {
            console.log(error);
            this.$router.push({
               name: "Home",
               params: { error_message: error.response.data.error },
            });
         }
      },
   }
</script>
