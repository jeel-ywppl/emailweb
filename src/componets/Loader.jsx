const Loader = () => {
    const letters = ["I", "N", "N", "V", "O", "X", "X"];

    return (
        <div className="flex items-center justify-center bg-transparent">
            <div className="flex gap-2">
                {letters.map((char, index) => (
                    <div
                        key={index}
                        className="w-5 h-5 font-Special_Gothic_Expanded_One text-2xl font-bold animate-bounce-custom"
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            animationDuration: "1s",
                            animationIterationCount: "infinite",
                        }}
                    >
                        {char}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Loader;
