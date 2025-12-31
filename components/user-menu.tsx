"use client"

import { logout } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, ShoppingBag, LogOut } from "lucide-react"
import type { SessionUser } from "@/lib/auth"

interface UserMenuProps {
  user: SessionUser
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
    <button
      className="
        flex h-9 w-9 items-center justify-center
        rounded-md
        transition
        hover:text-accent
        hover:scale-110
        focus:outline-none
      "
    >
      <User className="h-5 w-5" />
      <span className="sr-only">User menu</span>
    </button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>My Orders</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={async () => {
            await logout()
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
