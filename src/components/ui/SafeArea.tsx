type SafeAreaProps = {
  variant: "top" | "bottom";
};

export default function SafeArea({ variant }: SafeAreaProps) {
  if (variant === "top") {
    return <div style={{ height: "max(24px, env(safe-area-inset-top))" }} />;
  }
  return <div style={{ height: "max(14px, env(safe-area-inset-bottom))" }} />;
}
