"use strict";
exports.__esModule = true;
exports.CurrencyRates = void 0;
var CurrencyRates = /** @class */ (function () {
    function CurrencyRates(success, error, timestamp, historical, base, date, rates) {
        this.success = success;
        this.error = error;
        this.timestamp = timestamp;
        this.historical = historical;
        this.base = base;
        this.date = date;
        this.rates = rates;
    }
    return CurrencyRates;
}());
exports.CurrencyRates = CurrencyRates;
