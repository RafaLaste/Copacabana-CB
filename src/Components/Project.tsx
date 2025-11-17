import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";

import lineLogo from "../assets/img/line-logo-dark.png";
import copaLogo from "../assets/img/copacabana-logo-dark.png";

gsap.registerPlugin(ScrollTrigger);

const Project: React.FC = () => {
    const btnRef = useRef<HTMLAnchorElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const btn = btnRef.current;
        const overlay = overlayRef.current;
        const text = textRef.current;

        if (!btn || !overlay || !text) return;

        gsap.set(overlay, { y: "0%" });
        gsap.set(text, { opacity: 0 });

        ScrollTrigger.create({
            trigger: btn,
            start: "top 55%",
            onEnter: () => {
                const tl = gsap.timeline();

                tl.to(overlay, {
                    y: "0%",
                    duration: 0.3,
                    ease: "power2.out",
                })
                .to(overlay, {
                    y: "100%",
                    duration: 0.4,
                })
                .to(text, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power1.out",
                }, "-=0.3");
            },
        });
    }, []);

    return (
        <section className="pt-10 md:pt-16 mb-20 md:pb-28 2xl:pb-36 bg-white">
            <div className="container max-w-large">
                <div className="flex gap-4 mb-8 sm:mb-12 2xl:mb-16 items-center justify-center">
                    <Reveal direction="left" reverse={true}>
                        <img src={lineLogo} alt="Linha" />
                    </Reveal>

                    <Reveal direction="left" delay={2} reverse={true}>
                        <img src={copaLogo} alt="Copacabana" />
                    </Reveal>
                </div>

                <Reveal
                    direction="top"
                    className="text-center max-w-4xl px-4 mx-auto mb-8 sm:mb-12 2xl:mb-16"
                    reverse={true}
                >
                    <p>
                        A Linha Copacabana é um tributo ao Rio de Janeiro, onde o design
                        encontra o mar, e cada curva expressa a leveza e a alegria de morar
                        com o jeito do Brasil.
                    </p>
                </Reveal>

                <div className="relative w-fit mx-auto overflow-hidden rounded-xl">
                    <a
                        ref={btnRef}
                        href="https://casabrasileiraplanejados.com.br/solicite-seu-projeto"
                        target="_blank"
                        className="relative rounded-xl block text-primary lg:text-sm xl:text-base 2xl:text-lg border-2 border-primary px-3 xl:px-6 py-2 font-semibold uppercase transition-all hover:bg-primary hover:text-white"
                    >
                        <div
                            ref={overlayRef}
                            className="absolute inset-0 bg-primary z-10"
                        ></div>
                        <span ref={textRef} className="relative z-20 block">
                            Solicite seu projeto
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Project;
