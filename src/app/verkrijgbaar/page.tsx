'use client';

import Link from "next/link"
import { Hero } from "@/components/layout/Hero"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid"
import { TitleLine } from "@/components/ui/TitleLine/TitleLine";
import AvailableApollo from "@/components/features/available/AvailableApollo";
import CartIcon from "@/components/features/cart/CartIcon";
import { Story, StoryContainer, StoryText, StoryAdding } from "@/components/features/stocking/Stock.styled";
import Image from "next/image";
import VerkrijgbaarPageClient from "@/components/VerkrijgbaarPageClient";
import { Breadcrumbs, VerkrijgbaarSection, HeroWrapper } from "./page.styled";

export default function Available() {
    return (
        <main>
            <VerkrijgbaarPageClient>
                <HeroWrapper>
                    <Hero 
                        theme="dark" 
                        title="Verkrijgbare planten" 
                        paragraph="Bekijk hier de planten die verkrijgbaar zijn bij onze moestuin, deze zijn gratis mee te nemen. Interesse? Stuur mij een bericht via Instagram of Whatsapp." 
                        forceWhiteText={true}
                    />
                </HeroWrapper>
                <VerkrijgbaarSection>
                    <Breadcrumbs><Link href='/'>Blog</Link><FontAwesomeIcon icon={faRight} /><span>Verkrijgbaar</span></Breadcrumbs>
                    <Story>
                        <StoryContainer>
                            <StoryText>
                                <h2>Overschot</h2>
                                <p>Tijdens het voorzaaien maken we gebruik van meerdere zaaitrays. Soms groeit er meer op dan we zelf kunnen gebruiken. In plaats van deze jonge plantjes verloren te laten gaan, geven we ze graag gratis weg aan iemand die er plezier van heeft.</p>
                                <p>Ben je bekend met het zaaischema en zie je daar iets tussen staan wat je graag zou willen hebben? Stuur me dan een persoonlijk berichtje en misschien staat er binnenkort een extra plantje voor jou klaar!</p>
                            </StoryText>
                            <StoryAdding>
                                <Image 
                                    src="/zaaitrays.jpg" 
                                    alt="zaaitrays" 
                                    width={500} 
                                    height={300}
                                    style={{ width: '100%', height: 'auto' }}
                                />                            
                            </StoryAdding>
                        </StoryContainer>
                    </Story>
                </VerkrijgbaarSection>
                <VerkrijgbaarSection>
                    <TitleLine title="Beschikbare planten" />
                    <CartIcon />
                    <AvailableApollo />
                </VerkrijgbaarSection>
            </VerkrijgbaarPageClient>
        </main>
    )
}