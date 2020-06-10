import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  userDummy: User[];
  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit() {
    this.userDummy = this.userService.getDummy();
    console.log('ngon', this.users);
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });
    console.log('this.userServicefindall', typeof(this.users), this.users);
    console.log('this.userDummy', typeof(this.userDummy), this.userDummy);
    // this.users = this.users.concat(this.userDummy);
    console.log('this.usersconcat', this.users);
    // console.log('if', (typeof (this.userService)).toString());
  }
  editButtonClick(Id: string) {
    console.log('editButtonClick', Id);
    this.router.navigate(['/edit', Id]);
  }
}
