var MR = require('../lib');

// 
var docs = {
    'foo': 'hello, I love you',
    'bar': 'i am the disco man',
    'baz': 'i love the cut of your jib.',
    'constitution': 'http://www.usconstitution.net/const.txt',
    'conspiracy-theory1': 'http://www.petry.org/markp/octopus1.htm'
};

// word-counting MAP function
function countWords(docID, value, emit) {
    function isHTTPURL(s) {
	return /^http:\/\/.*/.test(value);
    }
    
    // handle URL by getting document at location
    if (isHTTPURL(value)) {
	console.log('get doc at',value);
	return [];
    } else { // or count words in value
	var words = value.split(' ');
	var ret = [];
	//    words.map(function(word) {ret.push({key:word,value:1})});
	words.map(function(word) {emit({key:word.replace(/\W/g,''),value:1})});
    }
}

// accumulator REDUCE function
function sum(key, valueArray) {
    var acc=0; // accumulator
    valueArray.forEach(function(value) {acc+=value});
    return acc;
}

var result = MR.mapReduce(docs,  countWords, sum);
console.log('count of word occurrances in test documents is\n', result);

// timeout to force node-dev to keep listening for changes
setTimeout(function() {}, 1000000);