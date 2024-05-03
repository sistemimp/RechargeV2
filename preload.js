const pjson = require('./package.json');
const tempDirectory = require('temp-dir');
let appData = require('app-data-folder')
let applicationName = 'ReWisioni';
const fs = require('fs');
const sito = "https://app.reweicoli.it/"
const log = require('electron-log/renderer')


global.isOnline="false"
let logged = "false";

let appDataPath = appData(applicationName); // returns a platform specific path to the default location for application data
/* rimuovi il log */
log.info("Preload - Start Preload")


if (fs.existsSync(appDataPath + "/logs/main.log")) {
    fs.unlinkSync(appDataPath + "/logs/main.log")
    log.info("Preload - rimozione cartella Log")
}




global.appDataPath = appDataPath
log.info("Preload - Set addData Folder: " + appDataPath)

window.addEventListener('DOMContentLoaded', () => {

    if (!fs.existsSync("C://MCTC")) {
        log.info("Preload - Attenzione! PC Sbagliato, su questa postazione non è presente la cartella MCTC")
        document.getElementById("noaccess").style.display = "none"
        document.getElementById("newversion").style.display = "none"
        document.getElementById("login").style.display = "none"
        document.getElementById('internet_check').style.display = "none"
        document.getElementById('exe').style.display = "none"
        document.getElementById('MCTCcheck').style.display = "block"
        return
    } else {
        log.info("Preload - Sono nel PC Giusto!")
    }
    document.getElementById("logout").style.display = "none"


    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron', 'app']) {
        replaceText(`${dependency}-version`, process.versions[dependency])

    }

    document.getElementById("noaccess").style.display = "none"
    document.getElementById("newversion").style.display = "none"
    document.getElementById("login").style.display = "none"
    document.getElementById('internet_check').style.display = "none"


    ///////////////////////////////////////////////////////////////////////////
    // acquisisce l'anno corrente
    let date = new Date().getFullYear();
    document.getElementById('anno').value = date
    document.getElementById('annoStat').value = date

    log.info("Preload - Set Anno corrente->" + date)

    global.current_year = date;
    ///////////////////////////////////////////////////////////////////////////
    /* cerca il nome del cliente dal file config creato nella login*/
    let temp_config = `${tempDirectory}\\ReCharge\\config.cfg`
    fs.mkdir(`${tempDirectory}\\ReCharge\\`, (err) => {
        if (err) {
            log.warn("Preload -  Directory:", err);
            return;
        }
    })

    fs.readFile(temp_config, 'utf8', (err, data) => {
        log.info("Preload - Start Reading Config.cfg")
        document.getElementById("exe").style.display = "block"
        try {
            let obj = JSON.parse(data)

            if (obj._dati.anagrafica.length > 0) {
                global.anagrafica = obj._dati.anagrafica
                document.getElementById("nomecentro").innerHTML = "<strong>" + obj._dati.anagrafica + "</strong>"
                document.getElementById("logout").style.display = "block"
                log.info("Preload - Login Correct")
            } else {
                document.getElementById("nomecentro").innerHTML = "<strong>" + obj._dati.anagrafica + "</strong>"
                document.getElementById("logout").style.display = "none"
                log.info("Preload - Login Fail")
            }
            ///////////////////////////////////////////////////////////////////////////
            // controllo se quest'anno è già stato attivato Recharge
            const checkdata = new FormData();
            checkdata.append('id_anagrafica', obj.id_anagrafica);
            global.id_anagrafica = obj.id_anagrafica;
            global.CodRew = obj._dati.cod_reweicoli;

            let checkanno = require("./js/checkcaricamento.js")
            checkcaricamento(date)
            global.accesso = "true"
            log.info("Preload - Accesso:" + global.accesso)
            if(global.isOnline!="true"){
                document.getElementById('exe').style.display = "none"
                return
            }
            //////////////////////////////////////////////////////////////////////
        } catch (error) {
            console.warn("Preload - %temp% config non trovata")
            document.getElementById('login').style.display = "block"
            document.getElementById("exe").style.display = "none"
            global.accesso = "false"
            log.info("Preload - Accesso:" + global.accesso)
            if(global.isOnline!="true"){
                document.getElementById('exe').style.display = "none"
                return
            }
        }

    })
    log.info('Preload - Internet Status')
    internet_status();
    setInterval(internet_status, 10000)

    

})


