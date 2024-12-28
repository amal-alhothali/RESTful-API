//Token
let jwt = require('jsonwebtoken');

//let token = jwt.sign({name: 'test'},'mySecretKey', {algorithm: 'HS256'}});

let fs = require('fs');

let privateKey = fs.readFileSync('private.key');
let token = jwt.sign({name: 'test'}, privateKey);
let result = jwt.verify(token, 'mySecretKey');

console.log(token);
console.log(result);