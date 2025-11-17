import { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import bgHero from '../assets/img/hero-bg.jpg';
import bgPattern from '../assets/img/bg-pattern.jpg';
import lineLogo from '../assets/img/line-logo-white.png';
import copaLogo from '../assets/img/copacabana-logo-white.png';

import { Reveal } from './Reveal';

const HeroBanner: React.FC = () => {
    const bgRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {  
        gsap.registerPlugin(ScrollTrigger);     
        gsap.fromTo(bgRef.current, 
        {
            backgroundPositionY: '200%',
        },
        {
            backgroundPositionY: '0%',
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: bgRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.fromTo(textRef.current,
        {
            opacity: 0,
            y: 30,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: bgRef.current,
                start: 'top 80%',
            }
        });
    }, []);

    return (
        <section
            ref={bgRef}
            className="relative min-h-screen pt-32 sm:pt-40 2xl:pt-44 pb-16 max-[430px]:bg-[length:auto_120%] max-[570px]:bg-[length:200%] sm:bg-[length:200%] bg-[60%] xl:bg-[length:100%] flex after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/60 after:to-neutral-300/0"
            style={{
                backgroundImage: `url(${bgHero})`,
            }}
        >   
            <div className="relative container max-w-large z-[1]">
                <div className="min-h-[32rem] h-full bg-black flex flex-col md:flex-row">
                    <div
                        className="w-full md:w-1/4 md:max-w-[100px] h-auto md:h-full flex flex-row md:flex-col items-center justify-between px-7 sm:px-10 py-4 md:px-0 md:py-10 animate-bg-up"
                        style={{
                            backgroundImage: `url(${bgPattern})`,
                        }}
                    >
                        <p className="text-sm uppercase md:[writing-mode:vertical-rl] md:rotate-180 2xl:mt-2">
                            O jeito Copacabana
                        </p>
                        <p className="text-sm leading-tight md:[writing-mode:vertical-rl] md:rotate-180 mt-0">
                            22° 58' 15" S<br/>43° 10' 54" O
                        </p>
                    </div>

                    <div className="relative w-full h-full">
                        <video
                            className="block w-full h-full object-cover"
                            src="/copacabana/content/videos/video-banner.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />

                        <div className="absolute inset-0 bg-gradient-to-b from-white/0 from-[14%] to-black/70" />

                        <div className="absolute left-4 sm:left-8 md:left-20 bottom-12">
                            <Reveal direction="left">
                                <img src={lineLogo} alt="Linha" className="max-sm:h-8" />
                            </Reveal>
                            <Reveal direction="left" delay={2}>
                                <img src={copaLogo} alt="Copacabana" className="mt-4 sm:mt-6 max-sm:h-8" />
                            </Reveal>
                            <p ref={textRef} className="md:text-xl text-white max-w-60 mt-6 sm:mt-8">A beleza das curvas mais icônicas do Brasil.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;