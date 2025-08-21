import OpenAI, {
  APIConnectionError,
  AuthenticationError,
  RateLimitError,
  UnprocessableEntityError,
} from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import type { RequestModel } from '@/types';

export const overengineer = async <T>({
  target,
  criteria,
  api_key,
  model,
  response_format,
}: RequestModel): Promise<T | undefined> => {
  try {
    const api = api_key || process.env.OPENAI_API_KEY;

    if (!api) {
      throw new Error('Missing api-key!!!');
    }

    const client = new OpenAI({ apiKey: api });

    const system_prompt =
      'You are VibeSort, an AI that specializes in sorting arrays based on subjective, abstract, or complex criteria that traditional sorting algorithms cannot handle';
    const prompt = `Sort the following array ${JSON.stringify(target)} according to this criterion: ${criteria}`;

    const response = await client.responses.parse({
      model: model || 'gpt-4.1-mini-2025-04-14',
      input: [
        { role: 'system', content: system_prompt },
        { role: 'user', content: prompt },
      ],
      text: { format: zodTextFormat(response_format, 'event') },
    });

    return response.output_parsed;
  } catch (error) {
    if (error instanceof UnprocessableEntityError) {
      throw new Error('Unprocessable entity: the request could not be processed');
    } else if (error instanceof RateLimitError) {
      throw new Error('Rate limit exceeded: too many requests');
    } else if (error instanceof APIConnectionError) {
      throw new Error('API connection error: failed to reach the server');
    } else if (error instanceof AuthenticationError) {
      throw new Error('Authentication error: invalid or missing API key');
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Unexpected error occurred');
    }
  }
};
