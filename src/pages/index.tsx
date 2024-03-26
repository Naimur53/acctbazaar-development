import AccountReel from "@/components/AccountReel/AccountReel";
import AccountMarketplace from "@/components/home/AccountMarketplace";
import BannerHome from "@/components/home/BannerHome";
import BecomeSeller from "@/components/home/BecomeSeller";
import Features from "@/components/home/Features";
import FilterAndFindAccountSection from "@/components/home/FilterAndFindAccountSection";
import HowItWorks from "@/components/home/HowItWorks";
import ReadyToStart from "@/components/home/ReadyToStart";
import TestimonialHome from "@/components/home/TestimonialHome";
import WhyChoose from "@/components/home/WhyChoose";
import HomeLayout from "@/layout/HomeLayout";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { AccountType, UserRole } from "@/types/common";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const router = useRouter()

  useEffect(() => {
    if (user?.role === UserRole.Seller) {
      if (user.isApprovedForSeller === false) {
        dispatch(userLoggedOut());
      }
    }
    if (user?.id) {
      router.push("/marketplace")
    }
  }, [user, dispatch, router]);

  useEffect(() => {
    AOS.init();
  }, [])

  const readySection = {
    title: "Ready to Start Your Journey?",
    details:
      "Explore our marketplace now and unlock a world of genuine treasures. Join Acctbazaar today and experience a new way to buy and connect.",
    buttonText: "Explore marketplace",
    linkSrc: "/signIn",
  };

  return (
    <HomeLayout>
      {!user?.id &&
        <div className="overflow-hidden">
          {/* <HomeBanner /> */}
          <BannerHome />
          <AccountMarketplace />
          <Features />
          <HowItWorks />
          <BecomeSeller />
          <WhyChoose />
          <TestimonialHome />
          <ReadyToStart readySection={readySection} />
        </div>
        // : (
        //   <div className="container">
        //     <div className="w-full">
        //       <FilterAndFindAccountSection></FilterAndFindAccountSection>
        //     </div>
        //     <div className="w-full mt-10">
        //       <AccountReel
        //         accountType={AccountType.SocialMedia}
        //         title="Social Media  "
        //       ></AccountReel>
        //     </div>
        //     <div className="w-full mt-20">
        //       <AccountReel
        //         accountType={AccountType.Game}
        //         title="Games"
        //       ></AccountReel>
        //     </div>
        //     <div className="w-full mt-20">
        //       <AccountReel
        //         accountType={AccountType.Email}
        //         title="Email Account "
        //       ></AccountReel>
        //     </div>
        //     <div className="w-full mt-20">
        //       <AccountReel
        //         accountType={AccountType.Vpn}
        //         title="Vpn Account "
        //       ></AccountReel>
        //     </div>
        //   </div>
        // )
      }
    </HomeLayout>
  );
}
