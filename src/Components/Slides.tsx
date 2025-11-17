import React, { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import { Fullscreen, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { SlidesHorizontalLoop } from "./SlidesHorizontalLoop";

import type { ImageHighlight } from "../Types/ImageHighlight";

import bgPattern from '../assets/img/bg-pattern.jpg';

type SlidesProps = {
    slides: ImageHighlight[];
};

export const Slides: React.FC<SlidesProps> = ({ slides }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const lightboxSlides = slides.map((slide) => ({
        src: `/copacabana/content/highlights/${slide.img}`,
        alt: slide.ambiente || "",
    }));

    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    return (
        <section
            id="ambientes"
            className="animate-bg-up scroll-mt-16 -mb-30"
            style={{
                backgroundImage: `url(${bgPattern})`,
            }}
        >
            <SlidesHorizontalLoop
                images={slides}
                direction="right"
                onImageClick={(index) => handleImageClick(index)}
            />

            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
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
                slides={lightboxSlides}
                index={currentImageIndex}
                className="[&_.yarl__thumbnails_thumbnail]:transition-all [&_.yarl__thumbnails_thumbnail:hover]:opacity-70 [&_.yarl__thumbnails_thumbnail_active]:ring-2 [&_.yarl__thumbnails_thumbnail_active]:ring-neutral-600"
            />
        </section>
    );
};
