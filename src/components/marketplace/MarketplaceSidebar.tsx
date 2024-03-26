import { getImageUrlByCategory } from "@/utils/getImageUrl";
import MarketPlaceSidebarFilterElement from "./MarketPlaceSidebarFilterElement";
import PriceRange from "./PriceRange";
import { AccountCategory } from "@/types/common";

const MarketplaceSidebar = () => {
  const sidebarMenu: any = [
    {
      imageUrl: "/assets/icons/like.png",
      label: "Social Media",
      children: [
        {
          label: "Instagram",
          value: AccountCategory.Instagram,
          imageUrl: "/assets/instagram.png",
        },
        {
          label: "Facebook",
          value: AccountCategory.Facebook,
          imageUrl: "/assets/facebook.png",
        },
        {
          label: "Twitter",
          value: AccountCategory.Twitter,
          imageUrl: "/assets/twitter.png",
        },

        {
          label: "LinkedIn",
          value: AccountCategory.LinkedIn,
          imageUrl: "/assets/linkedin.png",
        },
        {
          label: "Pinterest",
          value: AccountCategory.Pinterest,
          imageUrl: "/assets/pinterest.png",
        },
        {
          label: "Snapchat",
          value: AccountCategory.Snapchat,
          imageUrl: "/assets/snapchat.png",
        },
        {
          label: "TikTok",
          value: AccountCategory.TikTok,
          imageUrl: "/assets/tiktok.png",
        },
        {
          label: "YouTube",
          value: AccountCategory.YouTube,
          imageUrl: "/assets/youtube.png",
        },
        {
          label: "Threads",
          value: AccountCategory.Threads,
          imageUrl: "/assets/threads.png",
        },
      ],
    },
    {
      imageUrl: "/assets/icons/email.png",
      label: "Emails & Messaging Service ",
      children: [
        {
          label: "Google voice",
          value: AccountCategory.GoogleVoice,
          imageUrl: "/assets/google-voice.png",
        },
        {
          label: "Whatsapp",
          value: AccountCategory.Whatsapp,
          imageUrl: "/assets/whatsapp.png",
        },
        {
          label: "Telegram",
          value: AccountCategory.Telegram,
          imageUrl: "/assets/telegram.png",
        },
        {
          label: "Gmail",
          value: AccountCategory.Gmail,
          imageUrl: "/assets/gmail.png",
        },
        {
          label: "Ymail",
          value: AccountCategory.Ymail,
          imageUrl: "/assets/yahoo.png",
        },
        {
          label: "MailRu",
          value: AccountCategory.MailRu,
          imageUrl: "/assets/mailru.png",
        },
        {
          label: "Outlook",
          value: AccountCategory.Outlook,
          imageUrl: "/assets/outlook.png",
        },
        {
          label: "Hotmail",
          value: AccountCategory.Hotmail,
          imageUrl: "/assets/hotmail.jpg",
        },
      ],
    },
    {
      imageUrl: "/assets/icons/gift.png",
      label: "Giftcards",
      children: [
        {
          label: "Netflix",
          value: AccountCategory.Netflix,
          imageUrl: "/assets/netflix.png",
        },
        ,
        {
          label: "Apple",
          value: AccountCategory.Apple,
          imageUrl: "/assets/apple.png",
        },
        {
          label: "TrustWallet",
          value: AccountCategory.TrustWallet,
          imageUrl: "/assets/trust-wallet.png",
        },
        {
          label: "Amazon Prime Videos",
          value: AccountCategory.AmazonPrimeVideos,
          imageUrl: "/assets/prime_video.jpg",
        },
      ],
    },
    {
      imageUrl: "/assets/icons/internet.png",
      label: "VPN & PROXYs",
      children: [
        {
          label: "Windscribe",
          value: AccountCategory.Windscribe,
          imageUrl: "/assets/windscribe.png",
        },
        {
          label: "Nord",
          value: AccountCategory.Nord,
          imageUrl: "/assets/nord.png",
        },
        {
          label: "Vpn911",
          value: AccountCategory.Vpn911,
          imageUrl: "/assets/vpn_911.jpg",
        },
      ],
    },
    {
      imageUrl: "/assets/icons/ecart.png",
      label: "E-commerce Platforms",
      // children: [
      //     {
      //         label: "Playstation",
      //         value: AccountCategory.Playstation,
      //         imageUrl: "/assets/playstation.png",
      //     },
      // ]
    },
    {
      imageUrl: "/assets/icons/game.png",
      label: "Gaming",
      children: [
        {
          label: "Playstation",
          value: AccountCategory.Playstation,
          imageUrl: "/assets/playstation.png",
        },
        {
          label: "CallOfDuty",
          value: AccountCategory.CallOfDuty,
          imageUrl: "/assets/callofduty.png",
        },
        {
          label: "Pubg",
          value: AccountCategory.Pubg,
          imageUrl: "/assets/pubg.png",
        },
        {
          label: "Steam",
          value: AccountCategory.Steam,
          imageUrl: "/assets/steam.png",
        },
      ],
    },
    {
      imageUrl: "/assets/icons/others.png",
      label: "Others",
      children: [
        {
          label: "Other",
          value: AccountCategory.Other,
          imageUrl: "/assets/other.png",
        },
      ],
    },
  ];
  return (
    <div>
      <h2 className="font-bold text-textBlack py-4 px-6">Filter</h2>

      {/* this is account category div  */}
      <div className="">
        <h3 className="border-b border-b-[#E4E4E4] px-4 md:px-5 pb-2 md:pb4- text-textBlack font-medium">
          Account Category
        </h3>
        <div className="pt-2">
          {sidebarMenu.map((sidebar: any) => (
            <MarketPlaceSidebarFilterElement
              key={sidebar?.label}
              sidebar={sidebar}
            />
          ))}
        </div>
        {/* this is price range  */}
        <div className="mb-4 p-2 md:p-4 border-b border-b-[#E4E4E4]">
          <h4>Price range</h4>
          <PriceRange />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSidebar;
