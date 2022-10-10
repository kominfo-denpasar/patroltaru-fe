const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
            }
        }
        return obj
    },

    //cities

    getAllCities() {
        return $axios.$get(process.env.baseURL + "/cities")
    },

    getCityById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/cities/" + id, {
            params: cleaned
        });
    },

    getCity(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/cities/", {
            params: cleaned
        });
    },

    createCity(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$post(process.env.baseURL + "/cities", cleaned);
    },

    editCity(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$patch(process.env.baseURL + "/cities/" + id, cleaned)
    },

});

export default ({
    $axios
}, inject) => {
    inject('cities', model($axios));
}