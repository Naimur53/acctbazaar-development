import "react-phone-input-2/lib/material.css";
import AppFormDatePicker from "../ui/AppFormDatePicker";
import AppFormSelect from "../ui/AppFormSelect";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import AppFormInput from "../ui/AppFormInput";
import { useAppSelector } from "@/redux/hook";
import { useEditUserMutation, useUploadImageMutation } from "@/redux/features/user/userApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ResponseErrorType } from "@/types/common";
import { toast } from "react-toastify";
import AppSmallLoading from "../ui/AppSmallLoading";
import { useState } from "react";
import getDaysRemaining from "@/utils/getDaysRemaining";
import { City, Country, ICountry, State } from "country-state-city";

interface FormData {
    name: string;
    email: string;
    address: string;
    state: string;
    stateCode: string;
    country: string;
    countryCode: string;
    city: string;
    dateOfBirth: string;
    phoneNumber: string;
};

const AccountSettingProfile = () => {
    const [loading, setLoading] = useState(false);

    const user = useAppSelector(state => state.user.user);
    const daysLeft = getDaysRemaining(user?.updatedAt as string);
    const readOnly = daysLeft === 0 ? false : true;
    const countries = Country.getAllCountries();
    const [editUser, { isLoading }] = useEditUserMutation();
    const [uploadImage, { isLoading: imageLoading }] = useUploadImageMutation();
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            state: user?.state,
            country: user?.country,
            address: user?.address,
            city: user?.city,
            dateOfBirth: user?.dateOfBirth,
        }
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const countryObj = Country.getCountryByCode(data.country);
        const stateObj = State.getStateByCodeAndCountry(data.country, data.state);
        // console.log(data);
        const submittedData = {
            id: user?.id, ...data,
            country: countryObj?.name,
            state: stateObj?.name,
            name: readOnly ? undefined : data.name
        }
        // console.log(submittedData);

        await editUser(submittedData).unwrap().then((res: ResponseErrorType) => {
            if (!res.data?.success) {
                toast.error(res?.data?.message || "Something went wrong");
            }
            toast.success("Password changed successfully!", { toastId: 1 });

        }).catch((res: ResponseErrorType) => {
            if (!res.data?.success) {
                toast.error(res?.data?.message || "Something went wrong");
            }
        });
    };


    const handleFileUpload = async (value: any) => {
        setLoading(true);
        const formData = new FormData();
        const maxSizeInBytes = 2 * 1024 * 1024;

        if (value.size && value.size > maxSizeInBytes) {
            setLoading(false)
            return toast.error("Your file was more than 2 Megabyte!", { toastId: 1 });
        }

        formData.append('image', value);
        await uploadImage(formData).unwrap().then((res: ResponseErrorType) => {
            // console.log(res);
            if (!res.data.success) {
                toast.error(res?.data?.message || "Something went wrong");
                setLoading(false)
            }
            editUser({ id: user?.id, profileImg: res?.data.url }).unwrap().then((res: ResponseErrorType) => {
                if (!res.data?.success) {
                    toast.error(res?.data?.message || "Something went wrong");
                }
                toast.success("Image changed successfully!", { toastId: 1 });
                setLoading(false)
            }).catch((res: ResponseErrorType) => {
                if (!res.data?.success) {
                    toast.error(res?.data?.message || "Something went wrong");
                }
            });
        }).catch((res: ResponseErrorType) => {
            if (!res?.data?.success) {
                toast.error(res?.data?.message || "Something went wrong");
                setLoading(false)
            }
        })
    };

    const countryOptions = countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
    }));


    const stateOptions = watch("country") && State.getStatesOfCountry(watch("countryCode")).map((state) => ({
        value: state.name,
        label: state.name,
    }));

    const cityOptions = (watch("country") && watch("stateCode")) && City.getCitiesOfState(watch("country"), watch("stateCode")).map((city) => ({
        value: city.name,
        label: city.name,
    }));

    return (
        <form
            className="w-full md:py-4 2xl:py-5 space-y-4 lg:space-y-5 2xl:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='flex flex-col md:flex-row justify-between gap-3'>
                {/* this is left side text  */}
                <div className='text-textBlueBlack space-y-1'>
                    <h3 className="font-semibold">Personal Information</h3>
                    <p className="text-textGrey text-sm">Make adjustments to your personal <br /> information and save them.</p>
                </div>

                {/* this is right side text  */}
                <div className='w-full md:w-[40%] space-y-3'>
                    <div className=''>
                        <AppFormInput
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Type your name here"
                            register={register}
                            error={errors?.name}
                            defaultValue={user?.name}
                            readOnly={readOnly}
                        />
                        {readOnly &&
                            <p className="text-xs text-zinc-400">You can update your name after {daysLeft} days</p>
                        }
                    </div>

                    <AppFormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Type your email here"
                        register={register}
                        error={errors?.email}
                        defaultValue={user?.email}
                        readOnly={true}
                    />
                    <Controller
                        name="phoneNumber"
                        rules={{
                            required: true,
                        }}
                        control={control}
                        defaultValue={user?.phoneNumber}
                        render={({
                            field: { name, onBlur, onChange, ref, value },
                        }) => (
                            <PhoneInput
                                value={value}
                                // enableAreaCodes={true}
                                specialLabel={""}
                                inputClass="h-11 2xl:h-12 !w-full focus:!border-2 focus-visible:!ring-0 focus:!outline-none focus:!border-primary hover:!border-[#D0D2D5]"
                                country={"ng"}
                                placeholder="Phone Number"
                                inputProps={{
                                    name,
                                    onBlur,
                                    ref,
                                    onChange,
                                }}
                            />
                        )}
                    />
                    {/* <FormInputNumber name="phone"/> */}
                    {errors.phoneNumber && (
                        <span className="text-xs tracking-wide text-red">
                            Phone number field is required
                        </span>
                    )}
                </div>
            </div>

            <div className='border border-[#F2F4F7]'></div>

            <div className='flex flex-col md:flex-row gap-3 justify-between'>
                {/* this is left side text  */}
                <div className='text-textBlueBlack space-y-1'>
                    <h3 className="font-semibold">Avatar</h3>
                    <p className="text-zinc-400 text-sm">Select a nice picture of yourself.</p>
                </div>
                {/* this is right side text  */}
                <div className='w-full md:w-[40%] flex items-center justify-between gap-4'>
                    <img className="size-20 rounded-full object-cover" src={user?.profileImg as string} alt="" />
                    <div className=''>
                        <input onChange={(e) => handleFileUpload(e.target.files && e.target.files[0])} type="file" name="" id="file" className="hidden" />
                        <div className={`border border-borderColor rounded border-dashed ${loading && "h-20 w-56"}`}>
                            {
                                loading ? <AppSmallLoading /> :
                                    <label htmlFor="file" className='cursor-pointer border border-borderColor rounded hover:bg-gray-100 border-dashed py-3 px-3 flex items-center justify-center text-center gap-2 flex-col'>
                                        <Image width={30} height={30} className="rounded-full object-cover" src="/assets/icons/gallry.png" alt="" />
                                        <h2 className="text-[#7D7878] text-xs font-light"><span className="font-medium text-gray-700">Click to replace</span> or drag and drop <br />SVG, PNG, JPG or GIF (max 800 x 400px)</h2>
                                    </label>
                            }
                        </div>
                        {readOnly &&
                            <p className="text-xs text-textGrey">You can update your image after {daysLeft} days</p>
                        }

                    </div>
                </div>
            </div>

            <div className='border border-[#F2F4F7]'></div>

            <div className='flex flex-col md:flex-row gap-3 justify-between'>
                {/* this is left side text  */}
                <div className='text-textBlueBlack space-y-1'>
                    <h3 className="font-semibold">Additional Information</h3>
                    <p className="text-textGrey text-sm">Verify your Identity</p>
                </div>

                {/* this is right side text  */}
                <div className='w-full md:w-[40%] space-y-3'>
                    <div className='grid grid-cols-2 gap-2'>
                        <AppFormSelect
                            control={control}
                            placeholder="Country of residence"
                            name="country"
                            required={true}
                            options={countryOptions}
                        />
                        <div className="hidden">

                            <AppFormSelect
                                control={control}
                                placeholder="Country of residence"
                                name="countryCode"
                                required={true}
                                options={countryOptions}
                            />
                        </div>

                        <div className="hidden">
                            <AppFormSelect
                                control={control}
                                placeholder="Select State"
                                name="stateCode"

                                required={true}
                                options={stateOptions ? stateOptions : []}
                            />
                        </div>
                        <AppFormSelect
                            control={control}
                            placeholder="Select State"
                            name="state"
                            required={true}
                            options={stateOptions ? stateOptions : []}
                        />
                    </div>
                    <AppFormSelect
                        control={control}
                        placeholder="Select City"
                        name="city"
                        required={true}
                        options={cityOptions ? cityOptions : []}
                    />
                    <AppFormInput
                        label="User address"
                        name="address"
                        type="text"
                        placeholder="Type your address here"
                        required
                        register={register}
                        error={errors?.address}
                    />
                    <AppFormDatePicker
                        control={control}
                        name="dateOfBirth"
                        placeholder="Date of birth (DD/MM/YY)"
                    />
                </div>
            </div>
            <div className='border border-[#F2F4F7]'></div>

            <div className='flex items-center justify-end'>
                {isLoading ?
                    <button className="appBtn px-10"><AiOutlineLoading3Quarters className="animate-spin text-white text-xl" /></button>
                    :
                    <button type="submit" className="appBtn">Save & Proceed</button>
                }
            </div>
        </form>
    );
};

export default AccountSettingProfile;