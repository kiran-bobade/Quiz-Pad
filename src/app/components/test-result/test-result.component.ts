import { Component, OnInit, Input } from '@angular/core';
import { TestResult } from '../../models/test-result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  @Input() result: TestResult;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  retry(): void {
    window.location.reload();
  }
}
