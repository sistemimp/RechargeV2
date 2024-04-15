const sito = "https://app.reweicoli.it/"
const log = require('electron-log/renderer')

async function internet_status() {
    try {
        let IS = await fetch(`${sito}/kernel/Aj?gp=recharge&action=checkOnline`).then(response => response.json()).then(result => {
            console.log("IS - " + result.online)
            if (result.online) {
                log.info("Internet Status - Accesso:" + global.accesso)
                document.getElementById("internet_status").innerHTML = 'online'
                document.getElementById('internet_check').style.display = "none"
                if (global.accesso == "false") {
                    document.getElementById('exe').style.display = "none"
                } else {
                    document.getElementById('exe').style.display = "block"
                }
                log.info('Internet Status - Online')
                global.isOnline="true"
            } else {
                document.getElementById("internet_status").innerHTML = 'offline'
                document.getElementById('internet_check').style.display = "block"
                document.getElementById('login').style.display = "none"
                document.getElementById('exe').style.display = "none"
                document.getElementById('newversion').style.display = "none"
                document.getElementById('noaccess').style.display = "none"
                log.info('Internet Status - Offline')
                global.isOnline="false"
            }
        })
    } catch (error) {
        document.getElementById("internet_status").innerHTML = 'offline'
        document.getElementById('internet_check').style.display = "block"
        document.getElementById('login').style.display = "none"
        document.getElementById('newversion').style.display = "none"
        document.getElementById('noaccess').style.display = "none"
        document.getElementById('exe').style.display = "none"
        log.info('Internet Status - Offline')
        global.isOnline="false"
    }
}

