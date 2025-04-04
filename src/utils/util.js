export const config = {
    LIVE_URL: import.meta.env.VITE_APP_LIVE_URL ?? "",
    
    BASE_URL: import.meta.env.VITE_APP_BASE_URL ?? "",
    SECRET_KEY: import.meta.env.VITE_APP_SECRET_KEY ?? "",
    POWERED_BY_URL: "https://yashworldproducts.com/",
    POWERED_BY_NAME: "yashworld products private limited",
    GOOGLE_ADDRESS_KEY: import.meta.env.VITE_APP_GOOGLE_ADDRESS_KEY,
    AUTHENTICATOR: {
        IOS_APP_URL: "https://apps.apple.com/us/app/google-authenticator/id388497605",
        ANDRIOD_APP_URL:
            "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US",
    },
};

export const NAVBAR = {
    DASHBOARD_NAVBAR_WIDTH: 280,
    DASHBOARD_COLLAPSE_NAVBAR_WIDTH: 88,
    DASHBOARD_ROOT_NAVBAR_ITEM_HEIGHT: 48,
    DASHBOARD_NAVBAR_SUB_ITEM_HEIGHT: 40,
};

// export const firebaseConfig = {
//     APIKEY: import.meta.env.VITE_APP_FIREBASE_API_KEY,
//     AUTHDOMAIN: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
//     PROJECTID: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
//     STORAGEBUCKET: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
//     MESSAGINGSENDERID: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
//     APPID: import.meta.env.VITE_APP_FIREBASE_APPID,
//     MEASUREMENTID: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
// };
