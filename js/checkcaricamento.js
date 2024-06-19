const bootstrap=require('bootstrap')
const swal = require('sweetalert');

function checkcaricamento(anno) {
    let checkdata = new FormData();
    checkdata.append('id_anagrafica', global.id_anagrafica);

    fetch(
        `${sito}kernel/Aj?gp=recharge&action=checkanno`,
        {
            method: 'POST',
            body: checkdata,
        }
    ).then((response) => response.json())
        .then((result) => {
            global.annotrovato="false";

            log.info("CheckUpload - Result: "+result)
            let annualita = result.anni_dati_recharge.split(",")

            annualita.forEach(element => {
                if (element == anno) {
                    global.checkcaricamento=true
                    log.info("CheckUpload - Anno "+ anno + "Già Caricato");
                    global.annotrovato=true;
                   return   
                }
                
            });
            log.info("CheckUpload - Anno Trovato "+ global.annotrovato);
            
            let InviaDati=document.getElementById("Invia_Dati")
            const tooltip =new bootstrap.Tooltip(InviaDati, {
                'customClass': 'custom-tooltip',
                title: '<b>Dati già caricati</b>. Vedi mesi disponibili nella tua area web del sito Reweicoli per modifiche, inserimento, eliminazione di nominativi, clicca sul mese.',
                animated: 'fade',
                placement: 'top',
                trigger: 'hover',
                html:true,

            })

            if(global.annotrovato==true){
                //InviaDati.setAttribute("disabled",true);
                swal("Dati per l'anno "+ (anno) +" già caricati ");
                global.checkcaricamento=true
                InviaDati.value="Caricamento per l'anno "+anno+ " già eseguito!"
                tooltip.enable()  
                log.info("CheckUpload - Set Pulsante Caricamento Già Eseguito per l'anno "+ global.annotrovato);         
            }else{
                global.checkcaricamento=false
                log.info("rimuovi")
                InviaDati.removeAttribute("disabled");
                InviaDati.value="Esegui Caricamento"
                tooltip.disable()
                log.info("CheckUpload - Set Pulsante Caricamento Non Eseguito per l'anno"+ global.annotrovato);
            }
        })

       
}




document.querySelector('#anno').addEventListener("change",(event)=>{
    checkcaricamento( event.target.value)
    document.getElementById("invia_dati_result").innerHTML=""
})