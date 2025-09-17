import { StateSchema } from "./StateSchema";

export interface ThunkConfig<T = unknown> {
  rejectValue: T;
  state: StateSchema;
}
