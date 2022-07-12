<template>
   <v-container class="mx-auto my-auto">
      <v-row no-gutters>
         <v-col>
            <v-card class="pa-5">
               <v-card-title> Register </v-card-title>
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
                  <!-- :rules="email_rules" -->

                  <v-text-field
                     label="Name"
                     prepend-icon="mdi-account"
                     v-model="auth.name"
                     :error-messages="name_error_message"
                     @keyup="reset_name"
                     @keyup.native.enter="submitForm()"
                  ></v-text-field>

                  <v-text-field
                     label="Email"
                     prepend-icon="mdi-email"
                     v-model="auth.email"
                     :error-messages="email_error_message"
                     @keyup="reset_email"
                     @keyup.native.enter="submitForm()"
                  ></v-text-field>

                  <v-textarea
                     label="Password"
                     prepend-icon="mdi-clipboard-text-outline"
                     v-model="auth.password"
                     auto-grow
                     rows="2"
                     :error-messages="password_error_message"
                     @keyup="reset_password"
                     @keyup.native.enter="submitForm()"
                  ></v-textarea>
                  <!-- :rules="rules" -->

                  <!-- 
                  <v-textarea
                     label="Confirm Password"
                     prepend-icon="mdi-clipboard-text-outline"
                     v-model="auth.confirm_password"
                     auto-grow
                     rows="2"
                     @keyup="reset_confirm_password"
                     @keyup.enter="submitForm()"
                  ></v-textarea>
                  -->

                  <v-btn type="submit" class="mt-3" color="primary">
                     Register
                  </v-btn>
               </v-form>
            </v-card>
         </v-col>
      </v-row>
   </v-container>
</template>

<script>
import axios from 'axios';
import API from "../../api";
export default {
   name: "Login",

   data() {
      return {
         // rules: [(value) => !!value || "This field is required !"],
         error_snackbar:false,
         core_error_message: null,
         
         name_error_message: "",
         email_error_message: "",
         password_error_message: "",

         auth: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
         },

         name_rules: [
            (v) => !!v || "Name is required",
            (v) =>
               (v && v.length >= 3) ||
               "Name must be greater than 3 characters",
         ],
         email_rules: [
            (v) => !!v || "Email is required",
            (v) => /.+@.+/.test(v) || 'E-mail must be valid',
         ],
         password_rules: [
            (v) => !!v || "password is required",
            (v) =>
               (v && v.length >= 6) ||
               "Password must be greater than 6 characters",
            (v) => v === this.auth.password_confirm || "password and confirm doesn't match",
         ],
      };
   },

   methods: {
      async submitForm() {
         // console.log(this.post);
         if (this.$refs.form.validate()) {
            const formData = new FormData();
            formData.append("name", this.auth.name);
            formData.append("email", this.auth.email);
            formData.append("password", this.auth.password);

            // for (const value of formData.values()) {
            //    console.log(value);
            // }

            try {
               const response = await API.register(formData);

               window.localStorage.setItem('auth_user', response.user.name);
               window.localStorage.setItem('auth_token', response.token);

               console.log("Register VIew", window.localStorage.getItem('auth_token'))

               this.$router.push({
                  name: "Home",
                  params: { message: "Registration Successful !!" },
               });

            } catch (error) {

               console.log(error)

               this.core_error_message = error.message;
               this.error_snackbar = true

               if (
                  error.response.data.error.errors.find(
                     ({ field }) => field === "name"
                  )
               ) {
                  this.name_error_message = error.response.data.error.errors.find(
                     ({ field }) => field === "name"
                  ).message;
                  this.name_error = true;
               }
               if (
                  error.response.data.error.errors.find(
                     ({ field }) => field === "email"
                  )
               ) {
                  this.email_error_message = error.response.data.error.errors.find(
                     ({ field }) => field === "email"
                  ).message;
                  this.email_error = true;
               }
               if (
                  error.response.data.error.errors.find(
                     ({ field }) => field === "password"
                  )
               ) {
                  this.password_error_message =
                     error.response.data.error.errors.find(
                        ({ field }) => field === "password"
                     ).message;
                  this.password_error = true;
               }

               // console.log(this.title_error_message, this.title_error);
               // console.log(this.error_messages.title)
               // console.log(error.response.data.error.errors)
            }
         } else {
            this.$refs.form.validate();
         }
      },

      reset_name() {
         this.name_error_message = ""
      },
      reset_email() {
         this.email_error_message = ""
      },
      reset_password() {
         this.password_error_message = ""
      },
      reset_confirm_password() {
         this.password_error_message = ""
      },

   },

   components: {
      // HelloWorld,
   },
};
</script>