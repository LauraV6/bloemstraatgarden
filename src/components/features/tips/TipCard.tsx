'use client';

import { PostItem, PostItemImage, PostItemContent } from './TipCard.styled';
import Image from "next/image";
import Link from "next/link";
import { Tip } from '@/types/contentful';

interface TipCardProps {
    props: Tip;
}
  
export const TipCard: React.FC<TipCardProps> = ({ props }) => {
    return (
        <PostItem>
            <Link href={`/tips/${props.slug}`} aria-label={`Lees tip: ${props.title}`}>
                <PostItemImage>
                    <Image src={props.articleImage.url} alt={`Tip artikel afbeelding: ${props.title}`} fill sizes="(max-width: 768px) 100vw, 33vw" />
                </PostItemImage>
                <PostItemContent>
                    <h4>{props.title}</h4>
                    <button className="button button--cta"><span>Lees meer</span></button>
                </PostItemContent>
            </Link>
        </PostItem>
    );
};