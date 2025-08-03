interface BatchItemCreated<SuccessInput, SuccessOutput> {
  input: SuccessInput;
  output: SuccessOutput;
}

interface BatchItemFailed<FailedInput> {
  input: FailedInput;
  error: Error;
}

interface BatchMetadata {
  requested: number;
  success: number;
  failed: number;
}

export interface BatchResponse<
  SuccessInput,
  SuccessOutput,
  FailedInput = SuccessInput,
> {
  success: BatchItemCreated<SuccessInput, SuccessOutput>[];
  failed: BatchItemFailed<FailedInput>[];
  metadata: BatchMetadata;
}
