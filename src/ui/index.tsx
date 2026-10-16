import * as RDialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type InputHTMLAttributes,
  type PointerEvent,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import s from './ui.module.css';

/** A game icon (white on black PNG) tinted through a luminance mask. */
export function GameIcon({
  src,
  size = 20,
  color,
  className,
  style,
}: {
  src: string;
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={clsx(s.icon, className)}
      style={{
        width: size,
        height: size,
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        ...(color ? { ['--icon-color' as string]: color } : null),
        ...style,
      }}
    />
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'dashed';
  size?: 'sm' | 'md' | 'lg';
};

export function Button({ variant = 'outline', size = 'md', className, type = 'button', children, ...rest }: ButtonProps) {
  return (
    <button type={type} className={clsx(s.btn, s[variant], s[size], className)} {...rest}>
      <span className={s.btnLabel}>{children}</span>
    </button>
  );
}

/** A cross drawn as two strokes, so it sits in the exact center of its box at any font. */
export function CloseIcon({ size = 10 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M1 1l8 8M9 1l-8 8" />
    </svg>
  );
}

/** East Asian wide characters: they fall back to a CJK font, about 1em wide instead of the mono 0.6em. */
const WIDE = /[\u1100-\u115f\u2e80-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe4f\uff00-\uff60\uffe0-\uffe6]/;

/** A string's width in mono glyph widths, counting a wide character as 1.7 of them. */
export function monoUnits(text: string): number {
  let n = 0;
  for (const ch of text) n += WIDE.test(ch) ? 1.7 : 1;
  return n;
}

/**
 * One line of monospaced text that shrinks to fit its container's width, up to `max` px.
 * The text must be set in the mono font, whose glyphs are all the same width. Marked-up content
 * passes its length in characters as `chars`.
 */
export function FitText({
  text,
  chars,
  max,
  className,
  children,
}: {
  max: number;
  className?: string;
} & ({ text: string; chars?: undefined; children?: undefined } | { text?: undefined; chars: number; children: ReactNode })) {
  return (
    <div className={s.fitBox}>
      <div className={clsx(s.fit, className)} style={{ '--chars': chars ?? monoUnits(text ?? ''), '--max': `${max}px` } as CSSProperties}>
        {children ?? text}
      </div>
    </div>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}) {
  return (
    <input
      type="checkbox"
      className={clsx(s.checkbox, className)}
      checked={checked}
      aria-label={label}
      title={label}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
}

export function IconButton({
  label,
  danger,
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; danger?: boolean }) {
  return (
    <button type="button" aria-label={label} title={label} className={clsx(s.iconBtn, danger && s.danger, className)} {...rest}>
      {children ?? <CloseIcon />}
    </button>
  );
}

export function TextInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={clsx(s.input, className)} {...rest} />;
}

const digits = (v: string) => v.replace(/[^\d]/g, '');

/**
 * A whole-number field that keeps what the person types while focused and commits the
 * parsed value on every change. Non-digits are dropped.
 */
export function NumberInput({
  value,
  onValue,
  max,
  attention,
  className,
  placeholder,
  emptyAsZero = true,
  ...rest
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
  value: number;
  onValue: (n: number) => void;
  max?: number;
  attention?: boolean;
  /** Show 0 as an empty field with a placeholder. */
  emptyAsZero?: boolean;
}) {
  const shown = value === 0 && !emptyAsZero ? '' : String(value);
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <input
      inputMode="numeric"
      autoComplete="off"
      className={clsx(s.input, s.num, attention && s.attention, className)}
      value={draft ?? shown}
      placeholder={placeholder}
      onFocus={(e) => e.currentTarget.select()}
      onChange={(e) => {
        const d = digits(e.target.value).slice(0, 13);
        let n = d === '' ? 0 : parseInt(d, 10);
        if (max !== undefined) n = Math.min(n, max);
        setDraft(d === '' ? '' : String(n));
        onValue(n);
      }}
      onBlur={() => setDraft(null)}
      {...rest}
    />
  );
}

/** Sector coordinate, -499..500; a lone "-" is allowed while typing. */
export function CoordInput({
  value,
  onValue,
  className,
  ...rest
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & { value: number; onValue: (n: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <input
      inputMode="numeric"
      autoComplete="off"
      className={clsx(s.input, s.num, className)}
      value={draft ?? String(value)}
      onFocus={(e) => e.currentTarget.select()}
      onChange={(e) => {
        const raw = e.target.value
          .replace(/[^\d-]/g, '')
          .replace(/(?!^)-/g, '')
          .slice(0, 4);
        setDraft(raw);
        const n = parseInt(raw, 10);
        onValue(Number.isNaN(n) ? 0 : Math.max(-499, Math.min(500, n)));
      }}
      onBlur={() => setDraft(null)}
      {...rest}
    />
  );
}

export function Switch({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      title={label}
      className={clsx(s.switch, className)}
      onClick={() => onChange(!checked)}
    >
      <span className={s.knob} />
    </button>
  );
}

export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  className,
  segmentClassName,
}: {
  options: { value: T; label: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
  segmentClassName?: string;
}) {
  return (
    <div className={clsx(s.segmented, className)}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          aria-pressed={o.value === value}
          className={clsx(s.segment, segmentClassName)}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Tag({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className={s.tag} style={{ color }}>
      {children}
    </span>
  );
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <RDialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <RDialog.Portal>
        <RDialog.Overlay className={s.backdrop} />
        <RDialog.Content className={clsx(s.dialog, className)} aria-describedby={undefined}>
          <RDialog.Title className={s.visuallyHidden}>{title}</RDialog.Title>
          {children}
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}

export function Sheet({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const sheet = useRef<HTMLDivElement>(null);
  const drag = useRef<{ y: number; t: number; dy: number } | null>(null);
  const move = (dy: number, animate: boolean) => {
    const el = sheet.current;
    if (!el) return;
    el.style.transition = animate ? 'transform 0.18s ease-out' : 'none';
    el.style.transform = dy ? `translateY(${dy}px)` : '';
  };
  // pulling the handle down far or fast enough closes the sheet; otherwise it springs back
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // the pointer is already gone; the drag still follows the events that arrive
    }
    drag.current = { y: e.clientY, t: e.timeStamp, dy: 0 };
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current.dy = Math.max(0, e.clientY - drag.current.y);
    move(drag.current.dy, false);
  };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const speed = d.dy / Math.max(1, e.timeStamp - d.t);
    if (d.dy > 120 || (d.dy > 30 && speed > 0.5)) {
      move(sheet.current?.offsetHeight ?? 600, true);
      setTimeout(onClose, 180);
    } else move(0, true);
  };
  return (
    <RDialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <RDialog.Portal>
        <RDialog.Overlay className={s.backdrop} />
        <RDialog.Content ref={sheet} className={clsx(s.sheet, className)} aria-describedby={undefined}>
          <RDialog.Title className={s.visuallyHidden}>{title}</RDialog.Title>
          <div className={s.grabZone} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
            <div className={s.grabber} />
          </div>
          {children}
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}
