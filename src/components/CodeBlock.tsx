'use client';

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { CheckIcon, ClipboardIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

const PLAIN_LANGS = ['output', 'text'] as const;
const TOAST_DURATION = 2000;

type CopyStatus = 'copied' | 'copyFailed' | null;

/**
 * A code block preference shared by every block on the site, remembered in
 * localStorage and kept in sync across blocks and tabs. Memory is the source of
 * truth, so the toggle still works when storage is unavailable.
 */
function createGlobalSetting(key: string, defaultValue: boolean) {
  const listeners = new Set<() => void>();
  let value: boolean | undefined;

  const parse = (stored: string | null) => (stored === null ? defaultValue : stored === 'true');

  const get = () => {
    if (value === undefined) {
      try {
        value = parse(localStorage.getItem(key));
      } catch {
        value = defaultValue;
      }
    }
    return value;
  };

  const set = (next: boolean) => {
    value = next;
    try {
      localStorage.setItem(key, String(next));
    } catch {
      // Storage blocked: the setting lasts until the page is reloaded
    }
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: () => void) => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      value = parse(event.newValue);
      listener();
    };
    listeners.add(listener);
    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  };

  return { get, set, subscribe, getServer: () => defaultValue };
}

type GlobalSetting = ReturnType<typeof createGlobalSetting>;

const wrapSetting = createGlobalSetting('codeBlock.wrap', false);
const whitespaceSetting = createGlobalSetting('codeBlock.showWhitespace', true);

function useGlobalSetting({ subscribe, get, getServer, set }: GlobalSetting) {
  return [useSyncExternalStore(subscribe, get, getServer), set] as const;
}

/** Clipboard API first; falls back to execCommand where it's unavailable or denied. */
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    if (!copied) throw new Error('Copy failed');
  }
}

function WrapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 6h18M3 12h15a3 3 0 0 1 0 6h-4M3 18h7" />
      <path d="m16 16-2 2 2 2" />
    </svg>
  );
}

function WhitespaceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 8h8m-3-3 3 3-3 3" />
      <circle cx="4" cy="16" r="0.75" fill="currentColor" />
      <circle cx="9" cy="16" r="0.75" fill="currentColor" />
      <circle cx="14" cy="16" r="0.75" fill="currentColor" />
      <circle cx="19" cy="16" r="0.75" fill="currentColor" />
    </svg>
  );
}

function ActionButton({
  label,
  children,
  ...props
}: { label: string; children: ReactNode } & ComponentProps<'button'>) {
  return (
    <button type="button" className="code-block__action" aria-label={label} {...props}>
      {children}
      <span className="code-block__tooltip" aria-hidden="true">
        {label}
      </span>
    </button>
  );
}

function Toast({ status, message }: { status: Exclude<CopyStatus, null>; message: string }) {
  return (
    <>
      {createPortal(
        <div className={`toast toast--${status}`} role="status">
          {status === 'copied' ? (
            <CheckIcon aria-hidden="true" />
          ) : (
            <ExclamationCircleIcon aria-hidden="true" />
          )}
          {message}
        </div>,
        document.body,
      )}
    </>
  );
}

/** Code block with a language label, line-wrap and whitespace toggles, and a copy button. */
export function CodeBlock({ className = '', children, ...props }: ComponentProps<'pre'>) {
  const t = useTranslations('codeBlock');
  const preRef = useRef<HTMLPreElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [wrap, setWrap] = useGlobalSetting(wrapSetting);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>(null);
  const [whitespace, setWhitespace] = useGlobalSetting(whitespaceSetting);

  const lang = className.match(/language-(\S+)/)?.[1] ?? 'output';
  const isPlain = (PLAIN_LANGS as readonly string[]).includes(lang);
  const label = isPlain ? t(lang as (typeof PLAIN_LANGS)[number]) : lang;

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copy = async () => {
    const text = preRef.current?.textContent?.replace(/\n$/, '') ?? '';
    try {
      await copyToClipboard(text);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('copyFailed');
    }
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopyStatus(null), TOAST_DURATION);
  };

  return (
    <div className={`code-block${isPlain ? ' code-block--plain' : ''}`}>
      <div className="code-block__bar">
        <span className="code-block__label">{label}</span>
        <div className="code-block__actions">
          <ActionButton
            label={wrap ? t('noWrap') : t('wrap')}
            onClick={() => setWrap(!wrap)}
            aria-pressed={wrap}
          >
            <WrapIcon />
          </ActionButton>
          <ActionButton
            label={whitespace ? t('hideWhitespace') : t('showWhitespace')}
            onClick={() => setWhitespace(!whitespace)}
            aria-pressed={whitespace}
          >
            <WhitespaceIcon />
          </ActionButton>
          <ActionButton label={t('copy')} onClick={copy}>
            {copyStatus === 'copied' ? (
              <CheckIcon aria-hidden="true" />
            ) : (
              <ClipboardIcon aria-hidden="true" />
            )}
          </ActionButton>
        </div>
      </div>
      <pre
        ref={preRef}
        className={className}
        data-wrap={wrap || undefined}
        data-whitespace={whitespace || undefined}
        {...props}
      >
        {children}
      </pre>
      {copyStatus && <Toast status={copyStatus} message={t(copyStatus)} />}
    </div>
  );
}
