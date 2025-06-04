import Button from '@codegouvfr/react-dsfr/Button';
import styles from './Frame.module.css'

function JitsiFrame () {
    
    return (
        <div>
            <div>
                <h3>Jitsi Frame</h3>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem fuga tenetur eaque sunt consequatur quae porro itaque iste enim possimus aliquid,
                    qui odio praesentium neque repellendus quibusdam cum perspiciatis doloribus.
                </p>
            </div>
            <div className={styles.frameContainerButton}>
                <Button
                className={styles.buttonMoreInfo}
                onClick={function noRefCheck(){}}
                >
                <span>Voir plus</span>
                </Button>
            </div>
        </div>
    )
}

export default JitsiFrame;