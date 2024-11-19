const {BloomFilter} = require('./bloom.filter')

const bloom = new BloomFilter(1000,3);

bloom.add('hell')
bloom.add('gelo')
bloom.add('alo')

console.log(bloom.alreadyExist('hell'))
console.log(bloom.alreadyExist('khel'))