const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
                delete obj[propName];
            }
        }
        return obj
    },

    //settings

    getAllSettings() {
        return $axios.$get(process.env.baseURL + "/settings")
    },

    getSettingById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/settings/" + id, {
            params: cleaned
        });
    },

    getSetting(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/settings/", {
            params: cleaned
        });
    },

    createSetting(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$post(process.env.baseURL + "/settings", cleaned);
    },

    editSetting(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$patch(process.env.baseURL + "/settings/" + id, cleaned)
    },

});

export default ({
    $axios
}, inject) => {
    inject('settings', model($axios));
}