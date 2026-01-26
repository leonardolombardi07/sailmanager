"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({
  title,
  href,
  icon,
}: {
  title: string;
  href: string;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton
        asChild
        isActive={href === "/" ? pathname === href : pathname.includes(href)}
      >
        <Link href={href}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
