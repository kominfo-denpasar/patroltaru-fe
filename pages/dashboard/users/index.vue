<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-col>
                <v-card style="padding: 8px; width: 100%; margin-top: 16px; background-color: #e2e2e2;" elevation="0">
                    <v-card-text style="margin-top: 4px; margin-left: 8px;">
                        <v-row >
                            <span class="body-text" >Dashboard </span>
                            <v-icon>mdi-chevron-right</v-icon>
                            <span class="body-text"><b>Data User</b></span>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-alert
                    v-if="false"
                    icon="mdi-shield-lock-outline"
                    prominent
                    text
                    type="info"
                    style="margin-top: 24px; margin-bottom: 24px;"
                    >
                    <span class="blue-body-text" style="margin-left: 16px;">Silahkan untuk melakukan <b>update profile</b> untuk dapat melakukan verifikasi laporan. Terima Kasih. </span>
                </v-alert>

                <v-row style="margin-top: 24px;" align="center">
                    <v-col cols="4">
                        <v-text-field
                            v-model="search"
                            outlined
                            clearable
                            label="Search"
                            type="text"
                            @click:clear="clearSearch"
                            prepend-inner-icon="mdi-magnify"
                            rounded
                        ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="3">
                        <v-btn depressed block color="green" class="white--text" @click="addUserDialog = true">
                            <v-icon left color="white">
                                mdi-plus
                            </v-icon>
                            Tambah User
                        </v-btn>
                    </v-col>
                </v-row>

                <v-data-table
                    :headers="headers"
                    :items="users"
                    :options.sync="pagination"
                    :items-per-page="pagination.rowsPerPage"
                    :server-items-length="pagination.totalItems"
                    :search="search"
                    item-key="email"
                    class="elevation-1"
                    :loading="loading"
                    loading-text="Loading... Please wait"
                    hide-default-header 
                >
                    <template v-slot:header="{ props: { headers } }">
                        <tr class="side-menu-text bg-color-header-table white--text" align="left" >
                            <th v-for="(item, index) in headers" :key="index" style="padding: 10px;">
                                <span class="">{{item.text}}</span>
                            </th>
                        </tr>
                    </template>
                    <template v-slot:[`item.lastLogin`]="{ item }">
                        
                        <td v-if="item.lastLogin">
                            {{ item.lastLogin }}
                        </td>
                        <td v-else>
                            Belum Login
                        </td>
                        
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
                        
                        <td>
                            <v-btn @click="editItem(item)" class="primary" small>
                                <v-icon>mdi-clipboard-edit-outline</v-icon>
                            </v-btn>
                            
                        </td>
                        
                    </template>
                </v-data-table>
            </v-col>
            <AddUserDialog :dialog.sync="addUserDialog"  @close="closeDialog" :email="email" :username="username" :role="role" :idUser="idUser" :isEdit.sync="isEdit" />
        </v-layout>
    </v-container>
</template>
<script>
import AddUserDialog from '~/components/AddUserDialog.vue'
export default {
    auth: true,
    components: {
        AddUserDialog,
    },
    data() {
        return {
            search: "",
            headers: [
                {text: 'Email', value: 'email', align: 'start',},
                {text: 'Name', value: 'username', align: 'start',},
                {text: 'Role', value: 'roleId.description', align: 'start',},
                {text: 'Login Terakhir', value: 'lastLogin', align: 'start',},
                {text: 'Aksi', value: 'action', align: 'start',},
            ],
            addUserDialog: false,
            loading: false,
            users: [],
            roles: [],
            idUser: '',
            isEdit: false,
            email: "",
            username: "",
            role: "",
            pagination: {
                page: 1,
                rowsPerPage: 10,
                totalItems: 0,  
            },
        }
    },

    watch: {
        pagination: {
            handler () {
                this.getDataUser();
            },
            deep: true
        },
        search: {
            handler () {
                this.getDataUser();
            },
        }
    },

    mounted() {
        this.getRoles();
        this.getDataUser(); 
    },

    methods: {

        async getRoles() {
            this.loading = true;
            try {
                
                const reqRoles = await this.$roles.getRole({
                    $skip: 0,
                    $limit: 50,
                });

                this.roles = reqRoles.data;
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },

        async getDataUser() {
            this.loading = true;
            try {

                const reqUserData = await this.$users.getUsers({
                    $populate: 'roleId',
                    "$or[0][username][$search]": this.search,
                    "$or[1][email][$search]": this.search,
                    $skip: (this.pagination.page - 1) * this.pagination.rowsPerPage,
                    $limit: this.pagination.rowsPerPage
                });
                this.pagination.totalItems = reqUserData.total;
                this.users = reqUserData.data;
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },

        editItem(item) {
            this.isEdit = true;
            this.idUser = item._id;
            this.email = item.email;
            this.username = item.username;
            this.role = item.roleId._id;
            this.addUserDialog = true;
        },

        clearSearch () {
            this.search = ''
        },

        closeDialog() {
            this.addUserDialog = false;
        }
    }
}
</script>