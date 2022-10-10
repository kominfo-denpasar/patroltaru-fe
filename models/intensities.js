const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
            }
        }
        return obj
    },

    //intensities

    getAllIntensities() {
        return $axios.$get(process.env.baseURL + "/intensities")
    },

    getIntensitieById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/intensities/" + id, {
            params: cleaned
        });
    },

    getIntensitie(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/intensities/", {
            params: cleaned
        });
    },

    createIntensitie(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$post(process.env.baseURL + "/intensities", cleaned);
    },

    editIntensitie(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$patch(process.env.baseURL + "/intensities/" + id, cleaned)
    },

});

export default ({
    $axios
}, inject) => {
    inject('intensities', model($axios));
}