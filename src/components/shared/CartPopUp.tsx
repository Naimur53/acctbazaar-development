import Image from "next/image";
import AppPopover from "../ui/AppPopover";
import Link from "next/link";

export default function CartPopUp() {
    const isProductHave = true
    const products: any[] = [
        { id: 1, label: "" },
        { id: 1, label: "" },
        { id: 1, label: "" },
        { id: 1, label: "" },
        { id: 1, label: "" },
        { id: 1, label: "" },
        { id: 1, label: "" },
    ]

    return (
        <AppPopover
            button={
                <div className='relative cursor-pointer'>
                    <Image width={32} height={32} className="size-5 md:size-6 object-contain" src={'/assets/icons/shopping-cart.png'} alt="country icon" />
                    {isProductHave &&
                        <span className="size-2 md:size-3 2xl:size-3.5 rounded-full bg-primary text-white font-medium text-[5px] md:text-[8px] 2xl:text-[10px] flex items-center justify-center text-center absolute top-0 md:-top-0.5 -right-0.5">10</span>
                    }
                </div>
            }>
            {/* this is main component  */}
            <div className='divide-y max-w-80'>
                {products.length > 0 ?
                    products?.slice(0, 4)?.map((product, index) => (
                        <div key={product?.id} className={`relative border-l pl-2.5 ml-0.5 ${index > 0 && "pt-2"}`}>
                            <p className="size-2 rounded-full bg-primary shadow absolute top-1 -left-1" />
                            <h4 className="capitalize flex items-center gap-2 justify-between"><span>First order</span>  <span className="text-xs text-[#828D99]">5 min ago</span></h4>
                            <p className="textG text-[#828D99]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, necessitatibus?</p>
                            <p className="py-2">
                                <Link href={""} className="text-primary hover:text-primary text-sm">View order</Link>
                            </p>
                        </div>
                    )) :
                    <div className='p-4 text-[#828D99] flex items-center justify-center flex-col gap-2'>
                        <Image width={80} height={80} className="size-20 object-contain" src={'/assets/icons/empty-cart.png'} alt="country icon" />
                        Shopping cart is empty
                    </div>
                }
            </div>
        </AppPopover>
    );
};
