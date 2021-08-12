const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const csv = require('csv-parser')
const fs = require("fs");
const csvFile = "./challenge/input.csv"

const csvToJSON = (csvFile) => {
    const results = []
    fs.createReadStream(csvFile)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            results.forEach(element => {
                Object.entries(element).forEach((data) => {
                    const key = data[0];
                    const value = data[1]

                    try{
                        if (key.indexOf("phone") >= 0 && !phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, 'BR'), 'BR')){
                            element[key] = null
                        }
                    }
                    catch(err){
                        element[key] = null
                    }

                    if (key.indexOf("email") >= 0 && value.indexOf("@") == -1){
                        element[key] = null
                    }
                })
            })
            fs.writeFileSync('./challenge/output.json', JSON.stringify(results, null, 4))
        });
}

csvToJSON(csvFile);
