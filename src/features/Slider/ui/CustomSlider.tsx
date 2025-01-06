// slick-style
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

// react-slick
import Slick, { Settings } from 'react-slick'

// interface
import { SliderProps } from '../interface'

/**
 * Custom slider component using react-slick with different configurations for film and season card sliders.
 *
 * @param isFilmCardSlider - If true, enables settings for a movie card slider.
 * @param isSeasonCardSlider - If true, enables settings for a season card slider.
 * @param children - The content to be rendered inside the slider.
 * @param rest - Additional settings for the slider.
 * @returns A slider component with customized settings based on the props.
 */
const CustomSlider = ({
  isFilmCardSlider: isMovieCard,
  isSeasonCardSlider: isSeasonCard,
  children,
  ...rest
}: SliderProps) => {
  const settings: Settings = {
    ...rest,
    ...(isMovieCard && {
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      swipe: false,
      responsive: [
        {
          breakpoint: 600,
          settings: { slidesToShow: 3, slidesToScroll: 3 },
        },
        {
          breakpoint: 480,
          settings: { slidesToShow: 2, slidesToScroll: 2 },
        },
      ],
    }),
    ...(isSeasonCard && {
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      swipe: false,
      responsive: [
        {
          breakpoint: 600,
          settings: { slidesToShow: 3, slidesToScroll: 3 },
        },
        {
          breakpoint: 480,
          settings: { slidesToShow: 2, slidesToScroll: 2 },
        },
      ],
    }),
  }

  return <Slick {...settings}>{children}</Slick>
}

export default CustomSlider
