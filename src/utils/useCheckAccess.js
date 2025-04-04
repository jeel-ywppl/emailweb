import {useAppSelector} from "../store/index";

const useCheckAccess = () => {
    const userPermissions = useAppSelector((state) => state.auth.user.permissions);
    console.log("🍩 userPermissions", userPermissions);

    const checkAccess = (moduleName, action) => {
        console.log("sdnsbdhsbhdbshbdhshdbhsd", moduleName, action);
        if (!moduleName) {
            return false;
        }
        const module = userPermissions?.find((mod) => mod.model === moduleName);

        if (module && action in module) {
            return Boolean(module);
        }
    };

    return checkAccess;
};

export default useCheckAccess;
