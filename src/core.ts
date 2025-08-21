import OpenAI from 'openai';
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
    const client = new OpenAI({
      apiKey: api_key || process.env.OPENAI_API_KEY,
    });

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
    console.log(error);
  }
};
