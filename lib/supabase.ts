import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Серверный клиент (только для API-маршрутов и серверных компонентов)
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
