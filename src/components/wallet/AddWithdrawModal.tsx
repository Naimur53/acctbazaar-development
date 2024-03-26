import Image from "next/image";
import AppModal from "../ui/AppModal";
import AppInput from "../ui/AppInput";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { Radio } from "antd";
import { useState } from "react";
import AppFormSelect from "../ui/AppFormSelect";
import { SubmitHandler, useForm } from "react-hook-form";
import AppFormInput from "../ui/AppFormInput";
import { GoArrowLeft } from "react-icons/go";
import CreateWithdrawPin from "./CreateWithdrawPin";
import { AnimatePresence, motion } from "framer-motion";
import EnterWithdrawPin from "./EnterWithdrawPin";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import { useGetWithdrawBanksQuery } from "@/redux/features/withdrawFund/withdrawFundApi";

interface FormData {
    bankName: string;
    address: string;
    accountNumber: string;
    saveAccount?: any;
}

export default function AddWithdrawModal() {
    const user = useAppSelector(state => state.user.user);
    const [mainModalOpen, setMainModalOpen] = useState(false);

    const [bankW, setBankW] = useState(false);
    const [cryptoW, setCryptoW] = useState(false);
    const [tronSelect, setTronSelect] = useState(false);
    const [bnbSelect, setBnbSelect] = useState(false);
    const [notCreatePin, setNotCreatePin] = useState(true);
    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState("");
    const [withdrawData, setWithdrawData] = useState({});

    const handleBankWithdraw = () => {
        setBankW(prev => !prev);
        setCryptoW(false);
        reset();
        setBnbSelect(false);
        setTronSelect(false);
        setAmount("");
        setAmountError("")
        setWithdrawData({})
    }

    const handleCryptoWithdraw = () => {
        setCryptoW(prev => !prev);
        setBankW(false);
        setAmount("");
        setAmountError("")
        setWithdrawData({})
    }

    const handleNetworkSelect = (value: string) => {
        if (value === "TRON") {
            setTronSelect(true);
            setBnbSelect(false);
        } else if (value === "BNB") {
            setBnbSelect(true);
            setTronSelect(false);
        }
    }

    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        // console.log(data);
        if (!amount) {
            setAmountError("Amount Error is required");
        } else if (bankW && data.bankName && data.accountNumber) {
            setWithdrawData({
                accountNumber: data?.accountNumber,
                fullName: "no-name",
                bankName: data.bankName,
                amount
            })
            setNotCreatePin(false);
        }
        // reset();
    }
    const handleWithdraw = () => {
        if (watch("address")) {
            setNotCreatePin(false);
        }
    }

    const { data } = useGetWithdrawBanksQuery('');

    const banksOption = data?.data ? data?.data?.data?.map((single: any) => ({
        value: single?.name,
        label: single?.name
    })) : [];

    // manage done modal withdraw
    const [modalOpen, setModalOpen] = useState(false);

    const handleModal = () => {
        setModalOpen(false);
        setBankW(false);
        setCryptoW(false);
        setNotCreatePin(true);
        reset();
        setBnbSelect(false);
        setTronSelect(false);
        setMainModalOpen(false);
        setAmount("");
        setAmountError("")
        setWithdrawData({})
    };

    return (
        <>
            <AppModal
                closeable={notCreatePin}
                modalOpen={mainModalOpen}
                setModalOpen={setMainModalOpen}
                button={
                    <div className='flex items-center justify-center flex-col space-y-2'>
                        <Image width={60} height={60} src="/assets/icons/send.png" alt="" className="size-14 rounded-lg border border-[#E6E0E0] hover:bg-[#FFCAAD]/15 cursor-pointer" />
                        <h4>Withdraw</h4>
                    </div>
                }
                title={notCreatePin ? "Withdraw" : ""}
                subTitle={notCreatePin ? "Send funds from your wallet" : ""}
            >
                {notCreatePin ? <div className='space-y-4 pt-4 md:w-[520px]'>
                    <div className=''>
                        <AppInput value={amount} error={amountError} onChange={(e) => setAmount(e.target.value)} icon={<PiCurrencyDollarBold />} type="number" placeholder="Enter Amount" />
                        <div className='flex items-center justify-between textG'>
                            <p>Min. withdrawal amount is <span className="text-textBlack font-medium">$20</span></p>
                            <p>Available <span className="text-textBlack font-medium">$30,000</span></p>
                        </div>
                    </div>

                    <div className=' p-4 border border-[#C5C5C5] rounded-lg '>
                        <div onClick={handleBankWithdraw} className={`flex items-center justify-between gap-5 ${bankW && 'border-b pb-1'} cursor-pointer`}>
                            <div className='flex items-center gap-4'>
                                <Image width={32} height={32} className="size-8" src={"/assets/icons/bank.png"} alt="bank payment" />
                                <div className=''>
                                    <h3 className="text-textBlack font-medium">Withdraw to Bank Account</h3>
                                    {bankW &&
                                        <p className="textG">$1 ~ ₦1509</p>
                                    }
                                </div>

                            </div>
                            <Radio checked={bankW} />
                        </div>
                        {bankW &&
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}>
                                    <form
                                        className="space-y-2 py-2"
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <AppFormSelect
                                            control={control}
                                            placeholder="Select Bank"
                                            name="bankName"
                                            required={true}
                                            options={banksOption}
                                        />
                                        <AppFormInput
                                            label="Account Number"
                                            name="accountNumber"
                                            type="number"
                                            placeholder="Type your Account Number here"
                                            register={register}
                                            required
                                            error={errors?.accountNumber}
                                        />
                                        <div className="contact-input-label flex items-center">
                                            <input
                                                {...register("saveAccount")}
                                                required
                                                type="checkbox"
                                                className="mr-[8px] size-4 cursor-pointer"
                                            />
                                            <p className="textG">Save bank details</p>
                                        </div>
                                        <div className='flex items-center justify-end'>
                                            <button
                                                type="submit"
                                                className="appBtn"
                                            >
                                                Withdraw
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            </AnimatePresence>
                        }
                    </div>

                    {/* this is crypto withdrawal code  */}
                    <div className='p-4 border border-[#C5C5C5] rounded-lg'>
                        <div onClick={handleCryptoWithdraw} className={`flex items-center justify-between cursor-pointer gap-5 ${cryptoW && 'border-b pb-1'}`}>
                            <div className='flex items-center gap-4'>
                                <Image width={32} height={32} className="size-8" src={"/assets/icons/bitcoin.png"} alt="bank payment" />
                                <h3 className="text-textBlack font-medium">Withdraw to Crypto address</h3>
                            </div>
                            <Radio checked={cryptoW} />
                        </div>
                        {cryptoW &&
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h4>We only pay USDT</h4>
                                    <div className='pt-3'>
                                        <p className="textG text-sm pb-1">Choose Network</p>
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div onClick={() => handleNetworkSelect("TRON")} className={`border cursor-pointer rounded-md py-3 px-4 ${tronSelect ? "border-primary" : "border-[#D0D2D5]"}`}>
                                                <h4 className="font-normal">Tron (TRC20)</h4>
                                                <p className="textG text-xs">Est. arrival ~ 2 mins</p>
                                            </div>
                                            <div onClick={() => handleNetworkSelect("BNB")} className={`border cursor-pointer rounded-md py-3 px-4 ${bnbSelect ? "border-primary" : "border-[#D0D2D5]"}`}>
                                                <h4 className="font-normal">BNB Smart Chain (BEP20)</h4>
                                                <p className="textG text-xs">Est. arrival ~ 3 mins</p>
                                            </div>
                                            {tronSelect &&
                                                <p className="col-span-2 textG text-xs">The network you have selected is <span className="textB text-sm">TRON</span>. Please make sure the withdrawal address supports the <span className="textB text-sm">TRON network</span>. you will potentially lose your assets if it doesn’t match.</p>
                                            }
                                            {bnbSelect &&
                                                <p className="col-span-2 textG text-xs">The network you have selected is <span className="textB text-sm">BSC</span>. Please make sure the withdrawal address supports the <span className="textB text-sm">BNB Smart Chain network</span>. you will potentially lose your assets if it doesn’t match.</p>
                                            }
                                            <div className='col-span-2'>
                                                <AppFormInput
                                                    label="User address"
                                                    name="address"
                                                    type="text"
                                                    placeholder="Type your address here"
                                                    register={register}
                                                    error={errors?.address}
                                                />
                                            </div>

                                            {watch("address") &&
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 50, opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className='col-span-2 flex items-center justify-end'>
                                                    <button
                                                        onClick={handleWithdraw}
                                                        className="appBtn"
                                                    >
                                                        Withdraw
                                                    </button>
                                                </motion.div>
                                            }

                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        }
                    </div>
                </div>
                    :
                    watch('address') ?
                        <div className='space-y-1'>
                            <GoArrowLeft onClick={() => setNotCreatePin(true)} className="text-xl text-textBlack cursor-pointer" />
                            {user?.withdrawalPin ?
                                <EnterWithdrawPin withdrawData={withdrawData} setModalOpen={setModalOpen} />
                                :
                                <CreateWithdrawPin />
                            }
                        </div>
                        :
                        <div className='space-y-1'>
                            <GoArrowLeft onClick={() => setNotCreatePin(true)} className="text-xl text-textBlack cursor-pointer" />
                            {user?.withdrawalPin ?
                                <EnterWithdrawPin withdrawData={withdrawData} setModalOpen={setModalOpen} />
                                :
                                <CreateWithdrawPin />
                            }
                        </div>
                }
            </AppModal>

            {/* this is done modal withdraw  */}
            <AppModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                closeable={false}
                primaryButtonTitle="Done"
                primaryButtonAction={handleModal}
            >
                <div className='md:w-[450px] text-center py-8 lg:py-10'>
                    <Image width={200} height={160} src="/assets/icons/withdraw-success.png" alt="" className="mx-auto size-28 mb-4" />
                    <h2 className="subTitle">Withdrawal successful</h2>
                    <p className="textG"><span className="textB">$250</span> is on its way to </p>
                    <p className="textG">0xdrCG*****RTIY . BEP20</p>
                    <Link href={'/'} className="mt-4 text-blue-500 underline block">View on explorer</Link>
                </div>
            </AppModal>
        </>
    );
};