import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from "./ExampleCarouselImage";
import Slide1 from '../utils/Caurosel_img/slide-1.jpg';
import Slide2 from '../utils/Caurosel_img/slide-2.jpg';
import Slide3 from '../utils/Caurosel_img/slide-3.jpg';

function CarouselBody() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <ExampleCarouselImage text="MSB Mahal" imageSrc={Slide1} />
        <Carousel.Caption>
          <h3>MSB Mahal</h3>
          <p>Near to Thiruthani. In Sholinghur</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <ExampleCarouselImage text="Pares Mahal" imageSrc={Slide2} />
        <Carousel.Caption>
          <h3>Pares Mahal</h3>
          <p>Near VIT Vellore Campus.Vellore</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Gayathri Mahal" imageSrc={Slide3} />
        <Carousel.Caption>
          <h3>Gayathri Mahal</h3>
          <p>
            Near Sathuvachari. Vellore
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselBody;