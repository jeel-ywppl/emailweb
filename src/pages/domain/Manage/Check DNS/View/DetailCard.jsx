import {Card} from "@material-tailwind/react";

const DetailCard = ({icon: Icon, title, children, className = ""}) => {
    return (
        <Card className={`overflow-hidden border border-gray-100 rounded-xl ${className}`}>
            <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-100 flex items-center">
                {Icon && <Icon className="h-5 w-5 text-dns-purple mr-2" />} 
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>
            <div className="p-5">{children}</div>
        </Card>
    );
};

export default DetailCard;
