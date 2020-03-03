/**
 * Change the core of NodeJS. like String, Number and Object...
 */

/**
 * Run on all the array and change the values by the return value.
 */
Array.prototype.init = function(callback) {
    for (i = 0; i < this.length; i++) {
        this[i] = callback(this[i], i);
    }
    return this;
}

/**
 * Like 'String.prototype.replace' , but on all
 */
String.prototype.replaceAll = function (from, to){
    ret = this.toString();
    while (ret.indexOf(from) != -1) {
        ret = ret.replace(from, to);
    }
    return ret;
}