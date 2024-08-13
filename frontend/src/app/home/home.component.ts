import { Component,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ResumeService } from '../resume.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit   {
  details: any[] = [];

  ngOnInit(): void {
    this.loadregistered();
  }
 
  constructor(private rs: ResumeService, private toster: ToastrService, private router:Router) { }
// navtocreate(){
// this.router.navigate(["/createtask"])
// }

loadregistered(): void {
  this.rs.getallregistered().subscribe(data => {
    this.details = data;
  }, error => {
    console.error('Error loading profile:', error);
  });
}

navigateToRegister(): void {
  this.router.navigate(['/register']);
} 

delete(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this profile!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rs.delete(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'The profile has been deleted.',
            'success'
          );
          this.loadregistered(); 
        }, error => {
          console.error('Error deleting profile:', error);
          Swal.fire(
            'Error!',
            'There was an error deleting the profile.',
            'error'
          );
        });
      }
    });
  }

}

