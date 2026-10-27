"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, addMonths, formatStayDate } from "../../lib/availability/dates";
import { isNightBlocked, overlaps } from "../../lib/availability/engine";
import type { AvailabilitySnapshot } from "../../lib/availability/types";

export type CalendarProps = {
  today: string;
  windowEnd: string;
  data: AvailabilitySnapshot | null;
  loading: boolean;
  checkIn: string;
  checkOut: string;
  choosing: "checkIn" | "checkOut";
  onSelect: (day: string) => void;
};
const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function StayCalendar({
  today,
  windowEnd,
  data,
  loading,
  checkIn,
  checkOut,
  choosing,
  onSelect,
}: CalendarProps) {
  const initialMonth = `${today.slice(0, 7)}-01`;
  const [month, setMonth] = useState(initialMonth);
  const [hover, setHover] = useState("");
  const [focused, setFocused] = useState(today);
  const root = useRef<HTMLDivElement>(null);
  const periods = data?.blockedPeriods ?? [];
  const firstMonth = `${today.slice(0, 7)}-01`;
  const monthStart = month < firstMonth ? firstMonth : month;
  const lastMonth = `${windowEnd.slice(0, 7)}-01`;
  function disabled(day: string) {
    if (loading || day < today || day > windowEnd) return true;
    if (choosing === "checkOut" && checkIn && day > checkIn) {
      return overlaps(checkIn, day, periods);
    }
    return day >= windowEnd || isNightBlocked(day, periods);
  }
  function focusDate(day: string) {
    if (day < today || day > windowEnd) return;
    const targetMonth = `${day.slice(0, 7)}-01`;
    if (targetMonth !== monthStart) setMonth(targetMonth);
    setFocused(day);
    requestAnimationFrame(() =>
      root.current
        ?.querySelector<HTMLButtonElement>(`button[data-day="${day}"]:not(:disabled)`)
        ?.focus(),
    );
  }
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, day: string) {
    const movements: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    let next = movements[event.key] !== undefined ? addDays(day, movements[event.key]) : "";
    if (event.key === "PageUp") next = addMonths(day, -1);
    if (event.key === "PageDown") next = addMonths(day, 1);
    const weekday = new Date(`${day}T12:00:00Z`).getUTCDay();
    if (event.key === "Home") next = addDays(day, -weekday);
    if (event.key === "End") next = addDays(day, 6 - weekday);
    if (!next) return;
    event.preventDefault();
    // Skip unavailable cells while preserving arrow direction.
    const step = next < day ? -1 : 1;
    let attempts = 0;
    while (next >= today && next <= windowEnd && disabled(next) && attempts++ < 600)
      next = addDays(next, step);
    if (!disabled(next)) focusDate(next);
  }
  const end = checkOut || (choosing === "checkOut" ? hover : "");
  return (
    <div ref={root} className={`stay-calendar${loading ? " is-loading" : ""}`} aria-busy={loading}>
      <div className="calendar-navigation">
        <p>{choosing === "checkOut" && checkIn ? "Agora escolha a saída" : "Escolha a entrada"}</p>
        <div>
          <button
            type="button"
            className="icon-button"
            aria-label="Mês anterior"
            disabled={monthStart <= firstMonth}
            onClick={() => {
              setMonth(addMonths(monthStart, -1));
              setHover("");
            }}
          >
            <ChevronLeft size={19} />
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label="Próximo mês"
            disabled={monthStart >= lastMonth}
            onClick={() => {
              setMonth(addMonths(monthStart, 1));
              setHover("");
            }}
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>
      <div className="calendar-months">
        {[monthStart, addMonths(monthStart, 1)]
          .filter((value) => value <= windowEnd)
          .map((current, monthIndex) => {
            const first = new Date(`${current}T12:00:00Z`).getUTCDay();
            const length = Number(addDays(addMonths(current, 1), -1).slice(8));
            const days = Array.from({ length: Math.ceil((first + length) / 7) * 7 }, (_, index) => {
              const number = index - first + 1;
              return number < 1 || number > length
                ? null
                : `${current.slice(0, 7)}-${String(number).padStart(2, "0")}`;
            });
            const enabled = days.filter((day): day is string => !!day && !disabled(day));
            const tabbable = enabled.includes(focused) ? focused : enabled[0];
            return (
              <table className={`calendar-month calendar-month-${monthIndex}`} key={current}>
                <caption>
                  {formatStayDate(current, { day: undefined, month: "long", year: "numeric" })}
                </caption>
                <thead>
                  <tr>
                    {weekdays.map((label) => (
                      <th key={label} scope="col">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: days.length / 7 }, (_, week) => (
                    <tr key={week}>
                      {days.slice(week * 7, week * 7 + 7).map((day, cell) => {
                        if (!day) return <td key={`empty-${cell}`} />;
                        const blocked = isNightBlocked(day, periods);
                        const selected = day === checkIn || day === checkOut;
                        const range = checkIn && end && end > checkIn && day > checkIn && day < end;
                        const checkoutBoundary =
                          blocked &&
                          choosing === "checkOut" &&
                          !!checkIn &&
                          day > checkIn &&
                          !overlaps(checkIn, day, periods);
                        const confirmedBlocked =
                          !!data?.complete &&
                          !loading &&
                          day >= today &&
                          day <= windowEnd &&
                          blocked &&
                          !selected &&
                          !checkoutBoundary;
                        const classes = [
                          blocked ? "is-blocked" : "",
                          confirmedBlocked ? "is-confirmed-blocked" : "",
                          selected ? "is-selected" : "",
                          range ? "is-in-range" : "",
                          !data?.complete ? "is-unknown" : "",
                          checkoutBoundary ? "is-checkout-boundary" : "",
                        ]
                          .filter(Boolean)
                          .join(" ");
                        const label = `${formatStayDate(day, { day: "numeric", month: "long", year: "numeric", weekday: "long" })}${day === checkIn ? ", entrada selecionada" : day === checkOut ? ", saída selecionada" : checkoutBoundary ? ", saída possível" : blocked ? ", noite indisponível" : !data?.complete ? ", disponibilidade não confirmada" : ""}`;
                        return (
                          <td key={day} className={classes}>
                            <button
                              type="button"
                              data-day={day}
                              aria-label={label}
                              aria-pressed={selected}
                              disabled={disabled(day)}
                              tabIndex={day === tabbable ? 0 : -1}
                              onFocus={() => setFocused(day)}
                              onKeyDown={(event) => keyboard(event, day)}
                              onPointerEnter={() => {
                                if (!disabled(day)) setHover(day);
                              }}
                              onPointerLeave={() => setHover("")}
                              onClick={() => {
                                setHover("");
                                onSelect(day);
                              }}
                            >
                              <span>{Number(day.slice(8))}</span>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })}
      </div>
      <div className="calendar-legend">
        <span>
          <i className="legend-blocked legend-blocked-x" />
          Noite bloqueada
        </span>
        <span>
          <i className="legend-selected" />
          Sua estadia
        </span>
        {!data?.complete ? (
          <span>
            <i className="legend-unknown" />
            Sem confirmação
          </span>
        ) : null}
      </div>
      <p className="calendar-help">
        A saída pode coincidir com o início de um bloqueio, sem ocupar essa noite.
      </p>
    </div>
  );
}
