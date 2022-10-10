const model = $axios => ({
    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
            }
        }
        return obj
    },

    //users
    loginUser(username, password) {
        return $axios.$post(process.env.baseURL + "/authentication/", {
            "username": username,
            "password": password,
            "strategy": "local"
        })
    },

    getAllUsers() {
        return $axios.$get(process.env.baseURL + "/users/")
    },

    getUsers(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/users/", {
            params: cleaned
        })
    },

    getUserById(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$get(process.env.baseURL + "/users/" + id, {
            params: cleaned
        });
    },

    createUser(payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$post(process.env.baseURL + "/users/", cleaned);
    },

    editUser(id, payloads) {
        let cleaned = this.clean(payloads)
        return $axios.$patch(process.env.baseURL + "/users/" + id, cleaned)
    },

});

export default ({
    $axios
}, inject) => {
    inject('users', model($axios));
}