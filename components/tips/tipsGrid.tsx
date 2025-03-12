import styles from "./tipsGrid.module.scss";
import { TipCard } from './tipCard';
import { getAllTips } from "@/../lib/api";
import { draftMode } from "next/headers";

export default async function TipsGrid() {
    const { isEnabled } = await draftMode();
    const tips = await getAllTips(5, isEnabled);

    return (
        <div className={styles.tipsGrid}>
            {
                tips.map((tip: any) => <TipCard key={tip.sys.id} props={tip} />)
            }
        </div>
    );
}