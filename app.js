var express = require('express');
var app = express();
app.get('/', async (req, res, next) => {
    const k = 1000000;
    const r2 = findPrimesOptimized(k);
    console.log(r2);
    res.json(r2);
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

function findPrimes(k) {
    let primes = [2];
    for(let i = 3; i < k; i += 2) {
        if(isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

function findPrimesOptimized(k) {
    let primes = [];
    for(let i = 2; i < k; i++) {
        if(isPrimeOptimized(i)) {
            primes.push(i);
        }
    }
    return primes;
}

function isPrime(num) {
    for(let i = 2; i < num; i++) {
        if(num % i == 0) {
            return false;
        }
    }
    return true;
}

function isPrimeOptimized(num) {
    for(let i = 2; i < Math.floor(Math.sqrt(num)) + 1; i++) {
        if(num % i == 0) {
            return false;
        }
    }
    return true;
}