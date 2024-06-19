


function write_txt(testo) {
    //log.info(testo)
    return testo.replace(";", "") + ";"
}


function csv_temp_line(csv_temp) {
    let csv_temp_string = ""
    for (let i = 0; i < csv_temp.length; i++) {
        //  log.info(csv_temp)
        csv_temp_string += csv_temp[i]
    }
    return (csv_temp_string + "\n")
}




 function loading(arg) {
    if(arg){
       document.getElementById("Invia_Dati").classList.add('d-none');
       document.getElementById("spinner").classList.remove('d-none');

    }else{
        document.getElementById("Invia_Dati").classList.remove('d-none');
        document.getElementById("spinner").classList.add('d-none');
    }
    console.log("loading->"+arg)
}



function carica_dati_rewisioni(){
    loading(true)
    log.info('********Invia_Dati_Revisioni*******');

    if( global.checkcaricamento){
        const domanda1="Annualità già caricata!"
        const domanda2="Attenzione! confermando l'aggiornamento dei dati, eventuali nominativi rimossi dalle liste mensili saranno reinseriti.";
        swal(domanda1,domanda2, {
            buttons: {
                cancel: "No, Lascia Inalterato!",
                catch: {text: "Si, Prosegui con il caricamento!", value: "continua"}
            },
          }).then((value)=>{
            switch (value) {

                case "continua":
                    carica_dati_rewisioni_script()
                    break;
                default:
                    loading(false)
                    swal("Caricamento Annullato");
                    break;
        }})
    }else{
        carica_dati_rewisioni_script()
    }
}

document.querySelector('#Invia_Dati').addEventListener('click',() => {
    let anno_scadenza = document.getElementById("anno").value

    carica_dati_rewisioni()
   

})


