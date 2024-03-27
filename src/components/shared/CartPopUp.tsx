import Image from "next/image";
import AppPopover from "../ui/AppPopover";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import CartAccountCard from "./CartAccountCard";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { Checkbox } from "antd";
import { toggleSelectAll } from "@/redux/features/cart/cartSlice";
import { ICart } from "@/types/common";
import { useGetMyCartsQuery } from "@/redux/features/cart/cartApi";
import config from "@/utils/config";

export default function CartPopUp() {
    const { data: cartsInfo, isLoading: isCartLoading } = useGetMyCartsQuery("");
    const myCarts = (cartsInfo?.data as ICart[]) || ([] as ICart[]);

    const mainData = cartsInfo?.data as ICart[];
    const totalPrice = mainData?.reduce((pre, current) => {
        if (current.account?.price) {
            return current.account?.price + pre;
        }
        return 0;
    }, 0);

    const ServiceCharge = (
        (totalPrice / 100) *
        config.accountSellServiceCharge
    ).toFixed(2);

    const mainPrice = totalPrice + parseFloat(ServiceCharge);


    return (
        <AppPopover
            button={
                <div className='relative cursor-pointer'>
                    <Image width={32} height={32} className="size-5 md:size-6 object-contain" src={'/assets/icons/shopping-cart.png'} alt="country icon" />
                    {myCarts.length > 0 &&
                        <span className="size-2 md:size-3 2xl:size-3.5 rounded-full bg-primary text-white font-medium text-[5px] md:text-[8px] 2xl:text-[10px] flex items-center justify-center text-center absolute top-0 md:-top-0.5 -right-0.5">{myCarts.length}</span>
                    }
                </div>
            }>
            {/* this is main component  */}
            <div className='divide-y max-w-80'>
                {myCarts.length > 0 ?
                    <>
                        <div className='overflow-y-auto max-h-[50dvh]'>
                            {myCarts?.map((account, index) => (
                                <CartAccountCard account={account} key={index} />
                            ))}
                        </div>
                        <div className='pt-1'>
                            <h4 className="text-end">Summary</h4>
                            <div className='py-1'>
                                <div className='flex items-center justify-end gap-4'>
                                    <p className="textG">Subtotal:</p>
                                    <h2 className="text-textBlack font-bold flex items-center"><PiCurrencyDollarBold />{totalPrice}</h2>
                                </div>
                                <div className='flex items-center justify-end gap-4'>
                                    <p className="textG">Service charge (10%):</p>
                                    <h2 className="text-textBlack font-bold flex items-center"><PiCurrencyDollarBold />{ServiceCharge}</h2>
                                </div>
                            </div>

                            <div className='flex items-center justify-end gap-4 pb-2'>
                                <p className="textB">Total:</p>
                                <h2 className="text-textBlack font-bold flex items-center"><PiCurrencyDollarBold />{mainPrice}</h2>
                            </div>
                        </div>

                        <Link href={'shopping-cart'}>
                            <button className="appBtn w-full">View cart {(myCarts.length > 0) && `( ${myCarts.length} )`}</button>
                        </Link>
                    </>
                    :
                    <div className='p-4 text-[#828D99] flex items-center justify-center flex-col gap-2'>
                        <Image width={80} height={80} className="size-20 object-contain" src={'/assets/icons/empty-cart.png'} alt="country icon" />
                        Shopping cart is empty
                    </div>
                }
            </div>
        </AppPopover>
    );
};
