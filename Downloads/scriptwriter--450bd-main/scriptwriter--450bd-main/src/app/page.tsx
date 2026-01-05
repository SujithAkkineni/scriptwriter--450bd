import ClientOnly from "@/components/layout/client-only";
import AppShell from '@/components/layout/app-shell';

export default function Home() {
  return (
    <ClientOnly>
      <AppShell />
    </ClientOnly>
  );
}
