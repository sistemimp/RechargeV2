var pjson = require('./package.json');

log.info("CheckVersion - Info->" + pjson.version)

const formData = new FormData();

formData.append('version', pjson.version);


fetch(`${sito}kernel/Aj?gp=tools&action=getVersioneRecharge`, {
    method: 'POST',
    body: formData
})
    .then(response => response.json())
    .then(result => {
        log.info("CheckVersion - Versione Corrente-> "+result.versione_recharge)
        if (result.versione_recharge == pjson.version) {
            log.info("CheckVersion - Stai utilizzando l'ultima versione disponibile")
        } else {
            newversion = true;
            global.version = pjson.version;
            document.getElementById('newversion').style.display = "block"
            document.getElementById('exe').style.display = "none"
            log.info("CheckVersion - Versione del programma Obsoleta: Versione Corrente->"+result.versione_recharge+" Vesione in uso "+ pjson.version)
        }
    })
    .catch(error => {
        log.info('Error:'+`${sito}kernel/Aj?gp=tools&action=getVersioneRecharge`);
        log.info('Error:'+ error);
        console.warn('Controlla la connessione ad internet:', error);

        document.getElementById('internet_check').style.display = "block"
        document.getElementById('exe').style.display = "none"
    });



    
document.querySelector("#upgrade").addEventListener('click', () => {
    window.open(`${sito}download/ReWisioni.html`);
})
