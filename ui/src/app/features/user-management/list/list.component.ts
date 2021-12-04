import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/common/services/user-management.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private userService : UserManagementService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  //function to fetch all users from service
  getAllUsers() {
    this.userService.getUserList().subscribe((Response) => {
      console.log(Response);
    },
      (error) => {
        console.log(error);
      }
    );
  }


}
