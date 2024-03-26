import Image from "next/image";
import AppModal from "../ui/AppModal";
import AppInput from "../ui/AppInput";
import { PiCurrencyDollarBold } from "react-icons/pi";

export default function AddMoneyModal() {
    return (
        <AppModal
            button={
                <div className='flex items-center justify-center flex-col space-y-2'>
                    <Image width={60} height={60} src="/assets/icons/add.png" alt="" className="size-14 rounded-lg border border-[#E6E0E0] hover:bg-[#FFCAAD]/15 cursor-pointer" />
                    <h4>Add Money</h4>
                </div>
            }
            title="Fund your wallet"
            subTitle="Fund your wallet with any of these two channels"
        >
            <div className='space-y-4 pt-4 md:w-[520px]'>
                <AppInput icon={<PiCurrencyDollarBold />} type="number" placeholder="Enter Amount" value={""} />
                <div className='flex gap-5 p-4 border border-[#C5C5C5] rounded-lg'>
                    <Image width={32} height={32} className="size-8" src={"/assets/icons/card-receive.png"} alt="bank payment" />
                    <div className='space-y-1'>
                        <h3 className="text-textBlack font-bold">Bank / Card payment</h3>
                        <p className="text-sm text-textGrey">Make deposit using either your card or transfer to our local bank</p>
                    </div>
                </div>

                <div className='flex gap-5 p-4 border border-[#C5C5C5] rounded-lg'>
                    <Image width={32} height={32} className="size-8" src={"/assets/icons/doller-recive.png"} alt="bank payment" />
                    <div className='space-y-1'>
                        <h3 className="text-textBlack font-bold">Crypto</h3>
                        <p className="text-sm text-textGrey">Make payment using any of the crypto exchange platform to deposit to an address</p>
                    </div>
                </div>
            </div>
        </AppModal>
    );
};
