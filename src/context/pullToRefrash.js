import { useEffect } from 'react';

const usePullToRefresh = (onRefresh) => {
    useEffect(() => {
        const handleTouchStart = (event) => {
            if (event.touches.length > 0) {
                startY = event.touches[0].clientY;
            }
        };

        const handleTouchMove = (event) => {
            if (startY === null) return;

            const currentY = event.touches[0].clientY;
            const distanceY = currentY - startY;

            if (distanceY > 50) { 
                onRefresh();
                startY = null; 
            }
        };

        let startY = null;

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [onRefresh]);
};

export default usePullToRefresh;
