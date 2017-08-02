# OCR Bancário 

[link para o problema no dojopuzzle](http://dojopuzzles.com/problemas/exibe/ocr-bancario/)

Você trabalha para um banco, que recentemente comprou uma máquina muito engenhosa para auxiliar na leitura de cartas e faxes enviados para o escritório-central. Esta máquina escaneia os documentos em papel e produz um arquivo com um grande número de entradas, sendo que cada uma tem este formato:

```
 _       _   _       _   _   _   _   _
| |  |   _|  _| |_| |_  |_    | |_| |_|
|_|  |  |_   _|   |  _| |_|   | |_|  _|

```
Cada entrada possui 4 linhas, e cada linha possui 27 caracteres. As 3 primeiras linhas contém o número da conta, utilizando pipes e underscores, e a quarta linha é vazia. Cada número de conta possui nove dígitos (entre 0 e 9). Cada arquivo pode conter até 500 registros. Sua tarefa é desenvolver um programa que obtenha esse arquivo e devolva a lista de contas.
Tradução livre de (http://www.codingdojo.org/cgi-bin/wiki.pl?KataBankOCR)

# Solução 

A solução é composta de um gerador de contas aleatórias (simulando a maquina que lê as cartas) e um parser, ambos feitos em em JavaScript (node.js ECMAScript 6):

O gerador de contas aleatórias escreve `n` contas aleatórias em um arquivo. Estas contas serão geradas utilizando pipes e underscores conforme proposto no problema.

*Para criar o arquivo com as contas, execute `node letterMachine.js n file` sendo `n` a quantidade de contas a ser gerada e `file` o arquivo de output, caso omitido, gerará 500 contas no [`accounts.txt`](./accounts.txt).*

O parser, lê este arquivo de entrada criado pela maquina, com as contas em pipes e undersocres, e retorna elas (via stdout) convertidas em formato numérico separadas por quebras de linha.

*Para rodar o parser, execute `node parser.js file` sendo `file` o arquivo de entrada, caso omitido, tentará ler o arquivo [`accounts.txt`](./accounts.txt).*