import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8080/api/questions'; //

  constructor(private http: HttpClient) {}

  getQuestionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
