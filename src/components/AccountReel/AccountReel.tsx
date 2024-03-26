import { ACCOUNT_CATEGORIES, findImageUrlByCategory } from "@/shared";
import { AccountCategory, EApprovedForSale, IAccount } from "@/types/common";
import { Pagination } from "antd";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import Loading from "../ui/Loading";
import ErrorCompo from "../ui/AppErrorComponent";
import { useGetAccountsQuery } from "@/redux/features/account/accountApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import AccountTable from "./AccountTable";
type Props = { title: string; category?: string; accountType?: string };

const AccountReel = ({ title, accountType, category }: Props) => {
  const [page, setPage] = useState<number>(1);

  const queryString = useMemo(() => {
    const info = {
      page,
      isSold: false,
      category,
      accountType,
      approvedForSale: EApprovedForSale.approved,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value || value === false) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [page, category, accountType]);
  const { data, isError, isLoading, isFetching, isSuccess, error } =
    useGetAccountsQuery(queryString);

  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (isSuccess && data.data.length) {
    const info = data.data as IAccount[];
    content = (
      <div>
        <h2 className="text-sm lg:text-lg mb-5  font-bold ">{title}</h2>
        <div className=" ">
          <AccountTable dataSource={info}></AccountTable>
          <div className="flex justify-center mt-4">
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
      </div>
    );
  } else {
    content = null;
  }
  return (
    <div>
      <div className="mt-10">{content}</div>
    </div>
  );
};

export default AccountReel;
