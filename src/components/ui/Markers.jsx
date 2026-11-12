import Icon from "@/components/ui/Icon";

// Marks a problem Connexis fixes. Each problem carries its own icon (set in the content files),
// so a list never repeats the same mark, and the red alert tile ties them together.
export function Problem({ icon, size = "md", className = "" }) {
  const px = { sm: 13, md: 18, lg: 20 }[size];
  return (
    <span className={`problem problem--${size} ${className}`} aria-hidden="true">
      <Icon name={icon} size={px} strokeWidth={1.9} />
    </span>
  );
}
