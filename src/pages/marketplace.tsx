import { SelectOptions } from "@/components/Forms/FormSelectField";
import MarketplaceAccountCard from "@/components/marketplace/MarketplaceAccountCard";
import MarketplaceSidebar from "@/components/marketplace/MarketplaceSidebar";
import PriceRange from "@/components/marketplace/PriceRange";
import AppInput from "@/components/ui/AppInput";
import AppRenderReduxData from "@/components/ui/AppRenderReduxData";
import useDebounce from "@/hooks/useDebounce";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetAccountsQuery } from "@/redux/features/account/accountApi";
import { useAppSelector } from "@/redux/hook";
import { IAccount } from "@/types/common";
import { useMemo, useState } from "react";

const Marketplace = () => {
  const [search, setSearch] = useState<string>("");
  const selectedCategories = useAppSelector(
    (state) => state.categories.selectedCategories
  );
  const { minPrice, maxPrice } = useAppSelector((state) => state.marketplace);
  console.log(minPrice, maxPrice);
  // const debouncedPrice = useDebounce([minPrice, maxPrice], 500);
  const minPriceDe = useDebounce(minPrice, 500);
  const maxPriceDe = useDebounce(maxPrice, 500);

  const debouncedSearch = useDebounce(search, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const queryString = useMemo(() => {
    const info = {
      category: selectedCategories.join("-"),
      // page,
      isSold: false,
      minPrice: minPriceDe,
      maxPrice: maxPriceDe,
      approvedForSale: "approved",
      limit: 50,
      searchTerm: debouncedSearch.length ? debouncedSearch : undefined,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      if (key === "isSold") {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${false}`;
      } else {
        const value = info[key as keyof typeof info];
        if (value) {
          return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
        }
      }
      return pre;
    }, "");
    return queryString;
  }, [selectedCategories, debouncedSearch, minPriceDe, maxPriceDe]);

  const queryData = useGetAccountsQuery(queryString);

  return (
    <HomeLayout>
      <PrivateLayout>
        <div className="container py-5 md:py-10 2xl:py-12">
          {/* this is top section div  */}
          <div className="flex flex-col md:flex-row justify-between gap-1">
            <div className="">
              <h2 className="title">Marketplace</h2>
              <p className="text-textGrey text-xs md:text-sm">
                Access all products on the marketplace by our verified sellers
              </p>
            </div>
            <div className="w-full md:w-1/4">
              <AppInput
                onChange={handleSearchChange}
                type="text"
                placeholder="Search by name or description"
                value={""}
              />
            </div>
          </div>

          {/* this is main div  */}
          <div className="flex gap-4 min-h-[80dvh] 2xl:gap-6 pt-2 md:pt-4 lg:pt-5 2xl:pt-6">
            <div className="hidden md:block md:w-[25%] h-full bg-white">
              <MarketplaceSidebar />
            </div>
            <div className="hidden md:block border border-[#E1DBDB]"></div>
            <div className="w-full md:w-[73%] max-h-[80dvh] overflow-y-auto bg-white p-2 md:p-4 2xl:p-6">
              <AppRenderReduxData
                queryData={queryData}
                showData={(data) => {
                  console.log(data);
                  return (
                    <>
                      {data.data.map((single: IAccount) => (
                        <MarketplaceAccountCard
                          account={single}
                          key={single.id}
                        />
                      ))}
                    </>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </PrivateLayout>
    </HomeLayout>
  );
};

export default Marketplace;
