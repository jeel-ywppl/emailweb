import {useAppSelector} from "../store/index";

const useCheckAccess = () => {
    const userPermissions = useAppSelector((state) => state.auth.user.permissions);

    const checkAccess = (moduleName, action) => {
        if (!moduleName) {
            return false;
        }
        const module = userPermissions?.find((mod) => mod.model === moduleName);

        if (module && action in module) {
            const hasPermission = module[action];
            return hasPermission;
        } else {
            return false;
        }
    };
    return checkAccess;
};

export default useCheckAccess;
