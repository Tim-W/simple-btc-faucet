const express = require('express');
const router = express.Router();

const { exec } = require("child_process");
const fs = require('fs');

let listOfAddresses = [];
let rawData = fs.readFileSync('addresses_given_money.json');
if (rawData != null) {
    listOfAddresses = JSON.parse(rawData);
    if (!Array.isArray(listOfAddresses)) {
        listOfAddresses = [];
    }
}

function generateAndSendMoney(id, amount) {
    if (listOfAddresses.includes(id)) {
        return console.log(`${id} is already used`)
    }
    listOfAddresses.push(id)
    fs.writeFileSync('addresses_given_money.json', JSON.stringify(listOfAddresses))
    exec(`~/bitcoin-0.17.1/bin/bitcoin-cli -regtest sendtoaddress ${id} ${amount}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return error.message
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return stderr
        }
        console.log(`stdout: ${stdout}`);
    });
    exec(`~/bitcoin-0.17.1/bin/bitcoin-cli -regtest generate 1`, (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return error.message
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return stderr
        }
        console.log(`stdout: ${stdout}`);
    });
}

/* GET home page. */
router.get('/', function (req, res, next) {
    const id = req.query.id
    if (!id) {
        return res.render('index', {title: 'No ID found'});
    }
    // Send the money
    generateAndSendMoney(id, 10)
    return res.render('index', {title: id});
});

module.exports = router;
