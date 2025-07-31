import { getAllTips } from "@/lib/api";
import TipsGridClient from "./tipsGrid";

export default async function TipsGrid() {
    const tips = await getAllTips();
    return <TipsGridClient tips={tips} />;
}