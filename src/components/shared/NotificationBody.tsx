import Link from "next/link";
import { IoNotificationsOffOutline } from "react-icons/io5";

export default function NotificationBody() {

    const notifications: any[] = [
        { id: 1, label: "" },
        { id: 1, label: "" },
        { id: 1, label: "" },
        { id: 1, label: "" },
        { id: 1, label: "" },
        { id: 1, label: "" },
        { id: 1, label: "" },
    ];

    return (
        <div className='divide-y w-full md:max-w-80 md:max-h-[50dvh] max-h-screen overflow-y-auto'>
            {notifications.length > 0 ?
                notifications?.map((notification, index) => (
                    <div key={notification?.id} className={`relative border-l pl-2.5 ml-0.5 ${index > 0 && "pt-2"}`}>
                        <p className="size-2 rounded-full bg-primary shadow absolute top-1 -left-1" />
                        <h4 className="capitalize flex items-center gap-2 justify-between"><span>First order</span>  <span className="text-xs text-[#828D99]">5 min ago</span></h4>
                        <p className="textG text-[#828D99]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, necessitatibus?</p>
                        <p className="py-2">
                            <Link href={""} className="text-primary hover:text-primary text-sm">View order</Link>
                        </p>
                    </div>
                )) :
                <div className='p-4 text-[#828D99] flex items-center justify-center flex-col gap-2'>
                    <IoNotificationsOffOutline className="text-3xl" />
                    No notification found
                </div>
            }
        </div>
    );
};
