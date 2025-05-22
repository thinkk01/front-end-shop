import { ROUTE_CONFIG } from "./route";

export const VerticalItem = [
    {
        title: "Hệ thống",
        icon: "grommet-icons:system",
        children: [{
            title: "Người dùng",
            icon: "rivet-icons:user-group-solid",
            path: ROUTE_CONFIG.SYSTEM.USER,
        },
        {
            title: "Nhóm vai trò",
            icon: "icon-park-outline:permissions",
            path: ROUTE_CONFIG.SYSTEM.ROLE,
        },
],
    },
    {
        title: "Quản trị sản phẩm",
        icon: "eos-icons:product-classes-outlined",
        children: [
        {
            title: "Danh sách sản phẩm",
            icon: "icon-park-outline:ad-product",
            path: ROUTE_CONFIG.MANAGE_PRODUCT.PRODUCT,
        },
               {
            title: "Danh mục sản phẩm",
            icon: "material-symbols-light:category-outline",
            path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_TYPE_PRODUCT,
        },
        {
            title: "Danh sách đơn hàng",
            icon: "lets-icons:order-light",
            path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_ORDER
        },   
        {
            title: "Danh sách đánh giá",
            icon: "carbon:review",
            path: ROUTE_CONFIG.MANAGE_PRODUCT.MANAGE_REVIEW,
        }, 
        ],
    },
     {
        title: "Cài đặt",
        icon: "uil:setting",
        children: [
        {
            title: "Cài đặt thành phố",
            icon: "solar:city-outline",
            path: ROUTE_CONFIG.SETTINGS.CITY,
        },
               {
            title: "Cài đặt phương thức giao hàng",
            icon: "iconamoon:delivery-thin",
            path: ROUTE_CONFIG.SETTINGS.DELIVERY_TYPE,
        },
        {
            title: "Cài đặt phương thức thanh toán",
            icon: "fluent:payment-28-regular",
            path: ROUTE_CONFIG.SETTINGS.PAYMENT_TYPE,
        },
        ],
    }
];
export const DropdownUser =[
    { 
        title: "Profile",
        path:"/",
        icon: "uil:settin",
    },
    { 
        title: "Login",
        path:"/login",
        icon: "uil:settin",
    },
    { 
        title: "Logout",
        path:"/logout",
        icon: "uil:settin",
    },
    { 
        title: "Register",
        path:"/register",
        icon: "uil:settin",
    }
];