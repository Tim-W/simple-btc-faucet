const fs = require('fs');

let listOfAddresses = [];
let rawData = fs.readFileSync('addresses_given_money.json');
if (rawData != null) {
    listOfAddresses = JSON.parse(rawData);
    if (!Array.isArray(listOfAddresses)) {
        listOfAddresses = [];
    }
}

let id = "abc123xyz"
listOfAddresses.push(id)
fs.writeFileSync('addresses_given_money.json', JSON.stringify(listOfAddresses))
let list = JSON.parse(fs.readFileSync('addresses_given_money.json'))

if (list.includes(id)) {
    console.log("Success")
} else {
    console.log("Failure")
}
