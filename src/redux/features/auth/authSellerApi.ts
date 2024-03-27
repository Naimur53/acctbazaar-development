import { apiSlice } from "../apiSlice/apiSlice";
export const authSellerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    becomeSeller: builder.mutation({
      query: (info) => {
        return {
          url: `/auth/become-seller`,
          method: "POST",
          body: info,
        };
      },
    }),
  }),
});

export const { useBecomeSellerMutation } = authSellerApi;
