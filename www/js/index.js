let web3
let storage

// global variable
let Guser
let Gsetting
let GdecAccount

let myData = {}

document.addEventListener("deviceready", onDeviceReady, false)
document.addEventListener("pause", onPause, false)
document.addEventListener("resume", onResume, false)
document.addEventListener("backbutton", onBackbutton, false)

function onDeviceReady() {
	console.log('deviceready')

	web3 = new Web3()
	storage = window.localStorage

	app.router.navigate('/signIn/', {
		clearPreviousHistory: true
	})
}

function onPause() {
	console.log('pause')
}

function onResume() {
	console.log('resume')
}

function onBackbutton() {
	if (app.dialog.get()) {
		// 不關閉dialog
		// app.dialog.close()
	}
	else if (app.popup.get()) {
		app.popup.close()
	}
	else {
		app.router.back()
	}
}