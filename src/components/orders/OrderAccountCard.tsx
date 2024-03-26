import { AccountCategory, ICart, IOrder } from "@/types/common";
import appDateFormate from "@/utils/appDateFormate";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { PiCurrencyDollarBold } from "react-icons/pi";
import dateFormat from "dateformat";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Link from "next/link";
type props = {
  orderInfo: IOrder;
};
const OrderAccountCard: React.FC<props> = ({ orderInfo }) => {
  const accountInfo = orderInfo.account;
  return (
    <div
      className={`space-y-3 rounded-lg p-2 md:px-5 md:py-3 lg:px-6 lg:py-4 bg-[#FBFAFA]`}
    >
      {/* this is sell or buy div  */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-red font-medium text-sm">Sell</p>
          <Image
            src={"/assets/instagram.png"}
            width={16}
            height={16}
            alt="social icons"
          />
          <p className="text-sm text-textBlack">{accountInfo.category}</p>
        </div>
        <p className="py-1 px-2 rounded-full text-xs flex items-center gap-2 text-[#027A48] bg-[#ECFDF3]">
          <GoDotFill />
          Completed
        </p>
      </div>

      {/* this is order and date div  */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-textBlack flex items-center gap-2">
          Order number <span className="text-textGrey"># {orderInfo.id}</span>
        </p>
        <p className="text-xs text-textGrey">
          {dateFormat(new Date(orderInfo.createdAt), appDateFormate)}
        </p>
      </div>
      <div className="flex items-center justify-between gap-2 md:gap-4 2xl:gap-6 ">
        {/* this is image and description div  */}
        <div className="flex items-center gap-1 md:gap-2 2xl:gap-3">
          <Image
            src={getImageUrlByCategory(accountInfo.category)}
            className="size-9 md:size-10 lg:size-14 2xl:size-16"
            width={70}
            height={70}
            alt="social icons"
          />
          {/* this is description div  */}
          <div className="">
            <h3 className="text-textBlack font-medium text-sm md:text-base">
              {accountInfo.name}
            </h3>
            <p className="text-textGrey pt-0.5 text-xs md:text-sm">
              {accountInfo.description}
            </p>
            {/* this is profile div  */}
            {orderInfo.orderBy?.id ? (
              <div className="flex items-center gap-1 pt-1 md:pt-2">
                <Image
                  src={orderInfo.orderBy.profileImg || ""}
                  width={12}
                  height={12}
                  alt="avatar image"
                />
                <p className="text-textBlack text-xs">
                  {orderInfo.orderBy.name}
                </p>
                <RiVerifiedBadgeFill className="text-success" />
              </div>
            ) : null}
          </div>
        </div>

        {/* this is right side div with icons and price  */}
        <div className="flex flex-col gap-1 md:gap-4 justify-between">
          <h2 className="text-textBlack font-bold flex justify-end items-center">
            <PiCurrencyDollarBold />
            {accountInfo.price}
          </h2>
          {/* this is icons div view cart message  */}
          <div className="flex items-center justify-end gap-4">
            <Link href={`/order-details/${orderInfo.id}`}>
              <Image
                src={"/assets/icons/message.png"}
                width={40}
                height={40}
                className="size-4 md:size-5"
                alt="eye"
              />
            </Link>
            {/* <button className="text-textGrey underline underline-offset-2">
              Review
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAccountCard;
