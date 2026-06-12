import type { JSX } from "solid-js";
import { A } from "@solidjs/router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/solid-ui/DropdownMenu";

type AppShellProps = {
  children?: JSX.Element;
};

export default function AppShell(props: AppShellProps) {
  return (
    <div class="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_34rem),linear-gradient(135deg,#020617,#0f172a_45%,#111827)] text-slate-100">
      <header class="border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <A href="/" class="group flex items-center gap-3">
            <span class="grid size-10 place-items-center rounded-2xl border border-teal-300/30 bg-teal-300/10 font-bold text-teal-200 shadow-lg shadow-teal-950/30">
              SW
            </span>
            <span>
              <span class="block text-sm font-semibold tracking-wide text-white">
                Solid Wails
              </span>
              <span class="block text-xs text-slate-400">
                personal app template
              </span>
            </span>
          </A>

          <nav class="hidden items-center gap-2 text-sm text-slate-300 sm:flex">
            <A class="rounded-full px-3 py-2 hover:bg-white/10" href="/">
              Home
            </A>
            <A class="rounded-full px-3 py-2 hover:bg-white/10" href="/items">
              Items
            </A>
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger class="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none transition hover:bg-white/15 focus:ring-2 focus:ring-teal-300">
              Template
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-48">
              <DropdownMenuLabel>Stack</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>SolidJS</DropdownMenuItem>
              <DropdownMenuItem>Tailwind CSS</DropdownMenuItem>
              <DropdownMenuItem>Go + Wails</DropdownMenuItem>
              <DropdownMenuItem>SQLite + goose + sqlc</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main class="mx-auto max-w-6xl px-5 py-8">{props.children}</main>
    </div>
  );
}
