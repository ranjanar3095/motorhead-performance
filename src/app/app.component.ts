import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'motorhead-performance';

  billingTable!: FormGroup;
  control!: FormArray;
  touchedRows: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.touchedRows = [];
    this.billingTable = this.fb.group({
      tableRows: this.fb.array([]),
    });
    this.addRow();
  }

  ngAfterOnInit(): void {
    this.control = this.billingTable.get('tableRows') as FormArray;
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      dob: ['', [Validators.required]],
      bloodGroup: [''],
      mobNumber: ['', [Validators.required, Validators.maxLength(10)]],
      isEditable: [true],
    });
  }

  addRow(): void {
    const control = this.billingTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number): void {
    const control = this.billingTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup): void {
    group.get('isEditable')?.setValue(true);
  }

  doneRow(group: FormGroup): void {
    group.get('isEditable')?.setValue(false);
  }

  get getFormControls() {
    const control = this.billingTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.billingTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls
      .filter((row) => row.touched)
      .map((row) => row.value);
    console.log(this.touchedRows);
  }
}
