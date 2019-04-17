function toJSON(object) {
    return JSON.parse(JSON.stringify(object))
}

function getUrl(path) {
    let server = app.data.server
    let url = `${server.protocol}://${server.ip}:${server.port}/${path}`
    return url
}

function myReadFile(fileName, callback) {

    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
        dirEntry.getFile(fileName, {
            create: true,
            exclusive: false
        }, function (fileEntry) {
            readFile(fileEntry)
        })
    })

    function readFile(fileEntry) {
        fileEntry.file(function (file) {
            let reader = new FileReader()
            reader.onloadend = function () {
                let key = JSON.parse(this.result)
                callback(key)
            }
            reader.readAsText(file)
        }, (evt) => {
            alert(evt)
        })
    }
}

let myNativeStorage = {
    getItem: (key) => {
        return new Promise(function (resolve, reject) {
            NativeStorage.getItem(key, resolve, (err) => {
                console.log(err)
                resolve(null)
            })
        })
    },
    setItem: (key, value) => {
        return new Promise(function (resolve, reject) {
            NativeStorage.setItem(key, value, resolve, reject)
        })
    }
}

let library = {
    // 登入
    signIn: (user) => {
        Guser = user

        // 讀取設定
        NativeStorage.getItem('setting', (setting) => {
            Gsetting = setting
            library.setLayoutTheme(Gsetting.theme)
            library.setColorTheme(Gsetting.color)
        }, () => {
            Gsetting = {}
        })
    },

    // 登出
    signOut() {
        clearData()
        
        app.toast.create({
            icon: '<i class="material-icons">error</i>',
            text: '登出成功',
            position: 'center',
            closeTimeout: 1000,
        }).open()

        app.router.navigate('/signIn/', {
            clearPreviousHistory: true
        })

        // 清除全域變數
        function clearData() {
            Guser = null
            Gsetting = null
            GdecAccount = null
        }
    },
}

// 彩色JSON
let jsonPrettyPrint = {
    replacer: function (match, pIndent, pKey, pVal, pEnd) {
        var key = '<span class=json-key>';
        var val = '<span class=json-value>';
        var str = '<span class=json-string>';
        var r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        if (pVal)
            r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
        return r + (pEnd || '');
    },
    toHtml: function (obj) {
        var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        return JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, jsonPrettyPrint.replacer);
    }
}