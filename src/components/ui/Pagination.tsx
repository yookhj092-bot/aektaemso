import { cn } from "@/lib/utils";

type PaginationProps = {
  className?: string;
  total: number;
  step: number; // 1-indexed
};

export default function Pagination({ className, total, step }: PaginationProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i === step - 1;
        return (
          <span
            key={i}
            className={cn(
              "h-2 rounded-full transition-all",
              active ? "w-8 bg-secondary-100" : "w-2 bg-grayscale-600"
            )}
          />
        );
      })}
    </div>
  );
}
