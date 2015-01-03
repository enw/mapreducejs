Simple JavaScript MapReduce framework
###

## API

simpl
    var docs = {
        'foo': 'hello, I love you',
        'bar': 'i am the disco man',
        'baz': 'i love the cut of your jib.'
    }
    function countWords(docID, value) {
        var words = value.split(' ');
        var ret = [];
        words.map(function(word) {ret.push({key:word.replace(/\W/g,''),value:1})});
        return ret;
    }
    // accumulator REDUCE function
    function sum(key, valueArray) {
        var acc=0; // accumulator
        valueArray.forEach(function(value) {acc+=value});
        return acc;
    }
    var MR = require('mapreducejs');

    // call with (data, mapFunction, reduceFunction)
    var result = MR.mapReduce(docs,  countWords, sum);


## examples
see example in */test/*

## next
* asynchronous/promise-based map/reduce
