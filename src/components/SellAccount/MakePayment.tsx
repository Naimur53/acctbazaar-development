import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import AppModal from "../ui/AppModal";
import { useAddCurrencyRequestMutation, useAddCurrencyRequestWithPayStackMutation } from "@/redux/features/currencyRequest/currencyRequestApi";
import { useAppSelector } from "@/redux/hook";
import { toast } from "react-toastify";
import config from "@/utils/config";
import { useGetCurrencyOfLoggedInUserQuery } from "@/redux/features/currency/currencyApi";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type TMakePayment = {
    updateProgress: Dispatch<SetStateAction<number>>
}

export default function MakePayment({ updateProgress }: TMakePayment) {
    const amount = 10;
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [userGuide, setUserGuide] = useState(1);

    const [addCryptoPaymentRequest, { isLoading }] = useAddCurrencyRequestMutation();
    const [addRequestWithPayStack, { isLoading: isPayStackLoading }] =
        useAddCurrencyRequestWithPayStackMutation();

    const user = useAppSelector((state) => state.user.user);
    const {
        data,
        isLoading: isCurrencyLoading,
        isFetching,
    } = useGetCurrencyOfLoggedInUserQuery({ id: user?.id });

    const handleCryptoPay = async () => {
        if (amount < config.fundMinMoney) {
            toast.error(`Minimum amount is ${config.fundMinMoney}$`);
            return;
        }
        await addCryptoPaymentRequest({ amount })
            .unwrap()
            .then((res: any) => {
                if (res.error) {
                    toast.error("something went wrong" + res.error);
                } else {
                    router.push(res.data?.url);
                }
            })
            .catch(() => {
                toast.error("something went wrong");
            });
    };

    const handlePayWithPayStack = async () => {
        if (amount < config.fundMinMoney) {
            toast.error(`Minimum amount is ${config.fundMinMoney}$`);
            return;
        }
        await addRequestWithPayStack({ amount })
            .unwrap()
            .then((res: any) => {
                console.log(res);
                if (res.success) {
                    router.push(res.data?.url);
                } else {
                    toast.error("something went wrong");
                }
            })
            .catch((err) => {
                toast.error("something went wrong" + err?.message);
            });
    };

    const handlePayment = () => {
        if (selectedOption === "bank") {
            handlePayWithPayStack()
        } else if (selectedOption === "crypto") {
            handleCryptoPay()
        } else {
            toast.warn("Select any one Payment option")
            updateProgress(2);
        }
    }

    const handleSkipModal = () => {
        setModalOpen(false);
        setUserGuide(1);
        updateProgress(2);
    }

    const handleUserGuide = (value: string) => {
        if (value === "next" && userGuide < 8) {
            setUserGuide(userGuide + 1)
        } else if (value === "prev" && userGuide > 1) {
            setUserGuide(userGuide - 1)
        } else if (userGuide === 8) {
            setModalOpen(false);
            setUserGuide(1);
            updateProgress(2);
        }
    }

    let content;
    if (userGuide === 1) {
        content =
            <div className='text-center space-y-4 px-6'>
                <div className='shadow-md px-6 py-4 rounded-md w-fit mx-auto'>
                    <Image src={'/assets/account/Input field.png'} width={400} height={60} className="w-72 h-14 object-contain" alt="user guide image" />
                </div>
                <p>When you add social media accounts like <span className="textB">Facebook</span>, <span className="textB">Instagram</span>, <span className="textB">Twitter</span>, or <span className="textB">Snapchat</span>, try putting the link of the account in the preview link option.</p>

                <p>This helps <span className="textB">acctBazaar.com</span> show a preview of your accounts so buyers can check them before buying, which can help you sell more. Remember, this is optional.</p>
            </div>
    } else if (userGuide === 2) {
        content =
            <div className='text-center space-y-4 px-6'>
                <div className='w-fit mx-auto'>
                    <Image src={'/assets/account/container.png'} width={400} height={90} className="w-[380px] h-[96] object-contain" alt="user guide image" />
                </div>
                <p>If you&apos;re uploading <span className="textB">WhatsApp</span> or <span className="textB">Google Voice accounts</span>, make sure the account name is just the NUMBER and then add any other info. You can use your phone number as the account password so buyers can contact you for codes if needed.</p>

            </div>
    } else if (userGuide === 3) {
        content =
            <div className='text-center space-y-4 px-6'>
                <div className='w-fit mx-auto'>
                    <Image src={'/assets/account/creadential.png'} width={400} height={90} className="w-[380px] h-[96] object-contain" alt="user guide image" />
                </div>
                <p>For social media accounts that need verification before access, fill in the email and password details in the 2FA information section when you upload them.</p>

            </div>
    } else if (userGuide === 4) {
        content =
            <div className='text-center space-y-4 px-6'>
                <div className='w-fit mx-auto'>
                    <Image src={'/assets/account/form.png'} width={400} height={90} className="w-[380px] h-[96] object-contain" alt="user guide image" />
                </div>
                <p>When you name your account, especially if it&apos;s been around for 1 to 5 years or more, make sure to put how long you&apos;ve had it in the Name section. Keep it short and simple, like 4 Years Facebook Account. You can give more details about the account in the description part.</p>
            </div>
    } else if (userGuide === 5) {
        content =
            <div className='text-center space-y-4 px-6'>
                <div className='w-fit mx-auto'>
                    <Image src={'/assets/account/checkout.png'} width={400} height={90} className="w-[380px] h-[96] object-contain" alt="user guide image" />
                </div>
                <p>If you want to sell accounts that don&apos;t fit into any category, choose &quot;Others&quot; when you upload them.</p>
            </div>
    } else if (userGuide === 6) {
        content =
            <div className='text-center space-y-4 px-6'>
                <div className='w-fit mx-auto'>
                    <Image src={'/assets/account/gmail.png'} width={400} height={90} className="w-[380px] h-[96] object-contain" alt="user guide image" />
                </div>
                <p>When you upload email accounts, use the email address as the username. You don&apos;t need to repeat the email in the extra information section.</p>
            </div>
    } else if (userGuide === 7) {
        content =
            <div className='text-center space-y-4 px-6'>
                <div className='w-fit mx-auto'>
                    <Image src={'/assets/account/sucess.png'} width={400} height={90} className="w-[380px] h-[96] object-contain" alt="user guide image" />
                </div>
                <p>All accounts you upload have to be checked before they can be sold on AcctBazaar. So, make sure all the information you give is right.</p>
            </div>
    } else if (userGuide === 8) {
        content =
            <div className='text-center space-y-4 px-6'>
                <div className='w-fit mx-auto'>
                    <Image src={'/assets/account/name.png'} width={400} height={90} className="w-[380px] h-[96] object-contain" alt="user guide image" />
                </div>
                <p>When uploading gift cards, you may use the gift card code as the username and the expiry date, if applicable, or a repetition of the code as the password. Additionally, please include the image if it&apos;s a physical card or input any other relevant information about the card if it&apos;s an e-code. Don&apos;t forget to specify the country of the card during the upload process.</p>
            </div>
    }

    return (
        <>
            <AppModal
                closeable={false}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            >
                <div className='md:w-[500px]'>
                    {/* this is top section of the div  */}
                    <div className=' flex items-center justify-between'>
                        <div className=''>
                            <h1 className="title">Upload Guide</h1>
                            <p className="text-textGrey text-xs md:text-sm font-normal w-fit">This guide helps you upload accounts better</p>
                        </div>
                        <button className="font-medium text-textBlack underline text-base" onClick={handleSkipModal}>Skip</button>
                    </div>
                    {/* this is body section  */}
                    <div className='py-6'>
                        {content}
                    </div>
                    {/* this is footer section  */}
                    <div className='flex items-center justify-between'>
                        {userGuide > 1 &&
                            <button onClick={() => handleUserGuide("prev")} className="appOutlineBtn">Previous</button>
                        }
                        <h4>{userGuide}/8</h4>
                        <button onClick={() => handleUserGuide("next")} className="appBtn">{userGuide === 8 ? "Proceed" : "Next"}</button>
                    </div>
                </div>
            </AppModal>

            {/* this is make payment div  */}
            <div className='bg-white rounded-2xl w-full min-h-[60vh] md:min-h-[80dvh] flex items-center justify-center flex-col'>
                <h3 className="text-xl md:text-3xl font-bold">Make Payment</h3>
                <div className='py-6 space-y-6 md:w-2/5 mx-auto'>
                    <div onClick={() => setSelectedOption("bank")} className={`flex gap-5 p-4 md:p-6 border  rounded-lg hover:bg-primary/5 cursor-pointer ${selectedOption === "bank" ? "border-primary" : "border-[#C5C5C5]"}`}>
                        <Image width={32} height={32} className="size-8" src={"/assets/icons/card-receive.png"} alt="bank payment" />
                        <div className='space-y-1'>
                            <h3 className="text-textBlack font-bold">Bank / Card payment</h3>
                            <p className="text-sm text-textGrey">Make deposit using either your card or transfer to our local bank</p>
                        </div>
                    </div>

                    <div onClick={() => setSelectedOption("crypto")} className={`flex gap-5 p-4 md:p-6 border  rounded-lg hover:bg-primary/5 cursor-pointer ${selectedOption === "crypto" ? "border-primary" : "border-[#C5C5C5]"}`}>
                        <Image width={32} height={32} className="size-8" src={"/assets/icons/doller-recive.png"} alt="bank payment" />
                        <div className='space-y-1'>
                            <h3 className="text-textBlack font-bold">Crypto</h3>
                            <p className="text-sm text-textGrey">Make payment using any of the crypto exchange platform to deposit to an address</p>
                        </div>
                    </div>
                </div>
                {(isLoading || isPayStackLoading) ?
                    <button className="appBtn px-10 flex items-center justify-center"><AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" /></button>
                    :
                    <button onClick={handlePayment} className="appBtn">Pay $10 (₦14,500)</button>
                }
            </div>
        </>
    );
};
