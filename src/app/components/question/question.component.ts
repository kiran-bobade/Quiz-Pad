import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../models/question';
import { QuizPadService } from 'src/app/services/quiz-pad.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;

  constructor(private readonly quizeService: QuizPadService) { }

  ngOnInit(): void {
  }

  public selectOption(option: string): void {
    console.log('current quetion', this.question);

    this.quizeService.setAnswers(this.question.id, option);
  }
}
