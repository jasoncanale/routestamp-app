"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { AddCountryDialog } from "@/components/add-country-dialog"
import { Badge } from "@/components/ui/badge"
import { useCountries } from "@/lib/country-context"
import { usePathname } from "next/navigation"
import {
  Globe,
  Map,
  Settings,
  Plus,
  Menu,
  Home,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Info,
  Plane
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface SidebarProps {
  className?: string
}

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Countries",
    href: "/countries",
    icon: Globe,
  },
  {
    title: "Map",
    href: "/map",
    icon: Map,
    badge: "In Development",
  },
  {
    title: "Statistics",
    href: "/stats",
    icon: BarChart3,
  },
  {
    title: "Trips",
    href: "/trips",
    icon: Plane,
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
  },
]

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { addCountry } = useCountries()
  const pathname = usePathname()

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pl-1 pr-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <MobileNav navigation={navigation} onAddCountry={addCountry} pathname={pathname} setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>
      <div className={cn("hidden lg:block", className)}>
        <DesktopNav
          navigation={navigation}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onAddCountry={addCountry}
          pathname={pathname}
        />
      </div>
    </>
  )
}

function MobileNav({ 
  navigation, 
  onAddCountry, 
  pathname,
  setIsOpen
}: { 
  navigation: any[], 
  onAddCountry: any,
  pathname: string,
  setIsOpen: (open: boolean) => void
}) {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  return (
    <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
      <div className="pl-4 pr-2">
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/logo.svg"
            alt="RouteStamp"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-bold text-lg">RouteStamp</span>
        </div>
        <div className="mt-8 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            )
          })}
          <AddCountryDialog 
            open={addDialogOpen} 
            onOpenChange={setAddDialogOpen} 
            onAdd={onAddCountry} 
          />
        </div>
        <div className="mt-8">
          <Link href="/settings">
            <Button
              variant={pathname === "/settings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </ScrollArea>
  )
}

function DesktopNav({
  navigation,
  isCollapsed,
  onToggleCollapse,
  onAddCountry,
  pathname
}: {
  navigation: any[]
  isCollapsed: boolean
  onToggleCollapse: () => void
  onAddCountry: any
  pathname: string
}) {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  return (
    <div className={cn(
      "flex h-screen flex-col border-r bg-background transition-all duration-300 sticky top-0",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center space-x-2">
          <Image
            src={isCollapsed ? "/assets/collapsed-logo.svg" : "/assets/logo.svg"}
            alt="RouteStamp"
            width={isCollapsed ? 32 : 32}
            height={isCollapsed ? 32 : 32}
            className={cn("transition-all", isCollapsed ? "h-8 w-8" : "h-8 w-8")}
          />
          {!isCollapsed && <span className="font-bold text-lg">RouteStamp</span>}
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isCollapsed ? "justify-center px-2" : ""
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            )
          })}
          {isCollapsed ? (
            <Button
              variant="outline"
              size="icon"
              className="w-full"
              title="Add Country"
              onClick={() => onAddCountry({})}
            >
              <Plus className="h-4 w-4" />
            </Button>
          ) : (
            <AddCountryDialog 
              open={addDialogOpen} 
              onOpenChange={setAddDialogOpen} 
              onAdd={onAddCountry} 
            />
          )}
        </div>
      </ScrollArea>
      <div className="p-4 space-y-2 border-t">
        <Link href="/settings">
          <Button
            variant={pathname === "/settings" ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              isCollapsed ? "justify-center px-2" : ""
            )}
            title={isCollapsed ? "Settings" : undefined}
          >
            <Settings className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
            {!isCollapsed && "Settings"}
          </Button>
        </Link>
      </div>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="w-full"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
} 