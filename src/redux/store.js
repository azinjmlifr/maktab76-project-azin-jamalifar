import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category/CategorySlice";
import orderslice from "./order/OrderSlice";
import productSlice from "./product/ProductSlice";
import subcategorySlice from "./subcategory/SubcategorySlice";
import usersSlice from "./user/UserSlice";

export default configureStore({
  reducer: {
    order: orderslice,
    product: productSlice,
    users: usersSlice,
    category: categorySlice,
    subcategory: subcategorySlice,
  },
});
