import Image from "next/image";
import AppPopover from "../ui/AppPopover";
import { motion } from "framer-motion";
import { SlArrowDown } from "react-icons/sl";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { popupNavbarLinks } from "./NavbarData";
import Link from "next/link";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import AppModal from "../ui/AppModal";
import { useRouter } from "next/navigation";

export default function ProfileDetailsPopUp() {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();
    const router = useRouter()

    const handleModal = (value: string) => {
        if (value === "go") {
            router.push("/account/verify-account")
            setModalOpen(false);
            setOpen(false);
        } else if (value === "close") {
            setModalOpen(false)
            setOpen(false);
        }
    }

    const openModal = () => {
        setModalOpen(true);
        setOpen(false);
    }

    const handlePopup = () => {
        setOpen(open === true ? false : true);
    }

    return (
        <>
            <AppPopover
                popupOpen={open}
                setPopupOpen={setOpen}
                placement="bottomRight"
                button={
                    <div
                        onClick={handlePopup}
                        className="cursor-pointer flex items-center md:gap-2"
                    >
                        {/* this is profile image div  */}
                        <div className='relative'>
                            <Image width={40} height={40} className="size-7 md:size-9" src={user?.profileImg as string} alt="country icon" />
                            {user?.isVerified &&
                                <Image width={16} height={16} className="size-2 md:size-3.5 2xl:size-4 bg-white rounded-full absolute bottom-0.5 md:-bottom-0.5 right-0 md:-right-1 object-contain" src={'/assets/icons/verified.png'} alt="country icon" />
                            }
                        </div>

                        <motion.span
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <SlArrowDown className="text-xs md:text-base" />
                        </motion.span>
                    </div>
                }>
                {/* this is main component  */}
                <div className=''>
                    <div className='border-b border-b-[#EDF2F7] pb-2 pl-2 pt-2'>
                        <div className='flex flex-col md:flex-row items-center justify-between gap-2 md:gap-10 pb-1'>
                            <h4 className="text-sm md:text-base">{user?.name}</h4>
                            {!user?.isVerified &&
                                <button onClick={openModal} className="appOutlineBtnSm hidden md:block">Become Verified</button>
                            }
                        </div>
                        <p className="textG">{user?.email}</p>
                        {!user?.isVerified &&
                            <button onClick={openModal} className="appOutlineBtnSm mt-2 md:hidden">Become Verified</button>
                        }
                    </div>

                    <div className='space-y-2 pt-2 p-2'>
                        {popupNavbarLinks.map(nav => (
                            nav.label === "Log out" ?
                                <div
                                    key={nav?.label}
                                    onClick={() => dispatch(userLoggedOut())}
                                    className='flex items-center gap-3 text-[#4C4646] hover:text-primary text-base 2xl:text-lg cursor-pointer'>
                                    <nav.icon />  {nav?.label}
                                </div>
                                : <Link href={nav?.path} key={nav?.label} className='flex items-center gap-3 text-[#4C4646] hover:text-primary text-base 2xl:text-lg'>
                                    <nav.icon />  {nav?.label}
                                </Link>
                        ))}
                    </div>
                </div>
            </AppPopover>
            {modalOpen &&
                <AppModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    closeable={false}
                    title="Become Verified"
                >
                    <div className='md:w-[450px] text-center pt-4'>
                        <Image width={200} height={160} src="/assets/icons/verification-keyc.png" alt="" className="mx-auto size-28 mb-4" />
                        <h2 className="subTitle pb-1">Complete your KYC Verification</h2>
                        <p className="textG">Verify your Identity with us. This gives you more edge a merchant. Buyers trust Merchant with verified account than not.</p>
                        <div className='flex items-center justify-center flex-col gap-2'>
                            <button onClick={() => handleModal("go")} className="appBtn mt-8 px-12">Begin KYC Verification</button>
                            <button onClick={() => handleModal("close")} className="text-textBlack hover:text-primary">I’ll do this later</button>
                        </div>
                    </div>
                </AppModal>
            }
        </>
    );
};
