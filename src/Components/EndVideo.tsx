
import darkStamp from '../assets/img/stamp-dark.png';

const EndVideo: React.FC = () => {
    return (
        <section>
            <div className="relative h-[300px] sm:h-[420px] md:h-[520px] 2xl:h-[574px]">
                <video
                    className="block w-full h-full object-cover object-[center_2%]"
                    src="/copacabana/content/videos/video-end.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            </div>

            <div className="bg-tertiary">
                <div className="container max-w-large">
                    <div className="flex items-center justify-between py-6">
                        <p className="max-[440px]:text-sm md:text-lg leading-tight">22° 58' 15" S<br />43° 10' 54" O</p>
                        <img src={darkStamp} alt="Selo" />
                        <p className="max-[440px]:text-sm md:text-lg leading-tight uppercase mb-2">O jeito Copacabana</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EndVideo;