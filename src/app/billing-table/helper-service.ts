import { Injectable } from '@angular/core';
import { ToWords } from 'to-words';

@Injectable({
  providedIn: 'root',
})
export class BillingHelperService {
  toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: true,
      ignoreZeroCurrency: false,
    },
  });
}
