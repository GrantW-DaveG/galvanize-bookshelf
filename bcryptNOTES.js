bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

To check a password:
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
    // res == false
});

with promises
bcrypt uses whatever Promise implementation is available in global.Promise. NodeJS >= 0.12 has a native Promise implementation built in. However, this should work in any Promises/A+ compilant implementation.

Async methods that accept a callback, return a Promise when callback is not specified if Promise support is available.

bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
    // Store hash in your password DB.
});
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash).then(function(res) {
    // res == true
});
bcrypt.compare(someOtherPlaintextPassword, hash).then(function(res) {
    // res == false
});
