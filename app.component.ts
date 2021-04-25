import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  dialog:MatDialog;
  allStudents:any;
 
  roll:number;
  name:string;
  course:string;

  displayedColumns: string[] = ['roll', 'name', 'course','action'];
  dataSource:any;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;


  constructor(private httpClient:HttpClient){
  }

   

  ngOnInit(){
    this.ShowStudent();
  }

  ShowStudent()
  {
    //Get the observable from httpClient's "get" method
    let studentObs = this.httpClient.get('http://localhost:62054/api/student'); 
    debugger;
    //Subscribe to the observable
    studentObs.subscribe((data)=>{
      debugger;
      alert(JSON.stringify(data));
      this.dataSource=data;
    });  
    let x=989;
  }
   
  AddStudent()
  {
      //Prepare the data to send
      var data={"roll":this.roll, "name":this.name,"course":this.course};
      
      //post method of httpClient
      let studentObs = this.httpClient.post('http://localhost:62054/api/student', data);
           
      //Subscribe to the observable
      studentObs.subscribe((data)=>{});  
  }


  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }


}

interface IStudent{
   roll: number;
   name:string;
   course:string;
}
