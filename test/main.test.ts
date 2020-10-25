import axios from 'axios';
import { expect } from 'chai';
import {CurrencyRates} from '../responsemodel/CurrencyRates';
import {UrlBuilder} from '../utils/urlBuilder';


describe('Try rest api testing with Axios in Typescript', () => { 

    let urlBuilder = new UrlBuilder();

    it('Verify Successful call to the resource', () => { 
       
        axios.request<CurrencyRates>({
            url: urlBuilder.build(urlBuilder.baseurl, urlBuilder.latestDate, urlBuilder.validAccessKey, "", urlBuilder.defaultSymbols),
            method: "GET",   
        }).then((response) => {
            expect(response.status, " Response status not OK !!").to.be.equal(200); 
            var currencyRates: CurrencyRates = response.data;
            expect(currencyRates.success, " Rates not success !!").to.be.true;
            expect(currencyRates.base, " Base rate not EUR !!").to.be.equal('EUR');
            expect(currencyRates.rates.EUR, " Rate for EUR not 1.0 !!").to.be.equal(1);
            expect(currencyRates.rates.USD, " Rate for USD is 0 !!").to.be.not.equal(0);
            expect(currencyRates.rates.UAH, " Rate for UAH is 0 !!").to.be.not.equal(0);
            expect(currencyRates.rates.PLN, " Rate for PLN is 0 !!").to.be.not.equal(0);
        }).catch(error => console.error(error))
    });

    it('Verify call to the resource with non-default base currency', () => { 
       
        axios.request<CurrencyRates>({
            url: urlBuilder.build(urlBuilder.baseurl, urlBuilder.latestDate, urlBuilder.validAccessKey, urlBuilder.nonDefaultCurrency, urlBuilder.defaultSymbols),
            method: "GET",   
        }).then((response) => {
            expect(response.status, " Response status not OK !!").to.be.equal(200); 
            var currencyRates: CurrencyRates = response.data;
            expect(currencyRates.success, " Rates is success !!").to.be.false;
            expect(currencyRates.error, " Error is null !!").to.be.not.equal(null);
            expect(currencyRates.error.code, " Error code is not 105 !!").to.be.equal(105);
            expect(currencyRates.error.type, " Error type is wrong !!").to.be.equal("base_currency_access_restricted");
        }).catch(error => console.error(error))
    });

    it('Verify call to the resource with the wrong access key', () => { 
       
        axios.request<CurrencyRates>({
            url: urlBuilder.build(urlBuilder.baseurl, urlBuilder.latestDate, urlBuilder.malformedAccessKey, "", urlBuilder.defaultSymbols),
            method: "GET",   
        }).then((response) => {
            expect(response.status, " Response status not OK !!").to.be.equal(200); 
            var currencyRates: CurrencyRates = response.data;
            expect(currencyRates.success, " Rates is success !!").to.be.false;
            expect(currencyRates.error, " Error is null !!").to.be.not.equal(null);
            expect(currencyRates.error.code, " Error code is not 101 !!").to.be.equal(101);
            expect(currencyRates.error.type, " Error type is wrong !!").to.be.equal("invalid_access_key");
        }).catch(error => console.error(error)) 
    });

});

// npm test