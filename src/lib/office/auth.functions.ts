import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";

const OWNER_EMAIL = "owner@j4dentv.office";
const MAX_FAILS = 5;
const WINDOW_MS = 15 * 60 * 1000;

type Result = { ok: true; access_token: string; refresh_token: string } | { ok: false; error: string };

export const enterOffice = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => {
    if (!d || typeof d.password !== "string" || d.password.length < 1 || d.password.length > 200) throw new Error("Invalid request");
    return { password: d.password };
  })
  .handler(async ({ data }): Promise<Result> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ip = (getRequestHeader("cf-connecting-ip") || getRequestHeader("x-forwarded-for")?.split(",")[0] || "unknown").trim();
    const since = new Date(Date.now() - WINDOW_MS).toISOString();
    const { count } = await supabaseAdmin
      .from("login_attempts").select("id", { count: "exact", head: true })
      .eq("ip", ip).eq("success", false).gte("created_at", since);
    if ((count ?? 0) >= MAX_FAILS) return { ok: false, error: "Too many incorrect attempts. Please wait 15 minutes and try again." };

    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const anon = createClient(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    let res = await anon.auth.signInWithPassword({ email: OWNER_EMAIL, password: data.password });

    // First entry: create the single owner account from the initial password secret.
    const initial = process.env["OFFICE_INITIAL_PASSWORD"];
    if (res.error && initial && data.password === initial) {
      const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 10 });
      if (!list?.users.some((u) => u.email === OWNER_EMAIL)) {
        const { data: created, error } = await supabaseAdmin.auth.admin.createUser({ email: OWNER_EMAIL, password: initial, email_confirm: true });
        if (!error && created.user) {
          const owner_id = created.user.id;
          await supabaseAdmin.from("goals").insert({ owner_id, title: "Road to 1,000 followers", kind: "Followers", platform: "Twitch", target: 1000, unit: "followers", deadline: "2026-12-31" });
          await supabaseAdmin.from("milestones").insert([
            [10, "Chat chooses the profile picture for 24 hours"], [20, "Mystery Food Challenge"], [30, "Call any person on the phone"],
            [40, "Horror game with the lights off"], [50, "Bring a girl on stream"], [100, "24-hour stream"], [200, "48-hour stream"],
          ].map(([subs, reward]) => ({ owner_id, subs: subs as number, reward: reward as string })));
          res = await anon.auth.signInWithPassword({ email: OWNER_EMAIL, password: data.password });
        }
      }
    }

    const ok = !res.error && !!res.data.session;
    await supabaseAdmin.from("login_attempts").insert({ ip, success: ok });
    if (!ok) return { ok: false, error: "Incorrect password." };
    return { ok: true, access_token: res.data.session!.access_token, refresh_token: res.data.session!.refresh_token };
  });
