import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImg1 from "../../assets/img/slider3.jpg";
import sliderImg2 from "../../assets/img/slider4.jpg";
import sliderImg3 from "../../assets/img/slider6.jpg";
export default function MainSlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={sliderImg1} alt="sliderImg1" className="object-fit" />
        </div>
        <div>
          <img src={sliderImg2} alt="sliderImg2" className="object-fit" />
        </div>
        <div>
          <img src={sliderImg3} alt="sliderImg3" className="object-fit" />
        </div>
      </Slider>
    </div>
  );
}