function carica_dati_rewisioni_script(){
    let file_dir = fs.readdirSync("C:\\MCTC\\Archivio")
    log.info(file_dir)

    log.info("ID-> Cartella dati MCTC per Statistiche ->"+file_dir)
    let anno_scadenza = document.getElementById("anno").value
    let anno_ultima_revisione = anno_scadenza - 2
    log.info(anno_scadenza)
    let file_trovato = false
    // if (confirm("Confermi di caricare i dati dei tuoi clienti in scadenza nel "+anno_scadenza)== false) {
    //     return
    //   }
    
    for (let i = 0; i < file_dir.length; i++) {
        log.info(anno_ultima_revisione +"="+file_dir[i])

        if (anno_ultima_revisione == file_dir[i]) {
            log.info("ID-> Ccartella non trovata")
            file_trovato = true;
        }else{
            log.info("ID-> Cartella non trovata")
        }
    }
    if (file_trovato) {
        log.info("startTrovato")
        let start_dir = "C:\\MCTC\\Archivio\\" + anno_ultima_revisione + "\\"
        log.info(start_dir)

        file_dir = fs.readdirSync("C:\\MCTC\\Archivio\\" + anno_ultima_revisione + "\\")
        //log.info(file_dir)
        let intestazione = "NomeFileMCTCNet;CAP;Nome;Tipo;Citta;Targa;Fabbrica;EsitoRevisione;CognomeDenominazione;Indirizzo;Provincia;DataEffettiva"
        let csv_temp = []
        //dichiaro le variabili dei futuri fogli csv
        let csv = ""
        let gennaio = ""
        let febbraio = ""
        let marzo = ""
        let aprile = ""
        let maggio = ""
        let giugno = ""
        let luglio = ""
        let agosto = ""
        let settembre = ""
        let ottobre = ""
        let novembre = ""
        let dicembre = ""

        let mm = 0
        for (let i = 0; i < file_dir.length; i++) {
            if (file_dir[i].includes(".REV") || file_dir[i].includes(".rev")) {
                let filename = start_dir + file_dir[i]
                try {
                    const data = fs.readFileSync(filename, 'utf8')
                    let txt = data.split("\r\n")
                    let row_name = null
                    let start = false
                    csv_temp = []
                    for (let y = 0; y < txt.length; y++) {
                        if (txt[y].includes("tipo=\"AC2\"")) {
                            start = true
                        } else if (txt[y].includes("</rev:test>")) {
                            start = false
                        }
                        if (start) {
                            row_name = txt[y].split("=")
                            csv_temp[0] = ""
                            // log.info("row_name->"+row_name)
                            switch (row_name[0]) {
                                case "NomeFileMCTCNet":
                                    csv_temp[1] = write_txt(row_name[1]);
                                    // csv += write_txt(row_name[1]);
                                    continue;
                                case "CAP":
                                    csv_temp[2] = write_txt(row_name[1]);
                                    // csv += write_txt(row_name[1]);
                                    continue;
                                case "Nome":
                                    csv_temp[3] = write_txt(row_name[1]);
                                    // csv += write_txt(row_name[1]);
                                    continue;
                                case "Tipo":
                                    csv_temp[4] = write_txt(row_name[1]);
                                    // csv += write_txt(row_name[1]);
                                    continue;
                                case "Citta":
                                    csv_temp[5] = write_txt(row_name[1]);
                                    // csv += write_txt(row_name[1]);
                                    continue;
                                case "Targa":
                                    csv_temp[6] = write_txt(row_name[1]);
                                    // csv += write_txt(row_name[1]);
                                    continue;
                                case "Fabbrica":
                                    csv_temp[7] = write_txt(row_name[1]);
                                    // csv += write_txt(row_name[1]);
                                    continue;
                                case "EsitoRevisione":
                                    csv_temp[8] = write_txt(row_name[1]);
                                    // csv += write_txt(row_name[1]);
                                    continue;
                                case "CognomeDenominazione":
                                    csv_temp[9] = write_txt(row_name[1]);
                                    // csv += write_txt(row_name[1]);
                                    continue;
                                case "Indirizzo":
                                    csv_temp[10] = write_txt(row_name[1]);
                                    // csv += write_txt(row_name[1]);
                                    continue;
                                case "Provincia":
                                    csv_temp[11] = write_txt(row_name[1]);
                                    // csv += write_txt(row_name[1]);
                                    continue;
                                case "DataEffettiva":
                                    csv_temp[12] = write_txt(row_name[1]);
                                    // csv += write_txt(row_name[1]);
                                    mm = parseInt(write_txt(row_name[1]).substring(2, 4));
                                    continue;
                            }
                        }
                    }
                } catch (err) {
                    //log.info(err)
                }

                switch (mm) {
                    case 1:
                        gennaio += csv_temp_line(csv_temp); continue;
                    case 2:
                        febbraio += csv_temp_line(csv_temp); continue;
                    case 3:
                        marzo += csv_temp_line(csv_temp); continue;
                    case 4:
                        aprile += csv_temp_line(csv_temp); continue;
                    case 5:
                        maggio += csv_temp_line(csv_temp); continue;
                    case 6:
                        giugno += csv_temp_line(csv_temp); continue;
                    case 7:
                        luglio += csv_temp_line(csv_temp); continue;
                    case 8:
                        agosto += csv_temp_line(csv_temp); continue;
                    case 9:
                        settembre += csv_temp_line(csv_temp); continue;
                    case 10:
                        ottobre += csv_temp_line(csv_temp); continue;
                    case 11:
                        novembre += csv_temp_line(csv_temp); continue;
                    case 12:
                        dicembre += csv_temp_line(csv_temp); continue;
                }
               
            }
        }
        csv= gennaio+febbraio+marzo+aprile+maggio+giugno+luglio+agosto+settembre+ottobre+novembre+dicembre
        start_dir +=global.CodRew + "-"
        log.info("inviadati->"+global.CodRew )+
        fs.writeFile(start_dir + anno_ultima_revisione + '.csv', csv, () => { log.info("File Creato!") })
        i = 1;
        //  if(document.getElementById('1').checked){
        fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', gennaio, () => {log.info("ID-> File Csv "+ i + " Creato!") })
        // }
        i++;
        //if(document.getElementById('2').checked){
        fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', febbraio, () => {log.info("ID-> File Csv "+ i + " Creato!") })
        //}
        i++
        //if(document.getElementById('3').checked){
        fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', marzo, () => {log.info("ID-> File Csv "+ i + " Creato!") })
        // }
        i++;
        //if(document.getElementById('4').checked){
        fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', aprile, () => {log.info("ID-> File Csv "+ i + " Creato!") })
        // }
        i++;
        //if(document.getElementById('5').checked){
        fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', maggio, () => {log.info("ID-> File Csv "+ i + " Creato!") })
        //}
        i++;
        //if(document.getElementById('6').checked){
        fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', giugno, () => {log.info("ID-> File Csv "+ i + " Creato!") })
        //}
        i++;
        //if(document.getElementById('7').checked){
        fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', luglio, () => {log.info("ID-> File Csv "+ i + " Creato!") })
        //}
        i++;
        //if(document.getElementById('8').checked){
        fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', agosto, () => {log.info("ID-> File Csv "+ i + " Creato!") })
        //}
        i++;
        //if(document.getElementById('9').checked){
        fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', settembre, () => {log.info("ID-> File Csv "+ i + " Creato!") })
        //}
        i++;
        //if(document.getElementById('10').checked){
        fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', ottobre, () => {log.info("ID-> File Csv "+ i + " Creato!") })
        //}
        i++;
        //if(document.getElementById('11').checked){
        fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', novembre, () => {log.info("ID-> File Csv "+ i + " Creato!") })
        //}
        i++;
        //if(document.getElementById('12').checked){
        fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', dicembre, () => {log.info("ID-> File Csv "+ i + " Creato!") })
        //}
        i++;

        setTimeout(() => {
            const formData_load = new FormData();
            let contents = []
            let blob_single = []
            contents[0] = fs.readFileSync(start_dir + anno_ultima_revisione + '.csv');
            blob_single[0] = new Blob([contents[0]])
            for (let i = 0; i < 13; i++) {
                if (fs.existsSync(start_dir + anno_ultima_revisione + '_' + i + '.csv')) {
                    contents[i] = fs.readFileSync(start_dir + anno_ultima_revisione + '_' + i + '.csv');
                    blob_single[i] = new Blob([contents[i]])
                }
            }
            formData_load.append('id_anagrafica', global.id_anagrafica);
            formData_load.append('CodRew', global.CodRew);
            formData_load.append('anno', anno_ultima_revisione);
            formData_load.append('Anagrafica', global.anagrafica);
             formData_load.append('Tipo', "dati delle revisioni per l'anno "+anno_ultima_revisione);
            for (let i = 0; i < blob_single.length; i++) {
                formData_load.append('blob' + i, blob_single[i]);
            }
            log.info("ID-> Start Invio File ")
            
            fetch(
                `${sito}kernel/Aj?gp=recharge&action=caricaFilesDaRecharge2`,
                {
                    method: 'POST',
                    body: formData_load,
                }
            )
                .then((response) => response.json())
                .then((result) => {
                    log.info(result)
                    loading(false)
                    
                     document.getElementById('invia_dati_result').innerHTML="<center><strong>Dati Caricati con successo</strong></center>"
                     document.getElementById('invia_dati_result').classList.add("successo")
                     log.info("ID-> Invio File  Eseguito Correttamente")
                     

                })
                .catch((error) => {
                    loading(false)
                    log.info('Error:', error);
                    //new window.Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY_ERROR })
                    document.getElementById('invia_dati_result').innerHTML="<center><strong>Qualcosa è andato storto, <br>contatta lo staff Reweicoli per ricevere assistenza al numero 327 3953 700</strong></center>"
                    document.getElementById('invia_dati_result').classList.add("errore")
                    console.warn("ID-> Invio File  Fallito")
                    fetch(
                        `${sito}/kernel/Aj?gp=recharge&action=sendLog`,
                        {
                            method: 'POST',
                            body: formData_load,
                        }
                    ).then((response) => response.json())
                    .then((result) => {log.info(result)})
                });
        }, 1024)
    
    }else{
        log.info("ID-> "+ anno_ultima_revisione+2 +'anno non presente!');
        document.getElementById('invia_dati_result').innerHTML="<center><strong>La Cartella per l'annualità richiesta non è stata trovata</strong></center>"
        document.getElementById('invia_dati_result').classList.add("text-danger")
    };
    //controllo anno 
    
}