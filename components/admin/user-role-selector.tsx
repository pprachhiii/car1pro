"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface UserRoleSelectorProps {
  userId: string
  currentRole: string
}

export function UserRoleSelector({ userId, currentRole }: UserRoleSelectorProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [pendingRole, setPendingRole] = useState<string | null>(null)

  const handleRoleChange = (newRole: string) => {
    setPendingRole(newRole)
    setShowDialog(true)
  }

  const confirmRoleChange = async () => {
    if (!pendingRole) return

    setIsLoading(true)

    try {
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: pendingRole }),
      })

      if (!res.ok) throw new Error("Failed to update role")

      toast({
        title: "Role updated",
        description: `User role changed to ${pendingRole}`,
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setShowDialog(false)
      setPendingRole(null)
    }
  }

  return (
    <>
      <Select value={currentRole} onValueChange={handleRoleChange} disabled={isLoading}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change User Role?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change this user's role to {pendingRole}? This will{" "}
              {pendingRole === "admin" ? "grant them full admin access" : "remove their admin privileges"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRoleChange}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
