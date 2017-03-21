module.exports = function array_group (element1, element2, element3) { // eslint-disable-line camelcase
                                                         //  discuss at: http://locutus.io/php/array_combine/
                                                         // original by: Kevin van Zonneveld (http://kvz.io)
                                                         // improved by: Brett Zamir (http://brett-zamir.me)
                                                         //   example 1: array_combine([0,1,2], ['kevin','van','zonneveld'])
                                                         //   returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}

    var newArray = [];
    var i = 0;

    // input sanitation
    // Only accept arrays or array-like objects
    // Require arrays to have a count
    if (typeof element1 !== 'object') {
        return false;
    }
    if (typeof element2 !== 'object') {
        return false;
    }
    if (typeof element3 !== 'object') {
        return false;
    }
    if (typeof element1.length !== 'number') {
        return false;
    }
    if (typeof element2.length !== 'number') {
        return false;
    }
    if (typeof element3.length !== 'number') {
        return false;
    }
    if (!element1.length) {
        return false;
    }


    // number of elements does not match
    if (element1.length !== element2.length && element2.length !== element3.length) {
        return false;
    }

    for (i = 0; i < element1.length; i++) {
        newArray[i] = {ip:element1[i], port:element2[i], country:element3[i]};
    }

    return newArray;
}