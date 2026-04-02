"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-[#fbf8ef] flex items-center justify-center px-4">
        <div className="text-center flex flex-col items-center gap-6 max-w-md">
          <h1 className="font-heading text-[#251d1b] text-[32px] font-bold leading-none">
            Une erreur est survenue
          </h1>
          <p className="font-body text-[#746e6b] text-[16px] leading-[1.5]">
            Quelque chose s&apos;est mal passé. Veuillez réessayer.
          </p>
          <button
            onClick={reset}
            className="bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[15px] px-6 py-2.5 rounded-full hover:bg-[#5a3f37] transition-colors"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
