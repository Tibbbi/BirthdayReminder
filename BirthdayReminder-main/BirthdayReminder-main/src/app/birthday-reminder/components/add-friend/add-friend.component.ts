import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BirthdayService } from '../../birthday.service';
import { Friend } from '../../models/friend';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {
  friendForm: FormGroup;
  @Output() friendAdded = new EventEmitter<Friend>();

  // constructor(private birthdayService: BirthdayService) {
  //   this.friendForm = new FormGroup({
  //     firstName: new FormControl(''),
  //     lastName: new FormControl(''),
  //     phone: new FormControl(''),
  //     city: new FormControl(''),
  //     birthday: new FormControl('')
  //   });
  // }
  constructor(private birthdayService: BirthdayService, private router: Router) {
    this.friendForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      city: new FormControl('', Validators.required),
      birthday: new FormControl('', [Validators.required, this.pastDateValidator])
    });
  }

  addFriend(): void {
    if (this.friendForm.valid) {
      this.birthdayService.addFriend(this.friendForm.value);
      this.friendAdded.emit(this.friendForm.value);
      this.friendForm.reset();  // Reset form after submission
      this.router.navigate(['/friends']);  // Navigate to the main page
    }
  }


  pastDateValidator(control: FormControl): { [key: string]: any } | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Setează ora la începutul zilei de azi
    const dateToCheck = new Date(control.value);

    if (dateToCheck >= today) {
      return { 'futureDate': 'The date must be in the past.' };
    }
    return null;  // Returnează null dacă validarea este trecută cu succes
  }
}
