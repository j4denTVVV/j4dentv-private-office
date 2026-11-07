<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public site content lives in src/lib/site.ts until the CMS exists; shared UI primitives (motion, lux-button, lux-row utilities) are reused by public and Private HQ so both stay one design system.
- The existing authenticated layout owns OfficeShell and session guards; office data uses user-scoped browser clients and shared query options so navigation and mutations preserve RLS and cache consistency.
- Public navigation exposes only active distinct destinations; the retired Content URL redirects to Find Me to keep social links in one place.
