import type { FormSubmission } from "@prisma/client";
import { db } from "@/lib/db";
import SubmissionActions from "./MarkReadButton";

export default async function FormsPage() {
  let submissions: FormSubmission[] = [];
  try {
    submissions = await db.formSubmission.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    // db unavailable — show empty state
  }

  const unread = submissions.filter((s) => !s.read).length;

  return (
    <div className="flex flex-col gap-8 max-w-[900px]">
      <div>
        <h1 className="font-heading text-[#251d1b] text-[28px] font-bold leading-[1.2]">
          Formulaires de contact
        </h1>
        <p className="font-body text-[#746e6b] text-[15px] mt-1">
          {submissions.length} message(s)
          {unread > 0 && (
            <span className="ml-2 bg-[#44312b] text-white font-body text-[11px] px-2 py-0.5 rounded-full">
              {unread} non lu{unread > 1 ? "s" : ""}
            </span>
          )}
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#dad5cd] p-12 text-center">
          <p className="font-body text-[#746e6b] text-[14px]">Aucun message reçu pour l&apos;instant.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {submissions.map((s) => (
            <div key={s.id}
              className={`bg-white rounded-xl border overflow-hidden ${
                s.read ? "border-[#dad5cd]" : "border-[#cab3a0]"
              }`}>
              {/* Header */}
              <div className={`flex items-center justify-between px-5 py-4 border-b ${
                s.read ? "bg-white border-[#dad5cd]" : "bg-[#fbf8ef] border-[#dad5cd]"
              }`}>
                <div className="flex items-center gap-3">
                  {!s.read && (
                    <span className="w-2 h-2 rounded-full bg-[#44312b] shrink-0" />
                  )}
                  <div>
                    <p className="font-heading text-[#251d1b] text-[15px] font-bold">{s.name}</p>
                    <p className="font-body text-[#746e6b] text-[12px]">
                      {s.email}
                      {s.phone && <span className="ml-2">· {s.phone}</span>}
                      {s.service && <span className="ml-2">· {s.service}</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-body text-[#746e6b] text-[12px]">
                    {new Date(s.createdAt).toLocaleDateString("fr-FR", {
                      day: "2-digit", month: "2-digit", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                  <SubmissionActions id={s.id} read={s.read} />
                </div>
              </div>
              {/* Message */}
              <div className="px-5 py-4">
                <p className="font-body text-[#251d1b] text-[14px] leading-relaxed whitespace-pre-wrap">{s.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
