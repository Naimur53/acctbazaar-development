import { AccountCategory } from "@/types/common";

interface IProduct_Category {
  label: string;
  value: AccountCategory;
  imageUrl: string;
}

export const GiftCardCategories: IProduct_Category[] = [
  {
    label: "Amazon Gift Card",
    value: AccountCategory.AmazonGiftCard,
    imageUrl: "/assets/amazon-giftcard.png",
  },
  {
    label: "Amex Gift Card",
    value: AccountCategory.AmexGiftCard,
    imageUrl: "/assets/amex-giftcard.png",
  },
  {
    label: "Ebay Gift Card",
    value: AccountCategory.EbayGiftCard,
    imageUrl: "/assets/ebay-giftcard.png",
  },
  {
    label: "Google Play Gift Card",
    value: AccountCategory.GooglePlayGiftCard,
    imageUrl: "/assets/googlepay-giftcard.png",
  },
  {
    label: "Nike Gift Card",
    value: AccountCategory.NikeGiftCard,
    imageUrl: "/assets/nike-giftcard.png",
  },
  {
    label: "NordStrom  Gift Card",
    value: AccountCategory.NordStromGiftCard,
    imageUrl: "/assets/nordstorm-giftcard.png",
  },
  {
    label: "Playstation Gift Card",
    value: AccountCategory.PlaystationGiftCard,
    imageUrl: "/assets/playstation-giftcard.png",
  },
  {
    label: "Sephora Gift Card",
    value: AccountCategory.SephoraGiftCard,
    imageUrl: "/assets/sephora-giftcard.png",
  },
  {
    label: "Steam Gift Card",
    value: AccountCategory.SteamGiftCard,
    imageUrl: "/assets/steam-giftcard.png",
  },
];
export const ACCOUNT_CATEGORIES: IProduct_Category[] = [
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
    label: "Instagram",
    value: AccountCategory.Instagram,
    imageUrl: "/assets/instagram.png",
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
    label: "Google voice",
    value: AccountCategory.GoogleVoice,
    imageUrl: "/assets/google-voice.png",
  },
  {
    label: "Threads",
    value: AccountCategory.Threads,
    imageUrl: "/assets/threads.png",
  },
  {
    label: "Telegram",
    value: AccountCategory.Telegram,
    imageUrl: "/assets/telegram.png",
  },
  {
    label: "Whatsapp",
    value: AccountCategory.Whatsapp,
    imageUrl: "/assets/whatsapp.png",
  },
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
    label: "Hotmail",
    value: AccountCategory.Hotmail,
    imageUrl: "/assets/hotmail.jpg",
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

  {
    label: "Netflix",
    value: AccountCategory.Netflix,
    imageUrl: "/assets/netflix.png",
  },
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
  {
    label: "Other",
    value: AccountCategory.Other,
    imageUrl: "/assets/other.png",
  },
  // new added git card
  ...GiftCardCategories,
];

export function findImageUrlByCategory(categoryName: AccountCategory): string {
  console.log({ categoryName });
  return (
    ACCOUNT_CATEGORIES.find((single) => single.value === categoryName)
      ?.imageUrl || ""
  );
}
