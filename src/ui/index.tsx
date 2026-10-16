import * as RDialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { type ButtonHTMLAttributes, type CSSProperties, type InputHTMLAttributes, type ReactNode, useState } from 'react';
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

export function Button({ variant = 'outline', size = 'md', className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={clsx(s.btn, s[variant], s[size], className)} {...rest} />;
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
  return (
    <RDialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <RDialog.Portal>
        <RDialog.Overlay className={s.backdrop} />
        <RDialog.Content className={clsx(s.sheet, className)} aria-describedby={undefined}>
          <RDialog.Title className={s.visuallyHidden}>{title}</RDialog.Title>
          <div className={s.grabber} />
          {children}
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}
