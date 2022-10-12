<template>
  <v-app>
    <section id="home">
      <!-- :src="imageLink.sub_main" -->
      <v-img :src="landingImg" style="min-height: 100vh" contain>
        <v-layout column align-start justify-center class="white--text" style="padding-left: 24px; padding-right: 24px; width: 100%; height: 100%;" >
          <h1 class="header-text white--text light-bold-text" style="font-size: 4vw;">Pantau dan Kontrol <br>Tata Ruang</h1><br>
          <h2 class="title-text white--text light-bold-text" style="font-size: 2vw;">Layanan pengaduan masyarakat untuk <br>pengendalian pemanfaatan ruang</h2>
          <v-btn class="primary subtitle-text" dark x-large rounded to="/login" style="margin-top: 16px;">
            Masuk
          </v-btn>
        </v-layout>
      </v-img>
    </section>

    <section>
      <v-layout
        column
        wrap
        class="my-5"
        style="padding-top: 100px;"
        align-center
      >
        <v-flex xs12 sm4 class="my-3" >
          <div class="text-xs-center">
            <span class="headline"><b>Fitur Patrol Taru</b></span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl style="padding-top: 56px;">
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-4 transparent rounded-xl" style="padding: 24px;" height="350">
                  <v-card-title primary-title class="layout justify-center text-center">
                    <v-img
                      height="180"
                      :src="monitor"
                      contain
                    ></v-img>
                  </v-card-title>
                  <v-card-title primary-title class="layout justify-center text-center">
                    <span class="menu-landing-text">Pembuatan laporan dengan data RDTR dan <br>RTRW</span>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-4 transparent rounded-xl" style="padding: 24px;" height="350">
                  <v-card-title primary-title class="layout justify-center text-center">
                    <v-img
                      height="180"
                      :src="verify"
                      contain
                    ></v-img>
                  </v-card-title>
                  <v-card-title primary-title class="layout justify-center text-center">
                    <div class="menu-landing-text">Verifikasi laporan oleh dinas lebih mudah dan <br>cepat</div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-4 transparent rounded-xl" style="padding: 24px;" height="350">
                  <v-card-title primary-title class="layout justify-center text-center">
                    <v-img
                      height="180"
                      :src="map"
                      contain
                    ></v-img>
                  </v-card-title>
                  <v-card-title primary-title class="layout justify-center text-center">
                    <div class="menu-landing-text">Pemetaan laporan secara spasial</div>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section id="feature" style="background-color: #e4dfdf;">
      <!-- <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5"> -->
          <v-flex xs12 sm12>
            <v-carousel
              cycle
              height="600"
            >
              <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"
              >
                <v-card class="elevation-0 transparent rounded-xl" style="padding: 24px;">
                  <v-card-title primary-title class="layout justify-center text-center">
                    <v-img
                      :src="slide"
                      height="530"
                      contain
                    ></v-img>
                  </v-card-title>
                </v-card>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        <!-- </v-layout>
      </v-container> -->
    </section>

    <section class="tile">
      <v-container grid-list-xl >
        <v-layout col wrap align-center class="justify-center text-center" >
          <v-flex xs12 md12>
            <v-row justify="center" align="center" style="margin-bottom: 24px;">
              <v-col cols="3"><v-img :src="logoAtr" height="150" contain></v-img></v-col>
              <v-col cols="3"><v-img :src="logoKota" height="150" contain></v-img></v-col>
              <v-col cols="3"><v-img :src="logoKominfo" height="150" contain></v-img></v-col>
            </v-row>
            
            <div class="white--text">{{ address }}</div>
            <div class="white--text font-weight-bold">Copyright &copy; {{ new Date().getFullYear() }}. Pemerintah Kota Denpasar</div>
            <!-- <div class="white--text font-weight-bold">{{ copyright }}</div> -->
          </v-flex>
        </v-layout>   
      </v-container>
    </section>
  </v-app>
</template>

<script>
export default {
  name: "App",

  auth: false,

  data() {
    return {
      title: process.env.title,
      address: process.env.address,
      copyright: process.env.copyright,
      monitor: require('@/assets/img/monitor.png'),
      verify: require('@/assets/img/verify.png'),
      map: require('@/assets/img/map.png'),
      landingImg: require('@/assets/img/landing-page.png'),
      logoAtr: require('@/assets/img/logo_atr.png'),
      logoKominfo: require('@/assets/img/logo-kominfo.png'),
      logoKota: require('@/assets/img/logo_kota.png'),
      slides: [
        require('@/assets/img/landing-page-footer-1.png'),
        require('@/assets/img/landing-page-footer-2.png'),
        require('@/assets/img/landing-page-footer-3.png'),
      ],
    }
  }
};
</script>