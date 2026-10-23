"use client";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowUpRight, CalendarDays, Check, LoaderCircle, MessageCircle } from "lucide-react";
import { cabinCollection, whatsappMessage, type CabinId } from "../data/redesign-content";
import { platformStayUrl } from "../data/availability";
import { StayCalendar } from "../booking/stay-calendar";
import { useAvailability } from "../booking/use-availability";
import {
  calendarWindow,
  civilDate,
  formatStayDate,
  nightCount,
} from "../../lib/availability/dates";
import { validateStay } from "../../lib/availability/engine";
import type { AvailabilityResponse, StayResult } from "../../lib/availability/types";
import "../booking/availability.css";

function subscribeDate(update: () => void) {
  window.addEventListener("focus", update);
  document.addEventListener("visibilitychange", update);
  return () => {
    window.removeEventListener("focus", update);
    document.removeEventListener("visibilitychange", update);
  };
}
export function BookingHighlightSection() {
  const ref = useRef<HTMLElement>(null);
  const checkController = useRef<AbortController | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [cabinId, setCabinId] = useState<CabinId>("rio");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [choosing, setChoosing] = useState<"checkIn" | "checkOut">("checkIn");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<StayResult | null>(null);
  const today = useSyncExternalStore(
    subscribeDate,
    () => civilDate(),
    () => "",
  );
  const { data, loading, retry, update } = useAvailability(cabinId, enabled);
  const cabin = cabinCollection.find((item) => item.id === cabinId)!;
  const window = today ? calendarWindow(today) : null;
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function chooseCabin(event: MouseEvent) {
      const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[data-cabin]");
      const id = anchor?.dataset.cabin;
      if (id === "rio" || id === "mirante") {
        const previous = checkController.current;
        checkController.current = null;
        previous?.abort();
        setCabinId(id);
        setCheckIn("");
        setCheckOut("");
        setResult(null);
        setChecking(false);
        setChoosing("checkIn");
      }
    }
    document.addEventListener("click", chooseCabin);
    return () => {
      document.removeEventListener("click", chooseCabin);
      const previous = checkController.current;
      checkController.current = null;
      previous?.abort();
    };
  }, []);
  function resetResult() {
    const previous = checkController.current;
    checkController.current = null;
    previous?.abort();
    setChecking(false);
    setResult(null);
  }
  function chooseCabin(id: CabinId) {
    resetResult();
    setCabinId(id);
    setCheckIn("");
    setCheckOut("");
    setChoosing("checkIn");
  }
  function selectDay(day: string) {
    resetResult();
    if (choosing === "checkIn" || !checkIn || day <= checkIn) {
      setCheckIn(day);
      setCheckOut("");
      setChoosing("checkOut");
    } else {
      setCheckOut(day);
      setChoosing("checkIn");
    }
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!today) return;
    const invalid = validateStay(checkIn, checkOut, today);
    if (invalid) {
      setResult({ status: "invalid", message: invalid, nights: 0 });
      return;
    }
    const controller = new AbortController();
    checkController.current?.abort();
    checkController.current = controller;
    setChecking(true);
    setResult(null);
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(
        `/api/availability?${new URLSearchParams({ cabin: cabinId, checkIn, checkOut })}`,
        { cache: "no-store", signal: controller.signal },
      );
      const payload: AvailabilityResponse & { message?: string } = await response.json();
      if (checkController.current !== controller) return;
      if (response.status === 400) {
        setResult({
          status: "invalid",
          message: payload.message ?? "Escolha datas válidas para sua estadia.",
          nights: 0,
        });
        return;
      }
      if (!response.ok || !payload.stay || payload.cabin !== cabinId)
        throw new Error("Availability unavailable");
      update(payload);
      setResult(payload.stay);
    } catch {
      if (checkController.current === controller)
        setResult({
          status: "unconfirmed",
          message: "Não conseguimos confirmar a disponibilidade dessas datas agora.",
          nights: nightCount(checkIn, checkOut),
        });
    } finally {
      clearTimeout(timer);
      if (checkController.current === controller) setChecking(false);
    }
  }
  const unknown = !loading && !data?.complete;
  const nights = checkIn && checkOut ? nightCount(checkIn, checkOut) : 0;
  const nightsText = `${nights} ${nights === 1 ? "noite" : "noites"}`;
  const message =
    checkIn && checkOut
      ? `Olá! Gostaria de consultar a estadia na ${cabin.name}, de ${formatStayDate(checkIn, { year: "numeric" })} a ${formatStayDate(checkOut, { year: "numeric" })} (${nightsText}).`
      : `Olá! Gostaria de saber mais sobre a ${cabin.name}.`;
  const stay = checkIn && checkOut ? { cabinId, checkIn, checkOut } : null;
  return (
    <section ref={ref} id="disponibilidade" className="booking-section">
      <div className="section-shell">
        <div className="booking-heading">
          <p className="eyebrow">Dê espaço para a sua próxima pausa</p>
          <h2>Planeje sua estadia.</h2>
          <p>Escolha seu refúgio. Imagine os dias. Consulte o período.</p>
        </div>
        <form className="booking-form availability-form" onSubmit={submit}>
          <div className="availability-cabins" role="group" aria-label="Escolha o refúgio">
            {cabinCollection.map((item) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={cabinId === item.id}
                onClick={() => chooseCabin(item.id)}
              >
                {item.name}
                <span>{item.concept}</span>
              </button>
            ))}
          </div>
          <div className="availability-status" role="status">
            {loading ? (
              <span>
                <LoaderCircle size={15} className="availability-spinner" /> Consultando os
                calendários…
              </span>
            ) : unknown ? (
              <span>
                Não conseguimos confirmar a disponibilidade dessas datas agora.{" "}
                <button
                  type="button"
                  onClick={() => {
                    resetResult();
                    retry();
                  }}
                >
                  Tentar novamente
                </button>
              </span>
            ) : (
              <span>
                <Check size={15} />
                Calendários consultados
                {data?.lastUpdated
                  ? ` · ${new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(new Date(data.lastUpdated))}`
                  : ""}
              </span>
            )}
          </div>
          {window ? (
            <StayCalendar
              today={today}
              windowEnd={data?.windowEnd ?? window.windowEnd}
              data={data}
              loading={loading}
              checkIn={checkIn}
              checkOut={checkOut}
              choosing={choosing}
              onSelect={selectDay}
            />
          ) : (
            <div className="calendar-placeholder" aria-label="Carregando calendário" />
          )}
          <div className="availability-summary">
            <button
              type="button"
              aria-pressed={choosing === "checkIn"}
              onClick={() => setChoosing("checkIn")}
            >
              <span>Entrada</span>
              <strong>
                {checkIn ? formatStayDate(checkIn, { year: "numeric" }) : "Escolha uma data"}
              </strong>
            </button>
            <button
              type="button"
              aria-pressed={choosing === "checkOut"}
              disabled={!checkIn}
              onClick={() => setChoosing("checkOut")}
            >
              <span>Saída</span>
              <strong>
                {checkOut ? formatStayDate(checkOut, { year: "numeric" }) : "Escolha uma data"}
              </strong>
            </button>
            <p>{checkIn && checkOut ? nightsText : "Seu tempo de descanso"}</p>
            <button
              className="button"
              type="submit"
              disabled={loading || checking || !checkIn || !checkOut}
            >
              {checking ? (
                <>
                  <LoaderCircle size={16} className="availability-spinner" />
                  Verificando…
                </>
              ) : (
                <>
                  Verificar disponibilidade <ArrowUpRight size={17} />
                </>
              )}
            </button>
          </div>
          <p className="booking-note">
            <CalendarDays size={16} aria-hidden="true" />
            Disponibilidade baseada na última sincronização dos calendários. A reserva é confirmada
            ao finalizar pelo canal escolhido.
          </p>
        </form>
        <div className="booking-results" aria-live="polite" aria-atomic="true">
          {result ? (
            <div className={`availability-result result-${result.status}`}>
              <h3>
                {result.status === "available" ? <Check size={24} /> : null}
                {result.message}
              </h3>
              <p>
                {cabin.name} · {formatStayDate(checkIn)} a {formatStayDate(checkOut)} ·{" "}
                {result.nights} {result.nights === 1 ? "noite" : "noites"}
              </p>
              {result.status === "available" ? (
                <small>
                  Essas datas estão disponíveis conforme a última sincronização dos calendários.
                </small>
              ) : (
                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    resetResult();
                    setChoosing("checkIn");
                    ref.current
                      ?.querySelector<HTMLButtonElement>(".availability-summary button")
                      ?.focus();
                  }}
                >
                  Escolher outras datas
                </button>
              )}
            </div>
          ) : null}
        </div>
        <div className="booking-platforms">
          <a
            href={stay ? platformStayUrl(cabin.airbnbUrl, "airbnb", stay) : cabin.airbnbUrl}
            target="_blank"
            rel="noreferrer"
          >
            {result?.status === "available" ? "Reservar pelo Airbnb" : "Consultar no Airbnb"}{" "}
            <ArrowUpRight size={17} />
          </a>
          <a
            href={stay ? platformStayUrl(cabin.bookingUrl, "booking", stay) : cabin.bookingUrl}
            target="_blank"
            rel="noreferrer"
          >
            {result?.status === "available" ? "Reservar pelo Booking" : "Consultar no Booking"}{" "}
            <ArrowUpRight size={17} />
          </a>
          <a href={whatsappMessage(message)} target="_blank" rel="noreferrer">
            <MessageCircle size={17} />
            Falar pelo WhatsApp <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
