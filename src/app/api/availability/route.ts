import { getAvailability } from "../../../lib/availability/server";
import { calendarWindow } from "../../../lib/availability/dates";
import { evaluateStay, validateStay } from "../../../lib/availability/engine";
import { isCabinId } from "../../../lib/availability/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function reply(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  if (
    [...query.keys()].some((key) => !["cabin", "checkIn", "checkOut"].includes(key)) ||
    [...query.keys()].some((key) => query.getAll(key).length !== 1)
  ) {
    return reply({ message: "Consulta inválida." }, 400);
  }
  const cabin = query.get("cabin");
  if (!isCabinId(cabin)) return reply({ message: "Escolha uma cabana válida." }, 400);
  const checkIn = query.get("checkIn"),
    checkOut = query.get("checkOut");
  const checking = checkIn !== null || checkOut !== null;
  if (checking) {
    const error = validateStay(checkIn ?? "", checkOut ?? "", calendarWindow().today);
    if (error) return reply({ message: error }, 400);
  }
  try {
    const snapshot = await getAvailability(cabin);
    return reply(
      checking ? { ...snapshot, stay: evaluateStay(snapshot, checkIn!, checkOut!) } : snapshot,
    );
  } catch {
    // No fetch exception, token, URL or provider metadata crosses this boundary.
    return reply(
      { message: "Não conseguimos confirmar a disponibilidade dessas datas agora." },
      503,
    );
  }
}
