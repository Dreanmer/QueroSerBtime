const fs = require('fs');
const ASCIINumbers = require('./ASCIINumbers.json');

class letterMachine {

    _genAccountNumber(digits) {
        let n = '000000000' + Math.floor(Math.random() * 100000000);
        return n.slice(-digits);
    }

    _convertAccountToASCIIfont(numberString) {
        const lines = {
            0: '',
            1: '',
            2: ''
        };
        numberString.split('').forEach((c) => {
            lines[0] += ASCIINumbers[c][0];
            lines[1] += ASCIINumbers[c][1];
            lines[2] += ASCIINumbers[c][2];
        });
        return lines[0] + '\n' + lines[1] + '\n' + lines[2] + '\n';
    }

    _genAccounts(qty, length) {
        if(!length)
            length = 9;
        const accounts = [];
        while(accounts.length < qty){
            accounts.push(this._convertAccountToASCIIfont(this._genAccountNumber(length)));
        }
        return accounts.join('\n');
    }

    run(qty, file) {
        fs.writeFile(file, this._genAccounts(qty))
    }
}

const machine = new letterMachine();

machine.run(process.argv[2] || 500, 'accounts.txt');