import { AccountCategory, IAccount, ICart } from "@/types/common";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import Image from "next/image";
import { useState } from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import AppModal from "../ui/AppModal";

type TMarketplaceAccountCard = {
    account: IAccount;
    isModal?: boolean;
}

const MarketplaceAccountCard = ({ account, isModal }: TMarketplaceAccountCard) => {
    const [existOnCart, setExistOnCart] = useState<ICart | null>();
    const [count, setCount] = useState(0);

    const handleMinus = () => {
        if (count >= 0) {
            setCount(prev => prev - 1)
        }
    }

    const handlePlus = () => {
        setCount(prev => prev + 1)
    }

    return (
        <div className={`flex items-center justify-between rounded-lg gap-2 md:gap-4 2xl:gap-6 border-b border-b-[#EFEFEF] p-2 md:p-4 2xl:p-5 ${existOnCart && "bg-[#FBFAFA] opacity-50"}`}>
            {/* this is image and description div  */}
            <div className='flex items-center gap-1 md:gap-2 2xl:gap-3'>
                <Image src={getImageUrlByCategory(account?.category as AccountCategory)} className="size-9 md:size-10 lg:size-14 2xl:size-16" width={70} height={70} alt="social icons" />
                {/* this is description div  */}
                <div className=''>
                    <h3 className="text-textBlack font-medium text-sm md:text-base flex items-center justify-between md:justify-normal">{account?.name}</h3>
                    <p className="text-textGrey pt-0.5 text-xs md:text-sm">{account?.description}</p>
                    {/* this is profile div  */}
                    <div className='flex items-center gap-1 pt-1 md:pt-2'>
                        <img src={account?.ownBy?.profileImg as string} className="size-3 rounded-full" alt="avatar image" />
                        <p className="text-textBlack text-xs">{account?.ownBy?.name}</p>
                        {account?.ownBy?.isVerified &&
                            <RiVerifiedBadgeFill className="text-success" />
                        }
                    </div>
                </div>
            </div>

            {/* this is right side div with icons and price  */}
            <div className='flex flex-col gap-1 md:gap-4 justify-between'>
                <h2 className="text-textBlack font-bold flex items-center justify-end"><PiCurrencyDollarBold />{account?.price}</h2>
                {/* this is icons div view cart message  */}
                <div className='flex items-center justify-between gap-4'>
                    {isModal ?
                        <button>
                            <Image src={'/assets/icons/cart.png'} width={40} height={40} className="size-4 md:size-5" alt="eye" />
                        </button>
                        :
                        <AppModal
                            title="Select Quantity"
                            button={
                                <button>
                                    <Image src={'/assets/icons/cart.png'} width={40} height={40} className="size-4 md:size-5" alt="eye" />
                                </button>
                            }
                        >
                            <div className='md:w-[500px]'>

                                <MarketplaceAccountCard isModal account={account} />
                                <div className='pt-5 flex items-center justify-between'>
                                    <h4>Quantity</h4>
                                    <div className='flex items-center gap-2 text-xl font-semibold'>
                                        <button onClick={handleMinus}>-</button>
                                        <p>{count}</p>
                                        <button onClick={handlePlus}>+</button>
                                    </div>
                                </div>

                                <div className='flex items-center justify-center'>
                                    <button className="appBtn mt-6 mx-auto px-10">Add to Cart</button>
                                </div>
                            </div>
                        </AppModal>
                    }

                    {isModal ?
                        <button>
                            <Image src={'/assets/icons/eye.png'} width={40} height={40} className="size-4 md:size-5" alt="eye" />
                        </button>
                        :
                        <AppModal
                            title="Account Details"
                            button={
                                <button>
                                    <Image src={'/assets/icons/eye.png'} width={40} height={40} className="size-4 md:size-5" alt="eye" />
                                </button>
                            }
                        >
                            <div className='md:w-[500px] space-y-1'>
                                {/* <MarketplaceAccountCard isModal account={account} /> */}
                                <div className='flex items-center justify-center flex-col'>
                                    <Image src={getImageUrlByCategory(account?.category as AccountCategory)} className="size-9 md:size-10 lg:size-14 2xl:size-16" width={70} height={70} alt="social icons" />
                                    <h3 className="text-textBlack font-medium text-sm md:text-base flex items-center justify-between md:justify-normal">{account?.name}</h3>
                                    <p className="text-textGrey pt-0.5 text-xs md:text-sm">{account?.description}</p>
                                </div>
                                <div className='flex items-center justify-between text-sm'>
                                    <p className="text-textGrey">Owner Email</p>
                                    <p>{account?.ownBy?.email}</p>
                                </div>
                                <div className='flex items-center justify-between text-sm'>
                                    <p className="text-textGrey">2FA Email</p>
                                    <p>{account?.additionalEmail}</p>
                                </div>
                                <div className='space-y-1.5'>
                                    <p className="text-textGrey">Additional Information</p>
                                    <p>{account?.additionalDescription}</p>
                                </div>
                            </div>
                        </AppModal>
                    }


                    {/* <button>
                        <Image src={'/assets/icons/message.png'} width={40} height={40} className="size-4 md:size-5" alt="eye" />
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default MarketplaceAccountCard;