import OrderAccountCard from "@/components/orders/OrderAccountCard";
import OrdersMain from "@/components/orders/OrdersMain";
import AppInput from "@/components/ui/AppInput";
import AppRenderReduxData from "@/components/ui/AppRenderReduxData";
import AppTabs from "@/components/ui/AppTabs";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hook";
import { IOrder } from "@/types/common";
import { Pagination } from "antd";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoFilter } from "react-icons/io5";

const Orders = () => {
  const order = true;
  const tabs = [
    { label: "All" },
    { label: "Pending" },
    { label: "Completed" },
    { label: "Cancelled" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const { user } = useAppSelector((state) => state.user);
  const [page, setPage] = useState<number>(1);
  const queryString = useMemo(() => {
    const info = {
      status: activeTab !== "All" ? activeTab.toLocaleLowerCase() : undefined,
      page,
      limit: 50,
      sellerId: user?.id,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page, user, activeTab]);
  const orderQuery = useGetOrdersQuery(queryString);
  console.log(queryString);

  return (
    <HomeLayout>
      <PrivateLayout>
        <div className="container py-10 2xl:py-12">
          {/* this is top section div  */}
          <div className="flex justify-between">
            <div className="">
              <h2 className="title">Orders</h2>
              <p className="text-textGrey text-xs md:text-sm">
                All orders placed on your platform
              </p>
            </div>
            {/* <div className="w-1/3 flex items-center gap-4 2xl:gap-5">
              <AppInput
                type="text"
                value=""
                placeholder="Search by name or description"
              />
              <div className="flex text-primary items-center gap-1 w-fit cursor-pointer h-fit md:gap-2 text-sm md:text-base border border-borderColor rounded md:rounded-md lg:rounded-lg 2xl:rounded-xl px-2 py-1 md:px-4 md:py-1.5 lg:py-2 2xl:px-4 2xl:py-2.5">
                <IoFilter /> Filter
              </div>
            </div> */}
          </div>

          {/* this is main div  */}
          <div className="pt-2 md:pt-4 lg:pt-5 2xl:pt-6">
            <div>
              <div className="bg-white rounded-2xl w-full min-h-[90vh] p-6 2xl:p-8">
                <AppTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <div className="w-3/4 py-6 space-y-6">
                  <AppRenderReduxData
                    queryData={orderQuery}
                    showData={(data) => {
                      return (
                        <div>
                          {data.data.map((single: IOrder) => (
                            <OrderAccountCard
                              orderInfo={single}
                              key={single.id}
                            />
                          ))}
                          <div className="flex justify-center mt-5">
                            <Pagination
                              showSizeChanger={false}
                              pageSize={data.meta.limit}
                              total={data.meta.total}
                              current={data.meta.page}
                              onChange={(value) => {
                                setPage(value);
                              }}
                            ></Pagination>
                          </div>
                        </div>
                      );
                    }}
                  ></AppRenderReduxData>
                </div>
              </div>
            </div>
            {/*          
              <div className="bg-white rounded-2xl w-full min-h-[90vh] flex items-center justify-center flex-col">
                <Image
                  width={120}
                  height={120}
                  src={"/assets/orders/orders.png"}
                  alt="order image"
                />
                <h3 className="subTitle pt-5">No orders</h3>
                <p className="text-textGrey pt-1">
                  Buy and Sell orders will be shown here
                </p>
                <div className="flex items-center gap-4 2xl:gap-5 pt-6">
                  <button className="appOutlineBtn">Explore marketplace</button>
                  <button className="appBtn">Sell product</button>
                </div>
              </div> */}
          </div>
        </div>
      </PrivateLayout>
    </HomeLayout>
  );
};

export default Orders;
