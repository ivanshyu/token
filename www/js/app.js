// Dom7
let $ = Dom7

// Init App
let app = new Framework7({
	root: '#app',
	name: '政大錢包',
	theme: 'md',
	language: 'zh-Hant',
	data: function () {
		return {
			server: {
				name: 'NCCU server',
				protocol: 'http',
				ip: '140.119.163.46',
				port: '50000',
			},
		};
	},
	routes: routes,
	vi: {
		placementId: 'pltd4o7ibb9rc653x14',
	},
	touch: {
		fastClicks: false,
	},
	panel: {
		// swipe: 'left',
	},
	dialog: {
		buttonOk: '確定',
		buttonCancel: '取消'
	},
})
