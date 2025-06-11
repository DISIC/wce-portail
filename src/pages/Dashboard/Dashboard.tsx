import styles from './Dashboard.module.css'
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { useEffect, useState } from 'react';

import cardsData from '../../data/cardConfig.json';

function Dashboard () {

    const [isToogleActive, setIsToogleActive] = useState(false);
    const [datasCard, setDatasCard] = useState([]);

    const handleToogleChange = () => {
        setIsToogleActive(!isToogleActive);
    }

    useEffect(() => {
        const dataFromDB: Record<string, number> = {
        users: 1523,
        confNb: 348,
        confTime: 89,
        confMoyPart: 74,
        confMaxSimult: 12,
        partMaxSimult: 245
        };
    
          // Fusion : associer chaque meta à sa valeur
        const mergedData = cardsData.map(meta => ({
        ...meta,
        valeur: dataFromDB[meta.key] ?? 0 // valeur par défaut si absente
        }));
        console.log("test datas", mergedData)

        setDatasCard(mergedData);
    }, []);

    return (
        <div className={styles.content}>
           <Breadcrumb
                currentPageLabel="Dashboard"
                homeLinkProps={{
                    to: '/'
                }}
                segments={[]}
            />
            <h1 className={styles.title}>Dashboard</h1>
            <section>
                <article className={styles.dashboardContent}>
                    <RadioButtons
                        disabled={isToogleActive}
                        legend="Filtres"
                        name="radio"
                        options={[
                            {
                            label: 'Aujourd\'hui',
                            nativeInputProps: {
                                value: 'value1'
                            }
                            },
                            {
                            label: 'Cette semaine',
                            nativeInputProps: {
                                value: 'value2'
                            }
                            },
                            {
                            label: 'Ce mois-ci',
                            nativeInputProps: {
                                value: 'value3'
                            }
                            },
                            {
                            label: 'Cette année',
                            nativeInputProps: {
                                value: 'value4'
                            }
                            }
                        ]}
                        orientation="horizontal"
                        state="default"
                        />
                        {datasCard && (
                            <div className={styles.cardsSection}>
                                {datasCard.map(card => (
                                    <Card
                                        background
                                        border
                                        desc="Plage donnée"
                                        size="medium"
                                        title={card.valeur}
                                        detail={card.description}
                                        titleAs="h2"
                                        className={styles.cardStyle}
                                        key={card.key}
                                    />
                                ))}
                            </div>
                        )}
                </article>
                <aside className={styles.periodBlock}>
                    <ToggleSwitch
                        inputTitle="the-title"
                        label="Utiliser une période donnée"
                        labelPosition="left"
                        checked={isToogleActive}
                        onChange={handleToogleChange}
                    />
                    {isToogleActive && (
                        <div className={styles.hiddenBlock}>
                            <div className={styles.separator} />
                            <div className={styles.hiddenPeriodBlock}>
                                <Input
                                    label="Date de début"
                                    nativeInputProps={{
                                        type: 'date'
                                    }}
                                    />
                                <Input
                                    label="Date de fin"
                                    nativeInputProps={{
                                        type: 'date'
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </aside>
            </section>
        </div>
    )
}

export default Dashboard;