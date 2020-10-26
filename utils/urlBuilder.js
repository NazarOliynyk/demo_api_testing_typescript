"use strict";
exports.__esModule = true;
exports.UrlBuilder = void 0;
var UrlBuilder = /** @class */ (function () {
    function UrlBuilder() {
        this.baseurl = "http://data.fixer.io/api/";
        this.validAccessKey = "229d1da7b736ef77d158ea0c224c4344";
        this.malformedAccessKey = "229d1da7b736ef77d158ea0c224c4344-XXX";
        this.latestDate = "latest";
        this.invalidDate = "2030-12-12";
        this.defaultSymbols = "USD,EUR,PLN,UAH";
        this.incompleteSymbols = "USD,EUR,PLN";
        this.nonDefaultCurrency = "USD";
    }
    UrlBuilder.prototype.build = function (url, date, accesskey, baseCurrency, symbols) {
        return url + date +
            "?access_key=" + accesskey +
            "&base=" + baseCurrency +
            "&symbols=" + symbols;
    };
    return UrlBuilder;
}());
exports.UrlBuilder = UrlBuilder;
