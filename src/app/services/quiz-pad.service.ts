import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TestResult } from '../models/test-result';
import { QuestionsService } from './questions.service';

@Injectable({
    providedIn: 'root'
})
export class QuizPadService {
    private readonly CACHE_KEY = 'testpad';
    private readonly DATA_URL = '../../assets/data.json';
    private questions: Question[];

    constructor(
        private readonly httpClient: HttpClient,
        private readonly questionService: QuestionsService) { }

    public setAnswers(id: number, selectedOption: string): void {
        this.questions = this.questionService.tryGetCachedQuestions();
        if (this.questions) {
            const index = this.questions.findIndex((qstn) => qstn.id === id);
            this.questions[index].userAnswer = selectedOption;
            localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.questions));
        }
    }

    public finishTest(): Observable<TestResult> {
        let score = 0;
        this.questions = this.questionService.tryGetCachedQuestions();
        return this.httpClient.get(this.DATA_URL)
            .pipe(
                map((response: []) => {
                    response.forEach((question: Question, index: number) => {
                        if (question.id === this.questions[index].id) {
                            if (this.questions[index].userAnswer && question.answer === this.questions[index].userAnswer) {
                                score = score + 1;
                            }
                        }
                    });
                    localStorage.removeItem(this.CACHE_KEY);
                    return {
                        score,
                        totalQuestions: response.length,
                        passed: ((score / response.length) * 100) >= 50
                    };
                }));
    }
}
