import { User } from 'src/entities/user.entity';

export class UserPresenter {
  static toHttp(raw: User) {
    return {
      id: raw.id,
      email: raw.email,
    };
  }
}
