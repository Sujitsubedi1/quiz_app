import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Question} from "../Models/Question";
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8080/api/questions'; //

  constructor(private http: HttpClient) {}

  getQuestionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getRandomQuestions(limit: number, excludeIds: number[]): Observable<Question[]> {
    const params = new HttpParams().set('limit', limit.toString()).set('excludeIds', excludeIds.join(','));
    return this.http.get<Question[]>(`${this.apiUrl}/random`, { params });
  }
}
