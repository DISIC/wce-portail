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
    url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=800',
    caption: 'description',
  },
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    caption: 'Second Slide',
  },
  {
    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Third Slide',
  },
];

const HomeSlider = () => {
  return (
    <div className={styles.HomeForm}>
      <div className="slide-container">
        <Fade>
          {fadeImages.map((fadeImage, index) => (
            <div key={index}>
              <img style={{ width: '100%' }} src={fadeImage.url} />
              <h2>{fadeImage.caption}</h2>
            </div>
          ))}
        </Fade>
      </div>
    </div>
  );
};

export default HomeSlider;
