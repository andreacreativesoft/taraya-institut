"use client";

import { deleteService, toggleService } from "@/app/actions/services";

type Service = { id: string; title: string; description: string; active: boolean; order: number };

export default function ServiceRow({ service }: { service: Service }) {
  return (
    <tr className="hover:bg-[#fbf8ef]/50 transition-colors">
      <td className="px-5 py-4">
        <p className="font-heading text-[#251d1b] text-[14px] font-bold">{service.title}</p>
        <p className="font-body text-[#746e6b] text-[12px] mt-0.5 sm:hidden line-clamp-1">{service.description}</p>
      </td>
      <td className="px-5 py-4 hidden sm:table-cell">
        <p className="font-body text-[#746e6b] text-[13px] line-clamp-2">{service.description}</p>
      </td>
      <td className="px-5 py-4 text-center">
        <button
          onClick={() => toggleService(service.id, !service.active)}
          className={`inline-flex items-center justify-center w-11 h-6 rounded-full transition-colors ${
            service.active ? "bg-[#44312b]" : "bg-[#dad5cd]"
          }`}
          aria-label={service.active ? "Désactiver" : "Activer"}
        >
          <span className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
            service.active ? "translate-x-2.5" : "-translate-x-2.5"
          }`} />
        </button>
      </td>
      <td className="px-5 py-4 text-right">
        <form action={() => deleteService(service.id)}
          onSubmit={(e) => { if (!confirm("Supprimer ce service ?")) e.preventDefault(); }}>
          <button type="submit"
            className="font-body text-red-400 hover:text-red-600 text-[13px] transition-colors">
            Supprimer
          </button>
        </form>
      </td>
    </tr>
  );
}
