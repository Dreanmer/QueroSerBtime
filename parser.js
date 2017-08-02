const fs = require('fs');
const rl = require('readline');
const ASCIINumbers = require('./ASCIINumbers.json');

class Parser {

    constructor(numbersTemplate, fs, rl) {
        this.fs = fs;
        this.rl = rl;
        this.numbersDictionary = Parser._convertTemplatesToDictionary(numbersTemplate);
    }

    static _convertTemplatesToDictionary(numbersTemplate) {
        // as node dont have the usefully php 'array_flip' function, we convert it reducing the keys of the obj
        return Object.keys(numbersTemplate).reduce((obj, k) => {
            obj[numbersTemplate[k].join('')] = k;
            return obj;
        }, {});
    }

    _accountParser(accountLine){
        const account = [];
        let accountString = accountLine.join('\n');
        while(accountString.length > 2){
            // with regexp get the first 3 chars of each line and join it
            let char = '';
            accountString = accountString.replace(/^[ |_]{3}/gm, (match) => {
                char += match;
                return '';
            });
            // as the keys of dict is the char joined, just get it by the key
            account.push(this.numbersDictionary[char]);
        }
        return account.join('');
    }

    _readAccountLines(file, accountParser, endCallback) {
        const reader = this._createReadStream(file);
        const accounts = [];
        let accountLine = [];

        // there is a easyer way to do this, just reading the entire file and spliting at EoL,
        // but this way will use less memory, can suport larger files and can stdout as it is being parsed
        reader.on('line', (line) => {
            if (line != '')
                accountLine.push(line);

            if (accountLine.length == 3) {
                const account = accountParser.call(this, accountLine);
                accounts.push(account);
                process.stdout.write(account + '\n');
                accountLine = [];
            }
        }).on('end', () => {
            if (typeof endCallback == "function")
                endCallback(accounts);

            reader.close();
        })
    }

    _createReadStream(file) {
        return this.rl.createInterface({
            input: this.fs.createReadStream(file)
        });
    }

    run(file) {
        this._readAccountLines(file, this._accountParser);
    }
}

const parser = new Parser(ASCIINumbers, fs, rl);

parser.run(process.argv[2] || 'accounts.txt');