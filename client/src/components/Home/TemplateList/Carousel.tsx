import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const Carousel = ({ slides, options }: PropType) => {
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
