import { IAccount, ICart } from "@/types/common";
import React, { useEffect, useState } from "react";
import CurrencyLogo from "../CurrencyLogo/CurrencyLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  useAddCartMutation,
  useDeleteCartMutation,
  useGetMyCartsQuery,
} from "@/redux/features/cart/cartApi";
import { useAppSelector } from "@/redux/hook";
import AccountDetailsModal from "../AccountDetailsModal/AccountDetailsModal";
import { toast } from "react-toastify";
type Props = {} & IAccount;

const AccountAction = (props: Props) => {
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
  const user = useAppSelector((state) => state.user.user);

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
    if (existOnCart) {
      deleteCart(existOnCart.id);
    } else {
      addToCart({ accountId: id })
        .unwrap()
        .then((res: any) => {
          if (res.error) {
            toast.error("something went wrong" + res.data.message);
          } else {
            // toast.success("Successfully add to ");
          }
        })
        .catch((res) => {
          toast.error("Failed to save. " + " " + res.data.message);
        });
    }
  };
  return (
    <div className="flex gap-2 items-center">
      <button
        disabled={isLoading || isAddToCartLoading || isDeleteLoading}
        onClick={handleCartClick}
        className={`lg:px-5 px-2 disabled:opacity-55 transition-all rounded py-1 border border-orange-500 ${
          existOnCart?.id ? "opacity-60" : ""
        }`}
      >
        <FontAwesomeIcon
          icon={faCartPlus}
          className="text-orange-500"
        ></FontAwesomeIcon>
      </button>
      <button
        onClick={showModal}
        className="lg:px-5 px-2 rounded py-1 border bg-green-500"
      >
        <FontAwesomeIcon icon={faEye} className="text-white"></FontAwesomeIcon>
      </button>
      <AccountDetailsModal
        handelOk={handleOk}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        {...props}
      ></AccountDetailsModal>
    </div>
  );
};

export default AccountAction;
