import { ExamTemplateQuestion } from 'src/entities/exam-template-question.entity';

export class ExamTemplateQuestionPresenter {
  static toHttp(examTemplateQuestion: ExamTemplateQuestion) {
    return {
      id: examTemplateQuestion.id.toString(),
      questionId: examTemplateQuestion.questionId,
      examTemplateId: examTemplateQuestion.examTemplateId,
      position: examTemplateQuestion.position,
    };
  }
}
