import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

import { Optional } from 'src/core/types/Optional';
import { MultipleChoiceQuestionAlternativeList } from './multiple-choice-question-alternative.list';
import { QuestionProps, Question } from './question.entity';

interface MultipleChoiceQuestionProps extends QuestionProps {
  alternatives: MultipleChoiceQuestionAlternativeList;
}

export class MultipleChoiceQuestion extends Question<MultipleChoiceQuestionProps> {
  constructor(props: MultipleChoiceQuestionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  set alternatives(alternatives: MultipleChoiceQuestionAlternativeList) {
    this.props.alternatives = alternatives;
  }

  get alternatives() {
    return this.props.alternatives;
  }

  static create(
    props: Optional<MultipleChoiceQuestionProps, 'alternatives'>,
    id?: UniqueEntityID,
  ) {
    const multipleChoiceQuestion = new MultipleChoiceQuestion(
      {
        ...props,
        alternatives:
          props?.alternatives ?? new MultipleChoiceQuestionAlternativeList([]),
      },
      id,
    );

    return multipleChoiceQuestion;
  }
}
