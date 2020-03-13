import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { QuestionList } from '../../models/questionList';
import { TestResult } from '../../models/test-result';
import { QuizPadService } from 'src/app/services/quiz-pad.service';

@Component({
  selector: 'app-testpad',
  templateUrl: './testpad.component.html',
  styleUrls: ['./testpad.component.css']
})
export class TestpadComponent implements OnInit {

  public questionList: QuestionList;
  public currentQuestionIndex = 0;
  private PAGE_SIZE = 1;
  public finished = false;
  public testResult: TestResult;

  constructor(
    private readonly questionService: QuestionsService,
    private readonly quizService: QuizPadService) { }

  public ngOnInit(): void {
    this.getQuestions();
  }

  public previous() {
    this.currentQuestionIndex = this.currentQuestionIndex - 1;
    this.getQuestions();
  }

  public next() {
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
    this.getQuestions();
  }

  public finish() {
    this.finished = true;
    this.quizService.finishTest().subscribe((result) => {
      this.testResult = result;
    });
  }

  private getQuestions() {
    this.questionService.getQuestions(this.PAGE_SIZE, this.currentQuestionIndex + 1)
      .subscribe((response) => {
        this.questionList = response;
      });
  }
}
