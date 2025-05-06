import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from 'sonner';
import { AppSidebar } from './AppSidebar';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger />
                <section id="main-content" className="mx-4 my-2">
                    <Toaster />
                    <div>{children}</div>
                </section>
            </main>
        </SidebarProvider>
    );
}
