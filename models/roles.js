const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
            }
        }
        return obj
    },

    //roles

    getAllRoles() {
        return $axios.$get(process.env.baseURL + "/roles")
    },

    getRoleById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/roles/" + id, {
            params: cleaned
        });
    },

    getRole(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/roles/", {
            params: cleaned
        });
    },

    createRole(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$post(process.env.baseURL + "/roles", cleaned);
    },

    editRole(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$patch(process.env.baseURL + "/roles/" + id, cleaned)
    },

});

export default ({
    $axios
}, inject) => {
    inject('roles', model($axios));
}