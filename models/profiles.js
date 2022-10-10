const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
            }
        }
        return obj
    },

    //profiles

    getAllProfiles() {
        return $axios.$get(process.env.baseURL + "/profiles")
    },

    getProfileById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/profiles/" + id, {
            params: cleaned
        });
    },

    getProfile(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/profiles/", {
            params: cleaned
        });
    },

    createProfile(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$post(process.env.baseURL + "/profiles", cleaned);
    },

    editProfile(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$patch(process.env.baseURL + "/profiles/" + id, cleaned)
    },

});

export default ({
    $axios
}, inject) => {
    inject('profiles', model($axios));
}