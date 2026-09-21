"use client"

import { useState, useEffect, useRef } from "react";
import {
  Building2,
  MapPin,
  Map as MapIcon,
  Phone,
  DollarSign,
  FileText,
  Save,
  Pencil,
  Trash2,
  Plus,
  X as XIcon,
  UploadCloud,
  ImageIcon,
  Globe,
  MessageCircle,
  Mail,
  Camera as Instagram,
  Link as Facebook,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { toast } from "sonner";
import { Diamond } from "@/components/ui/diamond";
import { API_URL } from "@/lib/constants";

const SOCIAL_FIELDS = [
  { id: "telegram", label: "Telegram (Lichka yoki Kanal)", icon: MessageCircle, placeholder: "t.me/sanatoriya_uz" },
  { id: "instagram", label: "Instagram", icon: Instagram, placeholder: "instagram.com/sanatoriya" },
  { id: "facebook", label: "Facebook", icon: Facebook, placeholder: "facebook.com/sanatoriya" },
  { id: "email", label: "Email manzil", icon: Mail, placeholder: "info@sanatoriya.uz" },
  { id: "website", label: "Rasmiy Veb-sayt", icon: Globe, placeholder: "www.sanatoriya.uz" },
];

export default function SanatoriumPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [existingId, setExistingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for all data
  const [images, setImages] = useState<any[]>([]);
  const [basicInfo, setBasicInfo] = useState({
    name: { value: "", isSaved: false },
    region: { value: "", isSaved: false },
    location: { value: "", isSaved: false },
  });
  const [phones, setPhones] = useState<any[]>([]);
  const [extraInfo, setExtraInfo] = useState({
    description: { value: "", isSaved: false },
    dailyPrice: { value: "", isSaved: false },
    advancePrice: { value: "", isSaved: false },
  });
  const [socialStates, setSocialStates] = useState<Record<string, { value: string, isSaved: boolean }>>({
    telegram: { value: "", isSaved: false },
    instagram: { value: "", isSaved: false },
    facebook: { value: "", isSaved: false },
    email: { value: "", isSaved: false },
    website: { value: "", isSaved: false },
  });

  useEffect(() => {
    setMounted(true);
    fetchExistingData();
  }, []);

  const fetchExistingData = async () => {
    try {
      const response = await fetch(`${API_URL}/director-admin/profile/`);
      const data = await response.json();

      if (response.ok && data.length > 0) {
        const profile = data[0];
        setExistingId(profile.id);

        setBasicInfo({
          name: { value: profile.name || "", isSaved: true },
          region: { value: profile.region || "", isSaved: true },
          location: { value: profile.location_url || "", isSaved: true },
        });

        const fetchedPhones = [];
        for (let i = 1; i <= 5; i++) {
          if (profile[`phone${i}`]) {
            fetchedPhones.push({ id: i, value: profile[`phone${i}`], isSaved: true });
          }
        }
        setPhones(fetchedPhones);

        setExtraInfo({
          description: { value: profile.description || "", isSaved: true },
          dailyPrice: { value: profile.daily_price?.toString() || "", isSaved: true },
          advancePrice: { value: profile.advance_price?.toString() || "", isSaved: true },
        });

        setSocialStates({
          telegram: { value: profile.telegram || "", isSaved: true },
          instagram: { value: profile.instagram || "", isSaved: true },
          facebook: { value: profile.facebook || "", isSaved: true },
          email: { value: profile.email || "", isSaved: true },
          website: { value: profile.website || "", isSaved: true },
        });

        const fetchedImages = [];
        for (let i = 1; i <= 5; i++) {
          if (profile[`image${i}`]) {
            fetchedImages.push({
              name: `image-${i}.jpg`,
              src: profile[`image${i}`],
              isExisting: true
            });
          }
        }
        setImages(fetchedImages);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Data fetch error:", error);
    }
  };

  if (!mounted) return null;

  const showSuccess = (msg: string) => {
    toast.success(msg, {
        icon: <CheckCircle2 className="size-5 text-emerald-400" />
    });
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    let result = "+998 ";
    const digits = numbers.startsWith("998") ? numbers.slice(3) : numbers;
    if (digits.length > 0) result += digits.slice(0, 2);
    if (digits.length > 2) result += "-" + digits.slice(2, 5);
    if (digits.length > 5) result += "-" + digits.slice(5, 7);
    if (digits.length > 7) result += "-" + digits.slice(7, 9);
    return result;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map(file => ({
        name: file.name,
        meta: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        src: URL.createObjectURL(file),
        file: file
      }));
      setImages(prev => [...prev, ...newImages].slice(0, 5));
      showSuccess("Rasm muvaffaqiyatli yuklandi");
    }
  };

  const handlePublish = async () => {
    if (!basicInfo.name.value || !basicInfo.region.value || images.length === 0) {
      toast.error("Iltimos, kamida nom, hudud va 1 ta rasm kiriting.");
      return;
    }

    setIsPublishing(true);

    try {
      const cleanPrice = (val: string) => val.replace(/[^\d.]/g, '') || "0";
      const fixUrl = (url: string) => {
        if (!url) return "";
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        return `https://${url}`;
      };

      const formData = new FormData();
      formData.append('name', basicInfo.name.value);
      formData.append('region', basicInfo.region.value);
      formData.append('location_url', fixUrl(basicInfo.location.value));
      formData.append('description', extraInfo.description.value);
      formData.append('daily_price', cleanPrice(extraInfo.dailyPrice.value));
      formData.append('advance_price', cleanPrice(extraInfo.advancePrice.value));

      formData.append('telegram', fixUrl(socialStates.telegram.value));
      formData.append('instagram', fixUrl(socialStates.instagram.value));
      formData.append('facebook', fixUrl(socialStates.facebook.value));
      formData.append('email', socialStates.email.value);
      formData.append('website', fixUrl(socialStates.website.value));

      phones.forEach((p, index) => {
        formData.append(`phone${index + 1}`, p.value.replace(/[^\d+]/g, ''));
      });

      images.forEach((img, index) => {
        if (img.file) {
          formData.append(`image${index + 1}`, img.file);
        }
      });

      const response = await fetch(`${API_URL}/director-admin/profile/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        showSuccess("Sanatoriya muvaffaqiyatli saqlandi");
      } else {
        const errorData = await response.json();
        toast.error("Xatolik yuz berdi: " + JSON.stringify(errorData));
      }
    } catch (error) {
      toast.error("Server bilan bog'lanishda xatolik");
    } finally {
      setIsPublishing(false);
    }
  };

  const iconClass = cn(
    "size-10 rounded-xl flex items-center justify-center shadow-lg transition-all",
    theme === "dark" ? "bg-white text-black" : "bg-black text-white"
  );

  const btnClass = (isOutline = false) => cn(
    "h-11 rounded-full px-8 gap-3 font-black text-[10px] uppercase tracking-widest transition-all shadow-md active:scale-95",
    isOutline
      ? "border-slate-200 dark:border-white/10 dark:text-slate-100"
      : (theme === "dark" ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90")
  );

  if (isSuccess) {
    return (
      <div className="flex w-full flex-col gap-8 pb-20 px-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center text-center gap-4 py-10 text-left relative">
            <div className="absolute top-0 right-0">
                <Button
                    onClick={() => setIsSuccess(false)}
                    variant="default"
                    className={cn(
                        "rounded-full h-12 px-10 font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl transition-all active:scale-95",
                        theme === "dark" ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"
                    )}
                >
                    <Pencil size={16} className="mr-3" strokeWidth={3} /> Tahrirlash
                </Button>
            </div>
            <div className="size-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 ring-8 ring-emerald-500/5 mt-6">
                <CheckCircle2 size={48} strokeWidth={2.5} />
            </div>
            <div className="space-y-1">
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50 uppercase text-center">Saqlangan!</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-center">Sanatoriya ma'lumotlari hozirda faol holatda.</p>
            </div>
        </div>

        {images.length > 0 && (
            <div className="relative group">
                <Carousel className="w-full">
                    <CarouselContent>
                        {images.map((img, i) => (
                            <CarouselItem key={i}>
                                <div className="aspect-[21/9] w-full rounded-[40px] overflow-hidden border-4 border-white dark:border-white/5 shadow-2xl">
                                    <img src={img.src} alt={img.name} className="w-full h-full object-cover" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Carousel>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 text-left">
            <div className="space-y-6">
                <div className="space-y-2 text-left">
                    <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-slate-50 uppercase">
                        {basicInfo.name.value || "Nom kiritilmagan"}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-[11px] tracking-widest">
                        <MapPin size={14} className="text-primary" />
                        {basicInfo.region.value || "Hudud kiritilmagan"}
                    </div>
                </div>
                <div className="p-6 rounded-[32px] bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-4 text-left">
                    <div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase text-slate-400">Kunlik narx</span><span className="text-2xl font-black text-emerald-600 tracking-tighter">{extraInfo.dailyPrice.value || "0"} UZS</span></div>
                    <div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase text-slate-400">Oldindan to'lov</span><span className="text-xl font-black text-blue-600 tracking-tighter">{extraInfo.advancePrice.value || "0"} UZS</span></div>
                </div>
                <div className="space-y-3">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Bog'lanish uchun</h4>
                    <div className="flex flex-wrap gap-2 text-left">
                        {phones.map((p, i) => (
                            <div key={i} className="px-4 py-2 rounded-xl bg-white dark:bg-black border border-slate-100 dark:border-white/10 text-sm font-bold shadow-sm dark:text-slate-100 text-left">
                                {p.value}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="space-y-6 text-left">
                <div className="space-y-3">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Tavsif</h4>
                    <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {extraInfo.description.value || "Tavsif kiritilmagan..."}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(socialStates).map(([key, data]) => {
                        if (!data.value) return null;
                        return (
                            <div key={key} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                <div className="size-8 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black">
                                    {key === 'telegram' && <MessageCircle size={16} />}
                                    {key === 'instagram' && <Instagram size={16} />}
                                    {key === 'facebook' && <Facebook size={16} />}
                                    {key === 'website' && <Globe size={16} />}
                                    {key === 'email' && <Mail size={16} />}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] font-black uppercase text-slate-400 truncate">{key}</p>
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{data.value}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col gap-8 pb-10 px-0 max-w-5xl mx-auto">
      {isPublishing && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-6 p-10 rounded-[40px] bg-white dark:bg-black shadow-2xl ring-1 ring-slate-200 dark:ring-white/10">
            <Diamond className="size-24 text-primary" />
            <div className="text-center space-y-1">
                <p className="text-lg font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100">Yuklanmoqda</p>
                <p className="text-xs font-bold text-slate-400 animate-pulse">Internet tezligiga qarab hisoblanmoqda...</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-6 text-left">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50 uppercase">Sanatoriya boshqaruvi</h2>
        <Button className={btnClass()} onClick={handlePublish}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M11.88 14.9901C11.69 14.9901 11.5 14.9201 11.35 14.7701L8.79001 12.2101C8.50001 11.9201 8.50001 11.4401 8.79001 11.1501C9.08001 10.8601 9.56001 10.8601 9.85001 11.1501L11.88 13.1801L13.91 11.1501C14.2 10.8601 14.68 10.8601 14.97 11.1501C15.26 11.4401 15.26 11.9201 14.97 12.2101L12.41 14.7701C12.26 14.9201 12.07 14.9901 11.88 14.9901Z" fill="currentColor" />
                <path d="M11.8799 14.92C11.4699 14.92 11.1299 14.58 11.1299 14.17V4C11.1299 3.59 11.4699 3.25 11.8799 3.25C12.2899 3.25 12.6299 3.59 12.6299 4V14.17C12.6299 14.58 12.2899 14.92 11.8799 14.92Z" fill="currentColor" />
                <path d="M12 20.9297C6.85 20.9297 3.25 17.3297 3.25 12.1797C3.25 11.7697 3.59 11.4297 4 11.4297C4.41 11.4297 4.75 11.7697 4.75 12.1797C4.75 16.4497 7.73 19.4297 12 19.4297C16.27 19.4297 19.25 16.4497 19.25 12.1797C19.25 11.7697 19.59 11.4297 20 11.4297C20.41 11.4297 20.75 11.7697 20.75 12.1797C20.75 17.3297 17.15 20.9297 12 20.9297Z" fill="currentColor" />
            </svg>
            Yuklash
        </Button>
      </div>

      <div className="flex flex-col gap-6 px-6">
        <Card className="border-0 shadow-sm bg-white dark:bg-black ring-1 ring-slate-200/60 dark:ring-white/10 rounded-[24px]">
            <CardHeader className="flex flex-row items-center gap-4 border-b border-slate-50 dark:border-white/5 pb-6">
                <div className={iconClass}><ImageIcon size={20} /></div>
                <div className="text-left"><CardTitle className="text-lg font-bold dark:text-slate-100 uppercase">Galereya</CardTitle></div>
            </CardHeader>
            <CardContent className="pt-6">
                <AttachmentGroup>
                    {images.map((img, i) => (
                    <Attachment key={i} orientation="vertical" className="w-full sm:w-48 dark:bg-black">
                        <AttachmentMedia variant="image"><img src={img.src} className="w-full h-full object-cover" /></AttachmentMedia>
                        <AttachmentContent><AttachmentTitle>{img.name}</AttachmentTitle></AttachmentContent>
                        <AttachmentActions><AttachmentAction onClick={() => setImages(images.filter((_, idx) => idx !== i))}><XIcon /></AttachmentAction></AttachmentActions>
                    </Attachment>
                    ))}
                    {images.length < 5 && (
                    <div className="flex items-center justify-center h-16 sm:w-64">
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple onChange={handleFileChange} />
                        <LiquidMetalButton label="Upload" onClick={() => fileInputRef.current?.click()} icon={<UploadCloud size={22} className="text-white" />} />
                    </div>
                    )}
                </AttachmentGroup>
            </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white dark:bg-black ring-1 ring-slate-200/60 dark:ring-white/10 rounded-[24px]">
          <CardHeader className="flex flex-row items-center gap-4 border-b border-slate-50 dark:border-white/5 pb-6">
            <div className={iconClass}><Building2 size={20} /></div>
            <div className="text-left"><CardTitle className="text-lg font-bold dark:text-slate-100 uppercase">Umumiy profil</CardTitle></div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <Label className="text-[10px] font-black uppercase text-slate-400">Sanatoriya nomi</Label>
                <Input value={basicInfo.name.value} onChange={(e) => setBasicInfo(p => ({...p, name: {value: e.target.value, isSaved: false}}))} className="h-12 rounded-xl dark:bg-black dark:border-white/10 dark:text-slate-100" placeholder="Nomini kiriting..." />
              </div>
              <div className="space-y-2 text-left">
                <Label className="text-[10px] font-black uppercase text-slate-400">Hudud / Viloyat</Label>
                <Input value={basicInfo.region.value} onChange={(e) => setBasicInfo(p => ({...p, region: {value: e.target.value, isSaved: false}}))} className="h-12 rounded-xl dark:bg-black dark:border-white/10 dark:text-slate-100" placeholder="Hududni kiriting..." />
              </div>
            </div>
            <div className="space-y-2 text-left">
              <Label className="text-[10px] font-black uppercase text-slate-400">Xaritadagi joylashuv</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input value={basicInfo.location.value} disabled={basicInfo.location.isSaved} onChange={(e) => setBasicInfo(p => ({...p, location: {value: e.target.value, isSaved: false}}))} className="h-12 pl-10 rounded-xl dark:bg-black dark:border-white/10 dark:text-slate-100" placeholder="Havolani kiriting..." />
                </div>
                <Button variant={basicInfo.location.isSaved ? "outline" : "default"} className={btnClass(basicInfo.location.isSaved)} onClick={() => { if(!basicInfo.location.isSaved && basicInfo.location.value) showSuccess("Joylashuv muvaffaqiyatli saqlandi"); setBasicInfo(p => ({...p, location: {...p.location, isSaved: !p.location.isSaved}})); }}>
                    {basicInfo.location.isSaved ? <><Pencil size={14} /> Tahrirlash</> : <><Save size={14} /> Saqlash</>}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white dark:bg-black ring-1 ring-slate-200/60 dark:ring-white/10 rounded-[24px]">
          <CardHeader className="flex flex-row items-center gap-4 border-b border-slate-50 dark:border-white/5 pb-6">
            <div className={iconClass}><Phone size={20} /></div>
            <div className="text-left flex-1"><CardTitle className="text-lg font-bold dark:text-slate-100 uppercase">Telefon raqamlar</CardTitle></div>
            {phones.length < 5 && <Button size="sm" variant="outline" className="h-8 rounded-lg text-[10px] font-black dark:text-white" onClick={() => setPhones([...phones, {id: Date.now(), value: "+998 ", isSaved: false}])}><Plus size={14} /> Qo'shish</Button>}
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            {phones.map((p, i) => (
              <div key={p.id} className="flex gap-2 items-center text-left">
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input value={p.value} disabled={p.isSaved} onChange={(e) => { const n = [...phones]; n[i].value = formatPhoneNumber(e.target.value); n[i].isSaved = false; setPhones(n); }} className="h-12 pl-10 rounded-xl dark:bg-black dark:border-white/10 dark:text-slate-100" />
                </div>
                <Button variant={p.isSaved ? "outline" : "default"} className={btnClass(p.isSaved)} onClick={() => { if(!p.isSaved && p.value.length > 5) showSuccess("Raqam muvaffaqiyatli saqlandi"); const n = [...phones]; n[i].isSaved = !n[i].isSaved; setPhones(n); }}>
                    {p.isSaved ? <Pencil size={14} /> : <Save size={14} />}
                </Button>
                <Button variant="outline" className="h-10 px-3 rounded-xl text-red-500" onClick={() => setPhones(phones.filter(x => x.id !== p.id))}><Trash2 size={14} /></Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white dark:bg-black ring-1 ring-slate-200/60 dark:ring-white/10 rounded-[24px]">
          <CardHeader className="flex flex-row items-center gap-4 border-b border-slate-50 dark:border-white/5 pb-6">
            <div className={iconClass}><Globe size={20} /></div>
            <div className="text-left"><CardTitle className="text-lg font-bold dark:text-slate-100 uppercase">Ijtimoiy tarmoqlar</CardTitle></div>
          </CardHeader>
          <CardContent className="grid gap-5 pt-6">
            {SOCIAL_FIELDS.map((f) => (
              <div key={f.id} className="space-y-2 text-left">
                <Label className="text-[10px] font-black uppercase text-slate-400">{f.label}</Label>
                <div className="flex gap-2 items-center">
                  <div className="relative flex-1">
                      <div className={cn("absolute left-3 top-1/2 -translate-y-1/2 size-8 rounded-lg flex items-center justify-center shadow-sm", theme === "dark" ? "bg-white text-black" : "bg-black text-white")}>
                          <f.icon size={16} />
                      </div>
                      <Input value={socialStates[f.id].value} disabled={socialStates[f.id].isSaved} onChange={(e) => setSocialStates(p => ({...p, [f.id]: {value: e.target.value, isSaved: false}}))} className="h-12 pl-14 rounded-xl dark:bg-black dark:border-white/10 dark:text-slate-100" />
                  </div>
                  <Button variant={socialStates[f.id].isSaved ? "outline" : "default"} className={btnClass(socialStates[f.id].isSaved)} onClick={() => { if(!socialStates[f.id].isSaved && socialStates[f.id].value) showSuccess("Akkaunt muvaffaqiyatli saqlandi"); setSocialStates(p => ({...p, [f.id]: {...p[f.id], isSaved: !p[f.id].isSaved}})); }}>
                    {socialStates[f.id].isSaved ? <Pencil size={14} /> : <Save size={14} />}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
            <Card className="border-0 shadow-sm bg-white dark:bg-black ring-1 ring-slate-200/60 dark:ring-white/10 rounded-[24px]">
                <CardHeader className="flex flex-row items-center gap-4 pb-6 border-b border-slate-50 dark:border-white/5">
                    <div className={iconClass}><FileText size={20} /></div>
                    <div className="text-left"><CardTitle className="text-lg font-bold dark:text-slate-100 uppercase">Tavsif</CardTitle></div>
                </CardHeader>
                <CardContent className="pt-6">
                    <textarea value={extraInfo.description.value} onChange={(e) => setExtraInfo(p => ({...p, description: {value: e.target.value, isSaved: false}}))} placeholder="Sanatoriya haqida batafsil..." className="w-full min-h-[120px] p-4 rounded-xl bg-slate-50 dark:bg-black border border-slate-100 dark:border-white/10 outline-none text-sm dark:text-slate-200" />
                </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white dark:bg-black ring-1 ring-slate-200/60 dark:ring-white/10 rounded-[24px]">
                <CardHeader className="flex flex-row items-center gap-4 pb-6 border-b border-slate-50 dark:border-white/5">
                    <div className={iconClass}><DollarSign size={20} /></div>
                    <div className="text-left"><CardTitle className="text-lg font-bold dark:text-slate-100 uppercase">Narxlar</CardTitle></div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400">1 kunga (Odam boshiga)</Label>
                        <div className="relative"><Input value={extraInfo.dailyPrice.value} onChange={(e) => setExtraInfo(p => ({...p, dailyPrice: {value: e.target.value, isSaved: false}}))} className="h-12 pr-12 font-black text-lg rounded-xl dark:bg-black dark:border-white/10 text-emerald-600" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">UZS</span></div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-slate-400">Oldindan to'lov</Label>
                        <div className="relative"><Input value={extraInfo.advancePrice.value} onChange={(e) => setExtraInfo(p => ({...p, advancePrice: {value: e.target.value, isSaved: false}}))} className="h-12 pr-12 font-black text-lg rounded-xl dark:bg-black dark:border-white/10 text-blue-600" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">UZS</span></div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
