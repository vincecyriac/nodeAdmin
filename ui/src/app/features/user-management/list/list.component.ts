import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/common/services/socket.service';
import { UserManagementService } from 'src/app/common/services/user-management.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  arrUserList: any = []
  userListSocket: boolean = false;
  arrUpdates :any = []
  onRoom : boolean = false;

  constructor(private userService: UserManagementService, private socket: SocketService) {
    this.socket.listen('updateUser').subscribe((data) => this.userListSocket = true);
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  //function to fetch all users from service
  getAllUsers() {
    this.userService.getUserList().subscribe((Response) => {
      console.log(Response);
      this.arrUserList = Response.results;
      this.userListSocket = false;
    },
      (error) => {
        console.log(error);
      }
    );
  }

  createUser() {
    this.userService.createUser().subscribe((Response) => {
      console.log(Response);
      // this.getAllUsers();
      this.socket.emit('updateUser', {});
    },
      (error) => {
        console.log(error);
      }
    );
  }
  joinRoom() {
    this.socket.emit('join', {
      room: 'axe',
      user: 'kumar'
    });
    this.onRoom = true;
    this.subscribeToUpdates();
  }

  sendUpdates(msg :any) {
    console.log(msg);
    this.socket.emit('newUpdate', {
      msg : msg,
      room : 'axe'
    });
  }

  //subscribe to new updates
  subscribeToUpdates() {
    this.socket.listen('getUpdates').subscribe((data) => {
      console.log(data);
      this.arrUpdates.push(data);
    })
  }

  //unsubscribe to new updates
  leaveRoom() {
    this.socket.emit("leave",{
      room: 'axe',
      user: 'kumar'
    });
    this.onRoom = false;
    this.arrUpdates = [];
    //stop listening to updates
    this.socket.stopListening('getUpdates');
  }
}
