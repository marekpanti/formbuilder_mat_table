import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material';
export interface PeriodicElement {
  id: number;
  firstName: string;
  lastName: string;
}
import {
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, firstName: 'Hydrogen', lastName: 'H'},
  {id: 2, firstName: 'Helium', lastName: 'He'},
  {id: 3, firstName: 'Lithium', lastName: 'Li'},
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'delete'];
  dataSource;
  title='title';
  undoRow = [{ showUndo: false, timer: 0 }];
  countId = 0;
  public myForm: FormGroup;
  constructor(private _fb: FormBuilder){}

  ngOnInit() {
    this.myForm = this._fb.group({
      testField: ['testValue'],
      rows: this._fb.array([this.initRows(0)])
    });
    this.dataSource = this.myForm.controls['rows'].value;
    console.log(this.dataSource);
  }

  initRows(id: number) {
    console.log('tu', id);
    return this._fb.group({
      firstName: ['test'],
      lastName: [''],
      id: [id]
    });
  }

  addRows() {
    this.countId++;
    const control = <FormArray>this.myForm.controls['rows'];
    control.push(this.initRows(this.countId));
    this.dataSource = this.myForm.controls['rows'].value;
    this.undoRow.push({ showUndo: false, timer: 0 });
  }

  removeRow(i, id) {
    this.undoRow[i].showUndo = true;
    const control = <FormArray>this.myForm.controls['rows'];
    this.undoRow[i].timer = setTimeout(() => {
      const index = control.value
        .map(d => {
          return d['id'];
        })
        .indexOf(id);
      control.removeAt(index);
      this.undoRow.splice(index, 1);
      this.dataSource = this.myForm.controls['rows'].value;
    }, 3000);
  }

  undoDelete(i: number) {
    this.undoRow[i].showUndo = false;
    clearTimeout(this.undoRow[i].timer);
  }

}
