// import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { config } from "./config";


//TODO Put these into the environment variables in vercel for prod.
//** akak if...  not in dev.. do this 
// * https://vitejs.dev/guide/env-and-mode.html
const SUPABASE_URL = import.meta.env.MODE === 'development' ? config.supabase_url : import.meta.env.SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.MODE === 'development' ? config.supabase_key : import.meta.env.SUPABASE_KEY;
console.log(import.meta.env)



export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    // localStorage: AsyncStorage as any,
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});
