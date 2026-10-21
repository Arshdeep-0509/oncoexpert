import { ContentIconView } from "@/components/pages/robotic-surgery/ContentIconView";

/** Label of a comparison row: icon tile + small caps label. */
export function RowLabel({ label, icon }: { label: string; icon: string }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/[0.07] text-primary ring-1 ring-primary/10">
        <ContentIconView name={icon} className="size-[17px]" />
      </span>
      <span className="type-eyebrow text-[11.5px] text-muted">{label}</span>
    </span>
  );
}
