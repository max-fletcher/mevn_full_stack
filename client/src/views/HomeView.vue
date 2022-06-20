<template>
   <v-container>
      <h1>Home Page</h1>
      <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissable v-if="this.$route.params.message">
         {{ this.$route.params.message }}
      </v-alert>

      <v-row no-gutters>
         <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
            <v-card class="pa-1" :to="{ name: 'ShowPost', params: {id: post._id} }">
               <v-img height="250" :src="post.image_url"></v-img>
               <v-btn class="ml-4 mt-3" small outlined color="indigo">
                  {{ post.category }}
               </v-btn>
               <v-card-title class="headline">
                  {{ post.title }}
               </v-card-title>
               <v-card-text class="py-0">
                  <p>{{ post.description.substring(0, 100) + "..." }}</p>
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
   </v-container>
</template>

<script>
   import API from "../api"
   export default {
      name: 'Home',

      data() {
         return {
            posts: null,
         }
      },

      components: {
         // HelloWorld,
      },

      async created() {
         this.posts = await API.getAllPosts()
         // console.log(this.posts);
         console.log(this.$route.params.message);
      },
   }
</script>
