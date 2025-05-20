export const BUTTONS = {
    base: "rounded-md px-4 py-2 font-semibold uppercase text-sm transition-all duration-300 shadow-sm focus:outline-none",
    primary:
        "bg-[#1d2634] text-white hover:shadow-md hover:shadow-[#1d2634] focus:ring-2 focus:ring-[#1d2634] focus:ring-offset-2",
    secondary:
        "bg-[#4b5563] text-white hover:bg-[#6b7280] hover:shadow-md hover:shadow-[#4b5563] focus:ring-2 focus:ring-[#4b5563] focus:ring-offset-2",
    blue: "bg-[#3B82F6] text-white hover:bg-[#2563EB] hover:shadow-md hover:shadow-[#3B82F6] focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2",
    gray: "bg-[#9CA3AF] text-white hover:bg-[#6B7280] hover:shadow-md hover:shadow-[#9CA3AF] focus:ring-2 focus:ring-[#6B7280] focus:ring-offset-2",
    red: "bg-[#EF4444] text-white hover:bg-[#DC2626] hover:shadow-md hover:shadow-[#EF4444] focus:ring-2 focus:ring-[#DC2626] focus:ring-offset-2",
    green: "bg-[#10B981] text-white hover:bg-[#059669] hover:shadow-md hover:shadow-[#10B981] focus:ring-2 focus:ring-[#059669] focus:ring-offset-2",
    orange: "bg-[#F97316] text-white hover:bg-[#EA580C] hover:shadow-md hover:shadow-[#F97316] focus:ring-2 focus:ring-[#EA580C] focus:ring-offset-2",
    pink: "bg-[#FC46AA] text-white hover:bg-[#F26B8A] hover:shadow-md hover:shadow-[#FEC5E5] focus:ring-2 focus:ring-[#EA580C] focus:ring-offset-2",
    black: "bg-[#000000] text-white hover:bg-[#1F2937]",
    white: "bg-[#ffffff] text-[#000000] hover:bg-[#f3f4f6]",
    midnight:
        "bg-[#24243d] text-white hover:shadow-md hover:shadow-[#24243d] focus:ring-2 focus:ring-[#24243d] focus:ring-offset-2",
    royal: "bg-[#547ec0] text-white hover:shadow-md hover:shadow-[#547ec0] focus:ring-2 focus:ring-[#547ec0] focus:ring-offset-2",
    indigo: "bg-[#2e2b63] text-white hover:shadow-md hover:shadow-[#2e2b63] focus:ring-2 focus:ring-[#2e2b63] focus:ring-offset-2",
    danger: "bg-[#DC2626] text-white hover:bg-[#B91C1C] hover:shadow-md hover:shadow-[#DC2626] focus:ring-2 focus:ring-[#B91C1C] focus:ring-offset-2",
    outlineBlue: "border border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10",
    outlineGray: "border border-[#9CA3AF] text-[#6B7280] hover:bg-[#F3F4F6]",
    outlineBlack: "border border-black text-black hover:bg-[#F3F4F6]",
    ghost: "bg-transparent text-[#6B7280] hover:text-black",
    ghostBlue: "bg-transparent text-[#3B82F6] hover:underline",
    action: "text-black",
};

export const textColorMap = {
    white: "text-gray-700",
    midnight: "text-[#b8bcd9]",
    indigo: "text-[#6b7ac8]",
    green: "text-green-600",
    orange: "text-orange-600",
    red: "text-red-600",
    pink: "text-pink-600",
};

export const cardHeaderColorMap = {
    white: "white",
    midnight: "",
    green: "green",
    orange: "orange",
    red: "red",
    pink: "pink",
    indigo: "indigo",
};

export const sidenavColors = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    midnight: "from-[#24243d] to-[#1a1a2e]",
    indigo: "from-[#547ec0] to-[#3c5ea8]",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
};

export const getBgColorClass = (color) => {
    const colorMap = {
        white: "bg-gray-100",
        midnight: "bg-[#24243d]",
        indigo: "bg-[#547ec0]",
        green: "bg-green-500",
        orange: "bg-orange-500",
        red: "bg-red-500",
        pink: "bg-pink-500",
    };

    return colorMap[color] || "bg-[#24243d]"; 
};
