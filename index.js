/**
 * Parser function
 * 
 * @param {Csv File} csv 
 * @returns A Json object
 */
function csvToJSON(csv) {
    var lines = csv.toString().split("\n");
    var result = [];
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }

    return JSON.stringify(result);
}


const fs = require("fs");
csv = fs.readFileSync("input1.csv")
let json = csvToJSON(csv);
fs.writeFileSync('output.json', json);