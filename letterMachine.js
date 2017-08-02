const fs = require('fs');
const ASCIINumbers = require('./ASCIINumbers.json');

class LetterMachine {

    constructor(numbersTemplate, fs) {
        this.numbersDictionary = numbersTemplate;
        this.fs = fs;
    }

    static _genAccountNumber(digits) {
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
            lines[0] += this.numbersDictionary[c][0];
            lines[1] += this.numbersDictionary[c][1];
            lines[2] += this.numbersDictionary[c][2];
        });
        return lines[0] + '\n' + lines[1] + '\n' + lines[2] + '\n';
    }

    _genAccounts(qty, length) {
        if(!length)
            length = 9;
        const accounts = [];
        while(accounts.length < qty){
            accounts.push(this._convertAccountToASCIIfont(LetterMachine._genAccountNumber(length)));
        }
        return accounts.join('\n');
    }

    run(qty, file) {
        this.fs.writeFile(file, this._genAccounts(qty))
    }
}

const machine = new LetterMachine(ASCIINumbers, fs);

machine.run(process.argv[2] || 500, process.argv[3] || 'accounts.txt');