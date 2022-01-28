export interface ILambdaFunction {
  function: string;
  payload: unknown;
}

export class LambdaFunction implements ILambdaFunction {
  function: string;
  payload: unknown;
  constructor(functionName: string, payload: unknown) {
    this.function = functionName;
    this.payload = payload;
  }
}
