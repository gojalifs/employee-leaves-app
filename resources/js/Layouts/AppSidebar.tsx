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

export function AppSidebar() {
    const current = route().current();
    const user = usePage().props.auth.user;
    const sidebar = usePage().props.sidebar;

    return (
        <Sidebar>
            <SidebarHeader>
                <span className="ms-2 font-semibold">
                    HRIS - Leave Management
                </span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Leave Permit</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebar.leave_permit.map((item, index) => (
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
                                        <a href={item.url}>{item.title}</a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {sidebar.hr_management.length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel>User Management</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sidebar.hr_management.map((item, index) => (
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
                                            <a href={item.url}>{item.title}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                )}
                {sidebar.workflow_management.length > 0 && (
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            Workflow Management{' '}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sidebar.workflow_management.map(
                                    (item, index) => (
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
                )}
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
