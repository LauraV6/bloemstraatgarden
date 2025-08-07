"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Profile from "../../../public/profile.png";
import FadeIn from "@/components/common/fadeIn";
import styles from './sidebar.module.scss';

// Types
interface SidebarProps {
  className?: string;
}

interface ProfileSectionProps {
  name: string;
  description: string;
  profileImage: typeof Profile;
}

interface QuizSectionProps {
  title: string;
  description: string;
  buttonText: string;
  quizUrl: string;
}

// Constants
const ANIMATION_DURATION = 0.3;
const PROFILE_DATA = {
  name: "Laura",
  description: "Overdag programmeur en in de avonduren moestuinierder. Wil jij ook een moestuin beginnen? Laat je op dit blog inspireren om de handen uit de mouwen te steken.",
  profileImage: Profile
} as const;

const QUIZ_DATA = {
  title: "Wil je jouw moestuin kennis testen?",
  description: "Doe mee aan onze moestuin quiz en stel jouw kennis op de proef! Elke maand zijn er nieuwe vragen.",
  buttonText: "Start de quiz",
  quizUrl: "/quiz"
} as const;

// Profile Section Component
const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  name, 
  description, 
  profileImage 
}) => (
  <div className={styles.intro}>
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
    <div>
      <div>
        <h4>Hallo, ik ben {name}!</h4>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

// Quiz Section Component
const QuizSection: React.FC<QuizSectionProps> = ({ 
  title, 
  description, 
  buttonText, 
  quizUrl 
}) => (
  <FadeIn className={styles.test}>
    <div>
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
            aria-label={`${buttonText} - Test je moestuin kennis`}
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </div>
  </FadeIn>
);

export default function Sidebar({ className }: SidebarProps) {
  const sidebarClass = [styles.aside, className].filter(Boolean).join(' ');

  return (
    <aside 
      className={sidebarClass}
      role="complementary"
      aria-label="Zijbalk met profielinformatie en quiz"
    >
      <div className={styles.aside__content}>
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
      </div>
    </aside>
  );
}