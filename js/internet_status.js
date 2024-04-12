const sito = "https://app.reweicoli.it/"
const  log =require ('electron-log/renderer')

async function internet_status() {

    fetch(`${sito}/kernel/Aj?gp=recharge&action=checkOnline`).then(response => response.json()).then(result => {
        
        if(result.online){
            console.log("Internet Status - Accesso:"+global.accesso)
            document.getElementById("internet_status").innerHTML = 'online'
            document.getElementById('internet_check').style.display = "none"
            if(global.accesso=="false"){
                document.getElementById('exe').style.display = "none"
            }else{
                document.getElementById('exe').style.display = "block"
            }
            console.log('Internet Status - Online')
        }else{
            document.getElementById("internet_status").innerHTML = 'offline'
            document.getElementById('internet_check').style.display = "block"
            document.getElementById('login').style.display = "none"
            document.getElementById('exe').style.display = "none"
            console.log('Internet Status - Offline')
        }
    })
}

