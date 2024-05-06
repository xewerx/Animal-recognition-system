export interface Command<Input, Output> {
  exec(input: Input): Promise<Output> | Output;
}
