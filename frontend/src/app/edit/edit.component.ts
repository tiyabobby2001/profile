// import { Component ,OnInit} from '@angular/core';
// import { ResumeService } from '../resume.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Resume } from '../resume.model';
// import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';


// @Component({
//   selector: 'app-edit',
//   templateUrl: './edit.component.html',
//   styleUrl: './edit.component.css'
// })
// export class EditComponent implements OnInit {
//   resume: Resume | undefined;

//   constructor(private route: ActivatedRoute,private router: Router,private resumeService: ResumeService) {}

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     this.resumeService.viewbyid(id).subscribe(
//       (data: Resume) => this.resume = data,
//       (error: any) => console.error('Error fetching  details', error)
//     );
//   }

//   updatereg(): void {
//     if (this.resume) {
//       const id = Number(this.route.snapshot.paramMap.get('id'));
//       this.resumeService.updatereg(id, this.resume).subscribe(
//         () => this.router.navigate(['/']),
//         (error: any) => console.error('Error updating ', error)
//       );
//     }
//   }
  
// }




// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-edit',
//   templateUrl: './edit.component.html',
//   styleUrls: ['./edit.component.css']
// })
// export class EditComponent implements OnInit {
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
//     // Load existing resume details if needed (e.g., from an API)
//     this.loadResume();
//   }

//   loadResume(): void {
//     // You can replace this mock data with an actual service call to fetch resume data
//     this.resume = {
//       firstName: 'John',
//       lastName: 'Doe',
//       dateOfBirth: '1990-01-01',
//       email: 'john.doe@example.com',
//       gender: 'Male',
//       address: {
//         houseNo: '123',
//         street: 'Main St',
//         state: 'State',
//         city: 'City',
//         pincode: '123456'
//       },
//       languages: ['English'],
//       experiences: [
//         {
//           companyName: 'Company A',
//           position: 'Developer',
//           dateOfJoining: '2015-01-01',
//           dateOfResign: '2019-01-01'
//         }
//       ]
//     };
//   }

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
//       // Implement form submission logic here (e.g., send updated data to the server)
//       console.log('Updated Resume:', this.resume);
//       // Example:
//       // this.resumeService.updateResume(this.resume).subscribe(response => {
//       //   // Handle response
//       // });
//     } else {
//       console.error('Form is invalid');
//     }
//   }
// }







import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ResumeService } from '../resume.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  resumeForm!: FormGroup;
  states = ['Kerala', 'Tamil Nadu', 'Karnataka', 'Telangana', 'Andhra Pradesh'];
  cities: string[] = [];
  languages = ['English', 'Hindi', 'Malayalam', 'Tamil', 'Others'];

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.resumeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      languages: this.fb.array(this.languages.map(() => this.fb.control(false))),
      address: this.fb.group({
        houseNo: ['', Validators.required],
        street: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
      }),
      experiences: this.fb.array([])
    });

    this.getProfile(id);
  }

  get experiences(): FormArray {
    return this.resumeForm.get('experiences') as FormArray;
  }

  addExperience(experience?: any): void {
    const expGroup = this.fb.group({
      companyName: [experience ? experience.companyName : '', Validators.required],
      position: [experience ? experience.position : '', Validators.required],
      dateOfJoining: [experience ? experience.dateOfJoining : '', Validators.required],
      dateOfResign: [experience ? experience.dateOfResign : '', Validators.required]
    });
    this.experiences.push(expGroup);
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  getProfile(id: number): void {
    this.resumeService.viewbyid(id).subscribe(profile => {
      this.resumeForm.patchValue({
        firstName: profile.firstName,
        lastName: profile.lastName,
        dateOfBirth: profile.dateOfBirth,
        email: profile.email,
        gender: profile.gender,
        languages: this.languages.map(lang => profile.languages.includes(lang))
      });

      // Update address
      this.resumeForm.get('address')?.patchValue(profile.address);

      // Update experiences
      this.populateExperiences(profile.experiences);
      this.onStateChange(); // Ensure cities are updated based on the state
    });
  }

  populateExperiences(experiences: any[]): void {
    const experiencesArray = this.resumeForm.get('experiences') as FormArray;
    experiencesArray.clear(); // Clear existing experiences if any

    experiences.forEach(exp => {
      experiencesArray.push(this.fb.group({
        companyName: [exp.companyName, Validators.required],
        position: [exp.position, Validators.required],

        dateOfJoining: [exp.dateOfJoining, Validators.required],
        dateOfResign: [exp.dateOfResign, Validators.required]
      }));
    });
  }

  onStateChange(): void {
    const selectedState = this.resumeForm.get('address.state')?.value;
    this.updateCitiesBasedOnState(selectedState);
  }

  updateCitiesBasedOnState(state: string): void {
    const stateCityMapping: { [key: string]: string[] } = {
      'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode'],
      'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
      'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru'],
      'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad'],
      'Andhra Pradesh': ['Vijayawada', 'Visakhapatnam', 'Guntur']
    };
    
    this.cities = stateCityMapping[state] || [];
  }

  onSubmit(): void {
    if (this.resumeForm.valid) {
      const id = +this.route.snapshot.paramMap.get('id')!;
      const formValue = this.resumeForm.value;

      const payload = {
        ...formValue,
        languages: formValue.languages.map((checked: boolean, i: number) => checked ? this.languages[i] : null).filter((lang: string | null) => lang),
        experiences: formValue.experiences
      };

      this.resumeService.updatereg(id, payload).subscribe(
        response => {
          alert('Profile updated successfully!');
          this.router.navigate(['/']);
        },
        error => {
          console.error('Update failed:', error);
        }
      );
    }
  }
}