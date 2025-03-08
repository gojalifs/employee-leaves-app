import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';

// Menu items.
const hrManagement = [
    {
        title: 'Home',
        url: '/dashboard',
    },
    {
        title: 'Employee',
        url: '/employee',
    },
    {
        title: 'Department',
        url: '#',
    },
];

const workflowManagement = [
    {
        title: 'Leave',
        url: '#',
    },
    {
        title: 'Approval',
        url: '#',
    },
];

export function AppSidebar() {
    const current = route().current();
    const user = usePage().props.auth.user;
    const can = usePage().props.can;

    return (
        <Sidebar>
            <SidebarHeader>
                <span className="ms-2 font-semibold">
                    HRIS - Leave Management
                </span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>User Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {hrManagement.map(
                                (item, index) =>
                                    (item.title !== 'Employee' ||
                                        can.add_user) && (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={
                                                    current ==
                                                    item.url
                                                        .toLowerCase()
                                                        .split('/')
                                                        .pop()
                                                }
                                            >
                                                <a href={item.url}>
                                                    {item.title}
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ),
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Workflow Management </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {workflowManagement.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>{item.title}</a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <div>Welcome, {user.name}</div>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="bg-red-300 hover:bg-red-400 hover:text-white"
                        >
                            <a href="/logout">Logout</a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
