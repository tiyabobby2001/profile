import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ResumeService } from '../resume.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.css']
})
export class ResumeFormComponent implements OnInit {

  resumeForm!: FormGroup;
  languages = ['English', 'Hindi', 'Malayalam', 'Tamil', 'Others'];

  submitted = false;
  states = ['Kerala', 'Tamil Nadu', 'Karnataka', 'Telangana', 'Andhra Pradesh'];
  cities: string[] = [];
  constructor(private resumeService: ResumeService,private router:Router) {}

  ngOnInit(): void {
    this.resumeForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl(null, [Validators.required]),
      languages: new FormArray(this.languages.map(() => new FormControl(false))),
      // image: new FormControl(null),

      address: new FormGroup({
        houseNo: new FormControl(null, [Validators.required]),
        street: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        pincode: new FormControl(null, [Validators.required, Validators.pattern('^\\d{6}$')])
      }),
      experiences: new FormArray([])
    });
  }
 
  onStateChange() {
    const stateControl = this.resumeForm.get('address.state');
    const cityControl = this.resumeForm.get('address.city');
    if (stateControl  && cityControl) {
      const selectedState = stateControl.value;
      this.cities = [];

      if (selectedState === 'Kerala') {
        this.cities = ['Kochi', 'Trivandrum', 'Kottayam', 'Trissur', 'Kannur'];
      } else if (selectedState === 'Tamil Nadu') {
        this.cities = ['Chennai', 'Coimbatore', 'Selam', 'Tiruppur', 'Madurai'];
      } else if (selectedState === 'Karnataka') {
        this.cities = ['Bangalore', 'Mysore', 'Ballari', 'Udupi'];
      } else if (selectedState === 'Telangana') {
        this.cities = ['Hyderabad', 'Warangal', 'Karimnagar', 'Medak'];
      } else if (selectedState === 'Andhra Pradesh') {
        this.cities = ['Vijayawada', 'Visakhapatnam', 'Tirupati', 'Nellore'];
      }
      cityControl.setValue('');
    }
  }
  get languagesControls() {
    return (this.resumeForm.get('languages') as FormArray).controls;
  }

  get experiences() {
    return this.resumeForm.get('experiences') as FormArray;
  }

  addExperience() {
    const experienceGroup = new FormGroup({
      companyName: new FormControl(null, [Validators.required]),
      position: new FormControl(null, [Validators.required]),
      experience: new FormGroup({
        dateOfJoining: new FormControl(null, [Validators.required]),
        dateOfResign: new FormControl(null, [Validators.required])
      })
    });

    this.experiences.push(experienceGroup);
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  onSubmit(): void {
    if (this.resumeForm.valid) {
      const formData = this.formatFormData(this.resumeForm.value);
      console.log('Formatted Form Data:', formData);
      this.resumeService.createResume(formData).subscribe(response => {
        Swal.fire({
          title: 'Success!',
          text: 'Your profile has been submitted successfully.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.resumeForm.reset();
        this.submitted = true;
      }, error => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error submitting your profile. Please try again.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill out the form correctly.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
  back(): void {
    this.router.navigate([""])
  }
  resetForm() {
    this.resumeForm.reset();
    this.submitted = false;
  }

  formatFormData(formData: any): any {
    // Convert languages array of booleans to array of strings
    formData.languages = this.languages
      .filter((lang, index) => formData.languages[index]);

    // Flatten the nested experience field
    formData.experiences = formData.experiences.map((experience: any) => ({
      companyName: experience.companyName,
      position: experience.position,
      dateOfJoining: experience.experience.dateOfJoining,
      dateOfResign: experience.experience.dateOfResign
    }));

    return formData;
  }
}
