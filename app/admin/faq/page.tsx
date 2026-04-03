import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { redirect } from "next/navigation";
import SortableFaqList from "./SortableFaqList";
import NewFaqForm from "./NewFaqForm";

export default async function FaqPage() {
  const settings = await getSettings();
  if (settings.section_faq_enabled !== "true") redirect("/admin");
  const faqs = await db.faqItem.findMany({ orderBy: { order: "asc" } }).catch(() => []);
  return (
    <div className="flex flex-col gap-8 max-w-[860px]">
      <div>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">FAQ</h1>
        <p className="font-body text-[#746e6b] text-[15px] mt-1">{faqs.length} question(s) — glissez-déposez pour réordonner</p>
      </div>
      <div className="bg-white rounded-xl border border-[#dad5cd] overflow-hidden">
        <SortableFaqList initialFaqs={faqs} />
      </div>
      <div className="bg-white rounded-xl border border-[#dad5cd] p-6">
        <h2 className="font-heading text-[#251d1b] text-[18px] font-bold mb-5">Ajouter une question</h2>
        <NewFaqForm />
      </div>
    </div>
  );
}
