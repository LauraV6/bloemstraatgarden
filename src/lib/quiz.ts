export interface QuizQuestion {
  id: string;
  text: string;
  answers: string[];
  correctAnswerIndex?: number; // Optional: for future scoring implementation
}

export const questions: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'Wat wordt er bedoeld met de term "wisselteelt"',
    answers: [
      'Na het oogsten van een plant niet eenzelfde soort plant op deze grond planten',
      'Om het jaar een moestuin beginnen',
      'Een gedeelte in volle grond en een gedeelte in potten kweken'
    ],
  },
  {
    id: 'q2',
    text: 'Hoe ver uit elkaar moet je courgettes planten?',
    answers: [
      'Je moet courgettes 90cm uit elkaar planten',
      'Je moet courgettes 60cm uit elkaar planten',
      'Je moet courgettes 30cm uit elkaar planten',
    ],
  },
  {
    id: 'q3',
    text: 'Welke van de volgende maatregelen helpen niet tegen slakken in de moestuin?',
    answers: [
      'De moestuin in de avond water geven',
      'Munt, venkel of tijm tussen de planten zetten',
      'Koffiedrab door de aarde mengen',
    ],
  },
  {
    id: 'q4',
    text: 'Onder welke plantenfamilie behoren onder andere peultjes, boontjes en sugarsnaps?',
    answers: [
      'Die behoren onder de plantenfamilie vlinderbloem',
      'Die behoren onder de plantenfamilie vrucht',
      'Die behoren onder de plantenfamilie nachtschade',
    ],
  },
  {
    id: 'q5',
    text: 'Wat betekent IJsheiligen?',
    answers: [
      'De periode waarna er geen kans meer is op nachtvorst',
      'Het moment waarop de winter volgens de volksweerkunde begint',
      'Een manier om je planten af te harden',
    ],
  },
  {
    id: 'q6',
    text: 'Hoe lang kun je de zaden van tomaten bewaren?',
    answers: [
      'Tomaten zaden kan je 7 tot 10 jaar bewaren',
      'Tomaten zaden kan je 2 tot 6 jaar bewaren',
      'Tomaten zaden kan je 1 tot 2 jaar bewaren',
    ],
  },
  {
    id: 'q7',
    text: 'Hoe worden de ondergrondse, eetbare delen van de aardappelplant terecht genoemd?',
    answers: [
      'Het eetbare deel heet knollen',
      'Het eetbare deel heet bollen',
      'Het eetbare deel heet stolonen',
    ],
  },
];

export default questions;