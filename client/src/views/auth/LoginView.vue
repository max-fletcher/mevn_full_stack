<template>
   <v-container>
      <v-row no-gutters>
         <v-col sm="10" class="mx-auto">
            <v-card class="pa-5">
               <v-card-title> Login </v-card-title>
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
                     label="Email"
                     prepend-icon="mdi-format-title"
                     v-model="auth.email"
                     :error-messages="email_error_message"
                     @keyup="reset_email"
                     @keyup.enter="submitForm()"
                  ></v-text-field>

                  <v-textarea
                     label="Password"
                     prepend-icon="mdi-clipboard-text-outline"
                     v-model="auth.password"
                     auto-grow
                     rows="2"
                     :error-messages="password_error_message"
                     @keyup="reset_password"
                     @keyup.enter="submitForm()"
                  ></v-textarea>
                  <!-- :rules="rules" -->

                  <v-btn type="submit" class="mt-3" color="primary">
                     Login
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
         
         email_error_message: "",
         password_error_message: "",

         auth: {
            email: "",
            password: "",
         },

         email_rules: [
            (v) => !!v || "Email is required",
            (v) => /.+@.+/.test(v) || 'E-mail must be valid',
         ],
         password_rules: [
            (v) => !!v || "password is required",
            (v) =>
               (v && v.length >= 6) ||
               "Title must be greater than 6 characters",
         ],
      };
   },

   methods: {
      async submitForm() {
         // console.log(this.post);
         if (this.$refs.form.validate()) {
            const formData = new FormData();
            formData.append("email", this.auth.email);
            formData.append("password", this.auth.password);

            // for (const value of formData.values()) {
            //    console.log(value);
            // }

            try {
               const response = await API.login(formData);

               window.localStorage.setItem('auth_user', response.user.name);
               window.localStorage.setItem('auth_token', response.token);

               console.log("Login VIew", window.localStorage.getItem('auth_token'))

               this.$router.push({
                  name: "Home",
                  params: { message: "Login Successful !!" },
               });

            } catch (error) {

               console.log(error)

               this.core_error_message = error.message;
               this.error_snackbar = true
               
               // if (
               //    error.response.data.error.errors.find(
               //       ({ field }) => field === "email"
               //    )
               // ) {
               //    this.email_error_message = error.response.data.error.errors.find(
               //       ({ field }) => field === "email"
               //    ).message;
               //    this.email_error = true;
               // }
               // if (
               //    error.response.data.error.errors.find(
               //       ({ field }) => field === "password"
               //    )
               // ) {
               //    this.password_error_message =
               //       error.response.data.error.errors.find(
               //          ({ field }) => field === "password"
               //       ).message;
               //    this.password_error = true;
               // }

               // console.log(this.title_error_message, this.title_error);
               // console.log(this.error_messages.title)
               // console.log(error.response.data.error.errors)
            }
         } else {
            this.$refs.form.validate();
         }
      },

      reset_email() {
         this.email_error_message = ""
      },

      reset_password() {
         this.password_error_message = ""
      },

   },

   components: {
      // HelloWorld,
   },
};
</script>