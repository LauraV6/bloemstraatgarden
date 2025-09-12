// Mock data for development when Contentful API is unreachable
export const mockArticles = [
  {
    sys: { id: 'mock-article-1' },
    title: 'Wintergroenten in de Moestuin',
    slug: 'wintergroenten-moestuin',
    summary: 'Ontdek welke groenten perfect groeien in de winter en hoe je ze het beste kunt verzorgen.',
    date: '2024-01-15',
    weather: 'Bewolkt, 5°C',
    articleImage: {
      url: '/images/placeholder.svg',
      title: 'Wintergroenten'
    },
    details: {
      json: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: 'Wintergroenten zijn perfect voor de koude maanden...'
              }
            ]
          }
        ]
      }
    }
  },
  {
    sys: { id: 'mock-article-2' },
    title: 'Composteren voor Beginners',
    slug: 'composteren-beginners',
    summary: 'Leer hoe je je eigen compost maakt van keukenafval en tuinresten.',
    date: '2024-01-10',
    weather: 'Zonnig, 8°C',
    articleImage: {
      url: '/images/placeholder.svg',
      title: 'Composthoop'
    },
    details: {
      json: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: 'Composteren is een geweldige manier om afval te verminderen...'
              }
            ]
          }
        ]
      }
    }
  },
  {
    sys: { id: 'mock-article-3' },
    title: 'Zaaikalender 2024',
    slug: 'zaaikalender-2024',
    summary: 'Een complete gids voor wanneer je welke groenten moet zaaien.',
    date: '2024-01-05',
    weather: 'Regen, 6°C',
    articleImage: {
      url: '/images/placeholder.svg',
      title: 'Zaaikalender'
    },
    details: {
      json: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: 'Timing is alles in de moestuin...'
              }
            ]
          }
        ]
      }
    }
  }
];

export const mockTips = [
  {
    sys: { id: 'mock-tip-1' },
    title: 'Water geven in de ochtend',
    slug: 'water-geven-ochtend',
    summary: 'Geef je planten water in de vroege ochtend voor het beste resultaat.',
    tipImage: {
      url: '/images/placeholder.svg',
      title: 'Water geven'
    },
    details: {
      json: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: 'Water geven in de ochtend voorkomt schimmelziekten...'
              }
            ]
          }
        ]
      }
    }
  },
  {
    sys: { id: 'mock-tip-2' },
    title: 'Mulchen tegen onkruid',
    slug: 'mulchen-tegen-onkruid',
    summary: 'Gebruik mulch om onkruid te onderdrukken en vocht vast te houden.',
    tipImage: {
      url: '/images/placeholder.svg',
      title: 'Mulch laag'
    },
    details: {
      json: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: 'Een goede mulchlaag bespaart je veel werk...'
              }
            ]
          }
        ]
      }
    }
  },
  {
    sys: { id: 'mock-tip-3' },
    title: 'Wisselteelt toepassen',
    slug: 'wisselteelt-toepassen',
    summary: 'Wissel je gewassen af om de bodem gezond te houden.',
    tipImage: {
      url: '/images/placeholder.svg',
      title: 'Wisselteelt schema'
    },
    details: {
      json: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: 'Wisselteelt voorkomt bodemuitputting...'
              }
            ]
          }
        ]
      }
    }
  },
  {
    sys: { id: 'mock-tip-4' },
    title: 'Zaailingen afharden',
    slug: 'zaailingen-afharden',
    summary: 'Hard je zaailingen geleidelijk af voordat je ze uitplant.',
    tipImage: {
      url: '/images/placeholder.svg',
      title: 'Zaailingen'
    },
    details: {
      json: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: 'Afharden is essentieel voor sterke planten...'
              }
            ]
          }
        ]
      }
    }
  },
  {
    sys: { id: 'mock-tip-5' },
    title: 'Natuurlijke bestrijding',
    slug: 'natuurlijke-bestrijding',
    summary: 'Gebruik natuurlijke methoden tegen plagen in je moestuin.',
    tipImage: {
      url: '/images/placeholder.svg',
      title: 'Lieveheersbeestje'
    },
    details: {
      json: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: 'Natuurlijke vijanden zijn je beste vrienden...'
              }
            ]
          }
        ]
      }
    }
  }
];