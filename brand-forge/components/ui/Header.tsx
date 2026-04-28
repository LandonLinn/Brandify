import Image from "next/image"

export default function Header()  {
    return(
        <header className="fixed dark w-full h-16 border-b border-white/10">
            <div className="container h-full flex items-center gap-4">
                {/* Img container */}
                <div className="relative h-8 w-8 shrink-0">
                    <Image
                        src={"/BF-Logo.png"}
                        alt="BrandForge Logo"
                        fill
                        sizes="100%"
                        priority={true}
                    />
                </div>
                
                <h1 className="text-on-dark font-bold text-xl!">BrandForge</h1>
            </div>
        </header>
    )
}
