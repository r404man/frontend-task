import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ContactsService } from 'src/app/_services/contacts.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements AfterViewInit {
  @ViewChild('contactCard') contactCard?: ElementRef<HTMLDivElement>;
  @Input() contact: any = null;
  @Input() token: any;

  constructor(private contactService: ContactsService) { }

  isOpen: boolean = false;
  isEdit: string = "Редактировать";

  deleteContact(id: string) {
    this.removeElement();
    this.contactService.deleteContact(id, this.token).subscribe(
      data => {
        alert(data.message);
      },
      err => {
        console.log(err);
      }
    );
  }

  removeElement(): void {
    this.contactCard?.nativeElement.remove();
  }

  showEditForm(): void {
    this.isOpen = !this.isOpen;
  }

  ngAfterViewInit(): void { }
}
