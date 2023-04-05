import React from "react";

export const useResponsiveSlider = (): number => {
    const calculateSlidesPerView = (innerWidth: number) => {
        if (typeof window === "undefined") return 5;
        const result = Math.round(innerWidth / 384);
        return result <= 5 ? result : 5;
    };
    const [slidesPerView, setSlidesPerView] = React.useState(
        typeof window !== "undefined" ? calculateSlidesPerView(window?.innerWidth) : 1920
    );

    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const listenResize = (e: UIEvent) => {
            const target = e?.currentTarget as typeof window;
            setSlidesPerView(calculateSlidesPerView(target?.innerWidth));
        };
        window.addEventListener("resize", listenResize);
        return () => {
            window.removeEventListener("resize", listenResize);
        };
    }, []);

    return slidesPerView;
};
