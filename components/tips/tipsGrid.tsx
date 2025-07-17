import styles from "./tipsGrid.module.scss";
import { TipCard } from './tipCard';
import { getAllTips } from "@/lib/api";

export default async function TipsGrid() {
    const tips = await getAllTips();

    return (
        <div className={styles.tipsGrid}>
            {
                tips.map((tip: any) => <TipCard key={tip.sys.id} props={tip} />)
            }
        </div>
    );
}