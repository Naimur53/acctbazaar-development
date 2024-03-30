import { loggedUserNavLinks } from "./NavbarData";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

type TNav = {
    icon: IconType;
    path: string;
    label: string;
}

export default function MobileNavbar() {
    const router = useRouter();
    return (
        <div className='md:hidden fixed z-40 bottom-0 left-0 right-0 bg-white w-full shadow'>
            <div className='flex items-center justify-between px-4 py-2.5 text-[#989292]'>
                {loggedUserNavLinks.map((nav: TNav) => {
                    const Icon = nav.icon;
                    return (
                        nav.label === "My Purchase" ? null :
                            <div key={nav?.label} className={`flex flex-col items-center justify-center gap-0.5 ${router?.asPath === nav?.path && "text-primary"} text-sm font-medium hover:text-primary`}>
                                <Icon className="text-base" />
                                <Link href={nav?.path}>{nav.label}</Link>
                            </div>
                    )
                })}
            </div>
        </div>
    );
};
