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

| Parameter         | Type         | Required | Description                                                                          |
| ----------------- | ------------ | -------- | ------------------------------------------------------------------------------------ |
| `target`          | `any[]`      | ✅        | Array of items to sort (objects, numbers, anything).                                 |
| `criteria`        | `string`     | ✅        | Natural-language sorting rules, can be as complex or absurd as you like.             |
| `api_key`         | `string`     | ❌        | Optional. If not provided, the function reads `OPENAI_API_KEY` environment variable. |
| `model`           | `TModel`     | ❌        | Optional AI model to use (e.g., `"gpt-4.1"`).                                        |
| `response_format` | `ZodTypeAny` | ✅        | Zod schema describing the structure of the expected sorted output.                   |


# Real-World Use Cases

While `unnecessary-ai` started as a satirical take on overengineering, it turns out AI-powered sorting solves genuine problems that traditional algorithms can't handle. Here are practical scenarios where subjective, multi-criteria sorting actually makes sense:

## E-Commerce & Product Ranking

### Personalized Product Discovery
```javascript
const products = [/* array of products */];
await overengineer({
  target: products,
  criteria: "Sort by purchase likelihood for a busy parent who values convenience over price, tends to buy eco-friendly products, and shops primarily on mobile during evening hours"
});
```

### Dynamic Inventory Prioritization
```javascript
await overengineer({
  target: inventory,
  criteria: "Prioritize items to promote considering current trends, seasonal demand, profit margins, and clearance urgency"
});
```

## Content Curation & Social Media

### Feed Optimization
```javascript
await overengineer({
  target: posts,
  criteria: "Sort by engagement potential considering user's past interactions, current mood indicators, trending topics, and time of day"
});
```

### Content Planning
```javascript
await overengineer({
  target: contentIdeas,
  criteria: "Prioritize content that balances viral potential, brand alignment, production feasibility, and strategic business goals"
});
```

## Human Resources & Recruitment

### Resume Screening
```javascript
await overengineer({
  target: candidates,
  criteria: "Rank by technical skills + growth potential + diversity considerations, weighing soft skills and unconventional backgrounds positively"
});
```

### Team Assignment
```javascript
await overengineer({
  target: employees,
  criteria: "Sort by suitability for this project considering expertise, workload, learning opportunities, and team chemistry"
});
```

## Investment & Business Strategy

### Startup Deal Flow
```javascript
await overengineer({
  target: pitches,
  criteria: "Rank by investment potential combining market size, team strength, product-market fit signals, timing, and that indefinable 'founder magic' factor"
});
```

### Market Opportunity Assessment
```javascript
await overengineer({
  target: markets,
  criteria: "Prioritize expansion opportunities balancing market size, competition density, regulatory complexity, and strategic fit with our core competencies"
});
```

## Creative & Design Work

### Design Portfolio Curation
```javascript
await overengineer({
  target: designs,
  criteria: "Arrange by visual impact for a luxury brand presentation, considering elegance, innovation, brand alignment, and emotional resonance"
});
```

### Campaign Asset Prioritization
```javascript
await overengineer({
  target: creativeAssets,
  criteria: "Order by effectiveness for Q4 holiday campaign targeting millennials, emphasizing authenticity over polish and emotional connection over product features"
});
```

## Research & Analysis

### Literature Review
```javascript
await overengineer({
  target: papers,
  criteria: "Sort research papers by relevance to climate policy implementation, weighing recent findings, methodological rigor, real-world applicability, and citation influence"
});
```

### Data Source Prioritization
```javascript
await overengineer({
  target: dataSources,
  criteria: "Rank data sources by reliability + completeness + update frequency + cost efficiency for building a market intelligence dashboard"
});
```

## Why Traditional Sorting Falls Short

These scenarios share common characteristics that make rule-based sorting inadequate:

- **Multiple subjective criteria** that resist quantification
- **Context-dependent weights** that change based on situation
- **Semantic understanding** required to interpret nuanced requirements  
- **Cultural and temporal factors** that influence relative importance
- **Intuitive "gut feeling" decisions** that humans make but struggle to codify

## The AI Advantage

By describing your sorting criteria in natural language, you can:
- **Combine quantitative and qualitative factors** seamlessly
- **Adapt to changing contexts** without rewriting algorithms
- **Incorporate domain expertise** that's hard to formalize
- **Handle edge cases** through semantic understanding
- **Prototype complex decision systems** rapidly

---

*Remember: With great AI power comes great responsibility. Use `unnecessary-ai` wisely, and always validate results against your business logic and ethical guidelines.*