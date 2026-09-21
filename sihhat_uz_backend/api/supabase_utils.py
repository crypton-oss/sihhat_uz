from supabase import create_client, Client
import logging

logger = logging.getLogger(__name__)

SUPABASE_URL = "https://ozqqhklggnuqthhpejmf.supabase.co"
SUPABASE_KEY = "sb_publishable_E_T45pKWjj3dlvrAS9eBmQ_uF4aByfS" # Agar iloji bo'lsa 'service_role' key ishlating

def get_supabase() -> Client:
    return create_client(SUPABASE_URL, SUPABASE_KEY)

def sync_admin_to_supabase(user_obj, plain_password):
    try:
        supabase = get_supabase()
        data = {
            "django_id": user_obj.id,
            "email": user_obj.username,
            "password": plain_password,
            "role": user_obj.role,
            "first_name": user_obj.first_name,
            "last_name": user_obj.last_name,
            "sanatorium_id": user_obj.sanatorium_id
        }

        # Xatolikni aniqlash uchun response'ni tekshiramiz
        response = supabase.table('sanatorium_admins').upsert(data, on_conflict='email').execute()
        print(f"Supabase Sync Success: {response}")
        return {"success": True, "data": response.data}
    except Exception as e:
        error_msg = f"Supabase Sync Error: {str(e)}"
        print(error_msg)
        return {"success": False, "error": error_msg}

def delete_admin_from_supabase(email):
    try:
        supabase = get_supabase()
        response = supabase.table('sanatorium_admins').delete().eq('email', email).execute()
        return response
    except Exception as e:
        print(f"Supabase Admin Delete Error: {e}")
        return None
