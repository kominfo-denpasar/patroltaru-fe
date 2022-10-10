<template>
     <v-container fluid fill-height >
        <v-col>
            <v-card style="padding: 8px; width: 100%; margin-top: 16px; background-color: #e2e2e2;" elevation="0">
                
                    <v-breadcrumbs :items="items" class="body-text black--text">
                        <template v-slot:divider>
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                        <template v-slot:item="{ item }">
                            <v-breadcrumbs-item
                                :href="item.href"
                            >
                                <span class="body-text black--text" v-if="item.disabled"><b>{{ item.text }}</b></span>
                                <span class="body-text black--text" v-else>{{ item.text }}</span>
                            </v-breadcrumbs-item>
                        </template>
                    </v-breadcrumbs>
            </v-card>
            <v-card style="padding: 8px; width: 100%; margin-top: 24px;" elevation="0">
                <v-stepper v-model="e1" >
                    <v-stepper-header>
                        <v-stepper-step
                            :complete="e1 > 1"
                            step="1"
                        >
                            <span class="body-text black--text light-bold-text">Pilih lokasi laporan pada peta</span><br>
                            <span class="body-text black--text" style="font-size: 11px; ">Klik peta untuk menentukan koordinat yang akan dilaporkan.</span>
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                            :complete="e1 > 2"
                            step="2"
                        >
                            <span class="body-text black--text light-bold-text">Detail Laporan</span><br>
                            <span class="body-text black--text" style="font-size: 11px; ">Isi detail laporan disertai dengan gambar bangunan.</span>
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3">
                            <span class="body-text black--text light-bold-text">Kirim Laporan</span><br>
                            <span class="body-text black--text" style="font-size: 11px; ">Proses pengiriman laporan dapat dilihat pada section ini</span>
                        </v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1" style="margin-bottom: 24px;">
                            <v-alert
                                icon="mdi-shield-lock-outline"
                                prominent
                                text
                                type="info"
                                style="margin-top: 48px; "
                                >
                                    <span class="blue-body-text" style="margin-left: 16px;">Info: Tunggu peta rencana tata ruang (peta berwarna) muncul untuk mengetahui wilayah cakupan laporan </span>
                            </v-alert>
                            <v-container fluid fill-height id="mapContainer" style="margin-bottom: 24px;">
                                
                            </v-container>
                            <v-form v-model="formLocation">
                                
                                <v-row>
                                    <v-col cols="2">
                                        <v-layout style="height: 40px;" align-center><label class="body-text">Koordinat</label></v-layout>
                                        <v-layout style="height: 40px; margin-top: 26px;" align-center><label class="body-text">Kecamatan / BWP</label></v-layout>
                                        <v-layout style="height: 40px; margin-top: 26px;" align-center><label class="body-text">Kelurahan / SBWP</label></v-layout>
                                        <v-layout style="height: 40px; margin-top: 26px;" align-center><label class="body-text">Zona</label></v-layout>
                                        <v-layout style="height: 40px; margin-top: 26px;" align-center><label class="body-text">Sub Zona</label></v-layout>
                                        <v-layout style="height: 40px; margin-top: 26px;" align-center><label class="body-text">Alamat Lengkap</label></v-layout>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            v-model="coordinateForm"
                                            
                                            label=""
                                            outlined
                                            dense
                                            clearable
                                            disabled
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="subDistricts"
                                            label=""
                                            outlined
                                            dense
                                            clearable
                                            disabled
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="urbanVillage"
                                            label=""
                                            outlined
                                            dense
                                            clearable
                                            disabled
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="zone"
                                            label=""
                                            outlined
                                            dense
                                            clearable
                                            disabled
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="subZone"
                                            label=""
                                            outlined
                                            dense
                                            clearable
                                            disabled
                                        ></v-text-field>
                                        <v-textarea
                                            v-model="address"
                                            label=""
                                            maxlength="255"
                                            counter
                                            outlined
                                            dense
                                            clearable
                                        ></v-textarea>
                                    </v-col>
                                    
                                </v-row>
                            </v-form>

                            <v-btn
                                color="primary"
                                @click="e1 = 2"
                                :disabled="!address"
                            >
                                Continue
                            </v-btn>
                            
                        </v-stepper-content>

                        <v-stepper-content step="2" style="margin-bottom: 24px;">
                            <v-form v-model="formDetailReport">
                                
                                <v-row>
                                    <v-col cols="2">
                                        <v-layout style="height: 40px;" align-center><label class="body-text">Topik</label></v-layout>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            v-model="topic"
                                            label=""
                                            outlined
                                            dense
                                            clearable
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="2">
                                        <v-layout style="height: 40px; margin-top: 26px;" align-center><label class="body-text">Jenis Kegiatan yang diadukan</label></v-layout>
                                        
                                    </v-col>
                                    <v-col cols="4">
                                        <v-autocomplete
                                            v-model="actType"
                                            :items="actTypeList"
                                            item-text="name"
                                            item-value="_id"
                                            outlined
                                            dense
                                            required
                                        ></v-autocomplete>
                                        
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="2">
                                        <v-layout style="height: 40px; margin-top: 26px;" align-center><label class="body-text">Gambar Bangunan</label></v-layout>
                                        
                                    </v-col>
                                    <v-col cols="4">
                                        <v-img
                                            v-show="imageReport"
                                            :src="imageReport"
                                            aspect-ratio="1.6"
                                            contain
                                        ></v-img>
                                        <v-btn
                                            depressed
                                            color="primary"
                                            style="margin-bottom: 8px; margin-top: 26px;"
                                            @click="pickFile()"
                                            block
                                        >
                                            <v-icon
                                                dark
                                                left
                                            >
                                                mdi-file-image-plus-outline
                                            </v-icon>
                                            Pilih Foto
                                        </v-btn>
                                        <input 
                                            ref="fileReport" 
                                            class="d-none" 
                                            type="file" 
                                            @change="onFileChanged"
                                        >
                                        
                                        
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="2">
                                        <v-layout style="height: 40px; margin-top: 26px;" align-center><label class="body-text">Isi Laporan</label></v-layout>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-textarea
                                            v-model="contentReport"
                                            label=""
                                            maxlength="255"
                                            counter
                                            outlined
                                            dense
                                            clearable
                                        ></v-textarea>
                                        <v-checkbox
                                            v-model="cbAgreement"
                                            label="Dengan ini, saya menyetujui bahwa laporan yang saya buat sesuai dengan apa yang saya temukan di lapangan dan tanpa kepentingan pribadi."
                                        ></v-checkbox>
                                    </v-col>
                                    
                                </v-row>
                            </v-form>

                            <label class="side-menu-text primary--text"><em>*all fields required </em></label>
                            <v-btn text class="body-text black--text" @click="e1 = 1">
                                Periksa Kembali
                            </v-btn>
                            <v-btn
                                color="primary"
                                class="body-text white--text"
                                @click="addReport()"
                            >
                                Continue
                            </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="3" style="margin-bottom: 24px;">
                            <v-alert
                                v-show="isError"
                                icon="mdi-alert"
                                text
                                type="error"
                                style="margin-bottom: 24px;"
                            >
                                <span style="margin-left: 16px;">Laporan gagal dikirim</span>
                            </v-alert>

                            <v-alert
                                v-show="isSuccess"
                                icon="mdi-check-circle"
                                text
                                type="info"
                                style="margin-bottom: 24px;"
                            >
                                <span style="margin-left: 16px;">Laporan berhasil dikirim</span>
                            </v-alert>

                            <v-btn
                                color="primary"
                                
                            >
                                <v-icon>mdi-refresh</v-icon>
                                Ulangi Kirim Laporan
                            </v-btn>

                            <v-btn
                                color="blue"
                                class="white--text"
                                @click="reloadPage()"
                            >
                                <v-icon>mdi-plus</v-icon>
                                {{ btnCreateNew }}
                            </v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card>
        </v-col>
        <LoadingBar :dialog.sync="loading.status" :message="loading.message" />
     </v-container>
