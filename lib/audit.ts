import { db } from "./db";
import type { SessionPayload } from "./auth";

export async function writeAudit(
  session: SessionPayload,
  action: string,
  entity: string,
  entityLabel: string,
  entityId?: string,
) {
  await db.auditLog
    .create({
      data: {
        userId: session.userId,
        userName: session.name,
        userEmail: session.email,
        action,
        entity,
        entityId: entityId ?? null,
        entityLabel,
      },
    })
    .catch(() => {}); // audit is non-critical — never throw
}
