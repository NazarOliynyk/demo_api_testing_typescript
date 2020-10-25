export class UrlBuilder{
    
    baseurl: string = "http://data.fixer.io/api/";
    validAccessKey: string = "229d1da7b736ef77d158ea0c224c4344";
    malformedAccessKey: string = "229d1da7b736ef77d158ea0c224c4344-XXX";
    latestDate: string =  "latest";
    invalidDate: string = "2030-12-12";
    defaultSymbols: string = "USD,EUR,PLN,UAH";
    incompleteSymbols: string = "USD,EUR,PLN";
    nonDefaultCurrency: string = "USD";

    build(url: string, date:string, accesskey:string, baseCurrency:string, symbols:string){
        return url + date+
                "?access_key=" + accesskey +
                "&base=" + baseCurrency +
                "&symbols=" + symbols; 
    }
}