<template>
      <v-container>
         <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
               <v-card class="pa-5">
                  <v-card-title> Add New Post </v-card-title>
                  <v-divider></v-divider>
                  <v-form ref="form" class="pa-5" @submit.prevent="submitForm" enctype="multipart/form-data">
                     <v-text-field label="Title" prepend-icon="mdi-format-title" v-model="post.title" :rules="rules"></v-text-field>
                     <!-- <v-text-field label="Category" prepend-icon="mdi-format-list-text" v-model="post.category" :rules="rules"></v-text-field> -->
                     <v-radio-group label="Category" v-model="post.category" prepend-icon="mdi-format-list-text" mandatory>
                        <v-radio label="Active" value="active"></v-radio>
                        <v-radio label="Inactive" value="inactive" ></v-radio>
                     </v-radio-group>

                     <v-textarea label="Description" prepend-icon="mdi-clipboard-text-outline" v-model="post.description" auto-grow rows="2"></v-textarea>
                     <v-file-input label="Select Image" @change="selectFile" ref="file" show-size :rules="rules"></v-file-input>
                     <v-btn type="submit" class="mt-3" color="primary"> Add Post </v-btn>
                  </v-form>
               </v-card>
            </v-col>
         </v-row>
   </v-container>
</template>

<script>
   import API from "../api"
   export default {
      name: 'AddPost',

      data() {
         return {
            rules: [(value) => !!value || "This field is required !"],
            post: {
               title: "",
               category: "",
               description: "",
               image: "",
            },
         }
      },

      methods: {
         selectFile(file){
            this.post.image = file

            console.log(this.post.image)
            
         },
         async submitForm(){
            const formData = new FormData()
            formData.append('title', this.post.title)
            formData.append('category', this.post.category)
            formData.append('description', this.post.description)
            formData.append('file', this.post.image)

            // for (const value of formData.values()) {
            //    console.log(value);
            // }
            
            if(this.$refs.form.validate()){
               const response = await API.storePost(formData)
               this.$router.push({ name: "Home", params: { message: "Post Created Successfully!" }})
            }
         }
      },

      components: {
         // HelloWorld,
      },
   }
</script>