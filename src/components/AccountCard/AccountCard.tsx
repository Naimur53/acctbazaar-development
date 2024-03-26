import { IAccount, ICart } from "@/types/common";
import React, { useEffect, useState } from "react";
import CurrencyLogo from "../CurrencyLogo/CurrencyLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { findImageUrlByCategory } from "@/shared";
import { Avatar, Button, Modal } from "antd";
import {
  useAddCartMutation,
  useDeleteCartMutation,
  useGetCartsQuery,
  useGetMyCartsQuery,
} from "@/redux/features/cart/cartApi";
import { toast } from "react-toastify";
import AccountDetailsModal from "../AccountDetailsModal/AccountDetailsModal";
import { useAppSelector } from "@/redux/hook";
type Props = {} & IAccount;

const AccountCard = (props: Props) => {
  const user = useAppSelector((state) => state.user.user);
  const {
    category,
    createdAt,
    description,
    id,
    isSold,
    name,
    ownById,
    price,
    updatedAt,
    ownBy,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existOnCart, setExistOnCart] = useState<ICart | null>();
  const [
    addToCart,
    {
      isLoading: isAddToCartLoading,
      isError: isAddToCartError,
      error: addToCartError,
    },
  ] = useAddCartMutation();
  const [deleteCart, { isLoading: isDeleteLoading }] = useDeleteCartMutation();
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetMyCartsQuery("");
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (data?.data) {
      const myAllCarts = data.data as ICart[];
      const isThisCartAlreadyExitsOnData = myAllCarts.find(
        (single) => single.accountId === id
      );
      if (isThisCartAlreadyExitsOnData?.id) {
        setExistOnCart(isThisCartAlreadyExitsOnData);
      } else {
        setExistOnCart(isThisCartAlreadyExitsOnData);
      }
    }
  }, [data, id]);
  useEffect(() => {}, [addToCartError]);
  const handleCartClick = () => {
    if (!user?.id) {
      toast.error("Your are not logged in");
      return;
    }
    if (isLoading) {
      return;
    }
    if (existOnCart) {
      deleteCart(existOnCart.id);
    } else {
      addToCart({ accountId: id })
        .unwrap()
        .then((res: any) => {
          if (res.error) {
            // toast.error("something went wrong");
          } else {
            // toast.success("success");
          }
        })
        .catch(() => {
          toast.error("Failed save");
        });
    }
  };
  return (
    <div>
      <div className="flex gap-5 items-start">
        <Image
          src={findImageUrlByCategory(category)}
          className="rounded-xl w-[30%]"
          width={200}
          height={200}
          alt="account-img"
        />
        <div className="w-[60%]">
          <h4 className=" text-2xl font-bold">{name}</h4>
          <div>
            <p className="text-xl my-3">{description.slice(0, 50)}</p>
          </div>
          <div className="flex gap-5">
            <div className="font-bold text-lg text-orange-500">
              <CurrencyLogo amount={price} className="w-[30px]"></CurrencyLogo>
            </div>
            <button
              disabled={isLoading}
              onClick={handleCartClick}
              className={`px-5 disabled:opacity-55 transition-all rounded py-1 border border-orange-500 ${
                existOnCart ? "opacity-60" : ""
              }`}
            >
              <FontAwesomeIcon
                icon={faCartPlus}
                className="text-orange-500"
              ></FontAwesomeIcon>
            </button>
            <button
              onClick={showModal}
              className="px-5 rounded py-1 border bg-green-500"
            >
              <FontAwesomeIcon
                icon={faEye}
                className="text-white"
              ></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
      <AccountDetailsModal
        handelOk={handleOk}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        {...props}
      ></AccountDetailsModal>
    </div>
  );
};

export default AccountCard;
