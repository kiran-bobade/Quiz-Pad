import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private readonly CACHE_KEY = 'testpad';
  private readonly DATA_URL = '../../assets/data.json';
  private questions: Question[];

  constructor(private readonly httpClient: HttpClient) { }

  public getQuestions(pageSize: number, currentPage: number): Observable<any> {
    this.tryGetCachedQuestions();
    if (this.questions && this.questions.length > 0) {
      return of({
        total: this.questions.length,
        questions: this.questions.splice(currentPage - 1, pageSize)
      });
    } else {
      return this.paginateQuestions(currentPage, pageSize);
    }
  }

  public tryGetCachedQuestions(): Question[] {
    const chachedQuestions = localStorage.getItem(this.CACHE_KEY);
    if (chachedQuestions) {
      this.questions = JSON.parse(chachedQuestions);
      return this.questions;
    }
  }

  private paginateQuestions(currentPage: number, pageSize: number): Observable<any> {
    return this.httpClient.get(this.DATA_URL)
      .pipe(map((response: []) => {
        response.forEach((item: any) => {
          delete item.answer;
        });
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(response));
        return {
          total: response.length,
          questions: response.splice(currentPage - 1, pageSize)
        };
      }));
  }
}
