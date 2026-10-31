import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { EASE } from "./motion";

const Ctx = createContext<(src: string) => void>(() => {});
export const useLightbox = () => useContext(Ctx);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [src, setSrc] = useState<string | null>(null);
  const close = useCallback(() => setSrc(null), []);
  useEffect(() => {
    if (!src) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [src, close]);
  return (
    <Ctx.Provider value={setSrc}>
      {children}
      <AnimatePresence>
        {src && (
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/92 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            onClick={close}
          >
            <motion.img
              src={src}
              alt=""
              className="max-h-[88vh] max-w-full rounded-lg object-contain shadow-[var(--shadow-photo)]"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              autoFocus
              onClick={close}
              aria-label="Close"
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full border border-line-strong text-muted-foreground transition-colors duration-200 hover:bg-elevated hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
