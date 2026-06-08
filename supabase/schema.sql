-- ============================================
-- Схема базы данных для салона красоты
-- Выполнить в: Supabase Dashboard → SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS bookings (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT        NOT NULL,
  phone           TEXT        NOT NULL,
  service         TEXT        NOT NULL,
  preferred_date  DATE,
  preferred_time  TEXT,
  comment         TEXT,
  status          TEXT        NOT NULL DEFAULT 'new'
                              CHECK (status IN ('new', 'confirmed', 'cancelled')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Индекс для быстрой сортировки по дате
CREATE INDEX IF NOT EXISTS bookings_created_at_idx
  ON bookings (created_at DESC);

-- Включаем Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Только серверный ключ (service_role) может читать и писать
CREATE POLICY "Service role full access" ON bookings
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
