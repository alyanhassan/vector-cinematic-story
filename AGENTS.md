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

## Project rules
- All site copy, brand name, prices and section ids live in `src/components/vector/content.ts`; components never hardcode strings (lets the brand be renamed in one file).
- Smooth scrolling goes through the Lenis singleton in `src/components/vector/scroll.ts` (`scrollToId`, `lockScroll`); never call `scrollIntoView` directly (keeps one scroll engine).
- Order submission is isolated in `src/lib/order.ts` `submitOrder`; swap its body for a real backend without touching the UI.
