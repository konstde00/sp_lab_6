# Лабораторна робота 6 з системного програмування

## Аналітика програми

Для обраної (скомпільованої) програми: 
1) побудувати FlameGraph виконання: 
  1.1) продемонструвати процес побудови при захисті роботи (+3б.)
  1.2) пояснити (інтерпретувати) отримані на графіку результати (+3б.)
         (можна для самої програми або для системи в цілому)

2) зібрати та пояснити статистику її виконання, зокрема:
  2.1) /usr/bin/time -- verbose <<prog>> (+2б.)
  2.2) perf stat -d <<prog>> (+2б.)
  2.3) perf report (after perf record) (+2б.)
         (perf: створення і аналіз логів, траси виконання)

3) заміряти енерговитрати (Power consumption):
  3.1) системи при виконанні програми (+3б.) 
  3.2) виключно досліджуваної програми (+3б.)

4) порівняти параметри виконання програми до та після оптимізації (або ключами -Ox, або внесенням змін у її вихідний код):
  4.1) пояснити різницю в асемблерному коді до та після виконання оптимізації (+3б.)
    4.1.1) пояснити на прикладі інструкцій AVX-* розширень (якщо застосовно), наприклад SIMD інструкції (+3б.)
               (можна користуючись https://godbolt.org)
  4.2) порівняти час та інші показники (див. п.п. 2.1, 2.2, тощо) виконання до і після оптимізації (+3б.)
  4.3) продемонструвати зміни на FlameGraph (п. 1) після оптимізації (+3б.)
  4.4) порівняти енерговитрати (п. 3) після оптимізації (+3б.)


Для запуску використовуються команди

0x -o app.js

Та засоби аналітики:

Microsoft performance recorder
Microsoft performance analyzer

## Знаходиться Flamegraph

## Приклад:

Програма:
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

Flamegraph можна переглянути у файлах flamegraphMillion та flamegraphOptimizedMil
Аналогічні результати по статистиці виконання, енерговитратам до та після оптимізації зберігаються у файлах .etl, що можна переглянути за допомогою Windows Performance Analyzer