// The red X of the Connexis logo, used to cross out the problems Connexis fixes.
export function CrossX({ className = "" }) {
  return (
    <svg className={`xmark ${className}`} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M6 6 L34 34" />
      <path d="M34 6 L6 34" />
    </svg>
  );
}
