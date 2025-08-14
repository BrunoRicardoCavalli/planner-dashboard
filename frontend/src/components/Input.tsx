// src/components/Input.tsx
export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full p-2 border border-border rounded-lg bg-popover text-popover-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      {...props}
    />
  );
}
