const Loader = () => {
    return (
        <div className="flex items-center justify-center bg-transparent">
            <div className="flex gap-2">
                <div
                    className="w-4 h-4 rounded-full animate-bounce"
                    style={{backgroundColor: "#1a2331", animationDelay: "0s"}}
                ></div>
                <div
                    className="w-4 h-4 rounded-full animate-bounce"
                    style={{backgroundColor: "#1a2331", animationDelay: "0.1s"}}
                ></div>
                <div
                    className="w-4 h-4 rounded-full animate-bounce"
                    style={{backgroundColor: "#1a2331", animationDelay: "0.2s"}}
                ></div>
            </div>
        </div>
    );
};

export default Loader;
