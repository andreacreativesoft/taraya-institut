import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fbf8ef] flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        <p className="font-heading text-[#cab3a0] text-[80px] font-bold leading-none">404</p>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">
          Page introuvable
        </h1>
        <p className="font-body text-[#746e6b] text-[16px] leading-[1.5]">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="bg-[#44312b] text-[#fbf8ef] font-heading font-bold text-[15px] px-6 py-2.5 rounded-full hover:bg-[#5a3f37] transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
