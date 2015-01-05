/*
  synchronous mapReduce

  @documentHash : dictionary of documents keyed by docID
  @mapFxn : function ( docID, doc, emitter) that calls emitter(key, value) 
  @reduceFxn; function ( key, valueArray, emitter ) called once for each key returned from map fxns. calls emitter(key, value)

  synchronously returns result of all reduceFxns
 */
module.exports.mapReduce = function ( documentHash, mapFxn, reduceFxn ) {
    
    // MAP
    var mapResults = [];
    function mapEmitter(key, value) {
	mapResults.push({key:key, value:value});
    };
    var docIDs = Object.keys(documentHash);
    for (var i=0;i<docIDs.length;i++) {
	var docID = docIDs[i];
	var doc = documentHash[docID];
	var res = mapFxn(docID, doc, mapEmitter);
    }

    // PARTITION
    function comparator (a,b) {
	var ak = a.key.toUpperCase(),
	bk = b.key.toUpperCase();
	if (ak>bk) return 1;
	if (ak<bk) return -1;
	return 0;
    };
    mapResults.sort(comparator);
    var partitionHash = new Object();
    mapResults.forEach(function(val) {
	    var key = val.key.toUpperCase();
	    if (!partitionHash.hasOwnProperty(key)) partitionHash[key]=[];
	    partitionHash[key].push(val.value);
	});

    // REDUCE
    var reduceResults = {};
    function reduceEmitter(key, value) {
	reduceResults[key] = value;
    };
    var docIDs = Object.keys(documentHash);
    var keys = Object.keys(partitionHash);
    for (var i=0; i<keys.length; i++) {
	var key=keys[i];
	reduceFxn(key, partitionHash[key], reduceEmitter);
    }
    
    return reduceResults;
}
