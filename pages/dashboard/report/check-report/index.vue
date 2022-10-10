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
                           <span class="body-text black--text light-bold-text">Konfirmasi Lokasi</span><br>
                       </v-stepper-step>

                       <v-divider></v-divider>

                       <v-stepper-step
                           :complete="e1 > 2"
                           step="2"
                       >
                           <span class="body-text black--text light-bold-text">Isi Detail Pemeriksaan</span><br>
                       </v-stepper-step>

                       <v-divider></v-divider>

                       <v-stepper-step step="3">
                           <span class="body-text black--text light-bold-text">Review</span><br>
                       </v-stepper-step>

                       <v-stepper-step step="4">
                           <span class="body-text black--text light-bold-text">Submit</span><br>
                       </v-stepper-step>
                   </v-stepper-header>

                   <v-stepper-items>
                       <v-stepper-content step="1" style="margin-bottom: 24px;">
                        <v-card>
                            <v-card-text>
                                <span class="body-text">Laporan ID <strong class="black--text">{{ report._id }}</strong> | dibuat pada tanggal <strong class="black--text">{{ report ? report.createdAt : "" }}</strong> | dilaporkan oleh <strong class="black--text">{{ report ? report.author ? report.author.username : "" : "" }}</strong></span><br><br>
                                <v-divider></v-divider><br>
                                <span class="body-text light-bold-text">Apakah anda yakin akan memeriksa lokasi ini ?</span><br><br>
                                <v-container fluid fill-height id="mapContainer" style="margin-bottom: 24px;">
                                    
                                </v-container>
                                <v-form v-model="formLocation">
                                
                                    <v-row>
                                        <v-col cols="6">
                                            <v-layout style="height: 40px;" align-center><label class="body-text"><strong class="black--text">Koordinat</strong></label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text"><strong class="black--text">Kecamatan / BWP</strong></label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text"><strong class="black--text">Kelurahan / SBWP</strong></label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text"><strong class="black--text">Zona</strong></label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text"><strong class="black--text">Sub Zona</strong></label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text"><strong class="black--text">Alamat Lengkap</strong></label></v-layout>
                                        </v-col>
                                        
                                        <v-col cols="6">
                                            <v-layout style="height: 40px;" align-center><label class="body-text">{{ coordinateForm ? coordinateForm : "-"}}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ report ? report.subDistrictId ? report.subDistrictId.districtId ? report.subDistrictId.districtId.name : "-" : "-" : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ report ? report.subDistrictId ? report.subDistrictId.name : "-" : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Zona</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Sub Zona</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ report ? report.address : "-" }}</label></v-layout>
                                        </v-col>
                                    </v-row>
                                    <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-layout style="height: 40px;" align-center><label class="body-text"><strong class="black--text">Koefisien Dasar Bangunan</strong></label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text"><strong class="black--text">Koefisien Lantai Bangunan</strong></label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text"><strong class="black--text">Koefisien Dasar Hijau</strong></label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text"><strong class="black--text">Koefisien Tapak Basement</strong></label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text"><strong class="black--text">Garis Sempadan Bangunan</strong></label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text"><strong class="black--text">Ketinggian Bangunan</strong></label></v-layout>
                                        </v-col>
                                        
                                        <v-col cols="6">
                                            <v-layout style="height: 40px;" align-center><label class="body-text">-</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    @click="e1 = 2"
                                    :disabled="!address"
                                >
                                    Continue
                                </v-btn>
                            </v-card-actions>
                           
                        </v-card>
                       </v-stepper-content>

                       <v-stepper-content step="2" style="margin-bottom: 24px;">
                            <v-card>
                                <v-card style="background-color: #e5f3fe;" elevation="0">
                                    <v-card-text>
                                        <span class="body-text light-bold-text">Informasi Insensitas Ruang</span>
                                        <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                                        <v-row>
                                            <v-col cols="6">
                                                <span class="body-text light-bold-text">Zona</span><br>
                                                <span class="body-text">-</span><br><br>
                                                <span class="body-text light-bold-text">Koefisien Dasar Bangunan</span><br>
                                                <span class="body-text">-</span><br><br>
                                                <span class="body-text light-bold-text">Koefisien Dasar Hijau</span><br>
                                                <span class="body-text">-</span><br><br>
                                                <span class="body-text light-bold-text">Garis Sempadan Bangunan</span><br>
                                                <span class="body-text">-</span><br><br>
                                            </v-col>
                                            <v-col cols="6">
                                                <span class="body-text light-bold-text">Sub Zona</span><br>
                                                <span class="body-text">-</span><br><br>
                                                <span class="body-text light-bold-text">Koefisien Lantai Bangunan</span><br>
                                                <span class="body-text">-</span><br><br>
                                                <span class="body-text light-bold-text">Koefisien Tapak Basement</span><br>
                                                <span class="body-text">-</span><br><br>
                                                <span class="body-text light-bold-text">Ketinggian Bangunan</span><br>
                                                <span class="body-text">-</span><br><br>
                                            </v-col>
                                        </v-row>
                                        <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                                    </v-card-text>
                                </v-card>
                                <v-form v-model="formDetailReport" ref="formDetailReport" style="margin-top: 48px; margin-bottom: 16px;">
                                    <span class="body-text light-bold-text">Informasi Insensitas Ruang</span><br>
                                    <v-row style="padding-top: 24px;">
                                        <v-col cols="6">
                                            <label class="body-text">Nomor IMB</label>
                                            <v-text-field
                                                v-model="imb"
                                                label=""
                                                placeholder="e.g 0957/0952/1282/2.5/0501/11/2018"
                                                :rules="[() => !!imb || 'This field is required']"
                                                required
                                                outlined
                                                dense
                                                clearable
                                            ></v-text-field>
                                            <label class="body-text">Pemilik Bangunan</label>
                                            <v-text-field
                                                v-model="buildingOwner"
                                                label=""
                                                :rules="[() => !!buildingOwner || 'This field is required']"
                                                required
                                                outlined
                                                dense
                                                clearable
                                            ></v-text-field>
                                            <label class="body-text">Penggunaan Bangunan Berdasarkan IMB</label>
                                            <v-text-field
                                                v-model="buildingBasedImb"
                                                label=""
                                                :rules="[() => !!buildingBasedImb || 'This field is required']"
                                                required
                                                outlined
                                                dense
                                                clearable
                                            ></v-text-field>
                                            <label class="body-text">Jumlah Unit Bangunan Berdasarkan IMB</label>
                                            <v-text-field
                                                v-model="buildingUnitsBasedImb"
                                                label=""
                                                :rules="[() => !!buildingUnitsBasedImb || 'This field is required']"
                                                type="number"
                                                required
                                                outlined
                                                dense
                                                clearable
                                            ></v-text-field>
                                            <label class="body-text">Jumlah Lantai Bangunan Berdasarkan IMB</label>
                                            <v-text-field
                                                v-model="buildingFloorsBasedImb"
                                                label=""
                                                :rules="[() => !!buildingFloorsBasedImb || 'This field is required']"
                                                type="number"
                                                required
                                                outlined
                                                dense
                                                clearable
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <label class="body-text">Tanggal IMB</label>
                                            <v-menu
                                                ref="menu"
                                                v-model="menu"
                                                :close-on-content-click="false"
                                                :return-value.sync="dateImb"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="auto"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        v-model="dateImb"
                                                        label=""
                                                        placeholder="Pilih Tanggal IMB Disini"
                                                        append-icon="mdi-calendar-range"
                                                        required
                                                        outlined
                                                        dense
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="dateImb"
                                                    no-title
                                                    scrollable
                                                    >
                                                    <v-spacer></v-spacer>
                                                    <v-btn
                                                        text
                                                        color="primary"
                                                        @click="menu = false"
                                                    >
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn
                                                        text
                                                        color="primary"
                                                        @click="$refs.menu.save(dateImb)"
                                                    >
                                                        OK
                                                    </v-btn>
                                                </v-date-picker>
                                            </v-menu>
                                            <label class="body-text">Pelaksana Bangunan</label>
                                            <v-text-field
                                                v-model="buildingExecutor"
                                                label=""
                                                :rules="[() => !!buildingExecutor || 'This field is required']"
                                                required
                                                outlined
                                                dense
                                                clearable
                                            ></v-text-field>
                                            <label class="body-text">Penggunaan Dilapangan</label>
                                            <v-text-field
                                                v-model="fieldUse"
                                                label=""
                                                :rules="[() => !!fieldUse || 'This field is required']"
                                                required
                                                outlined
                                                dense
                                                clearable
                                            ></v-text-field>
                                            <label class="body-text">Jumlah Unit Dilapangan</label>
                                            <v-text-field
                                                v-model="numberOfFieldUnits"
                                                label=""
                                                :rules="[() => !!numberOfFieldUnits || 'This field is required']"
                                                type="number"
                                                required
                                                outlined
                                                dense
                                                clearable
                                            ></v-text-field>
                                            <label class="body-text">Jumlah Lantai Bangunan Dilapangan</label>
                                            <v-text-field
                                                v-model="numberOfFloorsField"
                                                label=""
                                                :rules="[() => !!numberOfFloorsField || 'This field is required']"
                                                type="number"
                                                required
                                                outlined
                                                dense
                                                clearable
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-divider style="margin-top: 8px; margin-bottom: 24px;"></v-divider>
                                    <label class="body-text">Pelanggaran Bangunan</label>
                                    <v-textarea
                                        v-model="buildingViolation"
                                        label=""
                                        :rules="[() => !!buildingViolation || 'This field is required']"
                                        required
                                        outlined
                                        dense
                                        clearable
                                    ></v-textarea>
                                    <label class="body-text">Ketentuan Izin</label>
                                    <v-text-field
                                        v-model="permissionTerms"
                                        label=""
                                        :rules="[() => !!permissionTerms || 'This field is required']"
                                        required
                                        outlined
                                        dense
                                        clearable
                                    ></v-text-field>
                                    <label class="body-text">Persentase Pada Saat Diperiksa</label>
                                    <v-text-field
                                        v-model="percentageWhenChecked"
                                        append-icon="mdi-percent-outline"
                                        label=""
                                        type="number"
                                        :rules="[() => !!percentageWhenChecked || 'This field is required']"
                                        required
                                        outlined
                                        dense
                                        clearable
                                    ></v-text-field>
                                    <label class="body-text" >Gambar Situasi Dilapangan</label>
                                    <v-row >
                                        <v-col v-for="(item, index) in listFieldImg" :key="index" style="margin-bottom: 24px;" cols="1">
                                            <v-card style="background-color: lightgrey;" elevation="0" min-width="100" max-width="100" min-height="100" max-height="100" v-if="item.file == ''">
                                                <v-card-text >
                                                    <v-row align="center" justify="center">
                                                        <v-col cols="12" align="center" justify="center" style="padding-top: 28px;">
                                                            <v-btn
                                                                icon
                                                                color="black"
                                                                @click="onClickFieldImg(index)"
                                                            >
                                                                <v-icon dark>
                                                                    mdi-plus
                                                                </v-icon>
                                                            </v-btn>    
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                            <v-img v-else
                                                :src="item.img"
                                                @click="onClickFieldImg(index)"
                                                width="100"
                                                height="100"
                                                contain
                                            ></v-img>
                                        </v-col>
                                        
                                    </v-row>
                                    <input 
                                        ref="imgField"
                                        class="d-none" 
                                        type="file" 
                                        @change="onImgFieldChanged"
                                    >
                                    <label class="body-text">Gambar Denah</label>
                                    <v-card style="background-color: lightgrey; margin-bottom: 24px;" elevation="0" min-width="100" max-width="100" min-height="100" max-height="100" v-if="imgFloorPlan == ''">
                                        <v-card-text >
                                            <v-row align="center" justify="center">
                                                <v-col cols="12" align="center" justify="center" style="padding-top: 28px;">
                                                    <v-btn
                                                        icon
                                                        color="black"
                                                        @click="onClickFloorplanImg"
                                                    >
                                                        <v-icon dark>
                                                            mdi-plus
                                                        </v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                    <v-img v-else
                                        :src="imgFloorPlan"
                                        width="100"
                                        height="100"
                                        @click="onClickFloorplanImg"
                                        color="lightgrey"
                                        style="margin-bottom: 24px;"
                                        contain
                                    ></v-img>
                                    <input 
                                        ref="imgFloorPlan" 
                                        class="d-none" 
                                        type="file" 
                                        @change="onImgFloorplanChanged"
                                    >
                                    <label class="body-text">Skala Denah</label>
                                    <v-text-field
                                        v-model="floorPlan"
                                        prepend-icon="mdi-numeric-1"
                                        label=""
                                        type="number"
                                        required
                                        outlined
                                        dense
                                        clearable
                                    ></v-text-field>
                                </v-form>
                                <v-alert v-if="isError"
                                    icon="mdi-alert"
                                    prominent
                                    text
                                    type="error"
                                    style="margin-bottom: 24px;"
                                    >
                                    <span style="margin-left: 16px;" class="body-text red--text light-bold-text">{{ errorMsg }}</span>
                                </v-alert>

                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-btn
                                        color="primary"
                                        @click="e1 = 1"
                                        text
                                    >
                                        <v-icon>mdi-arrow-left</v-icon>
                                        Back
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        @click="verifyFrom()"
                                    >
                                        Continue
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                       </v-stepper-content>

                       <v-stepper-content step="3" style="margin-bottom: 24px;">
                            <v-card>
                                <v-card-text>
                                    <label class="body-text">Silahkan Review Hasil Pemeriksaan. Jika sudah sesuai, mohon klik tombol <strong>Submit.</strong></label><br><br>
                                    <label class="body-text light-bold-text">Gambar Bangunan</label>
                                    <v-row style="margin-top: 8px; margin-bottom: 8px;">
                                        <v-col v-for="(item, index) in listFieldImg" :key="index" style="margin-bottom: 24px;" cols="1">
                                            <v-img v-if="item.file != ''"
                                                :src="item.img"
                                                @click="onClickFieldImg(index)"
                                                width="100"
                                                height="100"
                                                contain
                                            ></v-img>
                                        </v-col>
                                        
                                    </v-row>
                                    <label class="body-text light-bold-text">Gambar Denah</label>
                                    <v-img v-if="imgFloorPlan != ''"
                                        :src="imgFloorPlan"
                                        width="100"
                                        height="100"
                                        @click="onClickFloorplanImg"
                                        color="lightgrey"
                                        style="margin-bottom: 24px;"
                                        contain
                                    ></v-img>
                                    <label class="body-text light-bold-text">Detail Data</label>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Koordinat (Latitude)</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Koordinat (Longitude)</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Kecamatan / BWP</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Kelurahan / SBWP</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Zona</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Sub Zona</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Alamat Lengkap</label></v-layout>
                                            <!-- detail pemeriksaan -->
                                            <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Koefisien Dasar Bangunan (KDB)</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Koefisien Lantai Bangunan (KLB)</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Koefisien Dasar Hijau (KDH)</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Koefisien Tapak Basement</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Garis Sempadan Bangunan</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Ketinggian Bangunan</label></v-layout>
                                            <!-- detail pemeriksaan section2 -->
                                            <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Nomor IMB</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Tanggal IMB</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Nama Pemilik</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Nama Pelaksana</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Penggunaan Bangunan berdasarkan IMB</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Jumlah Unit Berdasakan IMB</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Jumlah Lantai Berdasarkan IMB</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Penggunaan Bangunan Berdasarkan Temuan</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Jumlah Unit Berdasarkan Temuan</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Jumlah Lantai Berdasarkan Temuan</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Pelanggaran Bangunan</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Kondisi Izin</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Persentase Bangunan</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Skala</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ report ? report.location ? report.location.coordinates[0] : "-" : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ report ? report.location ? report.location.coordinates[1] : "-" : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ report ? report.subDistrictId ? report.subDistrictId.districtId ? report.subDistrictId.districtId.name : "-" : "-" : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ report ? report.subDistrictId ? report.subDistrictId.name : "-" : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Zona</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">Sub Zona</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ report ? report.address : "-" }}</label></v-layout>
                                            <!-- detail pemeriksaan -->
                                            <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                            <!-- detail pemeriksaan section2 -->
                                            <v-divider style="margin-top: 16px; margin-bottom: 16px;"></v-divider>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ imb ? imb : "-"}}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ dateImb ? dateImb : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ buildingOwner ? buildingOwner : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ buildingExecutor ? buildingExecutor : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ buildingBasedImb ? buildingBasedImb : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ buildingUnitsBasedImb ? buildingUnitsBasedImb : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ buildingFloorsBasedImb ? buildingFloorsBasedImb : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ fieldUse ? fieldUse : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ numberOfFieldUnits ? numberOfFieldUnits : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ numberOfFloorsField ? numberOfFloorsField : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ buildingViolation ? buildingViolation : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ permissionTerms ? permissionTerms : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ percentageWhenChecked ? percentageWhenChecked : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">{{ floorPlan ? floorPlan : "-" }}</label></v-layout>
                                            <v-layout style="height: 40px; margin-top: 8px;" align-center><label class="body-text">-</label></v-layout>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-btn
                                        color="primary"
                                        @click="e1 = 2"
                                        text
                                    >
                                        <v-icon>mdi-arrow-left</v-icon>
                                        Back
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        @click="submitUserReport()"
                                    >
                                        Submit
                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                           
                       </v-stepper-content>
                        <v-stepper-content step="4" style="margin-bottom: 24px;">
                            <v-card>
                                <v-card-text>
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
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        @click="backPage()"
                                    >
                                        Kembali
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
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
                   text: 'Check Report',
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
           report: {},
           imb: "",
           buildingOwner: "",
           buildingBasedImb: "",
           buildingUnitsBasedImb: "",
           buildingFloorsBasedImb: "",
           menu: false,
           dateImb: "",
           buildingExecutor: "",
           fieldUse: "",
           numberOfFieldUnits: "",
           numberOfFloorsField: "",
           buildingViolation: "",
           permissionTerms: "",
           percentageWhenChecked: "",
           floorPlan: "",
           imgFloorPlan: "",
           listFieldImg: [{file: "", img: "",}],
           indexField: 0,
           errorMsg: "",
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
        if (localStorage.getItem("checkReportItem")) { 
            // console.log(JSON.parse(localStorage.getItem("checkReportItem")));
            this.report = JSON.parse(localStorage.getItem("checkReportItem"));
            this.coordinateForm = this.report.location.coordinates[0] + ", " + this.report.location.coordinates[1];
            this.address = this.report.address;
            this.topic = this.report.topic;
            this.actType = this.report.activityId._id;
            this.contentReport = this.report.content;
            this.getDetailData();
            this.downloadFile(this.report);
            
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
               const url = URL.createObjectURL(blob);
               const geojsonlayer2 = new GeoJSONLayer({
                   url,
                   outFields: ["SBDATA", "KODUNK", "KOSBWP"],
                   renderer: renderer,
                   opacity: 0.55,
                   
               });
               const graphicsLayer = new GraphicsLayer();

               const map = new Map({
                   basemap: "arcgis-topographic" // Basemap layer service
               });
               map.add(graphicsLayer)
               map.add(geojsonlayer2)
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
               var point = {
                    type: "point",
                    longitude: this.report.location.coordinates[1], 
                    latitude: this.report.location.coordinates[0],   
                };
                pointGraphic.geometry = point;
               

               view.popup.autoOpenEnabled = false;
               const serviceUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

               view.on("click", (event) => {
                   // Get the coordinates of the click on the view
                   var longitude = event.mapPoint.longitude;
                   var latitude = event.mapPoint.latitude;
                   
                   this.coordinateForm = latitude + ", " + longitude;
                   // console.log(event);
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

                   this.report.location.coordinates[0] = latitude;
                   this.report.location.coordinates[1] = longitude;

                   console.log(this.report);

                   locator.locationToAddress(serviceUrl, params)
                       .then(function(response) { // Show the address found
                       const address = response.address;
                    //    console.log(response);
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

        async getDetailData() {
            this.loading.status = true;
            try {
                const reqSubDistrict = await this.$subdistricts.getSubDistrictById(this.report.subDistrictId, {});
                const reqDistrict = await this.$districts.getDistrictById(reqSubDistrict.districtId, {});
                const reqIntensity = await this.$intensities.getIntensitieById(this.report.intensityId, {});
                reqSubDistrict.districtId = reqDistrict;
                this.report.intensityId = reqIntensity;

                this.report.subDistrictId = reqSubDistrict;
                console.log(this.report);
                this.loading.status = false;
            } catch (error) {
                console.log(error);
                this.loading.status = false;
            }
        },

        verifyFrom() {
            if(!this.formDetailReport) {
                this.errorMsg = "Isi semua field yang tersedia!"
                this.isSuccess = false;
                this.isError = true;
                this.loading.status = false;

                return;
            }
            this.e1 = 3;
        },

        async submitUserReport() {
            this.loading.status = true;
            try {
                let fieldImageId = [];
                let blueprintId;
                if (this.listFieldImg[0].file != "") {
                    for (const key in this.listFieldImg) {
                        if (Object.hasOwnProperty.call(this.listFieldImg, key)) {
                            const element = this.listFieldImg[key];
                            if (element.file != "") {
                                const requestFile = await this.$files.createFile({
                                    file: element.file
                                })
                                fieldImageId.push(requestFile._id);
                            }
                        }
                    }
                }
                
                if (this.imgFloorPlan) {
                    blueprintId = await this.$files.createFile({
                        file: this.$refs.imgFloorPlan.files[0]
                    })
                }
                const reqUpdateReport = await this.$reports.editReport(this.report._id, this.report);

                const req = await this.$userreports.createUserReport({
                    "userId": this.userMe._id,
                    "reportId": this.report._id,
                    "action": "approved",
                    "information": "Sudah selesai diperiksa oleh petugas lapangan",
                    imb_number: this.imb,
                    imb_date: new Date(this.dateImb),	
                    building_owner: this.buildingOwner,	
                    builder: this.buildingExecutor,
                    building_purpose_by_imb: this.buildingBasedImb,	
                    building_purpose_real: this.fieldUse,	
                    total_unit_by_imb: this.buildingUnitsBasedImb,	
                    total_unit_real: this.numberOfFieldUnits,	
                    total_floor_by_imb: this.buildingFloorsBasedImb,	
                    total_floor_real: this.numberOfFloorsField,	
                    building_violation: this.buildingViolation,	
                    permission_terms: this.permissionTerms,	
                    percentage_on_checked: this.percentageWhenChecked,
                    fieldImageId: fieldImageId.length > 0 ? fieldImageId : null,
                    blueprintId: blueprintId ? blueprintId._id : null,
                    floor_plan: this.floorPlan,
                })

                this.isSuccess = true;
                this.isError = false;
                this.loading.status = false;
                this.e1 = 4;
            } catch (error) {
                console.log(error);
                this.loading.status = false;
                this.isSuccess = false;
                this.isError = true;
            }
        },

        async downloadFile(item) {
            const reqFile = await this.$files.getFile(item.imageId);
            let readerImg = new FileReader();
            readerImg.readAsDataURL(reqFile); 
            readerImg.onload = () => {
                this.imageReport = readerImg.result;
            }
        },

        backPage() {
            window.location = "/dashboard/report";
        },

        pickFile() {
            this.$refs.fileReport.click();
        },

        onFileChanged(e) {
            this.imageReport = URL.createObjectURL(e.target.files[0]);
        },

        onClickFloorplanImg() {
            this.$refs.imgFloorPlan.click();
        },

        onClickFieldImg(index) {
            this.indexField = index;
            this.$refs.imgField.click();
            
        },

        onImgFieldChanged(e) {
            this.listFieldImg[this.indexField]["file"] = e.target.files[0] != null ? e.target.files[0] : "";
            this.listFieldImg[this.indexField]["img"] = e.target.files[0] != null ? URL.createObjectURL(e.target.files[0]) : "";
            if (this.listFieldImg[this.listFieldImg.length - 1].file != "") {
                this.listFieldImg.push({
                    file: "",
                    img: "",
                })
            } else {
                if (e.target.files[0] == null) {
                    this.listFieldImg.pop();
                }
            }
        },

        onImgFloorplanChanged(e) {
            this.imgFloorPlan = URL.createObjectURL(e.target.files[0]);
        },

        reloadPage() {
            window.location.reload();
        }
   }

}
</script>