# 🌀 Unnecessary-AI

> AI-powered sorting of anything by ridiculously specific and absurd criteria.
> Inspired by [VibeSort](https://github.com/abyesilyurt/vibesort) for creative sorting logic.

## Install  

```bash
npm i unnecessary-ai
```
## Usage

```ts
import { z } from "zod";
import { overengineer } from "unnecessary-ai";

const responseFormat = z.object({
  sorted: z.array(z.object({
    name: z.string(),
    calories: z.number(),
    timesEaten: z.number(),
    organic: z.boolean(),
    rating: z.number().min(0).max(5),
    price: z.number(),
    tags: z.array(z.string()),
    nutrition: z.object({ carbs: z.number(), protein: z.number(), fat: z.number() }),
    lastEaten: z.string()
  }))
});

type TFormat = z.infer<typeof responseFormat>;

const target = [
  { name: "Avocado Toast", calories: 320, timesEaten: 42, organic: true, rating: 4.1, price: 6.5, tags: ["vegan", "breakfast"], nutrition: { carbs: 28, protein: 6, fat: 18 }, lastEaten: "2025-08-10T12:00:00.000Z" },
  { name: "Double Bacon Burger", calories: 980, timesEaten: 8, organic: false, rating: 4.8, price: 11.0, tags: ["meat", "fast-food"], nutrition: { carbs: 48, protein: 52, fat: 62 }, lastEaten: "2025-08-18T20:30:00.000Z" },
  { name: "Quinoa Salad Deluxe", calories: 420, timesEaten: 28, organic: true, rating: 4.5, price: 9.0, tags: ["vegan", "salad", "gluten-free"], nutrition: { carbs: 40, protein: 12, fat: 14 }, lastEaten: "2025-07-21T13:00:00.000Z" },
  // more items...
];

const res = await overengineer<TFormat>({
  target: target,
  criteria: `
    Sort in descending order from the most outrageously appealing to the least:
    1. Multiply calories by times eaten (more = higher priority).
    2. Slightly adjust scores for organic foods (variety is fun!).
    3. Reverse the rating (5 stars = least surprising, 0 = most surprising).
    4. Boost items tagged "spicy" or "dessert".
    5. Prioritize foods that haven’t been eaten in the longest time.
    6. Divide price by protein content for extra chaos.
    7. Mix all factors in a completely chaotic way.
  `,
  response_format: responseFormat
});

if (res) {
  console.log(res.sorted);
}

```