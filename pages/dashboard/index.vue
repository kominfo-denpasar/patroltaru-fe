<template>
    <v-app dark>
    
    
  </v-app>
</template>
<script>
export default {
    auth: false,
    data() {
        return {
            clipped: true,
            drawer: true,
            fixed: true,
            itemGroup: "",
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
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: process.env.title,
        }
    },
    mounted() {
      window.location = "/dashboard/report";
    }
}
</script>