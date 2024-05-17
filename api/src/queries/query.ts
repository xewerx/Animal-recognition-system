export interface Query<Output, Input = undefined> {
  exec(input?: Input): Promise<Output> | Output;
}
