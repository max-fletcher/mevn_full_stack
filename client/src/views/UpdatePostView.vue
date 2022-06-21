<template>
   <v-container>
      <v-row no-gutters>
         <v-col sm="10" class="mx-auto">
            <v-card class="pa-5">
               <v-card-title> Edit Post </v-card-title>
               <v-divider></v-divider>

               <v-snackbar
                  top
                  right
                  v-model="error_snackbar"
               >
                  <h4 class="font-weight-medium"> {{ core_error_message }} </h4>

                  <template v-slot:action="{ attrs }">
                  <v-btn
                     color="red"
                     text
                     v-bind="attrs"
                     @click="error_snackbar = false"
                  >
                     <v-icon dark> mdi-close </v-icon>
                  </v-btn>
                  </template>
               </v-snackbar>

               <v-form
                  ref="form"
                  class="pa-5"
                  @submit.prevent="submitForm"
                  enctype="multipart/form-data"
                  lazy-validation
               >
                  <!-- :rules="title_rules" -->
                  <v-text-field
                     label="Title"
                     prepend-icon="mdi-format-title"
                     v-model="post.title"
                     :error-messages="title_error_message"
                     @keyup="reset_title"
                  ></v-text-field>
                  <v-radio-group
                     label="Category"
                     v-model="post.category"
                     prepend-icon="mdi-format-list-text"
                     mandatory
                     :error-messages="category_error_message"
                     @change="reset_category"
                  >
                     <v-radio label="Active" value="active"></v-radio>
                     <v-radio label="Inactive" value="inactive"></v-radio>
                     <v-radio label="Inactive" value="sadawdawd"></v-radio>
                  </v-radio-group>

                  <v-textarea
                     label="Description"
                     prepend-icon="mdi-clipboard-text-outline"
                     v-model="post.description"
                     auto-grow
                     rows="2"
                     :error-messages="description_error_message"
                     @keyup="reset_description"
                  ></v-textarea>
                  <!-- :rules="rules" -->
                  <v-file-input
                     label="Select Image"
                     @change="selectFile"
                     ref="file"
                     show-size
                     :error-messages="file_error_message"
                  ></v-file-input>

                  <h1 class="mt-5 mb-2"> Pervious Image </h1>
                  <v-img class="mb-5" height="500" width="auto" :src="previous_image"></v-img>

                  <v-btn type="submit" class="mt-3" color="primary">
                     Edit Post
                  </v-btn>
                  <!-- <v-btn @click="reset_file" class="mt-3" color="primary">
                     Reset
                  </v-btn> -->
               </v-form>
            </v-card>
         </v-col>
      </v-row>
   </v-container>
</template>

<script>
import API from "../api";
export default {
   name: "AddPost",

   data() {
      return {
         // rules: [(value) => !!value || "This field is required !"],
         error_snackbar:false,
         core_error_message: null,
         
         title_error_message: "",
         category_error_message: "",
         description_error_message: "",
         file_error_message: "",

         post_id: "",
         previous_image: "",

         post: {
            title: "",
            category: "",
            description: "",
            image: "",
         },

         // title_rules: [
         //    (v) => !!v || "Title is required",
         //    (v) =>
         //       (v && v.length >= 3) ||
         //       "Title must be greater than 3 characters",
         //    (v) =>
         //       (v && v.length <= 100) ||
         //       "Title must be less than 100 characters",
         // ],
         // description_rules: [
         //    (v) => !!v || "Description is required",
         //    (v) =>
         //       (v && v.length >= 3) ||
         //       "Title must be greater than 3 characters",
         //    (v) =>
         //       (v && v.length <= 1000) ||
         //       "Title must be less than 1000 characters",
         // ],
         // category_rules: [
         //    (v) => !!v || "Description is required",
         //    (v) =>
         //       (v && v != 'active') || (v && v != 'inactive')
         // ],
      };
   },

   methods: {
      selectFile(file) {
         this.reset_file()
         this.file_error = false;
         this.post.image = file
         console.log("message", this.post);
      },

      selectFile(file) {
         this.reset_file()
         this.file_error = false;
         this.post.image = file
         console.log("message", this.post);
      },

      async submitForm() {
         // console.log(this.post);
         if (this.$refs.form.validate()) {
            const formData = new FormData();
            formData.append("title", this.post.title);
            formData.append("category", this.post.category);
            formData.append("description", this.post.description);
            formData.append("file", this.post.image);

            // for (const value of formData.values()) {
            //    console.log(value);
            // }

            try {
               const response = await API.updatePost(this.post_id, formData);
               this.$router.push({
                  name: "Home",
                  params: { message: "Post Updated Successfully!" },
               });
            } catch (error) {

               this.core_error_message = error.message
               this.error_snackbar = true

               if (
                  error.response.data.error.errors.find(
                     ({ field }) => field === "title"
                  )
               ) {
                  this.title_error_message = error.response.data.error.errors.find(
                     ({ field }) => field === "title"
                  ).message;
                  this.title_error = true;
               }
               if (
                  error.response.data.error.errors.find(
                     ({ field }) => field === "category"
                  )
               ) {
                  this.category_error_message = error.response.data.error.errors.find(
                     ({ field }) => field === "category"
                  ).message;
                  this.category_error = true;
               }
               if (
                  error.response.data.error.errors.find(
                     ({ field }) => field === "description"
                  )
               ) {
                  this.description_error_message =
                     error.response.data.error.errors.find(
                        ({ field }) => field === "description"
                     ).message;
                  this.description_error = true;
               }
               if (
                  error.response.data.error.errors.find(
                     ({ field }) => field === "file"
                  )
               ) {
                  this.file_error_message = error.response.data.error.errors.find(
                     ({ field }) => field === "file"
                  ).message;
                  this.file_error = true;
               }
               // console.log(this.title_error_message, this.title_error);
               // console.log(this.error_messages.title)
               // console.log(error.response.data.error.errors)
            }
         } else {
            this.$refs.form.validate();
         }
      },

      reset_title() {
         this.title_error_message = ""
      },

      reset_category() {
         this.category_error_message = ""
      },

      reset_description() {
         this.description_error_message = ""
      },

      reset_file() {
         this.file_error_message = ""
      },

      // reset() {
      //    // this.title_error = false;
      //    // this.category_error = false;
      //    // this.description_error = false;
      //    // this.file_error = false;

      //    this.title_error_message = "";
      //    this.category_error_message = "";
      //    this.description_error_message = "";
      //    this.file_error_message = "";

      //    // console.log(this.title_error_message, this.title_error);
      // },
   },

   async created(){
      this.post_id = this.$route.params.id
      try {
         const post = await API.getPostById(this.post_id);
         console.log(post);
         this.post.title = post.title
         this.post.category = post.category
         this.post.description = post.description
         this.previous_image = post.image_url
      } catch (error) {
         console.log(error);
         error_snackbar
         this.$router.push({
            name: "Home",
            params: { error_message: error.response.data.error },
         });
      }
   },

   components: {
      // HelloWorld,
   },
};
</script>