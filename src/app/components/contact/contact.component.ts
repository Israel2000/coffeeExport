import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  public sendEmail(e: Event) {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_yckfuua',      //emailjs service ID
        'template_zfdeuqd',     //emailjs template ID
        e.target as HTMLFormElement,
        {
          publicKey: 'QyE6mWSbbbvjCixad',  //emailjs public key
        }
      )
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Your message has been sent!');
          (e.target as HTMLFormElement).reset();
        },
        (error: EmailJSResponseStatus) => {
          console.log('FAILED...', error.text);
          alert('Failed to send message. Please try again later.');
        }
      );
  }
}
 
