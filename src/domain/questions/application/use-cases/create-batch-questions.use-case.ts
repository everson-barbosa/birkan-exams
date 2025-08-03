import {
  CreateQuestionUseCase,
  CreateQuestionUseCaseRequest,
} from './create-question.use-case';

interface CreateBatchQuestionsUseCaseRequest {
  readonly questions: Array<CreateQuestionUseCaseRequest>;
}

export class CreateBatchQuestionsUseCase {
  constructor(private createQuestionUseCase: CreateQuestionUseCase) {}

  async execute({ questions }: CreateBatchQuestionsUseCaseRequest) {
    const response = await Promise.allSettled(
      questions.map(this.createQuestionUseCase.execute),
    );

    response.map((item) => {
      if (item.status === 'fulfilled') {
        return item.value;
      }
    });
  }
}
