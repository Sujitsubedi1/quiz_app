import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import {Question} from "../Models/Question";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  question: any;
  currentQuestionId = 1; // Start with the first question
  selectedOption: string | null = null; // Store selected option
  correctAnswer: string | null = null;
  private displayedQuestionIds: number[] = [];
  questions: Question[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    //this.loadQuestion(this.currentQuestionId);
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getRandomQuestions(20, this.displayedQuestionIds).subscribe((questions) => {
      this.displayedQuestionIds.push(...questions.map(q => q.id));
      this.questions.push(...questions);  // Add to existing questions for lazy loading
    });
  }

  loadQuestion(id: number) {
    this.questionService.getQuestionById(id).subscribe(
      (data) => {
        this.question = data;
        console.log(this.question)
      },
      (error) => {
        console.error('Error fetching question:', error);
      }
    );
  }

  getOptions() {
    return [this.question.optionA, this.question.optionB, this.question.optionC, this.question.optionD];
  }

  selectOption(option: string) {
    this.selectedOption = option; // Store the selected option
    this.correctAnswer = this.question.correctAnswer; // Assume this holds the correct answer

    const selectedIndex = this.getOptions().indexOf(option);
    const correctIndex = this.getCorrectAnswerIndex(this.correctAnswer!);

    // Check if the selected option is correct
    if (selectedIndex === correctIndex) {
      console.log("CORRECT ANSWER")
    } else {
      // Handle incorrect answer (optional)
      console.log('Incorrect Answer');
    }
  }

  getCorrectAnswerIndex(answer: string): number {
    switch (answer) {
      case 'A':
        return 0;
      case 'B':
        return 1;
      case 'C':
        return 2;
      case 'D':
        return 3;
      default:
        return -1; // In case of an invalid answer
    }
  }


  nextQuestion() {
    this.currentQuestionId++;
    this.loadQuestion(this.currentQuestionId);
  }

}
