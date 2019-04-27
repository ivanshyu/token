let api = {

    //sign
    signIn: (ID, password, success, error) => {
        app.request.post(getUrl('signIn'), {
            ID,
            password,
        }, success, error, 'json')
    },

    signUp: (signUpData, success, error) => {
        app.request.post(getUrl('signUp'), signUpData, success, error, 'json')
    },

    //user
    getUser: (ID, callback) => {
        console.log(Guser.token)
        app.request.get(getUrl('user'), { token: Guser.token, ID: ID }, (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, 'json')
    },

    updateUser: (address) => {
        app.request({
            url: getUrl('user', { token: Guser.token }),
            method: 'PUT',
            data: {
                address,
            },
            success: (data, status, xhr) => {
                console.log(status)
            },
            error: (xhr, status) => {
                console.error(status)
            },
            dataType: 'json',
        })
    },
    //nonce
    getNonce: (callback) => {
        app.request.get(getUrl('nonce'), { token: Guser.token }, (data, status, xhr) => {
            console.log(status, data)
            callback(data)
        }, 'json')
    }
    
}
