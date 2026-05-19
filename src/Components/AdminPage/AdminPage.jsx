import { Outlet } from "react-router-dom"
import { AdminHeader } from "./AdminHeader/AdminHeader"


export const AdminPage = () => {


    return (
        <section>
            <AdminHeader />
            <Outlet />
        </section>
    )
}