import { Outlet } from "react-router-dom";
import { Footer } from "../Components/Footer/Footer";
import { Header } from "../Components/Header/Header";
import { MainPage } from "../Components/MainPage/MainPage";


export const Root = () => (
    <>
        <Header />
        {/* <MainPage> */}
        <Outlet />
        {/* </MainPage> */}
        <Footer />
    </>
)