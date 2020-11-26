import { Component, OnInit, ViewChild } from '@angular/core';
import { FormioResourceIndexComponent } from 'angular-formio/resource';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';


import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';


@Component({
  selector: 'app-residential-index',
  templateUrl: './residential-index.component.html',
  styleUrls: ['./residential-index.component.scss']
})
export class ResidentialIndexComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'my-app';
  public data = [];
  public res: string[] = [];

  columnDefs = [
    { headerName: 'Listing Type', width: 120 ,field: 'listingType' },
    { headerName: 'Primary Property Practitioner',width: 120, field: 'primaryProperty' },
    { headerName: 'Property Type', width: 120, field: 'propertyType' },
    { headerName: 'Price', width: 120, field: 'price' },
    { headerName: 'Suburb', width: 120, field: 'suburb' },
    { headerName: 'Address', width: 120, field: 'address' },
    { headerName: 'No. Of Bedrooms', width: 120, field: 'bedrooms' },
    { headerName: 'Unit Number', width: 120, field: 'unitNumber' },
    { headerName: 'Code', width: 120, field: 'code' }
  ];


  rowData: any;
  

  constructor(private http: HttpClient, private router: Router) {

  }

  gridOptions: {
    // enables pagination in the grid
    pagination: true,

    // sets 10 rows per page (default is 100)
    paginationPageSize: 10,

    // other options
}

onRowClicked(event) {
    this.router.navigate([`/residential/${event.data.id}/view`]);
  }

  newListing(){
    this.router.navigate([`/residential/new`]);
  }
  ngOnInit() {
    let headers = new HttpHeaders().set('x-token', 'C7rBtDpCVAXqjx4RPOjD2jpe0Xati6')
      .set('content-type', 'application/json');

    this.http
      .get<any[]>('https://whitefang-digitaloffice.form.io/residentials1/submission?sort=-created&skip=0&limit=1000', { headers })
      .subscribe((res) => {
        res.forEach(element => {
          return this.data.push({
            "address": element.data.address.formatted_address,
            "listingType": element.data.listingType,
            "propertyType": element.data.propertyType.data.label,
            "primaryProperty": element.data.user.data?element.data.user.data.firstName+" "+element.data.user.data.lastName:'',
            "price": element.data.price,
            "suburb": element.data.suburbRef.data.suburb,
            "bedrooms": element.data.bedrooms,
            "unitNumber": element.data.unitNumber ? element.data.unitNumber : '',
            "code": element.data.mandateMetaData.code,
            "id": element._id
          });
        });
        this.rowData = this.data;
      })
  }


}

