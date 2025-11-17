
import { Reveal } from './Reveal';

import bgPattern from '../assets/img/bg-pattern.jpg';
import darkStamp from '../assets/img/stamp-dark.png';
import LetterReveal from './LetterReveal';

const Identity: React.FC = () => {
    return (
        <section
            id="jeito-copacabana"
            className="pt-20 md:pt-24 pb-20 animate-bg-up"
            style={{
                backgroundImage: `url(${bgPattern})`,
            }}
        >   
            <div className="container max-w-large">
                <LetterReveal text="A identidade brasileira nas curvas da Linha Copacabana" className="text-xl text-center font-medium mb-6 sm:mb-10" element="h4" />

                <Reveal direction="top" className="text-center max-w-3xl mx-auto mb-6 sm:mb-10" reverse={true}>
                    <p>Inspirada no famoso calçadão de Copacabana, no Rio de Janeiro, a <b>Linha Copacabana</b> busca evocar leveza, fluidez e elegância urbana.</p>
                    <p>Ao invés de linhas retas e ângulos fechados, os cantos - e os tampos arredondados lembram curvas naturais, transmitindo leveza e convidando ao toque, criando uma aparência mais suave e orgânica.</p>
                </Reveal>

                <img src={darkStamp} alt="Selo" className="mx-auto pr-6" />
            </div>
        </section>
    );
};

export default Identity;