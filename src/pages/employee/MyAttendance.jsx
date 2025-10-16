import React from "react";
import useMyAttendance from "@/hooks/useMyAttendance";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ORDER, LABELS, CHIP } from "@/components/constants/attendance";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Plane,
  Briefcase,
  AlarmClock,
  CalendarCog,
  BadgeInfo
} from "lucide-react";

function range(n) {
  return Array.from({ length: n }, (_, index) => index);
}

const YEARS = (() => {
  const currentYear = new Date().getFullYear();
  return range(6).map((offset) => currentYear - offset);
})();

const MONTHS = [
  { n: 1, label: "Jan" },
  { n: 2, label: "Feb" },
  { n: 3, label: "Mar" },
  { n: 4, label: "Apr" },
  { n: 5, label: "May" },
  { n: 6, label: "Jun" },
  { n: 7, label: "Jul" },
  { n: 8, label: "Aug" },
  { n: 9, label: "Sep" },
  { n: 10, label: "Oct" },
  { n: 11, label: "Nov" },
  { n: 12, label: "Dec" }
];

const STAT_META = {
  present: {
    helper: "Checked-in and on time",
    icon: CheckCircle2,
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    iconColor: "text-emerald-400"
  },
  absent: {
    helper: "Unplanned absences",
    icon: XCircle,
    gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
    iconColor: "text-rose-400"
  },
  leave: {
    helper: "Approved days away",
    icon: Plane,
    gradient: "from-sky-500/20 via-sky-500/5 to-transparent",
    iconColor: "text-sky-400"
  },
  late: {
    helper: "Late arrivals recorded",
    icon: AlarmClock,
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
    iconColor: "text-amber-400"
  },
  official_off: {
    helper: "Company-approved days off",
    icon: Briefcase,
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    iconColor: "text-indigo-400"
  },
  short_leave: {
    helper: "Half-days and short leaves",
    icon: CalendarCog,
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    iconColor: "text-purple-400"
  }
};

function formatDate(isoLike) {
  const date = new Date(isoLike);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short"
  });
}

export default function MyAttendance() {
  const { year, month, setYear, setMonth, loading, error, days, stats } = useMyAttendance();

  const activeMonth = React.useMemo(() => MONTHS.find((m) => m.n === month), [month]);
  const trackedTotal = React.useMemo(
    () => ORDER.reduce((total, key) => total + (stats?.[key] ?? 0), 0),
    [stats]
  );
  const presenceRate =
    trackedTotal > 0 ? Math.round(((stats?.present ?? 0) / trackedTotal) * 100) : null;

  const periodLabel = `${activeMonth?.label ?? "Month"} ${year}`;

  return (
    <div className="relative space-y-6">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute inset-x-32 top-0 h-32 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-100px] h-72 w-72 rounded-full bg-purple-500/20 blur-[140px]" />
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/80 px-6 py-6 shadow-[0_25px_45px_-24px_rgba(15,23,42,0.6)] backdrop-blur-xl sm:px-8">
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-90" />
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Timeline
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                My Attendance
              </h1>
              <p className="text-sm text-muted-foreground sm:max-w-xl">
                Review your attendance pulse, switch periods instantly, and stay on top of every
                logged day without leaving your flow.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-background/60 p-4 backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Currently viewing</p>
                <p className="text-sm font-semibold text-foreground">{periodLabel}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Select value={String(month)} onValueChange={(value) => setMonth(parseInt(value, 10))}>
                  <SelectTrigger className="w-[140px] border-white/10 bg-white/5 backdrop-blur">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m) => (
                      <SelectItem key={m.n} value={String(m.n)}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={String(year)} onValueChange={(value) => setYear(parseInt(value, 10))}>
                  <SelectTrigger className="w-[120px] border-white/10 bg-white/5 backdrop-blur">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground sm:text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {presenceRate !== null ? `${presenceRate}% presence rate` : "No records yet"}
              </span>
              <span className="flex items-center gap-2">
                <BadgeInfo className="h-3.5 w-3.5 text-primary" />
                {trackedTotal > 0
                  ? `${trackedTotal} tracked day${trackedTotal === 1 ? "" : "s"} this period`
                  : "Switch months to review previous activity"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ORDER.map((key) => {
          const meta = STAT_META[key] ?? {
            helper: "Attendance insight",
            icon: BadgeInfo,
            gradient: "from-primary/20 via-primary/5 to-transparent",
            iconColor: "text-primary"
          };
          const Icon = meta.icon;
          const value = stats?.[key] ?? 0;

          return (
            <div
              key={key}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/70 p-5 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.6)] transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_35px_60px_-28px_rgba(79,70,229,0.35)]"
            >
              <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", meta.gradient)} />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {LABELS[key]}
                  </p>
                  <p className="text-3xl font-semibold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground">{meta.helper}</p>
                </div>
                <span
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10",
                    meta.iconColor
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="rounded-3xl border border-white/10 bg-card/80 shadow-[0_25px_50px_-24px_rgba(15,23,42,0.55)] backdrop-blur-xl">
        {loading ? (
          <div className="space-y-3 p-6">
            {range(6).map((row) => (
              <div
                key={row}
                className="h-10 rounded-xl border border-dashed border-white/10 bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-6 text-sm text-rose-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-[720px]">
              <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <TableRow>
                  <TableHead className="w-[240px] text-muted-foreground">Date</TableHead>
                  <TableHead className="w-[240px] text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {days.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="py-12 text-center text-sm text-muted-foreground">
                      No attendance recorded for this period.
                    </TableCell>
                  </TableRow>
                ) : (
                  days.map((day, index) => {
                    const statusLabel = LABELS[day.status] ?? day.status;
                    const pillClasses = CHIP[day.status] ?? "border-foreground/20 text-foreground";

                    return (
                      <TableRow
                        key={`${day.date}-${index}`}
                        className="border-white/5 transition-colors hover:bg-muted/40"
                      >
                        <TableCell className="font-medium">{formatDate(day.date)}</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
                              pillClasses
                            )}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {statusLabel}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {day.note?.trim() ? day.note : "-"}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </div>
  );
}

