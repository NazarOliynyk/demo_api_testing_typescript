 import {Rates} from './Rates';
 import {Error} from './Error';

 export class CurrencyRates {

   constructor(
     public success: boolean,
     public error: Error,
     public timestamp: number,
     public historical: boolean,
     public base: string,
     public date: Date,
     public rates: Rates
   ) {}

}