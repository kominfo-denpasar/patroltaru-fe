const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
            }
        }
        return obj
    },

    //activities

    getAllActivities() {
        return $axios.$get(process.env.baseURL + "/activities")
    },

    getActivityById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/activities/" + id, {
            params: cleaned
        });
    },

    getActivity(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/activities/", {
            params: cleaned
        });
    },

    createActivity(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$post(process.env.baseURL + "/activities", cleaned);
    },

    editActivity(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$patch(process.env.baseURL + "/activities/" + id, cleaned)
    },

});

export default ({
    $axios
}, inject) => {
    inject('activities', model($axios));
}