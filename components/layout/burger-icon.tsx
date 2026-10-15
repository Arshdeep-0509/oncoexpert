import { cn } from "@/lib/utils";

/** Three lines that morph into an X. */
export function BurgerIcon({ open }: { open: boolean }) {
  const line = "absolute left-[3px] right-[3px] h-[1.75px] rounded-full bg-current transition-[translate,rotate,opacity,scale] duration-500 ease-out-expo";
  return (
    <span aria-hidden="true" className="relative block size-6">
      <span className={cn(line, "top-[6.5px]", open && "translate-y-[5px] rotate-45")} />
      <span className={cn(line, "top-[11.5px]", open && "scale-x-0 opacity-0")} />
      <span className={cn(line, "top-[16.5px]", open && "-translate-y-[5px] -rotate-45")} />
    </span>
  );
}
