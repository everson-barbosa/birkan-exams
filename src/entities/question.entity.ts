import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';
import { QuestionAlternativeList } from './question-alternative.list';
import { Optional } from 'src/core/types/Optional';

export interface QuestionProps {
  authorId: UniqueEntityID;
  statement: string;
  alternatives: QuestionAlternativeList;
}

export class Question extends Entity<QuestionProps> {
  get authorId() {
    return this.props.authorId;
  }

  set authorId(authorId: UniqueEntityID) {
    this.props.authorId = authorId;
  }

  get statement() {
    return this.props.statement;
  }

  set statement(statement: string) {
    this.props.statement = statement;
  }

  get alternatives() {
    return this.props.alternatives;
  }

  set alternatives(alternatives: QuestionAlternativeList) {
    this.props.alternatives = alternatives;
  }

  static create(
    props: Optional<QuestionProps, 'alternatives'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        alternatives: props.alternatives ?? new QuestionAlternativeList([]),
      },
      id,
    );

    return question;
  }
}
