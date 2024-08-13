import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resume } from './resume.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private apiurl = 'http://localhost:8000/api/resumes/';

  constructor(private http: HttpClient, private router:Router) { }

  createResume(resume: Resume): Observable<Resume> {
    return this.http.post<Resume>(this.apiurl, resume);
  }

  getallregistered():Observable<any>{
    return this.http.get<any>(this.apiurl)

  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}${id}/`);
  }
  viewbyid(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiurl}${id}/`);
  }

  updatereg(id: number, resume: Resume): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiurl}${id}/`, resume);
  }

 
}
