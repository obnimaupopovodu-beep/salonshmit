# Салон красоты — Лендинг с системой записи

Next.js 14 · TypeScript · Tailwind CSS · Supabase · Telegram Bot

## Стек

| Слой | Технология |
|---|---|
| Фреймворк | Next.js 14 (App Router) |
| Язык | TypeScript |
| Стили | Tailwind CSS |
| База данных | Supabase (PostgreSQL) |
| Валидация | Zod |
| Уведомления | Telegram Bot API |
| Деплой | Vercel |

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка Supabase

1. Создайте проект на [supabase.com](https://supabase.com)
2. Откройте **SQL Editor** и выполните файл `supabase/schema.sql`
3. Скопируйте `Project URL` и `service_role key` из **Settings → API**

### 3. Настройка Telegram-бота (опционально)

1. Напишите [@BotFather](https://t.me/BotFather) → `/newbot` → получите токен
2. Узнайте свой `chat_id` через [@userinfobot](https://t.me/userinfobot)

### 4. Переменные окружения

```bash
cp .env.example .env.local
```

Заполните `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
TELEGRAM_BOT_TOKEN=123456:ABC...
TELEGRAM_CHAT_ID=123456789
ADMIN_PASSWORD=ваш-надёжный-пароль
```

### 5. Запуск

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Маршруты

| URL | Описание |
|---|---|
| `/` | Лендинг с формой записи |
| `/admin` | Панель администратора |
| `/admin/login` | Вход в панель |
| `POST /api/bookings` | Создать заявку |
| `PATCH /api/bookings/[id]` | Обновить статус (admin) |
| `GET /api/admin/bookings` | Список заявок (admin) |

## Панель администратора

Перейдите на `/admin/login` и введите значение `ADMIN_PASSWORD`.

Возможности:
- Просмотр всех заявок
- Фильтрация по статусу (новые / подтверждённые / отменённые)
- Смена статуса одним кликом
- Пагинация по 20 заявок

## Деплой на Vercel

```bash
npx vercel
```

Либо через GitHub-интеграцию:

1. Зайдите на [vercel.com](https://vercel.com) → **Add New Project**
2. Выберите этот репозиторий
3. В разделе **Environment Variables** добавьте все переменные из `.env.example`
4. Нажмите **Deploy**

## Структура проекта

```
├── app/
│   ├── page.tsx              # Главная страница
│   ├── layout.tsx            # Корневой layout
│   ├── admin/
│   │   ├── page.tsx          # Панель администратора
│   │   └── login/page.tsx    # Страница входа
│   └── api/
│       ├── bookings/
│       │   ├── route.ts      # POST — создать заявку
│       │   └── [id]/route.ts # PATCH — сменить статус
│       └── admin/
│           └── bookings/route.ts  # GET — список заявок
├── components/
│   ├── booking-form.tsx      # Форма записи
│   ├── section-title.tsx     # Заголовок секции
│   └── admin/
│       └── admin-dashboard.tsx  # Дашборд администратора
├── lib/
│   ├── supabase.ts           # Supabase-клиент
│   ├── database.types.ts     # TypeScript-типы БД
│   ├── validations.ts        # Zod-схемы
│   ├── telegram.ts           # Telegram-уведомления
│   └── admin-auth.ts         # Проверка авторизации
├── supabase/
│   └── schema.sql            # SQL-схема БД
├── middleware.ts             # Защита /admin маршрутов
└── .env.example              # Шаблон переменных окружения
```

## Статусы заявок

| Статус | Описание |
|---|---|
| `new` | Новая заявка — ещё не обработана |
| `confirmed` | Подтверждена администратором |
| `cancelled` | Отменена |
