export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Public header/footer will go here */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
