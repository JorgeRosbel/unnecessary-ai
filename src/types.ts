import { ZodTypeAny } from 'zod';

export type TModel =
  | 'gpt-4.1'
  | 'gpt-4.1-nano-2025-04-14'
  | 'gpt-4o-2024-08-06'
  | 'gpt-4o-mini'
  | 'gpt-4'
  | 'gpt-3.5-turbo'
  | 'gemini-2.5-flash'
  | 'gemini-2.0-flash'
  | 'gpt-4.1-mini-2025-04-14'
  | (string & {});

export interface RequestModel {
  target: any[];
  criteria: string;
  api_key?: string;
  model?: TModel;
  response_format: ZodTypeAny;
}
