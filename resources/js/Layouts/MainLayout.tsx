import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <section id="main-content" className="mx-4 my-2">
                    <div className="w-full border-b border-gray-200 pb-4">
                        <h1 className="text-3xl font-bold">
                            HRIS - Leave Management
                        </h1>
                    </div>
                    <div>{children}</div>
                </section>
            </main>
        </SidebarProvider>
    );
}
