import { Role } from "@prisma/client";

export interface ParsedInviteCode {
  role: Role;
  entityId: number;
  entityType: "Student" | "Teacher" | "Supervisor";
}

export function parseInviteCode(code: string): ParsedInviteCode | null {
  if (!code) return null;

  const upperCode = code.toUpperCase().trim();
  let role: Role = "STUDENT";
  let entityId: number | null = null;
  let entityType: "Student" | "Teacher" | "Supervisor" | null = null;

  const prefix = upperCode.slice(0, 3);
  const idPart = upperCode.slice(3);

  switch (prefix) {
    case "STU":
      role = "STUDENT";
      entityType = "Student";
      break;
    case "TEC":
      role = "TEACHER";
      entityType = "Teacher";
      break;
    case "SUP":
      role = "ADMIN";
      entityType = "Supervisor";
      break;
    default:
      return null;
  }

  entityId = parseInt(idPart);

  if (!entityId || isNaN(entityId)) return null;

  return { role, entityId, entityType };
}
