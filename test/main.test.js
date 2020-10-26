"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var chai_1 = require("chai");
var urlBuilder_1 = require("../utils/urlBuilder");
describe('Try rest api testing with Axios in Typescript', function () {
    var urlBuilder = new urlBuilder_1.UrlBuilder();
    it('Verify Successful call to the resource', function () {
        axios_1["default"].request({
            url: urlBuilder.build(urlBuilder.baseurl, urlBuilder.latestDate, urlBuilder.validAccessKey, "", urlBuilder.defaultSymbols),
            method: "GET"
        }).then(function (response) {
            chai_1.expect(response.status, " Response status not OK !!").to.be.equal(200);
            var currencyRates = response.data;
            chai_1.expect(currencyRates.success, " Rates not success !!").to.be["true"];
            chai_1.expect(currencyRates.base, " Base rate not EUR !!").to.be.equal('EUR');
            chai_1.expect(currencyRates.rates.EUR, " Rate for EUR not 1.0 !!").to.be.equal(1);
            chai_1.expect(currencyRates.rates.USD, " Rate for USD is 0 !!").to.be.not.equal(0);
            chai_1.expect(currencyRates.rates.UAH, " Rate for UAH is 0 !!").to.be.not.equal(0);
            chai_1.expect(currencyRates.rates.PLN, " Rate for PLN is 0 !!").to.be.not.equal(0);
        })["catch"](function (error) { return console.error(error); });
    });
    it('Verify call to the resource with non-default base currency', function () {
        axios_1["default"].request({
            url: urlBuilder.build(urlBuilder.baseurl, urlBuilder.latestDate, urlBuilder.validAccessKey, urlBuilder.nonDefaultCurrency, urlBuilder.defaultSymbols),
            method: "GET"
        }).then(function (response) {
            chai_1.expect(response.status, " Response status not OK !!").to.be.equal(200);
            var currencyRates = response.data;
            chai_1.expect(currencyRates.success, " Rates is success !!").to.be["false"];
            chai_1.expect(currencyRates.error, " Error is null !!").to.be.not.equal(null);
            chai_1.expect(currencyRates.error.code, " Error code is not 105 !!").to.be.equal(105);
            chai_1.expect(currencyRates.error.type, " Error type is wrong !!").to.be.equal("base_currency_access_restricted");
        })["catch"](function (error) { return console.error(error); });
    });
    it('Verify call to the resource with the wrong access key', function () {
        axios_1["default"].request({
            url: urlBuilder.build(urlBuilder.baseurl, urlBuilder.latestDate, urlBuilder.malformedAccessKey, "", urlBuilder.defaultSymbols),
            method: "GET"
        }).then(function (response) {
            chai_1.expect(response.status, " Response status not OK !!").to.be.equal(200);
            var currencyRates = response.data;
            chai_1.expect(currencyRates.success, " Rates is success !!").to.be["false"];
            chai_1.expect(currencyRates.error, " Error is null !!").to.be.not.equal(null);
            chai_1.expect(currencyRates.error.code, " Error code is not 101 !!").to.be.equal(101);
            chai_1.expect(currencyRates.error.type, " Error type is wrong !!").to.be.equal("invalid_access_key");
        })["catch"](function (error) { return console.error(error); });
    });
});
// npm test
