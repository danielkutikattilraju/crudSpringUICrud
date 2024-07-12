import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestRequestService } from './rest-request.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // constructor(private apiService: rest-RestRequestService) { }
  constructor(private apiService: RestRequestService) { }

  students: any[] = [];
  name: string = "";
  class: string = "";
  floaterVisible: boolean = false;
  floaterVisibleAdd: boolean = false;
  data: any;
  title = 'javacrudui';
  currentData: any = [];




  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiService.get('records')
      .subscribe(
        (response) => {
          this.students = response;
        }
      );
  }

  deleteData(id: any): void {
    this.apiService.delete('delete/record/' + id) // Replace 'your-endpoint' with the actual endpoint
      .subscribe(
        (response) => {
          this.getData();
        }
      );
  }

  getDataById(id: any): void {
    this.floaterVisible = true;

    this.apiService.get('record/' + id)
      .subscribe(
        (response) => {
          this.currentData = response;
          this.name = response.sname;
          this.class = response.sclass
        }
      );
  }

  updateData() {
    this.currentData.sname = this.name;
    this.currentData.sclass = this.class;
    this.apiService.put('record/update/' + this.currentData.sid, this.currentData)
      .subscribe(
        (response) => {
          this.getData();
        }
      );
    this.clearData();
    this.floaterVisible = false;
  }

  clearData() {
    this.currentData = [];
    this.name = '';
    this.class = '';
  }

  close() {
    this.clearData();
    this.floaterVisible = false;
  }

  add() {
    this.floaterVisibleAdd = true;
  }

  closeAdd() {
    this.clearData();
    this.floaterVisibleAdd = false;
  }

  addData() {
    this.currentData.sname = this.name;
    this.currentData.sclass = Number(this.class);
    let temp = {
      "sname": this.name,
      "sclass": this.class,
    }
    console.log(temp);

    this.apiService.post('add', temp)
      .subscribe(
        (response) => {
          this.getData();
        }
      );
    this.clearData();
    this.floaterVisibleAdd = false;
  }
}
