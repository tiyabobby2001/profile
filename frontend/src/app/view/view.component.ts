import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../resume.service';
import { Resume } from '../resume.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
  details: Resume | undefined;

  constructor(private route: ActivatedRoute,private rs: ResumeService ,private router:Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.rs.viewbyid(id).subscribe(
      (data: Resume) => this.details = data,
      (error: any) => console.error('Error fetching resume details', error)
    );
  }
  back(): void {
  this.router.navigate([""])
}
}






// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ResumeService } from '../resume.service';
// import { Resume } from '../resume.model';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-view',
//   templateUrl: './view.component.html',
//   styleUrls: ['./view.component.css']
// })
// export class ViewComponent implements OnInit {
//   details: Resume | undefined;
//     constructor(private route: ActivatedRoute,private rs: ResumeService ,private router:Router) {}

//   resume: any = {
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     email: '',
//     gender: '',
//     address: {
//       houseNo: '',
//       street: '',
//       state: '',
//       city: '',
//       pincode: ''
//     },
//     languages: [],
//     experiences: []
//   };
//   languages: string[] = ['English', 'Spanish', 'French', 'German'];

//   ngOnInit(): void {
//         const id = Number(this.route.snapshot.paramMap.get('id'));
//         this.rs.viewbyid(id).subscribe(
//           (data: Resume) => this.details = data,
//           (error: any) => console.error('Error fetching resume details', error)
//         );
//       }

//   addExperience(): void {
//     this.resume.experiences.push({
//       companyName: '',
//       position: '',
//       dateOfJoining: '',
//       dateOfResign: ''
//     });
//   }

//   removeExperience(index: number): void {
//     this.resume.experiences.splice(index, 1);
//   }

//   onSubmit(form: any): void {
//     if (form.valid) {
//       console.log('Form Data:', this.details);

//       // Submit the updated resume data to the server
//       this.rs.updatereg(id, resume).subscribe(
//         response => {
//           console.log('Resume updated successfully:', response);
//           // Handle success (e.g., show a success message or redirect)
//         },
//         error => {
//           console.error('Error updating resume:', error);
//           // Handle error (e.g., show an error message)
//         }
//       );
//     } else {
//       console.error('Form is invalid');
//     }
//   }
// }




