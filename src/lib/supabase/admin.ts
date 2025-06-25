import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/DataTypes";

const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
);

export default supabaseAdmin;
