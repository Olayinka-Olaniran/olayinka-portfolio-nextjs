'use client';

import React, { useRef, useState } from 'react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

const EMAIL = 'oolaniran853@gmail.com';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormTone = 'success' | 'error' | 'info' | null;

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Olayinka-Olaniran',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.73.5.78 5.45.78 11.72c0 4.95 3.21 9.14 7.66 10.62.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.12.68-3.78-1.31-3.78-1.31-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.72-1.5-2.49-.28-5.11-1.25-5.11-5.55 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.11 1.15.9-.25 1.87-.37 2.83-.38.96.01 1.93.13 2.83.38 2.16-1.45 3.11-1.15 3.11-1.15.61 1.54.23 2.68.11 2.96.72.79 1.16 1.79 1.16 3.02 0 4.31-2.62 5.27-5.12 5.54.4.34.76 1.01.76 2.05 0 1.48-.01 2.68-.01 3.04 0 .3.2.65.78.54 4.45-1.48 7.65-5.67 7.65-10.62C23.22 5.45 18.27.5 12 .5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/olayinka-olaniran-a2ba063a2',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2H21.5l-7.49 8.56L22.79 22h-6.84l-5.36-6.99L4.34 22H1.08l8.02-9.16L1.21 2h6.99l4.84 6.4L18.244 2zm-2.4 18h1.86L7.27 4H5.31l10.53 16z" />
      </svg>
    ),
  },
] as const;

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

/**
 * Floating-label text field. We render a peer input and a label
 * that sits inside the field when empty, then floats to the top
 * border on focus or non-empty value. Pure CSS — no JS.
 */
function Field({ label, id, ...rest }: FieldProps) {
  return (
    <div className="relative">
      <input
        id={id}
        placeholder=" "
        {...rest}
        className="peer w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 pt-5 pb-2 text-sm text-slate-100 placeholder-transparent focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-1.5 text-[11px] uppercase tracking-wider text-slate-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-slate-400 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-orange-300"
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const { copied, copy } = useCopyToClipboard();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ tone: FormTone; message: string }>({
    tone: null,
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !email || !message) {
      setStatus({ tone: 'error', message: 'Please fill in every field before sending.' });
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setStatus({ tone: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setSubmitting(true);
    setStatus({ tone: 'info', message: 'Sending your message…' });

    try {
      // POST to the static `__forms.html` stub. With
      // `@netlify/plugin-nextjs@5`, the plugin no longer
      // auto-detects forms from React JSX (it would actually
      // fail the build with "requires migration steps"); the
      // migration is to keep form definitions in a static file
      // under `public/` and POST to it from the client. The
      // hidden `form-name` input + URL-encoded body is what
      // Netlify Forms needs to attribute the submission to
      // the form named `contact`.
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!response.ok) throw new Error('bad-status');
      setStatus({
        tone: 'success',
        message: "Thanks — your message is on its way. I'll reply within a day.",
      });
      form.reset();
    } catch {
      setStatus({
        tone: 'error',
        message: 'Something went wrong. Please email me directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-reveal="up"
      className="relative card-surface p-4 md:p-8 overflow-hidden"
    >
      <div
        className="absolute -bottom-32 -left-32 w-[36rem] h-[20rem] rounded-full bg-orange-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <header className="relative z-10 mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 inline-block">
          <span className="border-b-2 border-orange-500 pb-1.5">Contact Me</span>
        </h2>
        <p className="mt-2 text-slate-400">
          I usually reply within a day.
        </p>
      </header>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4 max-w-4xl mx-auto">
        {/* Form
            Netlify Forms migration for `@netlify/plugin-nextjs@5`:
            the `data-netlify` / `data-netlify-honeypot` attributes
            used to be the deploy-time hook that told the form
            scanner to register this form. v5 of the plugin treats
            those JSX attributes as a build error and forces a
            migration: the form definition now lives in
            `public/__forms.html`, and the React form POSTs to that
            file. The visible markup here is otherwise unchanged —
            the `name`, hidden `form-name` input, and `bot-field`
            honeypot are still required so the submission can be
            attributed correctly. */}
        <form
          ref={formRef}
          name="contact"
          method="post"
          onSubmit={handleSubmit}
          className="card-surface p-5 md:p-6 space-y-4"
          noValidate={false}
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="hidden" aria-hidden="true">
            <label>
              Don&apos;t fill this out if you&apos;re human:{' '}
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <Field id="name" name="name" label="Your name" required autoComplete="name" />
          <Field
            id="email"
            name="email"
            label="Your email"
            type="email"
            required
            autoComplete="email"
          />
          <div className="relative">
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder=" "
              className="peer w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 pt-5 pb-2 text-sm text-slate-100 placeholder-transparent focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition resize-none"
            />
            <label
              htmlFor="message"
              className="pointer-events-none absolute left-3 top-1.5 text-[11px] uppercase tracking-wider text-slate-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-slate-400 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-orange-300"
            >
              Your message
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold py-2.5 shadow-md shadow-orange-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {submitting ? (
              <>
                <span
                  className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin"
                  aria-hidden="true"
                />
                Sending…
              </>
            ) : (
              <>
                Send message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>

          {status.message && (
            <p
              role="status"
              aria-live="polite"
              className={`text-sm min-h-5 ${
                status.tone === 'success'
                  ? 'text-emerald-400'
                  : status.tone === 'error'
                  ? 'text-red-400'
                  : 'text-slate-400'
              }`}
            >
              {status.message}
            </p>
          )}
        </form>

        {/* Right info card */}
        <aside className="relative card-surface p-5 md:p-6 overflow-hidden">
          <div
            className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-orange-500/20 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-orange-500/10 blur-2xl"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-[0.06] bg-dots"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            <div>
              <h3 className="text-slate-100 font-semibold text-lg">
                Let&apos;s build something great
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mt-1">
                Whether it&apos;s a project, an opportunity, or just a
                question — I usually reply within a day.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 border-y border-white/10 py-4">
              <div className="text-center">
                <p className="text-orange-400 font-bold text-xl">5+</p>
                <p className="text-slate-400 text-[10px] leading-tight mt-1 uppercase tracking-wider">
                  Built Projects
                </p>
              </div>
              <div className="text-center">
                <p className="text-orange-400 font-bold text-xl">9+</p>
                <p className="text-slate-400 text-[10px] leading-tight mt-1 uppercase tracking-wider">
                  Core Techniques
                </p>
              </div>
              <div className="text-center">
                <p className="text-orange-400 font-bold text-xl">&lt;24h</p>
                <p className="text-slate-400 text-[10px] leading-tight mt-1 uppercase tracking-wider">
                  Avg. Reply
                </p>
              </div>
            </div>

            {/* Email with copy button */}
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-slate-500">
                Email
              </p>
              <div className="flex items-center gap-2 group">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex-1 text-sm text-slate-100 hover:text-orange-300 transition truncate"
                >
                  {EMAIL}
                </a>
                <button
                  type="button"
                  onClick={() => void copy(EMAIL)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-white/10 text-slate-300 hover:text-orange-300 hover:border-orange-500/40 hover:bg-orange-500/10 transition"
                  aria-label={copied ? 'Email copied' : 'Copy email address'}
                  title="Copy email"
                >
                  {copied ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-xs text-emerald-400" role="status">
                  Copied to clipboard.
                </p>
              )}
            </div>

            {/* Social */}
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-slate-500">
                Find me on
              </p>
              <ul className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-200 hover:text-orange-300 hover:border-orange-500/40 hover:bg-orange-500/10 transition text-xs"
                    >
                      {s.icon}
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
