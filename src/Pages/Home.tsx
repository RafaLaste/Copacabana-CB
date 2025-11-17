import { ImageGalleryList } from '../Data/ImageGalleryList'
import { ImageHighlightList } from '../Data/ImageHighlightList'

import DefaultLayout from '../Layouts/DefaultLayout';

import HeroBanner from '../Components/HeroBanner';
import Identity from '../Components/Identity';
import { Slides } from '../Components/Slides';
import { Gallery } from '../Components/Gallery';
import Project from '../Components/Project';
import EndVideo from '../Components/EndVideo';

const Page: React.FC = () => {
    const highlights = ImageHighlightList;

    const images = ImageGalleryList;
    return (
        <DefaultLayout>
            <HeroBanner />
            
            <Identity />

            <Slides slides={highlights} />

            <Gallery images={images} />

            <Project />

            <EndVideo />
        </DefaultLayout>
    );
};

export default Page;