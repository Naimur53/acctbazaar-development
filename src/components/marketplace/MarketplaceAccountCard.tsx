import { AccountCategory, IAccount, ICart } from "@/types/common";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import AppModal from "../ui/AppModal";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addCart } from "@/redux/features/cart/cartSlice";
import {
  useAddCartMutation,
  useGetMyCartsQuery,
} from "@/redux/features/cart/cartApi";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type TMarketplaceAccountCard = {
  account: IAccount;
  isModal?: boolean;
};

const MarketplaceAccountCard = ({
  account,
  isModal,
}: TMarketplaceAccountCard) => {
  const [existOnCart, setExistOnCart] = useState<ICart | null>();
  const user = useAppSelector((state) => state.user.user);
  const { data } = useGetMyCartsQuery("");

  const [addToCart, { isLoading }] = useAddCartMutation();

  useEffect(() => {
    if (data?.data) {
      const myAllCarts = data.data as ICart[];
      const isThisCartAlreadyExitsOnData = myAllCarts.find(
        (single) => single.accountId === account?.id
      );
      if (isThisCartAlreadyExitsOnData?.id) {
        setExistOnCart(isThisCartAlreadyExitsOnData);
      } else {
        setExistOnCart(isThisCartAlreadyExitsOnData);
      }
    }
  }, [account?.id, data?.data]);

  const handleAddCart = () => {
    if (!user?.id) {
      toast.error("Your are not logged in");
      return;
    } else {
      addToCart({ accountId: account?.id })
        .unwrap()
        .then((res: any) => {
          if (res.error) {
            toast.error("something went wrong" + res.data.message);
          }
          toast.success("Successfully cart added");
        })
        .catch((res) => {
          toast.error("Failed to save. " + " " + res.data.message);
        });
    }
  };

  return (
    <div
      className={`flex items-center justify-between rounded-lg gap-2 md:gap-4 2xl:gap-6 border-b border-b-[#EFEFEF] p-2 md:p-4 2xl:p-5 ${
        existOnCart && "bg-[#FBFAFA] opacity-50"
      }`}
    >
      {/* this is image and description div  */}
      <div className="flex items-center gap-1 md:gap-2 2xl:gap-3">
        <Image
          src={getImageUrlByCategory(account?.category as AccountCategory)}
          className="size-9 md:size-10 lg:size-14 2xl:size-16"
          width={70}
          height={70}
          alt="social icons"
        />
        {/* this is description div  */}
        <div className="">
          <h3 className="text-textBlack font-medium text-sm md:text-base flex items-center justify-between md:justify-normal">
            {account?.name}
          </h3>
          <p className="text-textGrey pt-0.5 text-xs md:text-sm">
            {account?.description}
          </p>
          {/* this is profile div  */}
          <div className="flex items-center gap-1 pt-1 md:pt-2">
            <img
              src={account?.ownBy?.profileImg as string}
              className="size-3 rounded-full"
              alt="avatar image"
            />
            <p className="text-textBlack text-xs">{account?.ownBy?.name}</p>
            {account?.ownBy?.isVerified && (
              <RiVerifiedBadgeFill className="text-success" />
            )}
          </div>
        </div>
      </div>

      {/* this is right side div with icons and price  */}
      <div className="flex flex-col gap-1 md:gap-4 justify-between">
        <h2 className="text-textBlack font-bold flex items-center justify-end">
          <PiCurrencyDollarBold />
          {account?.price}
        </h2>
        {/* this is icons div view cart message  */}
        <div className="flex items-center justify-between gap-4">
          {isModal || existOnCart?.accountId ? (
            <div>
              <Image
                src={"/assets/icons/cart.png"}
                width={40}
                height={40}
                className="size-4 md:size-5"
                alt="eye"
              />
            </div>
          ) : (
            <AppModal
              title="Add to cart"
              button={
                <button>
                  <Image
                    src={"/assets/icons/cart.png"}
                    width={40}
                    height={40}
                    className="size-4 md:size-5"
                    alt="eye"
                  />
                </button>
              }
            >
              <div className="md:w-[500px]">
                <MarketplaceAccountCard isModal account={account} />
                {/* <div className='pt-5 flex items-center justify-between'>
                                    <h4>Quantity</h4>
                                    <div className='flex items-center gap-2 text-xl font-semibold'>
                                        <button onClick={handleMinus}><FiMinus /></button>
                                        <p>{count}</p>
                                        <button onClick={handlePlus}><FiPlus /></button>
                                    </div>
                                </div> */}

                <div className="flex items-center justify-center">
                  {isLoading ? (
                    <button className="appBtn px-10 flex items-center justify-center mt-6">
                      <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
                    </button>
                  ) : (
                    <button
                      onClick={handleAddCart}
                      className="appBtn mt-6 mx-auto px-10"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </AppModal>
          )}

          {isModal || existOnCart?.accountId ? (
            <div>
              <Image
                src={"/assets/icons/eye.png"}
                width={40}
                height={40}
                className="size-4 md:size-5"
                alt="eye"
              />
            </div>
          ) : (
            <AppModal
              title="Account Details"
              button={
                <button>
                  <Image
                    src={"/assets/icons/eye.png"}
                    width={40}
                    height={40}
                    className="size-4 md:size-5"
                    alt="eye"
                  />
                </button>
              }
            >
              <div className="md:w-[500px] space-y-1">
                {/* <MarketplaceAccountCard isModal account={account} /> */}
                <div className="flex items-center justify-center flex-col">
                  <Image
                    src={getImageUrlByCategory(
                      account?.category as AccountCategory
                    )}
                    className="size-9 md:size-10 lg:size-14 2xl:size-16"
                    width={70}
                    height={70}
                    alt="social icons"
                  />
                  <h3 className="text-textBlack font-medium text-sm md:text-base flex items-center justify-between md:justify-normal">
                    {account?.name}
                  </h3>
                  <p className="text-textGrey pt-0.5 text-xs md:text-sm">
                    {account?.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-textGrey">Owner Email</p>
                  <p>{account?.ownBy?.email}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-textGrey">2FA Email</p>
                  <p>{account?.additionalEmail}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-textGrey">Additional Information</p>
                  <p>{account?.additionalDescription}</p>
                </div>
              </div>
            </AppModal>
          )}

          {/* <button>
                        <Image src={'/assets/icons/message.png'} width={40} height={40} className="size-4 md:size-5" alt="eye" />
                    </button> */}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceAccountCard;
