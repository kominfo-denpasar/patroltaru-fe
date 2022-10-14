<template>
  <v-app dark>
    <!-- <div style="background: #000000; max-width: 250; position: absolute; height: 100vh;"></div> -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color=accent
      :width="200"
      elevation="0"
      v-if="this.$store.state.auth.user"
      :permanent="isPermanent"
      disabled
      app
    >
      
      <v-list shaped :width="200" >
        <v-list-item-group
          v-model="itemGroup"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            :class="$route.path == item.to ? 'primary' : ''"
            router
            exact
          >
            <v-list-item-content class="side-menu-text white--text">
              <v-col justify="center" align="center">
                <v-icon color="white" large>{{ item.icon }}</v-icon><br><br>
                <span>{{ item.title }}</span>
              </v-col>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar :clipped-left="clipped" fixed app elevation="1" style="background-color: white;" v-if="showAppBar">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      
      <v-toolbar-title class="body-text"><div @click="backToHome()"><v-img :src="imgAppbar" max-height="40" max-width="160" contain></v-img></div></v-toolbar-title>
      <v-spacer />
      
      <v-row justify="end" align="center" v-if="this.$store.state.auth.user || this.$route.path == '/login'">
        <span class="body-text black--text light-bold-text">{{ userMe ? userMe.email : "" }}</span>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              color="indigo"
              dark
              v-bind="attrs"
              v-on="on"
              
              icon
            >
            <!-- @click="logout()" -->
              <v-icon color="black">mdi-account-circle</v-icon>
            </v-btn>
            
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon color="black">mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ userMe ? userMe.username : "" }}</v-list-item-title>
                  <v-list-item-subtitle>{{ userMe ? userMe.email : "" }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item-group>
                <v-list-item to="/reporter/profile" @click="menu = false" v-show="userMe && userMe.roleId.name === 'reporter'" >
                  <v-list-item-content>Profile</v-list-item-content>
                </v-list-item>
                <v-list-item to="/dashboard/settings" @click="menu = false" v-show="userMe && userMe.roleId.name === 'administrator'" >
                  <v-list-item-content>Settings</v-list-item-content>
                </v-list-item>
                <v-list-item @click="logoutUser()" class="red--text">
                  <v-list-item-content>Logout</v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
        
      </v-row>
        
      <v-row justify="end" align="center" v-else>
        <v-btn href="#home" text class="body-text light-bold-text">
          Beranda
        </v-btn>
        <v-btn href="#feature" text class="body-text light-bold-text">
          Fitur
        </v-btn>
        <v-btn to="/login" text class="body-text light-bold-text">
          Login
        </v-btn>
        <v-btn elevation="0" class="primary body-text light-bold-text" style="margin-right: 16px;" target="_blank" rounded :href="linkTataRuang">
          Info Tata Ruang
        </v-btn>
      </v-row>
      
    </v-app-bar>
    <!-- v-if="this.$store.state.auth.user || this.$route.path == '/login'" -->
    <v-main :class="this.$store.state.auth.user ? 'white' : 'white'" v-if="isAdmin">
      <v-container fluid style="padding: 0; margin: 0;">
        <Nuxt />
      </v-container>
    </v-main>
    <v-main class='white' v-else>
      <v-container fluid style="padding: 0; margin: 0;">
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
    <LogoutDialog :dialog.sync="logoutDialog" />

    
  </v-app>
</template>

<script>
import LogoutDialog from '~/components/LogoutDialog.vue'
export default {
  name: 'DefaultLayout',
  components: {
    LogoutDialog,
  },
  data() {
    return {
      clipped: true,
      drawer: false,
      isPermanent: false,
      fixed: false,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      logoutDialog: false,
      isAdmin: false,
      items: [
        {
            icon: 'mdi-file-document-multiple',
            title: 'Data Laporan',
            to: '/dashboard/report',
        },
        {
            icon: 'mdi-map-marker-multiple',
            title: 'Pemetaan Laporan',
            to: '/dashboard/mapping',
        },
        {
            icon: 'mdi-progress-question',
            title: 'Panduan Verifikasi',
            to: '/guide'  
        },
        {
            icon: 'mdi-account',
            title: 'Profile',
            to: '/dashboard/profile',
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: process.env.title,
      address: process.env.address,
      itemGroup: "",
      email: "",
      emailRules: [
        v => {
          return !!v || "E-mail is required";
        },
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      subscribed: false,
      linkTataRuang: process.env.tataruang,
      userMe: this.$auth.$storage.getLocalStorage("userMe"),
      baseColor: 'primary',
      baseSecondaryColor: 'secondary',
      imgAppbar: require('@/assets/img/logo-appbar.png'),
      showAppBar: true,
    }
  },
  computed: {
    imgHeight() {
      var offset = 320;
      console.log("new image height is " + (this.pageHeight - offset));
      return this.pageHeight - offset;
    }
  },

  mounted() {
   
    setInterval(() => {
      if (!this.$store.state.auth.user && this.$route.path != '/landing-page' && this.$route.path != "/login" && this.$route.path != "/register") {
        window.location = "/landing-page"
        this.drawer = false;
        this.isPermanent = false;
        this.clipped = false;
        
      }

      if (this.$route.path == "/login" || this.$route.path == "/register") {
        this.showAppBar = false;
      }

      if (this.$store.state.auth.user && this.$route.path == '/') {
        
        if (this.userMe.roleId.name === "reporter") {
          this.isAdmin = false;
          window.location = "/reporter/report"
        } else {
          window.location = "/dashboard/report"
        }
      }

      if (this.$store.state.auth.user != null) {
        this.isAdmin = false;
        this.drawer = false;
        this.isPermanent = false;
        this.clipped = false;
        if (this.userMe.roleId.name === "reporter") {
          this.isAdmin = false;
          
        } else {
          this.isAdmin = true;
          this.drawer = true;
          this.isPermanent = true;
        }
      }
    }, 500);
    
    setTimeout(() => {
      if (this.$store.state.auth.user != null) {
        
        this.getSettings();
      }
    }, 1000);
  },

  methods: {
    
    async getSettings() {
      try {
        const reqSetting = await this.$settings.getSetting();

        if (reqSetting.total > 0) {
          this.title = reqSetting.data[0].app_name;
          // this.$vuetify.theme.themes.light.primary = reqSetting.data[0].primary_color;
          // this.$vuetify.theme.themes.light.secondary = reqSetting.data[0].secondary_color;
        }
        const reqUser = await this.$users.getUserById(this.userMe._id, {
            '$populate[0]': 'roleId',
        });
        this.$auth.setUser(reqUser)
        this.$auth.$storage.setLocalStorage("userMe", reqUser)
        this.filterRole();

      } catch (error) {
        console.log(error);
        if (error.toString().includes("Error: Request failed with status code 401")) {
          console.log("unauthorize");
          this.logoutDialog = true;
        }
      }
    },

    filterRole() {
      let me = this.$auth.$storage.getLocalStorage("userMe");
      
      if(me.roleId.name === "administrator") {
        this.items = [
          {
              icon: 'mdi-file-document-multiple',
              title: 'Data Laporan',
              to: '/dashboard/report',
          },
          {
              icon: 'mdi-map-marker-multiple',
              title: 'Pemetaan Laporan',
              to: '/dashboard/mapping',
          },
          {
              icon: 'mdi-account-group',
              title: 'Data User',
              to: '/dashboard/users'
          },
          {
              icon: 'mdi-progress-question',
              title: 'Panduan Verifikasi',
              to: '/guide'  
          },
          {
              icon: 'mdi-account',
              title: 'Profile',
              to: '/dashboard/profile',
          }
        ];
      }
    },

    subscribe() {
      this.subscribed = !this.subscribed;
    },

    async logout() {
      await this.$auth.logout();
      window.location.reload();
    },

    backToHome() {
      window.location = "/dashboard/report"
    },

    logoutUser() {
      this.logout();
    }
  }
}
</script>
