import readXlsxFile from "read-excel-file";
import {readFile} from '@ramonak/react-excel';
import XLSX from "xlsx";


export function check(file, callback) {
    let format = false, structure = false, data = false;
    if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        format = true;
        const wb = readFile(file)
        checkStructure(wb, callback);
    }
    callback({checks: {formatOk: format, structureOk: structure, dataOk: data}})
}

function checkStructure(wb, callback) {
    let ue = new Map(), structure = false, tempUe = null, tempAa = [];

    wb.then((data) => {
        let sheets = data.SheetNames;
        // console.log(data.Sheets[sheets[0]])
        // console.log(XLSX.utils.sheet_to_json(data.Sheets[sheets[0]]))
        for (let i = 0 ; i < sheets.length; i++) {
            // for (let y = 0; y < data.Sheets[sheets[i]].length; y++) {
            //
            // }
        }
        // if (ue.size !== 0 && rows[0][rows[0].length - 1] === "Crédits Totaux"
        //     && rows[0][rows[0].length - 2] === "Crédits Réussis" && rows[0][rows[0].length - 3] === "%") {
        //     structure = true;
        //     checkData(wb, callback);
        // }
        console.log(ue);
    });
}


function checkData(wb, callback) {
    wb.then((rows) => {

    });
    callback({checks: {formatOk: true, structureOk: true, dataOk: true}});
}

export function Import() {

}