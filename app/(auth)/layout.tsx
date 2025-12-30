export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="w-full max-w-md p-4">
        {children}
      </div>
    </div>
  );
}
