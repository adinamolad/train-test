import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Phone } from 'src/app/models/phone.model';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})
export class PhonesComponent implements OnInit {

  phoneList: Phone[] = [];
  filteredPhoneList: Phone[] = [];
  numOfOnline: number;
  numOfOffline: number;
  searchField: FormControl;

  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.searchField = new FormControl();
    this.searchField.valueChanges
      .subscribe(term => {
        this.filteredPhoneList = this.phoneList.filter(phone => phone.phone.includes(term));
        this.numOfOnline = this.filteredPhoneList.filter(x => x.online).length;
        this.numOfOffline = this.filteredPhoneList.filter(x => !x.online).length;
      });

    this.httpClient.get("assets/phones.json").subscribe(data => {

      this.phoneList = (data as any).phones;
      this.phoneList.forEach(phone => {
        phone.orderedOn = phone.orderedOn.replace(/\//g, '.');
        phone.lastReportDate = phone.lastReportDate.replace(/\//g, '.');
      });

      this.numOfOnline = this.phoneList.filter(x => x.online).length;
      this.numOfOffline = this.phoneList.filter(x => !x.online).length;
      this.filteredPhoneList = this.phoneList;

      console.log('phoneList', this.phoneList);

    },
      error => {
        alert('there was an error');
      });



  }

}
