import {Skeleton} from "@mui/material";

const UserDetailsLoading = () => {
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-10 w-24" />
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
                <Skeleton className="h-32 w-32 rounded-full" />
                <div className="space-y-3 flex-1">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-6 w-1/4" />
                </div>
            </div>

            <Skeleton className="h-10 w-full max-w-md mb-6" />

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                </div>
            </div>
        </div>
    );
};

export default UserDetailsLoading;
