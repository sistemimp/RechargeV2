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

            console.log("CheckUpload - Result: "+result)
            let annualita = result.anni_dati_recharge.split(",")

            annualita.forEach(element => {
                if (element == anno) {
                    console.log("CheckUpload - Anno "+ anno + "Già Caricato");
                    global.annotrovato=true;
                   return   
                }
                
            });
            console.log("CheckUpload - Anno Trovato "+ global.annotrovato);
            
            let InviaDati=document.getElementById("Invia_Dati")
            if(global.annotrovato==true){
                InviaDati.setAttribute("disabled",true);
                InviaDati.value="Caricamento per l'anno "+anno+ " già eseguito!"
                InviaDati.setAttribute("data-toggle","tooltip")
                InviaDati.setAttribute("data-html",true)
                InviaDati.setAttribute("title","Dati già caricati. Vedi mesi disponibili nella tua area web del sito Reweicoli per modifiche, inserimento, eliminazione di nominativi, clicca sul mese.")
                console.log("CheckUpload - Set Pulsante Caricamento Già Eseguito per l'anno "+ global.annotrovato);
            }else{
                console.log("rimuovi")
                InviaDati.removeAttribute("disabled");
                InviaDati.value="Esegui Caricamento"
                console.log("CheckUpload - Set Pulsante Caricamento Non Eseguito per l'anno"+ global.annotrovato);
            }
        })
}

document.querySelector('#anno').addEventListener("change",(event)=>{
    checkcaricamento( event.target.value)
})