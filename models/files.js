const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
            }
        }
        return obj
    },

    //Files

    getAllFiles() {
        return $axios.$get(process.env.baseURL + "/files")
    },

    getFileById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/files/" + id, {
            params: cleaned
        });
    },

    getFile(id) {
        
        return $axios.$get(process.env.baseURL + "/download/" + id, {
            responseType: 'blob'
        });
    },

    createFile({file}) {
        let formData = new FormData()
        formData.append('file', file)
        return $axios.$post(process.env.baseURL + "/files", formData);
    },

    editFile(id, file) {
        let formData = new FormData()
        formData.append('file', file)
        return $axios.$patch(process.env.baseURL + "/files/" + id, formData)
    },

});

export default ({
    $axios
}, inject) => {
    inject('files', model($axios));
}