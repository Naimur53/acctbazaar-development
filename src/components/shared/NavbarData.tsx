import { FiHome } from "react-icons/fi";
import { IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiUsersThreeLight } from "react-icons/pi";
import { TbClipboardList, TbLogout2, TbMessage2, TbSpeakerphone } from "react-icons/tb";

export const nonUserNavLinks = [
    {
        path: "/",
        label: "Home"
    },
    {
        path: "/#about",
        label: "About"
    },
    {
        path: "/#features",
        label: "Features"
    },
    {
        path: "/#how-it-works",
        label: "How it Works"
    },
    {
        path: "/become-a-merchant",
        label: "Become a Merchant"
    },
];

export const loggedUserNavLinks = [
    {
        label: "Marketplace",
        path: "/marketplace",
        icon: FiHome
    },
    {
        label: "Orders",
        path: "/orders",
        icon: TbClipboardList
    },
    {
        label: "My Ads",
        path: "/my-ads",
        icon: TbSpeakerphone
    },
    {
        label: "Messages",
        path: "/messages",
        icon: TbMessage2
    },
    {
        label: "Wallet",
        path: "/account/wallet",
        icon: IoWalletOutline
    },
];

export const popupNavbarLinks = [
    {
        label: "My Account Dashboard",
        path: "/account/dashboard",
        icon: LuLayoutDashboard,
    },
    {
        label: "Referral",
        path: "/referral",
        icon: PiUsersThreeLight,
    },
    {
        label: "Account settings",
        path: "/account/account-setting",
        icon: IoSettingsOutline,
    },
    {
        label: "Log out",
        path: "/",
        icon: TbLogout2,
    },
]