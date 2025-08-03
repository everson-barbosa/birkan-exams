import { Entity } from 'src/core/entities/entity';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

export interface QuestionProps {
  enunciation: string;
}

export class Question<
  TProps extends QuestionProps = QuestionProps,
> extends Entity<TProps> {
  constructor(props: TProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get enunciation() {
    return this.props.enunciation;
  }

  static create(props: QuestionProps, id?: UniqueEntityID) {
    const question = new Question({ ...props }, id);

    return question;
  }
}
