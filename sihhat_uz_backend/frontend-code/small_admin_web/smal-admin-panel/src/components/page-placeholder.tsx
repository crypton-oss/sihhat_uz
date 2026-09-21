import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Bo'lim tayyor</CardTitle>
          <CardDescription>
            Keyingi bosqichda shu yerga ma'lumotlar va jadvallar qo'shiladi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Bugun", "Hafta", "Oy"].map((label) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-muted/40 px-4 py-3"
              >
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 text-lg font-medium">—</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
