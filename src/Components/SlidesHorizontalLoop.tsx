import React, { useEffect } from "react";
import { gsap } from "gsap";
import type { ImageHighlight } from "../Types/ImageHighlight";

type SlidesHorizontalLoopProps = {
    images: ImageHighlight[];
    direction?: "left" | "right";
    onImageClick?: (index: number) => void;
};

export const SlidesHorizontalLoop: React.FC<SlidesHorizontalLoopProps> = ({
    images,
    direction = "right",
    // onImageClick,
}) => {
    const gallery = Array(2)
        .fill(null)
        .map(() => [...images]);

    useEffect(() => {
        const loop = horizontalLoop(`.gallery-${direction}`, {
            speed: 0.6,
            repeat: -1,
        });

        gsap.to(loop, {
            timeScale: direction === "right" ? 1 : -1,
            overwrite: true,
        });

        const setDirection = (value: number) => {
            if ((loop as any).direction !== value) {
                gsap.to(loop, {
                    timeScale: direction === "right" ? value : value * -1,
                    overwrite: true,
                });
                (loop as any).direction = value;
            }
        };

        const handleScroll = (e: WheelEvent) => {
            if (e.deltaY > 0) {
                setDirection(1);
            } else {
                setDirection(-1);
            }
        };

        window.addEventListener("wheel", handleScroll);

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, [direction]);

    function horizontalLoop(items: string | Element[] | NodeListOf<Element>, config: any) {
        const elements = gsap.utils.toArray(items) as HTMLElement[];
        config = config || {};

        const tl = gsap.timeline({
            repeat: config.repeat,
            paused: config.paused,
            defaults: { ease: "none" },
        } as gsap.TimelineVars) as gsap.core.Timeline;

        (tl as any).eventCallback("onReverseComplete", () => 
            tl.totalTime(tl.rawTime() + tl.duration() * 100)
        );

        const length = elements.length;
        const startX = elements[0].offsetLeft;

        const times: number[] = [];
        const widths: number[] = [];
        const xPercents: number[] = [];

        let curIndex = 0;
        const pixelsPerSecond = (config.speed || 1) * 100;
        const snap =
            config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1);

        let totalWidth = 0;

        gsap.set(elements, {
            xPercent: (i, el) => {
                const w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string));
                xPercents[i] = snap(
                    parseFloat(gsap.getProperty(el, "x", "px") as string) / w * 100 +
                        (gsap.getProperty(el, "xPercent") as number)
                );
                return xPercents[i];
            },
        });

        gsap.set(elements, { x: 0 });

        totalWidth =
            elements[length - 1].offsetLeft +
            (xPercents[length - 1] / 100) * widths[length - 1] -
            startX +
            elements[length - 1].offsetWidth * (gsap.getProperty(elements[length - 1], "scaleX") as number) +
            (parseFloat(config.paddingRight) || 0);

        elements.forEach((item, i) => {
            const curX = (xPercents[i] / 100) * widths[i];
            const distanceToStart = item.offsetLeft + curX - startX;
            const distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);

            tl.to(
                item,
                {
                    xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
                    duration: distanceToLoop / pixelsPerSecond,
                },
                0
            ).fromTo(
                item,
                {
                    xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
                },
                {
                    xPercent: xPercents[i],
                    duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                    immediateRender: false,
                },
                distanceToLoop / pixelsPerSecond
            );

            tl.add("label" + i, distanceToStart / pixelsPerSecond);
            times[i] = distanceToStart / pixelsPerSecond;
        });

        function toIndex(index: number, vars?: any) {
            vars = vars || {};
            if (Math.abs(index - curIndex) > length / 2) {
                index += index > curIndex ? -length : length;
            }

            const newIndex = gsap.utils.wrap(0, length, index);
            let time = times[newIndex];
            if ((time > tl.time()) !== (index > curIndex)) {
                vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                time += tl.duration() * (index > curIndex ? 1 : -1);
            }

            curIndex = newIndex;
            vars.overwrite = true;
            return tl.tweenTo(time, vars);
        }

        (tl as any).next = (vars?: any) => toIndex(curIndex + 1, vars);
        (tl as any).previous = (vars?: any) => toIndex(curIndex - 1, vars);
        (tl as any).current = () => curIndex;
        (tl as any).toIndex = (index: number, vars?: any) => toIndex(index, vars);
        (tl as any).times = times;

        tl.progress(1, true).progress(0, true);
        if (config.reversed) {
            tl.vars.onReverseComplete?.();
            tl.reverse();
        }

        return tl;
    }

    // const handleImageClick = (imageIndex: number) => {
    //     onImageClick?.(imageIndex);
    // };

    return (
        <div className="overflow-hidden relative z-[1]">
            <div className="flex w-max">
                {gallery.map((item, index) => (
                    <div key={index} className={`gallery-${direction} flex whitespace-nowrap`}>
                        {item.map((image, subIndex) => (
                            <div
                                key={subIndex}
                                className="mx-2 md:mx-3 2xl:mx-4 group overflow-hidden rounded-[2rem] relative"
                                // onClick={() => handleImageClick(subIndex)}
                            >
                                <img
                                    src={`/copacabana/content/highlights/${image.img}`}
                                    alt={image.ambiente || `Slide ${index + 1}`}
                                    className="h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] 2xl:h-[580px] object-cover"
                                />

                                {/* <div className="absolute inset-0 bg-black opacity-0 transition-all duration-300 group-hover:opacity-50" />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 z-10">
                                    <div className="bg-white bg-opacity-80 rounded-full p-3 shadow-lg">
                                        <svg
                                            className="w-6 h-6 text-gray-700"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                            />
                                        </svg>
                                    </div>
                                </div> */}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
