import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Subscription } from 'rxjs';
import { ToWords } from 'to-words';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-billing-table',
  templateUrl: './billing-table.component.html',
  styleUrls: ['./billing-table.component.scss'],
})
export class BillingTableComponent implements OnInit {
  billingTable!: FormGroup;
  control!: FormArray;
  touchedRows: any;
  toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: true,
      ignoreZeroCurrency: false,
    },
  });

  invoiceNumber: string = '';
  customerName: string = '';
  customerContact: number | undefined = undefined;
  customerEmail: string = '';
  bikeModel: string = '';
  lastKMReading: string = '';
  paymentMode: string = '';

  private logo: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.touchedRows = [];
    this.resetTable();
    this.subscriptions.add(
      this.http
        .get('/assets/img/logo.svg', { responseType: 'text' })
        .subscribe((logo) => (this.logo = logo))
    );
  }

  ngAfterOnInit(): void {
    this.control = this.billingTable.get('tableRows') as FormArray;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      service: [''],
      sac: [''],
      quantity: [''],
      rate: [''],
      amount: [''],
      isEditable: [true],
    });
  }

  resetTable(): void {
    this.billingTable = this.fb.group({
      tableRows: this.fb.array([]),
    });
    this.addRow();
  }

  resetForm(): void {
    this.resetTable();
    this.invoiceNumber = '';
    this.customerName = '';
    this.customerContact = undefined;
    this.customerEmail = '';
    this.bikeModel = '';
    this.lastKMReading = '';
    this.paymentMode = '';
  }

  addRow(): void {
    const control = this.billingTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number): void {
    const control = this.billingTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  get getFormControls() {
    const control = this.billingTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm(action: string): void {
    const control = this.billingTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls
      .filter((row) => row.touched)
      .map((row) => row.value);
    this.generatePDF(action);
  }

  calculateGST(amount: any): number {
    return Number((Number(amount) * 0.18).toFixed(2));
  }

  calculateAmount(rate: any, quantity: any, i: any): void {
    if (rate && quantity) {
      this.getFormControls.controls[i].patchValue({
        amount: (Number(quantity) * Number(rate)).toFixed(2),
      });
    }
  }

  getTotal() {
    return this.touchedRows.reduce(
      (sum: number, current: { amount: string }) =>
        sum + Number(current.amount),
      0
    );
  }

  getBase64Image() {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const imageBlobURL =
        'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(this.logo);
      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = imageBlobURL;
    });
  }

  async generatePDF(action: string) {
    let docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [10, 130, 10, 20],
      header: {
        columns: [
          [
            {
              image: await this.getBase64Image(),
              width: 250,
              margin: [0, -20, 0, -10],
            },
          ],
          [
            {
              canvas: [
                {
                  type: 'rect',
                  x: -60,
                  y: 10,
                  w: 360,
                  h: 25,
                  color: '#ed1c24',
                  // fillOpacity: 0.8,
                },
                {
                  type: 'rect',
                  x: -60,
                  y: 35,
                  w: 360,
                  h: 35,
                  color: '#403f41',
                },
              ],
            },
          ],
          [
            {
              text: '#18, 3rd Main, Poornapragna Nagar, Uttarahalli, Kengeri',
              fontSize: 9,
              bold: false,
              margin: [-1265, 80, 0, 0],
              alignment: 'center',
            },

            {
              text: 'Main Road, 5th Satge, Banashankari, Bengaluru - 560061',
              fontSize: 9,
              bold: false,
              margin: [-1265, 0, 0, 0],
              alignment: 'center',
            },
            {
              text: 'Phone: 6362 33 4646',
              fontSize: 9,
              bold: false,
              margin: [-1265, 5, 0, 0],
              alignment: 'center',
            },
            {
              text: 'Email: motorheadperformanceworkshop@gmail.com',
              fontSize: 9,
              bold: false,
              margin: [-1265, 0, 0, 0],
              alignment: 'center',
            },
          ],
        ],
      },
      content: [
        {
          text: 'GST No: 29BETPM7944F1ZQ',
          bold: true,
          fontSize: 10,
          margin: [0, 0, 0, 0],
          alignment: 'right',
        },
        {
          text: '----------------------------------------------------------------TAX INVOICE---------------------------------------------------------------',
          fontSize: 14,
        },
        {
          columns: [
            [
              // Labels
              {
                text: 'Inovice number:',
                fontSize: 11,
                bold: true,
                margin: [0, 15, 0, 0],
              },
            ],
            // Values
            [
              {
                text: this.invoiceNumber,
                fontSize: 10,
                margin: [-13, 15, 0, 0],
              },
            ],
            // // Labels
            [
              {
                text: 'Payment Mode:',
                fontSize: 11,
                margin: [0, 15, 0, 0],
                bold: true,
              },
            ],
            // Values
            [
              {
                text: this.paymentMode,
                fontSize: 10,
                margin: [-15, 15, 0, 0],
              },
            ],
            [
              {
                text: 'Invoice Date:   ',
                fontSize: 11,
                bold: true,
                margin: [0, 15, 0, 0],
              },
            ],
            [
              {
                text: `${new Date().toLocaleString().split(',')[0]}`,
                fontSize: 10,
                margin: [-25, 15, 0, 0],
              },
            ],
          ],
        },
        {
          columns: [
            [
              {
                text: 'Customer Details',
                style: 'sectionHeader',
              },
              {
                columns: [
                  [
                    // Labels
                    {
                      text: 'Name:',
                      fontSize: 11,
                      bold: true,
                      margin: [0, -6, 0, 0],
                    },
                  ],
                  // Values
                  [
                    {
                      text: this.customerName,
                      fontSize: 10,
                      margin: [-90, -6, 0, 0],
                      wordWrap: 'break-word',
                    },
                  ],
                ],
              },
              {
                columns: [
                  // Labels
                  [
                    {
                      text: 'Contact:   ',
                      fontSize: 11,
                      bold: true,
                      margin: [0, 2, 0, 0],
                    },
                  ],
                  // Values
                  [
                    {
                      text: this.customerContact,
                      fontSize: 10,
                      margin: [-90, 2, 0, 0],
                    },
                  ],
                ],
              },
              {
                columns: [
                  [
                    {
                      text: 'Email Id:',
                      fontSize: 11,
                      bold: true,
                      margin: [0, 2, 0, 0],
                    },
                  ],
                  [
                    {
                      text: this.customerEmail,
                      fontSize: 10,
                      margin: [-90, 2, 0, 0],
                      wordWrap: 'break-word',
                    },
                  ],
                ],
              },
            ],
            [
              {
                text: 'Bike Details',
                style: 'sectionHeader',
              },
              {
                columns: [
                  [
                    // Labels
                    {
                      text: 'Make/Model:',
                      fontSize: 11,
                      bold: true,
                      margin: [0, -8, 0, 0],
                    },
                  ],
                  // Values
                  [
                    {
                      text: this.bikeModel,
                      fontSize: 10,
                      margin: [-65, -8, 0, 0],
                    },
                  ],
                ],
              },
              {
                columns: [
                  [
                    {
                      text: 'ODO Reading:',
                      fontSize: 11,
                      bold: true,
                      margin: [0, 2, 0, 0],
                    },
                  ],
                  [
                    {
                      text: this.lastKMReading,
                      fontSize: 10,
                      margin: [-65, 2, 0, 0],
                    },
                  ],
                ],
              },
            ],
          ],
        },
        {
          text: 'Service Details',
          style: 'sectionHeader',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 100, 'auto', 75, 75],
            body: [
              [
                { text: 'Service', fontSize: 10, bold: true },
                { text: 'Part Number', fontSize: 10, bold: true },
                { text: 'Quantity', fontSize: 10, bold: true },
                { text: 'Rate', fontSize: 10, bold: true },
                { text: 'Amount', fontSize: 10, bold: true },
              ],
              ...this.touchedRows.map((p: any) => [
                { text: p.service, fontSize: 10 },
                { text: p.sac, fontSize: 10 },
                { text: p.quantity, fontSize: 10 },
                { text: p.rate, fontSize: 10 },
                { text: p.amount, fontSize: 10 },
              ]),
              [
                { text: 'Total', colSpan: 4, bold: true, fontSize: 10 },
                { text: '' },
                { text: '' },
                { text: '' },
                {
                  text: this.getTotal(),
                  fontSize: 10,
                  bold: true,
                },
              ],
              [
                { text: 'GST(18%)', colSpan: 4, bold: true, fontSize: 10 },
                { text: '' },
                { text: '' },
                { text: '' },
                {
                  text: (Number(this.getTotal()) * 0.18).toFixed(2),
                  fontSize: 10,
                  bold: true,
                },
              ],
              [
                { text: 'Grand Total', colSpan: 4, bold: true, fontSize: 12 },
                { text: '' },
                { text: '' },
                { text: '' },
                {
                  text: (
                    Number(this.getTotal()) +
                    Number(this.getTotal()) * 0.18
                  ).toFixed(2),
                  fontSize: 12,
                  bold: true,
                },
              ],
            ],
          },
        },
        {
          columns: [
            [
              {
                text: 'Amount in words: ',
                fontSize: 12,
                margin: [0, 8, 0, 0],
                bold: true,
              },
            ],
            [
              {
                text: this.toWords.convert(
                  Number(this.getTotal()) + Number(this.getTotal()) * 0.18
                ),
                fontSize: 10,
                margin: [-183, 10, 0, 0],
                wordWrap: 'break-word',
                bold: true,
              },
            ],
          ],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 12,
          margin: [0, 15, 0, 15],
        },
      },
    };
    action === 'download'
      ? pdfMake.createPdf(docDefinition).download()
      : pdfMake.createPdf(docDefinition).open();
  }
}
