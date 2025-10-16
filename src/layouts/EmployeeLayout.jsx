import React from "react";
import { Link, Outlet, useMatch, useResolvedPath } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  CalendarCheck2,
  UserRound,
  LayoutDashboard,
  LogOut,
  Settings,
  CircleHelp,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Clock3,
  NotebookPen,
  CalendarClock,
  Headphones
} from "lucide-react";

const NAV = [
  { href: "/employee", label: "Dashboard", icon: LayoutDashboard },
  // { href: "/employee/attendance", label: "My Attendance", icon: CalendarCheck2 },
  // { href: "/employee/profile", label: "Profile", icon: UserRound }
];

const QUICK_METRICS = [
  {
    label: "Attendance Score",
    value: "98%",
    helper: "+2.1% this month",
    icon: TrendingUp,
    gradient: "from-primary/30 via-primary/10 to-transparent"
  },
  {
    label: "Logged Hours",
    value: "142h",
    helper: "Week-to-date",
    icon: Clock3,
    gradient: "from-indigo-400/30 via-indigo-500/10 to-transparent"
  },
  {
    label: "Open Requests",
    value: "3",
    helper: "Awaiting approval",
    icon: NotebookPen,
    gradient: "from-pink-400/25 via-pink-500/10 to-transparent"
  },
  {
    label: "SLA Health",
    value: "100%",
    helper: "Support tickets on track",
    icon: ShieldCheck,
    gradient: "from-emerald-400/25 via-emerald-500/10 to-transparent"
  }
];

const QUICK_ACTIONS = [
  {
    title: "Clock In",
    description: "Capture today's attendance and breaks with one tap.",
    href: "/employee/attendance",
    icon: CalendarClock,
    gradient: "from-emerald-500/25 via-emerald-500/10 to-transparent"
  },
  {
    title: "Update Profile",
    description: "Refresh contact info, skills, and availability.",
    href: "/employee/profile",
    icon: UserRound,
    gradient: "from-sky-500/25 via-sky-500/10 to-transparent"
  },
  {
    title: "Raise Support Ticket",
    description: "Get instant help from the people team.",
    href: "/employee",
    icon: Headphones,
    gradient: "from-violet-500/25 via-violet-500/10 to-transparent"
  },
  {
    title: "Review Policies",
    description: "Stay aligned with the latest handbook updates.",
    href: "/employee/profile",
    icon: NotebookPen,
    gradient: "from-amber-500/25 via-amber-500/10 to-transparent"
  }
];

const ANNOUNCEMENTS = [
  {
    title: "Pulse survey closes Friday",
    description: "Share feedback in less than 2 minutes and help shape new perks.",
    badge: "Reminder"
  },
  {
    title: "Hybrid collaboration day July 24",
    description: "Meet cross-functional teams in the studio or dial in remotely.",
    badge: "Upcoming"
  },
  {
    title: "Wellbeing resources refreshed",
    description: "Access the latest workshops and benefits inside the employee hub.",
    badge: "New"
  }
];

