import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

// Menu items.
const hrManagement = [
    {
        title: 'Home',
        url: '#',
    },
    {
        title: 'Employee',
        url: '#',
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
                            {hrManagement.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>{item.title}</a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Workflow Management</SidebarGroupLabel>
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
        </Sidebar>
    );
}
