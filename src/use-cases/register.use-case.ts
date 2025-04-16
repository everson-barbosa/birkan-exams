import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { HashGenerator } from 'src/security/cryptography/hash-generator';
import { UsersRepository } from 'src/database/repositories/users.repository';
import { UserStatus, User } from 'src/entities/user.entity';
import { EmailAlreadyRegisteredError } from './errors/email-already-registered.error';

interface RegisterUseCaseRequest {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

type RegisterUseCaseResponse = Either<
  EmailAlreadyRegisteredError,
  {
    readonly user: User;
  }
>;

@Injectable()
export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userOnDatabase = await this.usersRepository.findByEmail(email);

    if (userOnDatabase) {
      return left(new EmailAlreadyRegisteredError());
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      email,
      name,
      password: hashedPassword,
      status: UserStatus.CREATED,
    });

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
