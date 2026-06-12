import { createSignal } from "solid-js";
import { A } from "@solidjs/router";

import { Greet } from "../../wailsjs/go/main/App";

export default function Home() {
  const [name, setName] = createSignal("developer");
  const [message, setMessage] = createSignal("Call Go from SolidJS.");

  async function greet() {
    setMessage(await Greet(name()));
  }

  return (
    <div class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <section class="rounded-4xl border border-white/10 bg-white/[0.07] p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
        <p class="mb-4 inline-flex rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-sm font-medium text-teal-200">
          SolidJS + Tailwind + Go Wails
        </p>
        <h1 class="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          A personal desktop app template with the wiring already done.
        </h1>
        <p class="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          Start with routing, Tailwind v4, solid-ui primitives, Wails bindings,
          SQLite persistence, embedded goose migrations, and sqlc query types.
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <A
            href="/items"
            class="rounded-full bg-teal-300 px-5 py-3 text-center text-sm font-semibold text-slate-950 shadow-lg shadow-teal-950/30 transition hover:bg-teal-200"
          >
            Try SQLite starter
          </A>
          <a
            href="https://wails.io/docs/gettingstarted/installation"
            target="_blank"
            class="rounded-full border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Wails docs
          </a>
        </div>
      </section>

      <aside class="rounded-4xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30">
        <h2 class="text-lg font-semibold text-white">Wails bridge check</h2>
        <p class="mt-2 text-sm text-slate-400">
          This calls the exported Go method in <code>app.go</code>.
        </p>
        <label class="mt-6 block text-sm font-medium text-slate-300">
          Name
          <input
            value={name()}
            onInput={(event) => setName(event.currentTarget.value)}
            class="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300/60 focus:ring-2 focus:ring-teal-300/20"
            placeholder="developer"
          />
        </label>
        <button
          type="button"
          onClick={greet}
          class="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          Call Go
        </button>
        <div class="mt-5 rounded-2xl border border-teal-300/20 bg-teal-300/10 p-4 text-sm text-teal-100">
          {message()}
        </div>
      </aside>
    </div>
  );
}
