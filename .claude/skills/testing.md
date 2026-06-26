---
description: "Use when writing tests, test cases, or when asked to verify, test, or check code quality. Triggers on: test creation, debugging, QA."
---

# Testing-Strategie

## Test-Pyramide
- 70% Unit Tests (Vitest / Jest / PHPUnit / pytest — je nach Stack)
- 20% Integration Tests (Testing Library / Pest / etc.)
- 10% E2E Tests (Playwright / Cypress / etc.)

## Test-Framework nach Stack
| Stack | Unit/Integration | E2E |
|-------|-----------------|-----|
| TypeScript / Next.js / Vue | Vitest + Testing Library | Playwright |
| PHP / Laravel | PHPUnit / Pest | Playwright / Dusk |
| Python / FastAPI | pytest + httpx | Playwright |
| React Native | Jest + Testing Library | Detox |

## Unit Test Vorlage (TypeScript/Vitest)

```typescript
import { describe, it, expect, vi } from 'vitest';
import { myFunction } from '@/lib/myFunction';

describe('myFunction', () => {
  it('should return expected value for valid input', () => {
    expect(myFunction('valid')).toBe('expected');
  });
  it('should throw error for invalid input', () => {
    expect(() => myFunction('')).toThrow('Invalid input');
  });
  it('should handle edge cases', () => {
    expect(myFunction(null)).toBe(null);
  });
});
```

## Was immer testen
1. Happy Path (normaler Ablauf)
2. Edge Cases (leere Arrays, null, undefined, max length)
3. Error Cases (ungültige Inputs, Netzwerkfehler)
4. Security Cases (SQL injection, XSS in Inputs)

## Keine Tests für
- Externe Bibliotheken
- Triviale Getter/Setter
- Auto-generierter Code
