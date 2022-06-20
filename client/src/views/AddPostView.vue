<template>
      <v-container>
         <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
               <v-card class="pa-5">
                  <v-card-title> Add New Post </v-card-title>
                  <v-divider></v-divider>
                  <v-form ref="form" class="pa-5" @submit.prevent="submitForm" enctype="multipart/form-data">
                     <!-- :rules="title_rules" -->
                     <!-- :error="title_error" :error-messages="error_messages.title" -->
                     <v-text-field label="Title" prepend-icon="mdi-format-title" v-model="post.title" :error="title_error" :error-messages="error_title"></v-text-field>
                     <!-- <v-text-field label="Category" prepend-icon="mdi-format-list-text" v-model="post.category" :rules="rules"></v-text-field> -->
                     <v-radio-group label="Category" v-model="post.category" prepend-icon="mdi-format-list-text" mandatory :error="category_error" :error-messages="error_category">
                        <v-radio label="Active" value="active"></v-radio>
                        <v-radio label="Inactive" value="inactive" ></v-radio>
                        <v-radio label="Inactive" value="sadawdawd" ></v-radio>
                     </v-radio-group>

                     <v-textarea label="Description" prepend-icon="mdi-clipboard-text-outline" v-model="post.description" auto-grow rows="2" :error="description_error" :error-messages="error_description"></v-textarea>
                     <!-- :rules="rules" -->
                     <v-file-input label="Select Image" @change="selectFile" ref="file" show-size :error="file_error" :error-messages="error_file"></v-file-input>
                     <v-btn type="submit" class="mt-3" color="primary"> Add Post </v-btn>
                     <v-btn @click="reset" class="mt-3" color="primary"> Reset </v-btn>
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
            // rules: [(value) => !!value || "This field is required !"],
            error_title: "",
            error_category: "",
            error_description: "",
            error_file: "",

            title_error: false,
            category_error: false,
            description_error: false,
            file_error: false,

            core_error_message: null,

            post: {
               title: "",
               category: "",
               description: "",
               image: "",
            },

            title_rules: [
               (v) => !!v || "Title is required",
               (v) => (v && v.length >= 3) || 'Title must be greater than 3 characters',
               (v) => (v && v.length <= 100) || 'Title must be less than 100 characters',
            ],
            description_rules: [
               (v) => !!v || "Description is required",
               (v) => (v && v.length >= 3) || 'Title must be greater than 3 characters',
               (v) => (v && v.length <= 1000) || 'Title must be less than 1000 characters',
            ],
         }
      },

      methods: {
         selectFile(file){
            this.file_error = false

            console.log("messag" ,this.post)
         },

         async submitForm(){
            console.log(this.post)
            if(this.$refs.form.validate()){
               const formData = new FormData()
               formData.append('title', this.post.title)
               formData.append('category', this.post.category)
               formData.append('description', this.post.description)
               formData.append('file', this.post.image)

               // for (const value of formData.values()) {
               //    console.log(value);
               // }

               try{
                  const response = await API.storePost(formData)
                  this.$router.push({ name: "Home", params: { message: "Post Created Successfully!" }})
               }
               catch(error){
                  this.core_error_message = error.message
                  if(error.response.data.error.errors.find( ({ field }) => field === 'title' )){
                     this.error_title = error.response.data.error.errors.find( ({ field }) => field === 'title' ).message
                     this.title_error = true
                  }
                  if(error.response.data.error.errors.find( ({ field }) => field === 'category' )){
                     this.error_category = error.response.data.error.errors.find( ({ field }) => field === 'category' ).message
                     this.category_error = true
                  }
                  if(error.response.data.error.errors.find( ({ field }) => field === 'description' )){
                     this.error_description = error.response.data.error.errors.find( ({ field }) => field === 'description' ).message
                     this.description_error = true
                  }
                  if(error.response.data.error.errors.find( ({ field }) => field === 'file' )){
                     this.error_file = error.response.data.error.errors.find( ({ field }) => field === 'file' ).message
                     this.file_error = true
                  }
                  console.log(this.error_title, this.title_error)
                  // console.log(this.error_messages.title)
                  // console.log(error.response.data.error.errors)
               }
            }
            else{
               this.$refs.form.validate()
            }
         },

         reset(){
            console.log("asdawda")

            this.post.title = ""
            this.post.category = ""
            this.post.description = ""
            this.post.image = ""

            this.error_title = ""
            this.title_error = false
            this.error_category= ""
            this.category_error = false
            this.error_description = ""
            this.description_error = false
            this.error_file = ""
            this.file_error = false

            console.log(this.error_title, this.title_error)
         }
      },

      components: {
         // HelloWorld,
      },
   }
</script>