import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, Sanitizer, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../Services/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User3 } from '../models/User';
import { InitialFormValue2 } from '../models/tempModels';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  profilePicture: string | ArrayBuffer | null | SafeUrl = null;
  imageFile:File|null=null;
  img: string | ArrayBuffer | null | SafeUrl = null;
  email!:string;
  userData!:User3;
  role!:string;
  _snackBar: MatSnackBar = inject(MatSnackBar);
  private initialFormValues!: InitialFormValue2;
router=inject(Router)
  @ViewChild("fileinput") fileInput!: ElementRef;

  constructor(private http: HttpClient,private userService:UserService,private sanitizer: DomSanitizer,private auth:AuthService) {
    if(!this.auth.loggedUser.id){
      this.router.navigateByUrl("auth/login")
    }
   }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),

      gender: new FormControl('', Validators.required)
    });

    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmNewPassword: new FormControl('', Validators.required)
    });

    this.userService.getUserById().subscribe((response: User3) => {
      this.profileForm.setValue({
        firstName: response.firstname,
        lastName: response.lastname,
     
        gender: response.gender
      });
      console.log(response);
  
      this.initialFormValues=this.profileForm.getRawValue();

      const blob = new Blob([response.image], { type: 'image/jpeg' });
      const objectURL = URL.createObjectURL(blob);
    
      this.profilePicture = this.sanitizer.bypassSecurityTrustUrl(objectURL);





      this.userService.fetchImage2().toPromise().then(blob => {
        if (blob) {
          const objectURL = URL.createObjectURL(blob);
          this.profilePicture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      
        } else {
         
          this.profilePicture = null; 
        }
      }).catch(err => {
       
        console.error(`Error fetching image `, err);
        this.profilePicture = null;
      });
      this.img=this.sanitizer.bypassSecurityTrustUrl(objectURL);
   console.log(response.userType);
      this.role = this.auth.loggedUser.role;
      this.email=response.email
    });
  }

  uploadProfilePicture(): void {
    this.fileInput.nativeElement.click();
  }

  onProfilePictureChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result;
      };
      this.imageFile = file;
      reader.readAsDataURL(file);
    }
  }

  openSnackBar(msg: string): void {
    this._snackBar.open(msg);
    setTimeout(() => {
      this._snackBar.dismiss();
    }, 1500);
  }

  onSaveProfile(): void {
    const currentFormValues = this.profileForm.getRawValue();
    if (JSON.stringify(this.initialFormValues) === JSON.stringify(currentFormValues) && !this.imageFile) {
      this.openSnackBar('No changes detected.');
      return;
    }
    if (this.profileForm.valid) {
      const data = {
        ...this.profileForm.value,
      };

      const formData = new FormData();
      formData.append('userInfo', new Blob([JSON.stringify(data)], { type: 'application/json' }));

      if (this.imageFile) {
        formData.append('file', this.imageFile);
      }

      
this.userService.updateUser(formData).subscribe(()=>{
  this.openSnackBar('Profile updated successfully');

},err=>{
  this.openSnackBar('Something went wrong')
})
    
    }
  }

  onChangePassword(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword, confirmNewPassword } = this.passwordForm.value;
      console.log(this.passwordForm.value);

      if (newPassword !== confirmNewPassword) {
        this.openSnackBar('Passwords do not match.');
        return;
      }

      const passwordData = {
        currentPassword,
        newPassword
      };

      this.http.put(`http://localhost:8080/api/user/password/${this.auth.loggedUser.id}`, passwordData)
        .subscribe(response => {
          console.log('Password changed successfully', response);
          this.openSnackBar('Password changed successfully.');
          this.passwordForm.reset();
          this.passwordForm.markAsPristine();
          this.passwordForm.markAsUntouched();
          Object.keys(this.passwordForm.controls).forEach(key => {
            this.passwordForm.controls[key].setErrors(null);
     });
          
        
        }, error => {
          this.openSnackBar(`${error.message}`);
        });
    }
  }
}