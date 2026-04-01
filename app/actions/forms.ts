"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth";

export async function markSubmissionRead(id: string) {
  await requireSession();
  await db.formSubmission.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/forms");
}

export async function deleteSubmission(id: string) {
  await requireSession();
  await db.formSubmission.delete({ where: { id } });
  revalidatePath("/admin/forms");
}
