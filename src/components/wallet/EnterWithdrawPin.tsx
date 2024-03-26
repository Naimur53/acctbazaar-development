import { useAddWithdrawFundMutation } from "@/redux/features/withdrawFund/withdrawFundApi";
import { ResponseErrorType, ResponseSuccessType } from "@/types/common";
import { Dispatch, SetStateAction, useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";


type TEnterWithdrawPin = {
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    withdrawData?: {
        accountNumber?: string;
        fullName?: string
        bankName?: string
    }
}

export default function EnterWithdrawPin({ setModalOpen, withdrawData }: TEnterWithdrawPin) {
    const [otp, setOtp] = useState("");
    const [makeWithdrawRequest] = useAddWithdrawFundMutation()

    const handleWithdraw = async () => {
        if (otp.length !== 4) {
            toast.error("Please Enter 4 digit Pin Number and try again")
        } else if (otp.length === 4) {
            const submittedData = {
                ...withdrawData, withdrawalPin: otp
            }

            await makeWithdrawRequest(submittedData).unwrap().then((res: ResponseErrorType | ResponseSuccessType) => {
                if (!res.data?.success) {
                    toast.error(res?.data?.message || "Something went wrong");
                }
                setModalOpen(true);
                toast.success("withdraw request are send successfully!", { toastId: 1 });

            }).catch((res: ResponseErrorType | ResponseSuccessType) => {
                if (!res.data?.success) {
                    toast.error(res?.data?.message || "Something went wrong");
                }
            });
        }
    }


    return (
        <div className='p-4'>
            <h2 className="subTitle">Enter Withdrawal PIN</h2>
            <p className="textG">Enter your 4-digit withdrawal pin</p>

            <div
                className="space-y-4 pt-4 w-fit"
            >
                <div className=''>
                    <p>Enter Pin</p>
                    <div className='pt-2'>
                        <OTPInput
                            numInputs={4}
                            value={otp}
                            onChange={(e) => setOtp(e)}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    type="number"
                                    className="size-11 lg:size-14 mr-10 bg-[#F2F4F7] rounded text-center focus:border-2 !w-[56px] focus-visible:outline-none px-2 focus:!border-primary"
                                />
                            )}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="appBtn w-full"
                    onClick={handleWithdraw}
                >
                    Withdraw
                </button>

            </div>
        </div>
    );
};
