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
  }

  //function to fetch all users from service
  getAllUsers() {
    //call service to fetch all users
  }


}
