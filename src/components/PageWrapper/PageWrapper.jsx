import { cn } from "@/utils/utils"
import { Navbar } from "../Navbar/Navbar"

const defaultBodyStyle = "w-full"


export const PageWrapper = ({ children, bodyClass = defaultBodyStyle, from = null }) => {
    return (
        <>
            <Navbar />
            <section style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem 0rem" }}>
                <div className={cn("w-full px-6", bodyClass)}>
                    {children}
                </div>
            </section>
        </>
    )
}
