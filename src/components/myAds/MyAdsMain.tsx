import { Dispatch, SetStateAction, useState } from "react";
import AppTabs from "../ui/AppTabs";
import MarketplaceSidebar from "../marketplace/MarketplaceSidebar";
import OrderAccountCard from "../Orders/OrderAccountCard";
import OrderDetailsAccountInfo from "../Orders/OrderDetailsAccountInfo";
import MyAdsAccountCard from "./MyAdsAccountCard";
import { IAccount } from "@/types/common";

type TMyAdsMain = {
    accounts: IAccount[];
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<string>>;
    tabs: {
        label: string;
    }[]
}

const MyAdsMain = ({ accounts, activeTab, setActiveTab, tabs }: TMyAdsMain) => {

    return (
        <div className='bg-white rounded-2xl w-full min-h-[90vh] p-6 2xl:p-8'>
            <AppTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {/* this is main div  */}
            <div className='flex gap-4 min-h-screen 2xl:gap-6 pt-2 md:pt-4 lg:pt-5 2xl:pt-6'>
                <div className='w-full h-full bg-white'>
                    {accounts.map(account => (
                        <MyAdsAccountCard account={account} key={account.id} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MyAdsMain;