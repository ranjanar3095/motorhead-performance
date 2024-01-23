import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillingTableComponent } from './billing-table/billing-table.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { NoGstBillingTableComponent } from './no-gst-billing-table/no-gst-billing-table.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, BillingTableComponent, NoGstBillingTableComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    provideAnimations(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
