import React from 'react';
import { Input } from '@codegouvfr/react-dsfr/Input';
import { Button } from '@codegouvfr/react-dsfr/Button';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './Home.module.css';

// function HomeSlider() {
//   return (
//     <div className={styles.HomeForm}>
//       <h3>La WebConférence de l'État pour tous les agents publics</h3>
//       <p>Audio, vidéo, chat, partage d'écran et de documents</p>
//       <div className={styles.ButtonForm}>
//         <Button
//           style={{ height: '10px', marginTop: '8px', marginRight: '10px' }}
//           iconId="fr-icon-checkbox-circle-line"
//           iconPosition="left"
//           priority="primary"
//           size="medium"
//         >
//           Label button
//         </Button>
//         <Input
//           //   style={{ height: '10px' }}
//           hintText=""
//           label=""
//           nativeInputProps={{
//             placeholder: 'https://',
//           }}
//         />
//       </div>
//       <p>Actuellement, il y a 0 conférences et 0 participants.</p>
//     </div>
//   );
// }

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
