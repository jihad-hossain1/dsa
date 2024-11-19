const BloomFilter = require("./bloom-filter/bloomFilter");

const bloom = new BloomFilter(1000, 3);

bloom.add("hello");
bloom.add("world");
bloom.add("hello2");


console.log('hello',bloom.alreadyExists("hello"));
console.log('world',bloom.alreadyExists("hello2"));
console.log('hello2',bloom.alreadyExists("hello3"));

const  { createHmac } = require('node:crypto');


const secret = 'abcd';
const message = 'hello';

// Generate the original hash
const originalHash = createHmac('sha256', secret).update(message).digest('hex');
console.log('Original Hash:', originalHash);

// To verify the hash, recompute it and compare
const verifyMessage = 'hello';  // This is the message you want to verify
const verifyHash = createHmac('sha256', secret).update(verifyMessage).digest('hex');

if (verifyHash === originalHash) {
    console.log('The message is valid and matches the hash.');
} else {
    console.log('The message does not match the hash.');
}



const crypto = require('crypto');

// Correct key length for aes-256-cbc (32 bytes = 256 bits)
const secretKey = crypto.randomBytes(32);  // 256-bit key for aes-256-cbc

// Create an initialization vector (IV) for encryption (16 bytes = 128 bits for AES)
const iv = crypto.randomBytes(16);

// The data to encrypt
const data = 'mySuperSecretDatamySuperSecretDatamySuperSecretDatamySuperSecretDatamySuperSecretDatamySuperSecretDatamySuperSecretDatamySuperSecretDatamySuperSecretDatamySuperSecretData';

// Encryption function using AES-256-CBC
function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decryption function using AES-256-CBC
function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Encrypt the data
const encryptedData = encrypt(data);
console.log('Encrypted Data:', encryptedData);

// Decrypt the data
const decryptedData = decrypt(encryptedData);
console.log('Decrypted Data:', decryptedData);

