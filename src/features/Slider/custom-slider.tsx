// Dependencies
import Slick, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import './slider.css'

interface SliderProps extends Settings {
  isFilmCardSlider?: boolean
}

/**
 * Slider component using react-slick for carousels.
 *
 * @param isFilmCardSlider - Enables specific settings for film card carousels.
 * @param children - Content to be displayed within the slider.
 * @returns Customized slider component.
 */
const CustomSlider = ({
  isFilmCardSlider: isMovieCard,
  children,
  ...rest
}: SliderProps) => {
  const settings: Settings = {
    ...rest,
    ...(isMovieCard && {
      slidesToShow: 5,
      slidesToScroll: 5,
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
