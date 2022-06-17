
<template>
   <v-app id="inspire">
      <v-navigation-drawer
         v-model="drawer"
         app
      >
         <v-list-item>
            <v-list-item-content>
               <v-list-item-title class="text-h6">
                  Application
               </v-list-item-title>
               <v-list-item-subtitle>
                  MEVN Full Stack Application
               </v-list-item-subtitle>
            </v-list-item-content>
         </v-list-item>

         <v-divider></v-divider>

         <v-list
            dense
            nav
         >
            <v-list-item
               v-for="(item, i) in items"
               :key="i"
               link
               :to="item.link"
            >
               <v-list-item-icon>
               <v-icon>{{ item.icon }}</v-icon>
               </v-list-item-icon>

               <v-list-item-content>
               <v-list-item-title>{{ item.title }}</v-list-item-title>
               </v-list-item-content>
            </v-list-item>
         </v-list>

      </v-navigation-drawer>

      <v-app-bar app>
         <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

         <v-toolbar-title>Application</v-toolbar-title>
      </v-app-bar>

      <v-main>
         <router-view></router-view>
      </v-main>
   </v-app>
</template>

<script>
export default {
   data: () => ({ 
      drawer: null, // used to control sidebar toggle
      items: [  // sidebar items
         { title: 'Home', icon: 'mdi-home', link: "/" },
         { title: 'Add Post', icon: 'mdi-note-plus', link: "/add-post" },
         { title: 'About', icon: 'mdi-help-box', link: "/about" },
      ],
   }),
}
</script>