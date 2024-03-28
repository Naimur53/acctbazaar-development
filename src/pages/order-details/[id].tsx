import OrderDetailsAccountInfo from "@/components/orders/OrderDetailsAccountInfo";
import Loading from "@/components/ui/Loading";
import HomeLayout from "@/layout/HomeLayout";
import { useGetOrderByIdQuery } from "@/redux/features/order/orderApi";
import { AccountCategory, IOrder } from "@/types/common";
import { getImageUrlByCategory } from "@/utils/getImageUrl";
import Image from "next/image";
import dateFormat from "dateformat";
import { useParams } from "next/navigation";
import { BiDislike, BiLike } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { IoWalletOutline } from "react-icons/io5";
import { PiCurrencyDollarBold } from "react-icons/pi";
import OrderDetailsMessaging from "@/components/orders/OrderDetailsMessaging";
import appDateFormate from "@/utils/appDateFormate";
import AppErrorComponent from "@/components/ui/AppErrorComponent";

const OrderDetails = () => {
  const isCancelled = false;
  const location = useParams();
  const { data, isLoading, isError, error } = useGetOrderByIdQuery(
    location?.id,
    { skip: !location?.id }
  );
  if (isLoading) {
    return (
      <HomeLayout>
        <Loading></Loading>
      </HomeLayout>
    );
  } else if (isError) {
    return (
      <HomeLayout>
        <AppErrorComponent></AppErrorComponent>
      </HomeLayout>
    );
  } else if (!data || !data.data) {
    return (
      <HomeLayout>
        <AppErrorComponent></AppErrorComponent>
      </HomeLayout>
    );
  }
  const mainData = data.data as IOrder;
  return (
    <HomeLayout>
      <div className="container py-10 2xl:py-12">
        <h1 className="text-textBlack font-medium">
          Orders/ <span className="text-xl">Order Details</span>
        </h1>
        <div className="py-6 flex items-center justify-between gap-4">
          <div className="space-x-2">
            <p className="text-textBlack flex items-center gap-2 font-medium text-[28px]">
              Order No:
              <span className="text-textGrey text-base font-normal">
                #{location.id}
              </span>
            </p>
            <p className="py-1 px-2 w-fit rounded-full text-xs flex items-center gap-2 text-[#027a48] bg-[#ECFDF3]">
              <GoDotFill className="fill-[#3abc5c]" />
              {mainData.status}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-textBlack">Order {mainData.status}</p>
            <p className="text-xs text-textGrey">
              {dateFormat(new Date(mainData.createdAt), appDateFormate)}
            </p>
          </div>
        </div>

        {/* this is main div  */}
        <div className="flex gap-4 2xl:gap-6 rounded-lg lg:rounded-2xl min-h-[90vh] bg-white p-2 md:p-4 lg:p-5 2xl:p-6">
          <div className="w-[55%] h-full space-y-3 2xl:space-y-4">
            <div
              className={`flex items-start justify-between rounded-lg gap-2 md:gap-4 2xl:gap-6 bg-[#FBFAFA] p-2 md:p-4 2xl:p-5`}
            >
              {/* this is image and description div  */}
              <div className="flex items-center gap-1 md:gap-2 2xl:gap-3">
                <Image
                  src={getImageUrlByCategory(mainData?.account.category)}
                  className="size-9 md:size-10 lg:size-14 2xl:size-16"
                  width={70}
                  height={70}
                  alt="social icons"
                />
                {/* this is description div  */}
                <div className="">
                  <h3 className="text-textBlack font-medium text-sm md:text-base flex items-center justify-between md:justify-normal">
                    {mainData?.account.name}
                  </h3>
                  <p className="text-textGrey pt-0.5 text-xs md:text-sm">
                    {mainData?.account.description}
                  </p>
                </div>
              </div>
              <h2 className="text-textBlack font-bold flex items-center justify-end">
                <PiCurrencyDollarBold />
                {mainData?.account.price}
              </h2>
            </div>
            <div className="pt-2 space-y-2">
              {/* <OrderDetailsAccountInfo />
              <OrderDetailsAccountInfo /> */}
            </div>
            {isCancelled ? (
              <div className="space-y-2 py-10 flex items-center text-textBlack justify-center flex-col">
                <Image
                  src={"/assets/orders/order-cancel.png"}
                  width={120}
                  height={120}
                  alt="order cancelled"
                />
                <h3>Your order was cancelled</h3>
              </div>
            ) : (
              <>
                <div className="py-5 flex items-center justify-between">
                  <h4>Payment Method </h4>
                  <button className="flex items-center gap-1">
                    <IoWalletOutline />
                    Wallet
                  </button>
                </div>
                <div className="">
                  <h4>Leave a Review</h4>
                  <div className="flex items-center gap-6 pt-2.5">
                    <button className="bg-[#F4F5F5] text-sm text-textBlack flex items-center gap-0.5 py-1.5 px-3 rounded-full">
                      <BiLike />
                      Positive
                    </button>
                    <button className="bg-[#F4F5F5] text-sm text-textBlack flex items-center gap-0.5 py-1.5 px-3 rounded-full">
                      <BiDislike />
                      Negative
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="border border-[#EFECEC]"></div>
          <div className="w-[43%] h-full">
            <OrderDetailsMessaging order={mainData} />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default OrderDetails;
