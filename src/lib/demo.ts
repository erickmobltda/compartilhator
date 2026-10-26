import { HistoryItem } from '../types'

// Public sandbox account shared by the erickmob apps (custom claim `demo`).
// erickmob-api refuses it /repurpose (paid transcription and AI), so the demo
// shows these ready-made generations instead of the browser's history.
export const DEMO_EMAIL = 'demo@ledgenator.app'
export const DEMO_PASSWORD = 'demo1234'

const hoursAgo = (h: number) => Date.now() - h * 3_600_000

export const DEMO_HISTORY: HistoryItem[] = [
  {
    id: 'demo-reel-lisbon',
    timestamp: hoursAgo(2),
    input_type: 'url',
    input_value: 'https://www.instagram.com/reel/demo-pasteis-de-belem/',
    target_language: 'pt',
    response: {
      source: {
        url: 'https://www.instagram.com/reel/demo-pasteis-de-belem/',
        title: 'The original pastel de nata in Lisbon',
        platform: 'instagram',
        detected_language: 'en',
      },
      instagram: {
        caption:
          'Fila de 20 minutos por um pastel de nata? Vale cada segundo. 🥧\n\nEm Belém, a receita é a mesma desde 1837 e o segredo é comer quentinho, com canela e açúcar por cima.\n\nDica: peça para levar e coma no jardim em frente ao Mosteiro dos Jerónimos.',
        hashtags: ['lisboa', 'pasteldenata', 'portugal', 'viagem', 'dicasdeviagem'],
      },
      linkedin: {
        title: 'O que uma fila de pastel de nata ensina sobre produto',
        body:
          'Em Belém, uma confeitaria vende o mesmo produto desde 1837 e ainda tem fila todos os dias.\n\nTrês lições:\n1. Foco: um produto feito muito bem vale mais que dez medianos.\n2. Experiência: a fila anda rápido porque o processo foi desenhado para isso.\n3. História: a receita "secreta" é parte do valor.\n\nQual é o "pastel de nata" do seu produto?',
        hashtags: ['produto', 'experienciadocliente', 'negocios'],
      },
      facebook: {
        text:
          'Quem vai a Lisboa não pode deixar de provar o pastel de nata original, em Belém! 🥧 Chegue cedo, peça para levar e aproveite o jardim do Mosteiro dos Jerónimos ao lado.',
      },
      newsletter: {
        subject: 'O pastel de nata que vale a fila',
        preview_text: 'Belém, 1837, canela e açúcar: o roteiro doce de Lisboa.',
        body:
          'Olá!\n\nEsta semana o destaque é Belém, em Lisboa. A confeitaria que faz o pastel de nata original desde 1837 continua com fila, mas ela anda rápido.\n\n• Vá antes das 10h nos dias de semana\n• Peça para levar e coma no jardim em frente aos Jerónimos\n• Polvilhe canela e açúcar enquanto está quente\n\nAté a próxima!',
      },
    },
  },
  {
    id: 'demo-text-side-project',
    timestamp: hoursAgo(26),
    input_type: 'text',
    input_value: 'I shipped my side project after two years of weekends. What I learned: ship small, write things down, and…',
    target_language: 'en',
    response: {
      instagram: {
        caption:
          'Two years of weekends. One side project. Finally live. 🚀\n\nWhat I learned:\n✅ Ship small, ship often\n✅ Write everything down\n✅ Done beats perfect\n\nWhat are you building on weekends?',
        hashtags: ['sideproject', 'buildinpublic', 'indiehacker', 'coding'],
      },
      linkedin: {
        title: 'Two years of weekends: lessons from shipping a side project',
        body:
          'Last week I shipped the side project I have been building on weekends for two years.\n\nThree things I would tell myself on day one:\n\n1. Ship small. The first version only needed one feature.\n2. Write things down. Notes saved me every time I came back after a busy month.\n3. Done beats perfect. Users found problems I would never have guessed.\n\nIf you have a project sitting in a folder, this is your sign to ship it.',
        hashtags: ['sideproject', 'softwareengineering', 'productivity'],
      },
      facebook: {
        text:
          'Big news: after two years of weekends, my side project is finally live! 🎉 Biggest lesson? Ship small and keep going. Thanks to everyone who tested it along the way.',
      },
      newsletter: {
        subject: 'I finally shipped it',
        preview_text: 'Two years of weekends, three lessons.',
        body:
          'Hi there,\n\nAfter two years of weekend work, my side project is live.\n\nThe short version of what I learned:\n• Ship small: the first release had a single feature\n• Write things down: future you will thank you\n• Done beats perfect: real users teach you faster\n\nReply and tell me what you are building.\n\nCheers!',
      },
    },
  },
]
