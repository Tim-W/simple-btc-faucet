const express = require('express');
const router = express.Router();

const { exec } = require("child_process");

function generateAndSendMoney(id, amount) {
    exec(`bitcoin-cli -regtest sendtoaddress ${id} ${amount}`, (error, stdout, stderr) => {
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
    exec(`bitcoin-cli -regtest generate 1`, (error, stdout, stderr) => {
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
    // Send the money here
    const message = generateAndSendMoney(id, 1)
    return res.render('index', {title: id});
});

module.exports = router;
