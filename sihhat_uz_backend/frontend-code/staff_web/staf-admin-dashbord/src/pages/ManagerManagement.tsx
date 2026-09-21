import { useState, useEffect } from 'react'
import { Button } from '@/components/Button'
import { Plus, Shield, ShieldCheck, User, Trash2, Mail, Loader2 } from 'lucide-react'
import { AddAdminDrawer } from '@/components/AddAdminDrawer'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/Badge'

interface Admin {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  role: 'director' | 'small_admin';
}

export function ManagerManagement() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/staff-admin/admins/');
      const data = await response.json();
      if (response.ok) {
        setAdmins(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdmins();
  }, [])

  const handleSaveAdmin = async (data: any) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/staff-admin/admins/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.email,
          password: data.password,
          role: data.role
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("Admin yaratildi", {
          description: "Yangi admin muvaffaqiyatli bazaga va Supabase'ga qo'shildi."
        });
        fetchAdmins();
      } else {
        toast.error("Xatolik", {
          description: JSON.stringify(result)
        })
      }
    } catch (error) {
      toast.error("Server xatosi", {
        description: "Backend bilan bog'lanishda muammo yuz berdi."
      })
    }
  }

  const handleDeleteAdmin = async (id: number) => {
    if (!confirm("Haqiqatdan ham ushbu adminni o'chirmoqchimisiz?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/staff-admin/admins/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success("Muvaffaqiyatli o'chirildi", {
          description: "Admin tizimdan va Supabase'dan butunlay olib tashlandi."
        });
        setAdmins(admins.filter(admin => admin.id !== id));
      } else {
        toast.error("Xatolik", {
          description: "Adminni o'chirishda xatolik yuz berdi."
        });
      }
    } catch (error) {
      toast.error("Server xatosi");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left relative">
      <div className="flex justify-between items-end px-2 text-left">
        <div>
          <h2 className="text-3xl font-medium tracking-tight text-foreground uppercase">Sanatoriya Adminlari</h2>
          <p className="text-sm text-muted-foreground font-medium mt-1">Sanatoriya direktorlari va mas'ul xodimlarni nazorat qilish</p>
        </div>
        <Button
          onClick={() => setIsDrawerOpen(true)}
          className="rounded-xl font-bold uppercase text-[10px] tracking-widest gap-2 h-11 px-6 shadow-sm"
        >
          <Plus size={16} strokeWidth={3} />
          Admin qo'shish
        </Button>
      </div>

      <hr className="border-t border-border/50 mx-2" />

      {/* Adminlar ro'yxati */}
      <div className="flex flex-col gap-3 px-2">
        {loading ? (
          <div className="py-20 text-center text-muted-foreground font-bold uppercase text-xs tracking-widest animate-pulse">
            Yuklanmoqda...
          </div>
        ) : admins.length > 0 ? (
          admins.map((admin) => (
            <div
              key={admin.id}
              className="group flex items-center justify-between p-5 rounded-[24px] bg-white border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "size-12 rounded-2xl flex items-center justify-center shadow-inner border",
                  admin.role === 'director' ? "bg-black text-white" : "bg-muted text-muted-foreground"
                )}>
                  {admin.role === 'director' ? <ShieldCheck size={24} /> : <User size={24} />}
                </div>
                <div className="text-left">
                  <h3 className="text-base font-black text-foreground tracking-tight leading-none">
                    {admin.username}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={admin.role === 'director' ? 'high' : 'medium'} className="font-black text-[9px] uppercase tracking-widest px-2 py-0.5 border-0 text-white">
                      {admin.role === 'director' ? 'Direktor' : 'Admin'}
                    </Badge>
                    <span className="size-1 rounded-full bg-border" />
                    <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        <Mail size={10} />
                        {admin.username}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={deletingId === admin.id}
                  onClick={() => handleDeleteAdmin(admin.id)}
                  className="rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                >
                    {deletingId === admin.id ? <Loader2 className="size-5 animate-spin" /> : <Trash2 size={18} />}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-muted-foreground border border-dashed border-border rounded-[40px] bg-muted/20 gap-4">
            <div className="size-16 rounded-3xl bg-background border border-border flex items-center justify-center shadow-inner text-left">
                <Shield size={32} className="opacity-20" />
            </div>
            <div className="text-center space-y-1">
                <p className="font-bold text-lg text-foreground">Hozircha adminlar yo'q</p>
                <p className="text-xs font-medium max-w-[250px]">Yangi direktor yoki admin qo'shish uchun yuqoridagi tugmani bosing.</p>
            </div>
          </div>
        )}
      </div>

      <AddAdminDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onSave={handleSaveAdmin}
      />
    </div>
  )
}
