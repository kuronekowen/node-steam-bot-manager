Request.prototype.__proto__ = require('events').EventEmitter.prototype;

function Request(request, logger) {
    var self = this;
    self.request = request;
    self.logger = logger;
}


Request.prototype.getRequest = function (url, callback) {
    var self = this;
    self.request({
        url: url,
        method: "GET",
        json: true
    }, function (err, response, body) {
        callback(err, body);
    });
};


/**
 * @callback callbackRequestAPI
 * @param {Error} error - An error message if the process failed, undefined if successful
 * @param {Object} body - An object of the parsed response (undefined if failed)
 */

/**
 * Send GET Request to SteamAPI with details
 * @param apiInterface (String) - Interface name
 * @param version (String) - Interface version (v1 or v2 depending on interface)
 * @param method (String) - method to access
 * @param options - Data to attach to request
 * @param callbackRequestAPI -
 */
Request.prototype.getRequestAPI = function (apiInterface, version, method, options, callbackRequestAPI) {
    var self = this;

    var string = '?';
    var x = 0;
    for (var option in options)
        if (options.hasOwnProperty(option))
            string += option + "=" + options[option] + (x++ < Object.keys(options).length - 1 ? "&" : '');
    self.logger.log('debug', "Sending GET request to " + string);
    self.request({
        url: 'http://api.steampowered.com/' + apiInterface + '/' + method + '/' + version + '/' + string,
        method: "GET",
        json: true
    }, function (err, response, body) {
        callbackRequestAPI(err, body);
    });
};

module.exports = Request;