import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactsService } from 'src/app/_services/contacts.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() contact: any = null;
  @Input() isActive: boolean = false;

  constructor(private contactsService: ContactsService, private tokenStorage: TokenStorageService) { }

  form: any = {
    name: null,
    phone: null,
  };

  token: any;

  onSubmit(): void {
    const { name, phone } = this.form;

    if (this.contact != null) {
      this.contactUpdate(name, `${phone}`);
    } else {
      this.contactCreate(name, `${phone}`);
    }
  }

  contactCreate(name: string, phone: string): void {
    this.contactsService.createContact(name, phone, this.token).subscribe(
      data => {
        if (data) this.reloadPage();
      },
      err => {
        console.log(err);
      }
    );
  }

  contactUpdate(name: string, phone: string): void {
    this.contactsService.updateContact(this.contact._id, name, phone, this.token).subscribe(
      data => {
        alert(data.message);
        if (data) this.reloadPage();
      },
      err => {
        console.log(err);
      }
    )
  }

  formTitle(): string {
    if (this.contact != null) {
      return "Редактировать контакт";
    } else {
      return "Создать новый контакт";
    }
  }

  formBtnTitle(): string {
    if (this.contact != null) {
      return "Сохранить";
    } else {
      return "Создать";
    }
  }

  checkForm(): void {
    if (this.contact != null) {
      this.form.name = this.contact.name;
      this.form.phone = this.contact.phone;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  getToken(): void {
    this.token = this.tokenStorage.getToken();
  }

  ngOnInit(): void {
    this.getToken();
    this.checkForm();
    this.formTitle();
    this.formBtnTitle();
  }

}
