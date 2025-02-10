
import { redirect } from 'next/navigation'
import { requireUser } from '@/app/_lib/helpers'

export default async function AdminLayout({ children }) {
    const { data } = await requireUser()

    if (!data || !data?.user?.isAdmin) {
        return redirect('/')
    }
    return (
        <section>{children}</section>
    )
}
