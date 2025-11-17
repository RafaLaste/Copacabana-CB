import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';

import { CookieModal } from '../Components/CookieModal';

import logo from '../assets/img/logo.png';
import whiteStamp from '../assets/img/stamp-white.png';
import facebookLogo from '../assets/img/facebook-icon.png';
import instagramLogo from '../assets/img/instagram-icon.png';
import oitoPorOitoLogo from '../assets/img/8poroito-logo.png';

interface DefaultLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

export default function DefaultLayout({
    children,
    title = 'Linha Copacabana | Casa Brasileira',
    description = 'A beleza das curvas mais icônicas do Brasil.',
}: DefaultLayoutProps) {
    const [cookieDecisionMade, setCookieDecisionMade] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [trackingEnabled, setTrackingEnabled] = useState(false);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    const acceptCookies = () => {
        setTrackingEnabled(true);
    };

    useEffect(() => {
        const notifyCookie = document.cookie
            .split('; ')
            .some((cookie) => cookie.startsWith('notify-cookies=1'));
        
        const rejectCookie = document.cookie
            .split('; ')
            .some((cookie) => cookie.startsWith('reject-cookies=1'));
        
        setCookieDecisionMade(notifyCookie || rejectCookie);
        
        if (notifyCookie) {
            setTrackingEnabled(true);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const notifyCookie = document.cookie
                .split('; ')
                .some((cookie) => cookie.startsWith('notify-cookies=1'));
            
            if (notifyCookie || trackingEnabled) {
                // Google Tag Manager
                const gtmScript = document.createElement('script');
                gtmScript.innerHTML = `
                    (function(w,d,s,l,i){
                        w[l]=w[l]||[];
                        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                        var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),
                            dl=l!='dataLayer'?'&l='+l:'';
                        j.async=true;
                        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                        f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-MJZSWHT');
                `;
                document.head.appendChild(gtmScript);

                const gtagScript = document.createElement('script');
                gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-743981834';
                gtagScript.async = true;
                document.head.appendChild(gtagScript);

                const gtagInit = document.createElement('script');
                gtagInit.innerHTML = `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'AW-743981834');
                `;
                document.head.appendChild(gtagInit);

                const conversionScript = document.createElement('script');
                conversionScript.innerHTML = `
                    function gtag_report_conversion(url) {
                        var callback = function () {
                            if (typeof(url) != 'undefined') {
                                window.location = url;
                            }
                        };
                        gtag('event', 'conversion', {
                            'send_to': 'AW-743981834/cImPCO7O4bIDEN2orYMD',
                            'event_callback': callback
                        });
                        return false;
                    }
                `;
                document.head.appendChild(conversionScript);

                const noscript = document.createElement('noscript');
                noscript.innerHTML = `
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MJZSWHT" height="0" width="0" style="display:none;visibility:hidden"></iframe>
                `;
                document.body.appendChild(noscript);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [trackingEnabled]);

    const menuItems = [
        { name: "Conheça o jeito Copacabana", url: "/", hash: "jeito-copacabana", external: false },
        { name: "Ambientes", url: "/", hash: "ambientes", external: false }
    ];

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description || ''} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="author" content="Octal Web" />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description || ''} />
            <meta property="og:image" content="/assets/preview.jpg" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://casabrasileiraplanejados.com.br/copacabana" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description || ''} />
            <meta name="twitter:image" content="/assets/preview.jpg" />

            <link rel="icon" type="image/png" href="/assets/favicon.png" />

            <header className="header absolute top-0 left-0 right-0 z-[20]">
                <div className={`fixed inset-0 bg-black lg:hidden duration-300 ease-out ${isMenuOpen ? 'opacity-30' : 'opacity-0 h-0'}`} onClick={() => {setIsMenuOpen(false)}}></div>
                <div className="container max-w-large">
                    <div className="flex items-center justify-between">
                        <div className="relative z-[1] flex items-center justify-between w-full h-24 md:h-32 xl:h-40 2xl:h-44">
                            <h1 className="absolute top-3 md:top-6 xl:top-10 bottom-2 md:bottom-0 xl:bottom-8 z-[2]">
                                <Link to="/" className="">
                                    <img src={logo} alt="Logo" className="block h-full" />
                                </Link>
                            </h1>

                            <button className={`fixed z-[2] top-0 left-0 w-screen h-screen lg:hidden bg-black transition-all  ${isMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />

                            <div className={`fixed z-[2] lg:relative bg-primary bg-opacity-70 max-lg:backdrop-blur-sm lg:bg-transparent lg:ml-auto top-0 left-0 right-0 ${!isMenuOpen ? '-translate-y-[101%] lg:translate-y-0' : 'translate-y-0'} lg:left-auto lg:top-auto flex flex-col lg:flex-row lg:items-center justify-center lg:justify-end w-full h-[50vh] lg:h-auto lg:my-0.5 2xl:my-1.5 transition-all ease-out duration-500`}>
                                <nav className="relative max-md:mt-[10vh]">
                                    <ul className="flex flex-col lg:flex-row items-center lg:justify-center gap-6 xl:gap-12 2xl:gap-20 relative">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                {item.external ? (
                                                    <a
                                                        href={item.url}
                                                        className="max-md:text-xl text-white transition-all hover:opacity-80"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {item.name}
                                                    </a>
                                                ) : (
                                                    <Link
                                                        to={item.hash ? `${item.url}#${item.hash}` : item.url}
                                                        className="max-md:text-xl text-white transition-all hover:opacity-80"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}

                                        <li>
                                            <a
                                                href="https://casabrasileiraplanejados.com.br/solicite-seu-projeto"
                                                target="_blank"
                                                className="max-lg:block text-white lg:text-sm xl:text-base 2xl:text-lg border-2 hover:border-white rounded-xl px-3 xl:px-6 py-1.5 font-semibold uppercase transition-all hover:bg-primary hover:border-primary"
                                            >
                                                Solicite seu projeto
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="ml-auto pl-4 xl:pl-20">
                                <img src={whiteStamp} alt="Selo" />
                            </div>

                            <button className="lg:hidden relative ml-10 z-[2]" onClick={toggleMenu}>
                                <div className="flex items-center">
                                    <div className="relative w-8 h-[21px]">
                                        <div
                                            className={`absolute top-0 h-[3px] w-8 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 !top-[10px]' : ''}`}
                                            style={{
                                                transitionDelay: isMenuOpen ? '0ms, 400ms' : '0ms',
                                                transitionProperty: 'top, transform'
                                            }}
                                        ></div>
                                        <div
                                            className={`absolute top-[9px] h-[3px] w-8 bg-white rounded transition-all duration-300 ${isMenuOpen ? 'scale-x-0 !top-[10px]' : ''}`}
                                            style={{
                                                transitionDelay: isMenuOpen ? '0ms, 400ms' : '0ms',
                                                transitionProperty: 'top, transform'
                                            }}
                                        ></div>
                                        <div
                                            className={`absolute bottom-0 h-[3px] w-8 bg-white rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45 bottom-[8px]' : ''}`}
                                            style={{
                                                transitionDelay: isMenuOpen ? '0ms, 400ms' : '0ms',
                                                transitionProperty: 'bottom, transform'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="min-h-screen font-primary text-primary overflow-hidden">
                {children}
            </main>
            
            <footer className="relative bg-primary">
                <div className="py-8">
                    <div className="container max-w-x-large">
                        <div className="relative">
                            <div className="md:absolute md:top-10 xl:top-4 md:bottom-8 xl:bottom-1">
                                <img src={logo} alt="Logo" className="max-md:mx-auto max-sm:max-w-30 max-md:max-w-40 h-full" />
                            </div>
                            
                            <div className="md:ml-40 xl:ml-56 mb-1 py-8 flex max-md:flex-col gap-6 sm:gap-10 md:gap-20 md:items-end border-b border-b-white border-opacity-30">
                                
                                <nav className="">
                                    <ul className="flex max-lg:flex-wrap justify-evenly gap-y-4 gap-x-6 sm:gap-x-4 md:gap-x-14 lg:gap-10">
                                        {menuItems.map((item, index) => (

                                        <li key={index}>
                                            <Link to={item.hash ? `${item.url}#${item.hash}` : item.url} className="block font-secondary text-white leading-none transition-all opacity-70 hover:opacity-100">{item.name}</Link>
                                        </li>
                                        ))}
                                    </ul>
                                </nav>

                                <ul className="flex gap-2 max-md:mx-auto md:ml-auto -mb-2">
                                    <li><a href="https://www.facebook.com/casabrasileiraoficial" target="_blank" rel="noopener noreferrer" className="transition-all opacity-100 hover:opacity-70"><img src={facebookLogo} alt="facebook" /></a></li>
                                    <li><a href="https://www.instagram.com/casabrasileiraoficial" target="_blank" rel="noopener noreferrer" className="transition-all opacity-100 hover:opacity-70"><img src={instagramLogo} alt="instagram" /></a></li>
                                </ul>
                            </div>
                            
                            <div className="md:ml-40 xl:ml-56 pt-5 flex max-md:flex-col items-center">
                                <nav className="my-2 md:max-w-[70%]">
                                    <ul className="flex max-lg:flex-wrap justify-evenly gap-y-4 gap-x-6 sm:gap-x-4 md:gap-x-14 lg:gap-10 2xl:gap-20">
                                        <li>
                                            <a href="https://casabrasileiraplanejados.com.br/crc" target="_blank" rel="noopener noreferrer" className="block font-secondary text-white text-sm leading-none transition-all opacity-70 hover:opacity-100">Central de Relacionamento com o Cliente 0800 721 4104</a>
                                        </li>

                                        <li>
                                            <p className=" font-secondary text-white text-sm leading-none transition-all opacity-70 hover:opacity-100">© 2025 Casa Brasileira | Todos os direitos reservados.</p>
                                        </li>
                                        
                                        <li>
                                            <a href="https://casabrasileiraplanejados.com.br/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="block font-secondary text-white text-sm leading-none transition-all opacity-70 hover:opacity-100">Política de Privacidade</a>
                                        </li>

                                    </ul>
                                </nav>
                                
                                <div className="flex items-center ml-auto max-md:mr-auto max-md:mt-8 gap-4">
                                    <span className="text-white text-xs opacity-70">Desenvolvido por: </span>
                                    <img src={oitoPorOitoLogo} className="opacity-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {!cookieDecisionMade && (
                <CookieModal
                    acceptCookies={acceptCookies}
                    visible={true}
                />
            )}
        </>
    );
}