</template>
<style scoped>
@import url('https://js.arcgis.com/4.2/esri/css/main.css');
#mapContainer {
  height: 45vh;
  width: 100%;
}
</style>
<script>
import { loadModules } from 'esri-loader';

import LoadingBar from '~/components/Loading.vue'
export default {
    auth: false,
    components: {
      LoadingBar,
    },
    data() {
        return {
            apiKey: process.env.gisApiKey,
            mapKey: process.env.webmapKey,
            latitude: process.env.latitude,
            longitude: process.env.longitude,
            e1: 1,
            rdtr: require('@/static/RDTR.json'),
            items: [
                {
                    text: 'Dashboard',
                    disabled: false,
                    href: '/dashboard/report/',
                },
                {
                    text: 'Report',
                    disabled: false,
                    href: '/dashboard/report/',
                },
                {
                    text: 'Create Report',
                    disabled: true,
                    href: 'breadcrumbs_link_2',
                },  

            ],
            formLocation: false,
            formDetailReport: false,
            coordinateForm: "",
            subDistricts: "",
            urbanVillage: "",
            zone: "",
            subZone: "",
            address: "",
            topic: "",
            actType: "",
            contentReport: "",
            cbAgreement: false,
            loading: {
                status: false,
                message: "Memuat Data",
            },
            isError: false,
            isSuccess: false,
            message: "Berhasil Merubah data profile",
            actType: "",
            actTypeList: [],
            imageReport: '',
            userMe: this.$auth.$storage.getLocalStorage("userMe"),
            btnCreateNew: "Buat Laporan Reguler Baru",
        }
    },

    watch: {
        coordinateForm: {
            handler () {
                this.getDataGeo();
            },
        }
    },

    mounted() {
        if (this.userMe.roleId.name === "reporter") {
            this.btnCreateNew = "Buat Laporan Baru";
        }
        this.setupMap();
        this.getActivities();
    },

    methods: {
        async setupMap() {
            

            loadModules(
                [
                    "esri/config", 
                    "esri/Map", 
                    'esri/views/MapView', 
                    'esri/WebMap', 
                    'esri/widgets/Search', 
                    'esri/layers/FeatureLayer', 
                    'esri/Graphic', 
                    'esri/layers/GraphicsLayer', 
                    'esri/layers/GeoJSONLayer', 
                    'esri/widgets/Legend', 
                    'esri/renderers/ClassBreaksRenderer', 
                    "esri/geometry/Point", 
                    "esri/geometry/Polygon",
                    "esri/geometry/geometryEngine",
                    "esri/rest/locator"
                ])
            .then(([esriConfig, Map, MapView, WebMap, Search, FeatureLayer, Graphic, GraphicsLayer, GeoJSONLayer, Legend, ClassBreaksRenderer, Point, Polygon, geometryEngine, locator]) => {
                // then we load a web map from an id
                esriConfig.apiKey = this.apiKey;
                let distinctRdtr = [];
                var unique = [];
                for( let i = 0; i < this.rdtr.features.length; i++ ){
                    if( !unique[this.rdtr.features[i].properties.KODUNK]){
                        distinctRdtr.push(this.rdtr.features[i].properties);
                        unique[this.rdtr.features[i].properties.KODUNK] = 1;
                    }
                }
                
                let classBreakerList = [];
                for (const key in distinctRdtr) {
                    if (Object.hasOwnProperty.call(distinctRdtr, key)) {
                        const dataRdtr = distinctRdtr[key];
                        let color = dataRdtr.KODWAR.split(' ').map(Number);
                        
                        const shapeColor = {
                            type: "simple-fill", // autocasts as new SimpleFillSymbol()
                            color: color,
                            style: "solid",
                            outline: {
                                width: 0.2,
                                color: [255, 255, 255, 0.5]
                            }
                        };
                        classBreakerList.push({
                            minValue: parseInt(dataRdtr.KOSBWP),
                            maxValue: parseInt(dataRdtr.KOSBWP),
                            symbol: shapeColor,
                            label: dataRdtr.KODUNK,
                        })
                    }
                }
                // console.log("classBreaker", classBreakerList)
                
                const renderer = new ClassBreaksRenderer({
                    field: "KOSBWP",
                    normalizationField: "",
                   
                    defaultSymbol: {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        color: "black",
                        style: "backward-diagonal",
                        outline: {
                            width: 1,
                            color: [50, 50, 50]
                        }
                    },
                    defaultLabel: "no data",
                    classBreakInfos: classBreakerList
                })

                

                const blob = new Blob([JSON.stringify(this.rdtr)], {
                    type: "application/json"
                });
                // URL reference to the blob
                const url = "https://services8.arcgis.com/XO7cNNRBI4D6Qb6d/arcgis/rest/services/RDTR_Yogyakarta/FeatureServer"; //URL.createObjectURL(blob);
                const geojsonlayer2 = new GeoJSONLayer({
                    url,
                    outFields: ["SBDATA", "KODUNK", "KOSBWP"],
                    renderer: renderer,
                    opacity: 1,
                    
                });
                const layer = new FeatureLayer({
                    // URL to the service
                    url: url,
                    outFields: ["SBDATA", "KODUNK", "KOSBWP"],
                    renderer: renderer,
                    opacity: 1,
                });
                const graphicsLayer = new GraphicsLayer();

                const map = new Map({
                    basemap: "arcgis-topographic" // Basemap layer service
                });
                map.add(graphicsLayer)
                map.add(layer)
                // and we show that map in a container w/ id #viewDiv
                var view = new MapView({
                    map: map,
                    container: "mapContainer",
                    center: [this.longitude, this.latitude ],
                    zoom: 13,
                    layers: [graphicsLayer]
                });

                const search = new Search({
                    view
                })

                view.when(() => {
                    const fetaureLayer = geojsonlayer2;

                   
                    // view.ui.add(legend, "bottom-left")
                    view.ui.add(search, "top-right")
                });


                var simpleMarkerSymbol = {
                        type: "simple-marker",
                        color: [252, 3, 3],  // red
                        outline: {
                            color: [255, 255, 255], // white
                            width: 1
                        }
                };

                var pointGraphic = new Graphic({
                    symbol: simpleMarkerSymbol
                });
                
                view.graphics.add(pointGraphic);
                

                view.popup.autoOpenEnabled = false;
                const serviceUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

                view.on("click", (event) => {
                    // Get the coordinates of the click on the view
                    var longitude = event.mapPoint.longitude;
                    var latitude = event.mapPoint.latitude;
                    
                    this.coordinateForm = latitude + ", " + longitude;
                    console.log(event);
                    // Round the coordinates for visualization purposes

                    var point = {
                        type: "point",
                        longitude: longitude, // Please make sure to use the unrounded values
                        latitude: latitude    // otherwise your point will appear in the wrong spot
                    };
                    pointGraphic.geometry = point;

                    const params = {
                        location: event.mapPoint
                    };

                    locator.locationToAddress(serviceUrl, params)
                        .then(function(response) { // Show the address found
                        const address = response.address;
                        console.log(response);
                    }, function(err) { // Show no address found
                        console.log("not found");
                    });

                    var pnt = new Point(longitude, latitude);
                    // for (const key in rdtr.features) {
                    //     if (Object.hasOwnProperty.call(rdtr.features[key].geometry.coordinates[0][0], key)) {
                    //         const rdtrPolygon = rdtr.features[key].geometry.coordinates[0][0];
                    //         var polygon = new Polygon([rdtrPolygon]);
                    //         const intersects = geometryEngine.intersects(polygon, pnt);
	                //         console.log("intersects", intersects);
                    //         console.log(polygon.contains(pnt));
                    //     }
                    // }

                    
                });

                view.when(() => { console.log('view ready'); })
            })
            .catch(err => {
                // handle any errors
                console.error(err);
            });
        },

        async getDataGeo() {
            this.subDistricts = "";
        },

        async getActivities() {
            this.loading.status = true;
            try {
                const activities = await this.$activities.getActivity({
                    "paginate": false,
                });
                this.actTypeList = activities;

                this.loading.status = false;
            } catch (error) {
                console.log(error);
                this.loading.status = false;
            }
        },

        async addReport() {
            this.loading.status = true;
            try {
                const requestFileReport = await this.$files.createFile({
                    file: this.$refs.fileReport.files[0]
                })
                const report = await this.$reports.createReport({
                    "intensityId": "632741d3e454d9e8b2d17fbe",
                    "topic": this.topic,
                    "activityId": this.actType,
                    "subDistrictId": "60a7a69b131bf32e5f5042f4",
                    "location": {
                        "type": "Point",
                        "coordinates": this.coordinateForm.split(", ").map(Number),
                    },
                    "imageId": requestFileReport._id,
                    "content": this.contentReport,
                    "address": this.address,
                    "status": "",
                    "result": ""
                });

                this.isSuccess = true;
                this.isError = false;
                this.loading.status = false;
                this.e1 = 3;
            } catch (error) {
                console.log(error);
                this.loading.status = false;
                this.isSuccess = false;
                this.isError = true;
            }
        },

        pickFile() {
            this.$refs.fileReport.click();
        },

        onFileChanged(e) {
            this.imageReport = URL.createObjectURL(e.target.files[0]);
        },

        reloadPage() {
            window.location.reload();
        }
    }

}
</script>