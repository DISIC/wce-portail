import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './Home.module.css';

const fadeImages = [
  {
    url: '/static/media/slide1.jpeg',
    caption: '',
  },
  {
    url: '/static/media/slide2.jpeg',
    caption: '',
  },
  {
    url: '/static/media/slide3.jpeg',
    caption: '',
  },
];

const HomeSlider = () => {
  return (
    <div className={styles.HomeForm}>
      <div className="slide-container">
        <Fade>
          {fadeImages.map((fadeImage, index) => (
            <div key={index}>
              <img
                alt="placeholder"
                style={{ width: '100%' }}
                src={fadeImage.url}
              />
              <h2>{fadeImage.caption}</h2>
            </div>
          ))}
        </Fade>
      </div>
    </div>
  );
};

export default HomeSlider;
