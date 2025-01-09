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
  if (!children) {
    return null
  }

  const isChildrenArray = Array.isArray(children)
  const childrenCount = isChildrenArray ? children.length : 1

  const settings: Settings = {
    ...rest,
    ...(isMovieCard && {
      infinite: childrenCount > 5,
      slidesToShow: Math.min(5, childrenCount),
      slidesToScroll: 1,
      swipe: childrenCount > 1,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: Math.min(3, childrenCount),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: Math.min(2, childrenCount),
            slidesToScroll: 1,
          },
        },
      ],
    }),
    ...(isSeasonCard && {
      infinite: childrenCount > 5,
      slidesToShow: Math.min(5, childrenCount),
      slidesToScroll: 1,
      swipe: childrenCount > 1,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: Math.min(3, childrenCount),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: Math.min(2, childrenCount),
            slidesToScroll: 1,
          },
        },
      ],
    }),
  }

  return <Slick {...settings}>{children}</Slick>
}

export default CustomSlider
