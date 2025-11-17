import React, { useState, useEffect, useRef } from "react";

import Lightbox from "yet-another-react-lightbox";
import { Fullscreen, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { ImageGallery } from "../Types/ImageGallery";

import galleryBg from "../assets/img/gallery-bg.jpg";
import LetterReveal from "./LetterReveal";
import { Reveal } from "./Reveal";

type GalleryProps = {
    images: ImageGallery[];
};

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const bgRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {  
        gsap.registerPlugin(ScrollTrigger);     
        gsap.fromTo(bgRef.current, 
        {
            backgroundPositionY: '80%',
        },
        {
            backgroundPositionY: '20%',
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: bgRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }, []);

    const lightboxImages = images.map((slide) => ({
        src: `/copacabana/content/gallery/${slide.img}`,
    }));

    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    return (
        <section
            className="relative pt-30 md:pt-40 pb-10 xl:pb-20 max-[430px]:bg-[length:auto_120%] max-[570px]:bg-[length:200%] sm:bg-[length:170%] lg:bg-[length:120%] bg-[60%] 2xl:bg-[length:100%] flex after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/60 after:to-neutral-300/0"
            ref={bgRef}
            style={{
                backgroundImage: `url(${galleryBg})`
            }}
        >
            <div className="absolute inset-0 top-[85%] sm:top-[73%] bg-white z-[1]" />
            <div className="relative container max-w-large z-[1]">
                <div className="pt-16 sm:pt-24 2xl:pt-40 pb-16 sm:pb-30 md:pb-40 2xl:pb-50">
                    <LetterReveal text="Em cada detalhe, um traço de brasilidade:" className="text-white sm:text-2xl xl:text-3xl text-center font-medium" element="h2" />
                    <LetterReveal text="essa é a essência da Linha Copacabana." className="text-white sm:text-2xl xl:text-3xl text-center" element="h2" />
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 xl:gap-14 max-sm:mx-10">
                    {images.map((slide, index) => (
                        <div
                            key={index}
                            className="relative group cursor-pointer"
                            onClick={() => handleImageClick(index)}
                        >
                            <Reveal className="overflow-hidden rounded-[2rem]" direction="top" delay={index} reverse={true} scale={true}>
                                <img
                                    src={`/copacabana/content/gallery/${slide.img}`}
                                    alt={`Imagem 0${index + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />

                                <div className="absolute inset-0 bg-black opacity-0 transition-all duration-300 group-hover:opacity-50" />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 z-10">
                                    <div className="bg-white bg-opacity-80 rounded-full p-3 shadow-lg">
                                        <svg
                                            className="w-6 h-6 stroke-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 5v14m-7-7h14"
                                            />
                                            </svg>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    ))}
                </div>
            </div>

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={currentImageIndex}
                slides={lightboxImages}
                plugins={[Fullscreen, Thumbnails, Zoom]}
                thumbnails={{
                    position: "bottom",
                    height: 80,
                    border: 0,
                    borderRadius: 0,
                    padding: 4,
                    gap: 16,
                }}
                zoom={{
                    maxZoomPixelRatio: 3,
                    zoomInMultiplier: 2,
                    doubleTapDelay: 300,
                    doubleClickDelay: 300,
                    doubleClickMaxStops: 2,
                    keyboardMoveDistance: 50,
                    wheelZoomDistanceFactor: 100,
                    pinchZoomDistanceFactor: 100,
                }}
                styles={{
                    thumbnail: {
                        width: "auto"
                    }
                }}
                className="[&_.yarl__thumbnails_thumbnail]:w-auto [&_.yarl__thumbnails_thumbnail]:transition-all [&_.yarl__thumbnails_thumbnail:hover]:opacity-70 [&_.yarl__thumbnails_thumbnail_active]:ring-2 [&_.yarl__thumbnails_thumbnail_active]:ring-neutral-600"
            />
        </section>
    );
};
