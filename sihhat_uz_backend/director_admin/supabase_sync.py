import os
from supabase import create_client, Client

# Supabase ma'lumotlari
SUPABASE_URL = "https://ozqqhklggnuqthhpejmf.supabase.co"
SUPABASE_KEY = "sb_publishable_E_T45pKWjj3dlvrAS9eBmQ_uF4aByfS" # Bu yerga Supabase ANON KEY qo'yish kerak

def get_supabase() -> Client:
    return create_client(SUPABASE_URL, SUPABASE_KEY)

def sync_to_supabase(data):
    """
    Ma'lumotlarni Supabase'dagi 'sanatoriums' jadvaliga yuborish.
    """
    try:
        supabase = get_supabase()
        # Ma'lumotlarni qo'shish yoki yangilash (upsert)
        response = supabase.table('sanatoriums').upsert(data).execute()
        return response
    except Exception as e:
        print(f"Supabase Sync Error: {e}")
        return None
