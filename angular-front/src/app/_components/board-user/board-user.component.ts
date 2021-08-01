import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }

  contacts: any | Object[] = [];
  token: any;
  message: string | any = null;

  getUser(): void {
    this.userService.getUserBoard(this.token).subscribe(
      data => {
        this.contacts = JSON.parse(data);
        this.checkMessage();
      },
      err => {
        this.contacts = JSON.parse(err.error).message;
      }
    );
  }

  checkMessage(): void {
    if (this.contacts.message) {
      this.message = this.contacts.message;
    }
  }

  ngOnInit(): void {
    this.token = this.tokenStorage.getToken();
    this.getUser();
  }
}
