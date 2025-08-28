import { getAllTips } from "@/lib/contentful/api";
import TipsGridClient from "./TipsGrid";

export default async function TipsGrid() {
    const tips = await getAllTips();
    return <TipsGridClient tips={tips} />;
}