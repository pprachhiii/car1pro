
import { getSession } from "@/lib/auth"
import { HeaderClient } from "./header-client"

export default async function HeaderWrapper() {
  const session = await getSession()
  return <HeaderClient session={session} />
}
