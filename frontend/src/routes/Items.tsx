import { createResource, createSignal, For, Show } from "solid-js";

import {
  CreateItem,
  DeleteItem,
  ListItems,
} from "../../wailsjs/go/main/App";
import type { store } from "../../wailsjs/go/models";

export default function Items() {
  const [itemName, setItemName] = createSignal("");
  const [items, { refetch }] = createResource<store.Item[]>(ListItems);
  const [error, setError] = createSignal("");

  async function addItem(event: SubmitEvent) {
    event.preventDefault();
    const name = itemName().trim();
    if (!name) {
      return;
    }

    try {
      setError("");
      await CreateItem(name);
      setItemName("");
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create item.");
    }
  }

  async function removeItem(id: number) {
    try {
      setError("");
      await DeleteItem(id);
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete item.");
    }
  }

  return (
    <section class="mx-auto max-w-3xl rounded-4xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-slate-950/40 backdrop-blur sm:p-8">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-medium text-teal-200">SQLite starter</p>
          <h1 class="mt-2 text-3xl font-bold text-white">Items</h1>
          <p class="mt-2 text-sm text-slate-400">
            This route persists rows through Wails, sqlc, goose, and SQLite.
          </p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          class="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Refresh
        </button>
      </div>

      <form onSubmit={addItem} class="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          value={itemName()}
          onInput={(event) => setItemName(event.currentTarget.value)}
          class="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300/60 focus:ring-2 focus:ring-teal-300/20"
          placeholder="Add a template task"
        />
        <button
          type="submit"
          class="rounded-2xl bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
        >
          Add item
        </button>
      </form>

      <Show when={error()}>
        <p class="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error()}
        </p>
      </Show>

      <div class="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50">
        <Show
          when={!items.loading}
          fallback={<p class="p-5 text-sm text-slate-400">Loading items...</p>}
        >
          <Show
            when={(items()?.length ?? 0) > 0}
            fallback={
              <p class="p-5 text-sm text-slate-400">
                No rows yet. Add the first item to create the app database.
              </p>
            }
          >
            <ul class="divide-y divide-white/10">
              <For each={items()}>
                {(item) => (
                  <li class="flex items-center justify-between gap-4 px-5 py-4">
                    <div>
                      <p class="font-medium text-white">{item.Name}</p>
                      <p class="text-xs text-slate-500">
                        #{item.ID} · {item.CreatedAt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.ID)}
                      class="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      Delete
                    </button>
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </Show>
      </div>
    </section>
  );
}
