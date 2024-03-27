import { SubmitHandler, useForm } from "react-hook-form";
import AppFormTextarea from "../ui/AppFormTextarea";
import AppFormSelect from "../ui/AppFormSelect";
import AppFormInput from "../ui/AppFormInput";
import { Dispatch, SetStateAction } from "react";
import { ACCOUNT_CATEGORIES } from "@/shared";
import { Avatar } from "antd";
import { AccountCategory } from "@/types/common";
import { useAppDispatch } from "@/redux/hook";
import { setAccountCard } from "@/redux/features/account/accountSlice";

interface FormData {
  category: AccountCategory;
  name: string;
  description: string;
  price: number;
}

type TAddSellAccount = {
  updateProgress: Dispatch<SetStateAction<number>>;
};

export default function AddSellAccount({ updateProgress }: TAddSellAccount) {
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    updateProgress(3);
    dispatch(setAccountCard(data));
  };

  const categoryOptions = ACCOUNT_CATEGORIES.map((single) => ({
    value: single?.value,
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src={single.imageUrl}></Avatar>
        <span>{single.label}</span>
      </div>
    ),
  }));

  return (
    <div className="bg-white rounded-2xl w-full min-h-[80vh] p-4 md:p-6 2xl:p-8">
      <h2 className="subTitle pt-2 2xl:pt-6 pb-6 2xl:pb-8 text-center">
        Add Account
      </h2>

      <form
        className="md:w-1/2 mx-auto space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="text-lg">Account Information</h4>
        <AppFormSelect
          control={control}
          placeholder="Select account category"
          name="category"
          label={"You can only select one account at a time"}
          required={true}
          options={categoryOptions}
        />
        <div className="">
          <AppFormInput
            label="Name"
            name="name"
            type="text"
            placeholder="Type your name here"
            register={register}
            required
            error={errors?.name}
          />
          <p className="textG font-normal">
            For e.g., 4 Years Facebook Account
          </p>
        </div>
        <AppFormTextarea
          label="Description"
          name="description"
          required
          register={register}
          error={errors?.description}
        />
        <AppFormInput
          label="Enter your price"
          name="price"
          type="number"
          required
          placeholder="Enter amount"
          register={register}
          error={errors?.name}
        />
        <div className="flex items-center justify-center">
          <button type="submit" className="appBtn px-10">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
