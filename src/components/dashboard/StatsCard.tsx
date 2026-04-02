import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

export function StatsCard({ title, value, icon: Icon, className, iconClassName }: StatsCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={cn("flex items-center justify-center w-10 h-10 rounded-lg", iconClassName || "bg-primary/10")}>
            <Icon className={cn("w-5 h-5", iconClassName ? "" : "text-primary")} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
