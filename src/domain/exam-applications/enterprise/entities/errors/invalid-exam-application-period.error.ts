export class InvalidExamApplicationPeriodError extends Error {
  public readonly startAt: Date;
  public readonly endAt: Date;

  constructor(startAt: Date, endAt: Date) {
    super('The start date cannot be later than the end date.');
    this.name = 'InvalidExamApplicationPeriodError';
    this.startAt = startAt;
    this.endAt = endAt;
  }
}
