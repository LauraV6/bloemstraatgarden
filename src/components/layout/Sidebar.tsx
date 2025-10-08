"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import { SidebarContainer, IntroSection, TestSection, SidebarSection } from './Sidebar.styled';
import QuestionGenerator from "../features/generator/QuestionGenerator";

interface ProfileSectionProps {
  name: string;
  description: string;
  profileImage: string;
}

interface QuizSectionProps {
  title: string;
  description: string;
  buttonText: string;
  quizUrl: string;
}

const ANIMATION_DURATION = 0.3;
const PROFILE_DATA = {
  name: "Laura",
  description: "Overdag developer en in de avonduren moestuinierder. Wil jij ook een moestuin beginnen? Laat je op dit blog inspireren om de handen uit de mouwen te steken.",
  profileImage: "/profile.png"
} as const;

const QUIZ_DATA = {
  title: "Wil je jouw moestuin kennis testen?",
  description: "Doe mee aan onze moestuin quiz en stel jouw kennis op de proef! Elke maand zijn er nieuwe vragen.",
  buttonText: "Start de quiz",
  quizUrl: "/quiz"
} as const;

const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  name, 
  description, 
  profileImage 
}) => (
  <IntroSection>
    <Image 
      src={profileImage}
      alt={`Profielfoto van ${name}`}
      width={600} 
      height={500}
      sizes="(max-width: 768px) 300px, 600px"
      style={{ 
        width: '100%', 
        height: 'auto',
        objectFit: 'cover'
      }}
      priority={false}
    />
    <SidebarSection>
      <div>
        <h4>Hallo, ik ben {name}!</h4>
        <p>{description}</p>
      </div>
    </SidebarSection>
  </IntroSection>
);

const QuizSection: React.FC<QuizSectionProps> = ({ 
  title, 
  description, 
  buttonText, 
  quizUrl 
}) => {
  const handleQuizStart = () => {
    // Clear any saved quiz state when starting from the sidebar
    localStorage.removeItem('quizState');
  };

  return (
    <TestSection as={FadeIn}>
      <SidebarSection>
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
          <motion.div
            whileHover={{ scale: [null, 1.1, 1.05] }}
            transition={{ duration: ANIMATION_DURATION }}
          >
            <Link 
              className="button button--cta" 
              href={quizUrl}
              onClick={handleQuizStart}
              aria-label={`${buttonText} - Test je moestuin kennis`}
            >
              <span>{buttonText}</span>
            </Link>
          </motion.div>
        </div>
      </SidebarSection>
    </TestSection>
  );
};

export default function Sidebar() {
  return (
    <SidebarContainer 
      role="complementary"
      aria-label="Zijbalk met profielinformatie en quiz"
    >
      <div>
        <ProfileSection 
          name={PROFILE_DATA.name}
          description={PROFILE_DATA.description}
          profileImage={PROFILE_DATA.profileImage}
        />
        
        <QuizSection 
          title={QUIZ_DATA.title}
          description={QUIZ_DATA.description}
          buttonText={QUIZ_DATA.buttonText}
          quizUrl={QUIZ_DATA.quizUrl}
        />

        <QuestionGenerator />
      </div>
    </SidebarContainer>
  );
}