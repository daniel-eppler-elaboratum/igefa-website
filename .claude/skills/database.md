---
description: "Use when designing database schemas, writing queries, creating migrations, or optimizing database access. Triggers on: schema design, ORM usage, migrations, N+1 problems."
---

# Datenbank Best Practices

## Schema-Design
- Tabellen im Plural (users, orders, products)
- Immer `id`, `created_at`, `updated_at`
- Foreign Keys immer mit Index
- Enum-Typen für begrenzte Wertemengen

## Migrations
- Niemals bestehende Migrations verändern
- Jede Migration muss `up` und `down` haben
- Beschreibender Name: `create_users_table`, `add_email_to_users`
- Vor Migration in Production: Backup!

## Queries — N+1 Problem vermeiden
```
❌ // N+1: Für jeden User eine extra Query
   users.forEach(user => user.orders.load())

✅ // Eager Loading: Alles in einer Query
   User.with('orders').findAll()
   // Prisma: prisma.user.findMany({ include: { orders: true } })
   // Laravel: User::with('orders')->get()
```

## Transaktionen für zusammenhängende Operationen
```typescript
// Wenn mehrere Dinge zusammen gespeichert werden müssen
await prisma.$transaction([
  prisma.order.create({ data: orderData }),
  prisma.inventory.update({ data: stockData }),
]);
```

## Sensible Daten
- Passwörter: Niemals im Klartext — bcrypt/argon2
- PII (Name, E-Mail, Adresse): Verschlüsselung prüfen
- Audit-Log für kritische Änderungen
