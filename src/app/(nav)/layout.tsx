import Navbar from "@/components/ui/navbar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar/>
            <div className={"pt-40"}>
            {children}
            </div>
        </div>
    );
}