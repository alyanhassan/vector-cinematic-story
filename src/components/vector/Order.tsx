import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { Controller, useForm } from "react-hook-form";

import { ASSETS } from "./assets";
import { BRAND, COPY, MAX_QTY, SIZES, sectionLabel } from "./content";
import { EASE, Reveal, TechLabel } from "./primitives";
import { orderSchema, orderTotal, submitOrder, type OrderInput } from "@/lib/order";
import { cn } from "@/lib/utils";

type Done = { ref: string; data: OrderInput };

const inputCls =
  "w-full border-0 border-b border-foreground/40 bg-transparent px-0 py-3 text-lg outline-none transition-colors focus:border-foreground focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-[invalid=true]:border-destructive";

function Err({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-2 text-sm text-destructive">
      {msg}
    </p>
  );
}

export function Order() {
  const [done, setDone] = useState<Done | null>(null);
  const sizeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { name: "", email: "", size: undefined, qty: 1 },
    shouldFocusError: false,
  });
  const qty = watch("qty");
  const total = `$${orderTotal(qty)}`;

  const onSubmit = handleSubmit(
    async (data) => {
      const res = await submitOrder(data);
      setDone({ ref: res.reference, data });
    },
    (errs) => {
      if (errs.name) setFocus("name");
      else if (errs.email) setFocus("email");
      else if (errs.size) sizeRefs.current[0]?.focus();
    },
  );

  return (
    <section id="order" className="relative bg-background py-24 md:py-40">
      <div className="mx-auto grid max-w-[1800px] gap-14 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-6">
          <Reveal>
            <TechLabel>{sectionLabel("order")}</TechLabel>
            <h2 className="display mt-8 text-[22vw] leading-[0.86] md:text-[11vw]">
              {COPY.order.headline[0]}
              <br />
              {COPY.order.headline[1]}
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed md:text-lg">{COPY.order.lead}</p>
          </Reveal>
          <div className="relative mt-10 w-[70%] -rotate-6">
            <div className="absolute inset-x-[14%] bottom-[8%] h-[16%] contact-shadow" />
            <img
              src={ASSETS.hero}
              alt={COPY.order.alt}
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="relative w-full sneaker-lit"
            />
          </div>
        </div>

        <div className="relative md:col-span-5 md:col-start-8 md:self-center">
          <AnimatePresence mode="wait" initial={false}>
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                role="status"
              >
                <p className="display text-[16vw] leading-[0.86] md:text-[6vw]">
                  {COPY.order.received}
                </p>
                <p className="mt-8 text-base leading-relaxed">
                  Thanks, {done.data.name.split(" ")[0]}. {done.data.qty} × {BRAND.productTitle}, UK{" "}
                  {done.data.size}. Reference {done.ref}. Demo order — no payment taken.
                </p>
                <button
                  onClick={() => {
                    reset();
                    setDone(null);
                  }}
                  className="mt-8 min-h-11 text-sm underline underline-offset-4"
                >
                  {COPY.order.again}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                <div>
                  <label htmlFor="o-name" className="label-tech block">
                    {COPY.order.fields.name}
                  </label>
                  <input
                    id="o-name"
                    autoComplete="name"
                    className={inputCls}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "o-name-err" : undefined}
                    {...register("name")}
                  />
                  <Err id="o-name-err" msg={errors.name?.message} />
                </div>

                <div>
                  <label htmlFor="o-email" className="label-tech block">
                    {COPY.order.fields.email}
                  </label>
                  <input
                    id="o-email"
                    type="email"
                    autoComplete="email"
                    className={inputCls}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "o-email-err" : undefined}
                    {...register("email")}
                  />
                  <Err id="o-email-err" msg={errors.email?.message} />
                </div>

                <Controller
                  control={control}
                  name="size"
                  render={({ field }) => {
                    const idx = SIZES.findIndex((s) => s === field.value);
                    const onKey = (e: KeyboardEvent, i: number) => {
                      const d =
                        e.key === "ArrowRight" || e.key === "ArrowDown"
                          ? 1
                          : e.key === "ArrowLeft" || e.key === "ArrowUp"
                            ? -1
                            : 0;
                      if (!d) return;
                      e.preventDefault();
                      const n = (i + d + SIZES.length) % SIZES.length;
                      field.onChange(SIZES[n]);
                      sizeRefs.current[n]?.focus();
                    };
                    return (
                      <div>
                        <span id="o-size-label" className="label-tech block">
                          {COPY.order.fields.size}
                        </span>
                        <div
                          role="radiogroup"
                          aria-labelledby="o-size-label"
                          aria-invalid={!!errors.size}
                          aria-describedby={errors.size ? "o-size-err" : undefined}
                          className="mt-4 flex flex-wrap gap-2"
                        >
                          {SIZES.map((s, i) => {
                            const checked = field.value === s;
                            return (
                              <button
                                key={s}
                                ref={(el) => {
                                  sizeRefs.current[i] = el;
                                }}
                                type="button"
                                role="radio"
                                aria-checked={checked}
                                aria-label={`UK ${s}`}
                                tabIndex={checked || (idx === -1 && i === 0) ? 0 : -1}
                                onClick={() => field.onChange(s)}
                                onKeyDown={(e) => onKey(e, i)}
                                onBlur={field.onBlur}
                                className={cn(
                                  "h-12 w-12 border text-sm transition-colors",
                                  checked
                                    ? "border-foreground bg-foreground text-background"
                                    : "border-foreground/40 hover:border-foreground",
                                )}
                              >
                                {s}
                              </button>
                            );
                          })}
                        </div>
                        <Err id="o-size-err" msg={errors.size?.message} />
                      </div>
                    );
                  }}
                />

                <Controller
                  control={control}
                  name="qty"
                  render={({ field }) => (
                    <div>
                      <span id="o-qty-label" className="label-tech block">
                        {COPY.order.fields.qty}
                      </span>
                      <div
                        className="mt-3 flex items-center gap-6"
                        role="group"
                        aria-labelledby="o-qty-label"
                      >
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          disabled={field.value <= 1}
                          onClick={() => field.onChange(field.value - 1)}
                          className="h-11 w-11 text-xl disabled:opacity-30"
                        >
                          −
                        </button>
                        <output aria-live="polite" className="display w-6 text-center text-3xl">
                          {field.value}
                        </output>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          disabled={field.value >= MAX_QTY}
                          onClick={() => field.onChange(field.value + 1)}
                          className="h-11 w-11 text-xl disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                />

                <div>
                  <div className="hairline-x" />
                  <div className="flex items-baseline justify-between py-5">
                    <TechLabel className="opacity-100">{COPY.order.total}</TechLabel>
                    <span className="display text-3xl" aria-live="polite">
                      {total}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="label-tech w-full border border-foreground bg-foreground py-5 text-background decoration-gold decoration-1 underline-offset-[6px] transition-colors duration-300 hover:bg-background hover:text-foreground hover:underline disabled:opacity-70"
                  >
                    {isSubmitting ? COPY.order.pending : `${COPY.order.submit} — ${total}`}
                  </button>
                  <p className="mt-3 text-xs text-muted-foreground">{COPY.order.disclaimer}</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