function SidebarItem({ href, label, icon, collapsed }) {
  const Icon = icon;
  const resolvedPath = useResolvedPath(href);
  const match = useMatch({ path: resolvedPath.pathname, end: true });
  const isActive = Boolean(match);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip disableHoverableContent={!collapsed}>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={cn(
              "group relative flex items-center gap-3 overflow-hidden rounded-2xl border px-3 py-2.5 text-sm font-medium transition-all duration-300",
              collapsed ? "justify-center" : "",
              isActive
                ? "border-primary/60 bg-primary/10 text-primary shadow-[0_20px_45px_-24px_rgba(79,70,229,0.9)]"
                : "border-transparent text-muted-foreground hover:border-white/10 hover:bg-white/5 hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "relative grid h-9 w-9 place-items-center rounded-xl border text-muted-foreground transition-all duration-300",
                "border-white/10 bg-background/80 group-hover:border-primary/40 group-hover:text-primary",
                isActive && "border-primary/60 bg-primary/15 text-primary shadow-inner"
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            {!collapsed && <span className="flex-1 truncate">{label}</span>}
            <span
              className={cn(
                "absolute right-3 top-1/2 hidden h-6 w-[3px] -translate-y-1/2 rounded-full bg-primary/80 transition-all duration-300",
                isActive && "opacity-100 md:block"
              )}
            />
          </Link>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="right" className="px-2 py-1 text-xs">
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export default function EmployeeLayout({ title = "Employee" }) {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    const onKey = (event) => {
      if (event.key.toLowerCase() === "b") {
        setCollapsed((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const initials = (user?.fullName || "User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const firstName = user?.fullName?.split(" ")?.[0] || "there";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-140px] h-[520px] w-[520px] rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-3 sm:px-6">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] border-white/10 bg-background/95 p-0 backdrop-blur-xl">
                  <div className="flex flex-col gap-6 px-5 py-6">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card/70 p-4 backdrop-blur">
                      <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarImage src={user?.avatar || ""} alt={user?.fullName || ""} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold leading-tight">{user?.fullName}</div>
                        <div className="text-xs text-muted-foreground">Employee</div>
                      </div>
                    </div>
                    <nav className="space-y-2">
                      {NAV.map((item) => (
                        <SidebarItem key={item.href} {...item} collapsed={false} />
                      ))}
                    </nav>
                    <Separator />
                    <Button variant="outline" className="justify-start gap-2" onClick={logout}>
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex flex-col">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  {title} Hub
                </span>
                <span className="text-sm font-medium text-foreground">Design your best workday</span>
              </div>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <div className="hidden lg:flex">
                <Input
                  placeholder="Search anything..."
                  className="w-[260px] border-white/10 bg-card/60 backdrop-blur placeholder:text-muted-foreground"
                />
              </div>
              <Separator orientation="vertical" className="h-8 bg-white/10" />
              <span className="hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 lg:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online
              </span>
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9 border border-white/10">
                  <AvatarImage src={user?.avatar || ""} alt={user?.fullName || ""} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold leading-4">{user?.fullName}</div>
                  <div className="text-xs text-muted-foreground">{user?.email}</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-white/20 bg-white/5 backdrop-blur" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full flex-1 flex-col gap-6 px-3 py-6 sm:px-6 md:grid md:grid-cols-[auto_minmax(0,1fr)] md:items-start">
          <aside
            className={cn(
              "hidden md:flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-card/70 p-4 shadow-[0_25px_50px_-24px_rgba(15,23,42,0.65)] backdrop-blur-xl transition-all duration-300",
              collapsed ? "w-[92px]" : "w-[280px]"
            )}
          >
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/60 px-3 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-card/70">
                  <Settings className="h-5 w-5 text-primary" />
                </span>
                {!collapsed && (
                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-foreground">Employee Command</div>
                    <div className="text-xs text-muted-foreground">Version 1.0</div>
                  </div>
                )}
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
                onClick={() => setCollapsed((value) => !value)}
                title={collapsed ? "Expand sidebar (B)" : "Collapse sidebar (B)"}
              >
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>

            <nav className="space-y-2">
              {NAV.map((item) => (
                <SidebarItem key={item.href} {...item} collapsed={collapsed} />
              ))}
            </nav>

            <div className="mt-auto rounded-2xl border border-white/10 bg-background/60 p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-card/70">
                  <CircleHelp className="h-5 w-5 text-primary" />
                </span>
                {!collapsed && (
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-semibold text-foreground">Need a hand?</div>
                      <p className="text-xs text-muted-foreground">
                        Press <kbd className="rounded border border-white/20 px-1 text-[10px]">B</kbd> to collapse.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full border-white/20 bg-white/5">
                      Docs
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <main className="min-w-0 space-y-6">
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-card/60 px-6 py-7 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:px-8 md:py-8">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/5 to-transparent" />
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                    Guided mode
                  </span>
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    Welcome back, {firstName}. We already lined up what matters today.
                  </h1>
                  <p className="max-w-xl text-sm text-muted-foreground">
                    Stay on top of attendance, requests, and growth without friction. This workspace is tuned for momentum.
                  </p>
                  {/* <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm" className="shadow-[0_20px_45px_-24px_rgba(79,70,229,0.7)]">
                      New request
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-white/30 bg-white/5 backdrop-blur transition hover:border-primary/40"
                    >
                      <Link to="/employee/attendance" className="flex items-center">
                        <CalendarCheck2 className="mr-2 h-4 w-4" />
                        View attendance
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-primary transition hover:text-primary"
                    >
                      <Link to="/employee/profile" className="flex items-center">
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Open profile
                      </Link>
                    </Button>
                  </div> */}
                </div>
                <div className="relative ml-auto">
                  <div className="pointer-events-none absolute inset-0 translate-x-6 rounded-full bg-primary/30 blur-2xl" />
                  <Avatar className="relative z-10 h-20 w-20 border-2 border-white/30 shadow-lg">
                    <AvatarImage src={user?.avatar || ""} alt={user?.fullName || ""} />
                    <AvatarFallback className="text-lg font-semibold">{initials}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </section>

            {/* <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {QUICK_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/70 p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_35px_60px_-25px_rgba(79,70,229,0.45)]"
                >
                  <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", metric.gradient)} />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">{metric.helper}</p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-primary">
                      <metric.icon className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              ))}
            </section>

            <section className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <div className="rounded-3xl border border-white/10 bg-card/70 p-6 shadow-[0_25px_50px_-20px_rgba(15,23,42,0.6)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Quick launch</h2>
                    <p className="text-sm text-muted-foreground">Handle the essentials without leaving this page.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {QUICK_ACTIONS.map((action) => (
                    <Link
                      key={action.title}
                      to={action.href}
                      className="group relative flex items-start justify-between overflow-hidden rounded-2xl border border-white/10 bg-background/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_25px_45px_-25px_rgba(79,70,229,0.6)]"
                    >
                      <span className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100", action.gradient)} />
                      <div className="relative z-10 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <action.icon className="h-4 w-4 text-primary" />
                          {action.title}
                        </div>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                      <ArrowUpRight className="relative z-10 h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-3xl border border-white/10 bg-card/70 p-6 shadow-[0_25px_50px_-20px_rgba(15,23,42,0.6)] backdrop-blur-xl">
                  <h2 className="text-lg font-semibold text-foreground">Announcements</h2>
                  <p className="text-sm text-muted-foreground">Stay in the loop with people-first updates.</p>
                  <div className="mt-4 space-y-4">
                    {ANNOUNCEMENTS.map((item) => (
                      <div key={item.title} className="flex flex-col gap-1 rounded-2xl border border-white/5 bg-background/60 p-3 transition hover:border-primary/30">
                        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                          <span>{item.badge}</span>
                          <span className="flex items-center gap-1 text-primary">
                            <Sparkles className="h-3.5 w-3.5" />
                            Highlight
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-foreground">{item.title}</div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-card/70 p-6 shadow-[0_25px_50px_-20px_rgba(15,23,42,0.6)] backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">Support</h2>
                      <p className="text-sm text-muted-foreground">Chat with the people team any time.</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-white/20 bg-white/5">
                      <Headphones className="mr-2 h-4 w-4" />
                      Live chat
                    </Button>
                  </div>
                  <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-background/60 p-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary">
                      <CalendarCheck2 className="h-5 w-5" />
                    </span>
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-foreground">Attendance concierge</div>
                      <p className="text-xs text-muted-foreground">
                        Need a manual correction? Drop details and we will take care of it in minutes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}

            <section className="rounded-3xl border border-white/10 bg-card/70 p-6 shadow-[0_25px_50px_-18px_rgba(15,23,42,0.55)] backdrop-blur-xl">
              <Outlet />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
