---
description: "Use when writing any code that handles user data, authentication, payments, database queries, or API endpoints. Auto-triggers on security-sensitive patterns."
---

# Security Best Practices

## Input-Validierung (IMMER!)

Alle externen Daten validieren — vor der Verarbeitung, nicht danach.

```typescript
// TypeScript / Next.js — Zod
import { z } from 'zod';
const UserSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(1).max(100).trim(),
});
const result = UserSchema.safeParse(await request.json());
if (!result.success) return Response.json({ error: result.error }, { status: 400 });
```
```php
// PHP / Laravel — Form Request
public function rules(): array {
    return ['email' => 'required|email|max:255', 'name' => 'required|string|max:100'];
}
```
```python
# Python — Pydantic
class UserSchema(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)
```

## SQL-Injection Prevention
- NUR ORM oder parametrisierte Queries
- NIEMALS String-Konkatenation in SQL

## Authentication Checks
- Jede API Route / Controller: Session/Auth prüfen
- Sensible Routen: Role-Based Access Control

## Environment Variables
- Secrets: Nur in `.env.local` / `.env` (gitignored)
- Rotation: Alle 90 Tage

## Headers & CORS
- Security Headers in Framework-Config setzen
- CORS explizit konfigurieren, kein Wildcard in Production
