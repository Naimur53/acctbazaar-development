import Image from "next/image";
import OrderDetailsAccountInfo from "../Orders/OrderDetailsAccountInfo";
import AppModal from "../ui/AppModal";
import AccountCredentialCard from "./AccountCredentialCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useAddAccountMutation } from "@/redux/features/account/accountApi";
import { isValidURL } from "@/utils";
import { toast } from "react-toastify";
import { ResponseErrorType } from "@/types/common";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { emptyAccountCredentials } from "@/redux/features/account/accountSlice";

type TReviewSellAccount = {
    updateProgress: Dispatch<SetStateAction<number>>
}

export default function ReviewSellAccount({ updateProgress }: TReviewSellAccount) {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useAppDispatch()
    const { accountCard, accountCredentials } = useAppSelector(state => state.account);

    const [addAccount, { isLoading }] = useAddAccountMutation();

    const handleReview = async () => {
        if (!accountCredentials.length) {
            toast.error("Account data not Found");
        }
        const submittedData = {
            ...accountCard, ...accountCredentials[1]
        }

        addAccount(submittedData)
            .unwrap()
            .then((res: ResponseErrorType) => {
                if (!res?.data.success) {
                    toast.error(res?.data.message || "something went wrong");
                } else {
                    setModalOpen(true);
                    dispatch(emptyAccountCredentials())
                    toast.success("Successfully account added");
                }
            })
            .catch(() => {
                toast.error("something went wrong");
            });
    };

    const handleModal = () => {
        setModalOpen(false);
        updateProgress(1);
    }

    useEffect(() => {
        if (accountCredentials.length < 2) {
            updateProgress(1)
        }
    }, [accountCredentials.length, updateProgress])

    return (
        <div className='bg-white rounded-2xl w-full min-h-[80vh] md:p-6 2xl:p-8'>
            <h2 className="subTitle pt-2 2xl:pt-6 pb-6 2xl:pb-8 text-center">Review Account</h2>
            <div className='pb-6 pt-1 md:pt-9 space-y-3 md:w-2/5 mx-auto'>
                <AccountCredentialCard account={accountCard} />
                <div className='border border-[#EFECEC]'></div>
                {accountCredentials.slice(1).map((account, index) => (
                    <OrderDetailsAccountInfo key={index} index={index} account={account} />
                ))}
                <div className='pt-3 md:pt-6 flex items-center justify-center'>
                    {isLoading ?
                        <button className="appBtn px-10 flex items-center justify-center"><AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" /></button>
                        :
                        <button onClick={handleReview} className="appBtn px-16">Submit</button>
                    }
                    <AppModal
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        closeable={false}
                        primaryButtonTitle="Done"
                        primaryButtonAction={handleModal}
                    >
                        <div className='md:w-[450px] text-center py-8 lg:py-10'>
                            <Image width={200} height={160} src="/assets/icons/success.png" alt="" className="mx-auto size-28 mb-4" />
                            <h2 className="subTitle">Account submitted</h2>
                            <p className="textG px-10">You will be notified after your account has been reviewed and approved in the next 24 hours</p>
                        </div>
                    </AppModal>
                </div>
            </div>
        </div>
    );
};
