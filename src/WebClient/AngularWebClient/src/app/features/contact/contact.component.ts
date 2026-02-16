import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.contactForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      subject: ["", Validators.required],
      message: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  submitContact(): void {
    if (this.contactForm.invalid) {
      this.snackBar.open("Please fill out all required fields", "Close", {
        duration: 3000,
      });
      return;
    }

    this.isSubmitting = true;
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.snackBar.open("Thank you! We will get back to you soon.", "Close", {
        duration: 3000,
      });
      this.contactForm.reset();
    }, 1500);
  }
}
