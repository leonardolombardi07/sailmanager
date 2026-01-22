import { Practice } from "@/api/types";

export const MOCK_PRACTICES: Practice[] = [
  // 1. Rio de Janeiro - Standard Finished Practice
  {
    id: "practice-001",
    status: "finished",
    name: "Preparatório Brasileiro - Orça e Virada",
    descriptionMarkdown:
      "Ótimo treino hoje com foco em **velocidade de orça** e **duelos de virada**. O vento estava rondado vindo de SO, o que proporcionou algumas decisões táticas interessantes. \n\n* Foco: Montagens de boia\n* Intensidade: Alta\n* Nota: Cuidado com a correnteza perto da ponte.",
    rating: 5,
    location: {
      place: {
        location: { latitude: -22.9068, longitude: -43.1729 },
        name: "Marina da Glória, RJ",
      },
    },
    expectedStart: {
      datetime: "2026-01-21T14:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    expectedEnd: {
      datetime: "2026-01-21T17:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualStart: {
      datetime: "2026-01-21T14:15:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualEnd: {
      datetime: "2026-01-21T17:30:00Z",
      timezone: "America/Sao_Paulo",
    },
    classes: ["Laser", "420"],
    tags: ["Tática", "Velocidade"],
    coachIds: ["coach-1"],
    sailorIds: ["sailor-1", "sailor-2", "sailor-3"],
    tunningModelIds: [],
    mediaIds: [],
    metereologySummary: {
      condition: "cloudy",
      temperature: 24,
      feelsLikeTemperature: 26,
      wind: { speed: 12, direction: 225, gust: 18, shift: 15 },
      current: { speed: 1.5, direction: 180 },
      waves: { height: 0.8, period: 6 },
    },
    otherMetereologySummaries: [],
  },

  // 2. Ilhabela - Strong Winds / Heavy Weather
  {
    id: "practice-002",
    status: "finished",
    name: "Treino de Vento Forte - Canal",
    descriptionMarkdown:
      "Condições extremas no canal. Foco total em **controle do barco** e **manobras de segurança**. \n\nTreinamos o _downwind_ com ondas grandes. Dois veleiros viraram, mas recuperaram rápido.",
    rating: 4,
    location: {
      place: {
        location: { latitude: -23.7781, longitude: -45.3582 },
        name: "Ilhabela, SP",
      },
    },
    expectedStart: {
      datetime: "2026-01-20T10:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    expectedEnd: {
      datetime: "2026-01-20T13:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualStart: {
      datetime: "2026-01-20T10:05:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualEnd: {
      datetime: "2026-01-20T12:45:00Z",
      timezone: "America/Sao_Paulo",
    },
    classes: ["Snipe", "Laser"],
    tags: ["Vento Forte", "Ondas"],
    coachIds: ["coach-2"],
    sailorIds: ["sailor-4", "sailor-5"],
    tunningModelIds: [],
    mediaIds: [],
    metereologySummary: {
      condition: "stormy",
      temperature: 22,
      feelsLikeTemperature: 20,
      wind: { speed: 22, direction: 90, gust: 28, shift: 5 },
      current: { speed: 2.0, direction: 45 },
      waves: { height: 1.5, period: 8 },
    },
    otherMetereologySummaries: [],
  },

  // 3. Brasília - Lake Sailing (Light Wind)
  {
    id: "practice-003",
    status: "finished",
    name: "Tática de Vento Fraco",
    descriptionMarkdown:
      "Treino técnico no Lago Paranoá. O vento estava muito rondado e fraco. Focamos em **regulagem fina** das velas e **adernamento** para reduzir a superfície molhada.",
    rating: 3,
    location: {
      place: {
        location: { latitude: -15.7934, longitude: -47.8285 },
        name: "Brasília, DF",
      },
    },
    expectedStart: {
      datetime: "2026-01-18T14:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    expectedEnd: {
      datetime: "2026-01-18T16:30:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualStart: {
      datetime: "2026-01-18T14:30:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualEnd: {
      datetime: "2026-01-18T17:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    classes: ["Optimist"],
    tags: ["Vento Fraco", "Regulagem"],
    coachIds: ["coach-1"],
    sailorIds: ["sailor-6", "sailor-7", "sailor-8"],
    tunningModelIds: [],
    mediaIds: [],
    metereologySummary: {
      condition: "sunny",
      temperature: 28,
      feelsLikeTemperature: 30,
      wind: { speed: 5, direction: 120, gust: 7, shift: 30 },
      current: { speed: 0, direction: 0 },
      waves: { height: 0.1, period: 2 },
    },
    otherMetereologySummaries: [],
  },

  // 4. Scheduled Practice (Future)
  {
    id: "practice-004",
    status: "scheduled",
    name: "Clínica de Largadas",
    descriptionMarkdown:
      "Treino focado exclusivamente em **procedimentos de largada**. Vamos realizar pelo menos 10 largadas em sequência. Estudar linha de, _favored end_ e aceleração.",
    rating: null,
    location: {
      place: {
        location: { latitude: -22.9068, longitude: -43.1729 },
        name: "Marina da Glória, RJ",
      },
    },
    expectedStart: {
      datetime: "2026-01-25T09:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    expectedEnd: {
      datetime: "2026-01-25T12:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualStart: null,
    actualEnd: null,
    classes: ["49er", "49erFX"],
    tags: ["Largada", "Posicionamento"],
    coachIds: ["coach-3"],
    sailorIds: ["sailor-1", "sailor-9"],
    tunningModelIds: [],
    mediaIds: [],
    metereologySummary: {
      condition: "partly-cloudy", // Forecast
      temperature: 27,
      feelsLikeTemperature: 29,
      wind: { speed: 10, direction: 180, gust: 12, shift: 10 },
      current: { speed: 1.0, direction: 160 },
      waves: { height: 0.5, period: 5 },
    },
    otherMetereologySummaries: [],
  },

  // 5. Cancelled Practice
  {
    id: "practice-005",
    status: "cancelled",
    name: "Regata de Percurso Longo",
    descriptionMarkdown:
      "**CANCELADO** devido a alerta de tempestade elétrica severa pela defesa civil. Remarcado para a próxima semana.",
    rating: null,
    location: {
      place: {
        location: { latitude: -30.1088, longitude: -51.2483 },
        name: "Porto Alegre, RS",
      },
    },
    expectedStart: {
      datetime: "2026-01-19T13:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    expectedEnd: {
      datetime: "2026-01-19T16:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualStart: null,
    actualEnd: null,
    classes: ["Snipe", "Laser"],
    tags: ["Cancelado"],
    coachIds: ["coach-4"],
    sailorIds: ["sailor-2", "sailor-5"],
    tunningModelIds: [],
    mediaIds: [],
    metereologySummary: {
      condition: "stormy",
      temperature: 19,
      feelsLikeTemperature: 17,
      wind: { speed: 30, direction: 270, gust: 45, shift: 0 },
      current: { speed: 2.0, direction: 270 },
      waves: { height: 1.2, period: 4 },
    },
    otherMetereologySummaries: [],
  },

  // 6. Florianópolis - High Performance
  {
    id: "practice-006",
    status: "finished",
    name: "Foiling e Velocidade Máxima",
    descriptionMarkdown:
      "Dia perfeito em Jurerê. Vento terral constante. Focamos em manter o voo nas manobras (tack e gybe). \n\n* Velocidade máx atingida: 22 kts\n* Quedas: 3",
    rating: 5,
    location: {
      place: {
        location: { latitude: -27.4298, longitude: -48.5134 },
        name: "Jurerê Internacional, SC",
      },
    },
    expectedStart: {
      datetime: "2026-01-17T11:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    expectedEnd: {
      datetime: "2026-01-17T15:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualStart: {
      datetime: "2026-01-17T11:10:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualEnd: {
      datetime: "2026-01-17T15:20:00Z",
      timezone: "America/Sao_Paulo",
    },
    classes: ["Nacra 17", "Kitefoil"],
    tags: ["Foiling", "Speed"],
    coachIds: ["coach-5"],
    sailorIds: ["sailor-10", "sailor-11"],
    tunningModelIds: [],
    mediaIds: [],
    metereologySummary: {
      condition: "sunny",
      temperature: 29,
      feelsLikeTemperature: 31,
      wind: { speed: 14, direction: 360, gust: 16, shift: 5 },
      current: { speed: 0.5, direction: 90 },
      waves: { height: 0.3, period: 4 },
    },
    otherMetereologySummaries: [],
  },

  // 7. Niterói - Beginners
  {
    id: "practice-007",
    status: "finished",
    name: "Iniciação - Primeiras Viradas",
    descriptionMarkdown:
      "Turma de iniciação. O mar estava liso dentro da enseada de Charitas, ideal para aprender a posição do corpo na virada de bordo. Todos conseguiram completar o percurso triângulo.",
    rating: 5,
    location: {
      place: {
        location: { latitude: -22.9298, longitude: -43.1023 },
        name: "Charitas, Niterói - RJ",
      },
    },
    expectedStart: {
      datetime: "2026-01-21T09:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    expectedEnd: {
      datetime: "2026-01-21T11:30:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualStart: {
      datetime: "2026-01-21T09:15:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualEnd: {
      datetime: "2026-01-21T11:45:00Z",
      timezone: "America/Sao_Paulo",
    },
    classes: ["Optimist", "Dingue"],
    tags: ["Escolinha", "Básico"],
    coachIds: ["coach-6"],
    sailorIds: ["sailor-12", "sailor-13", "sailor-14", "sailor-15"],
    tunningModelIds: [],
    mediaIds: [],
    metereologySummary: {
      condition: "sunny",
      temperature: 26,
      feelsLikeTemperature: 28,
      wind: { speed: 6, direction: 190, gust: 8, shift: 10 },
      current: { speed: 0.2, direction: 180 },
      waves: { height: 0.2, period: 3 },
    },
    otherMetereologySummaries: [],
  },

  // 8. Salvador - Ocean Sailing
  {
    id: "practice-008",
    status: "finished",
    name: "Navegação por Instrumentos",
    descriptionMarkdown:
      "Treino de **Ocean** na Baía de Todos-os-Santos. Foco em uso de GPS e carta náutica. Vento alísio constante.",
    rating: 4,
    location: {
      place: {
        location: { latitude: -12.9777, longitude: -38.5016 },
        name: "Salvador, BA",
      },
    },
    expectedStart: {
      datetime: "2026-01-16T13:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    expectedEnd: {
      datetime: "2026-01-16T18:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualStart: {
      datetime: "2026-01-16T13:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualEnd: {
      datetime: "2026-01-16T17:50:00Z",
      timezone: "America/Sao_Paulo",
    },
    classes: ["Ocean"],
    tags: ["Navegação", "Endurance"],
    coachIds: ["coach-7"],
    sailorIds: ["sailor-16"],
    tunningModelIds: [],
    mediaIds: [],
    metereologySummary: {
      condition: "partly-cloudy",
      temperature: 30,
      feelsLikeTemperature: 33,
      wind: { speed: 15, direction: 90, gust: 18, shift: 0 },
      current: { speed: 1.0, direction: 270 },
      waves: { height: 1.0, period: 7 },
    },
    otherMetereologySummaries: [],
  },

  // 9. Búzios - Tactics
  {
    id: "practice-009",
    status: "finished",
    name: "Regata Treino Manguinhos",
    descriptionMarkdown:
      "Simulação de campeonato. A raia estava curta e técnica. Muitas trocas de liderança na boia de barlavento.",
    rating: 5,
    location: {
      place: {
        location: { latitude: -22.7562, longitude: -41.8887 },
        name: "Búzios, RJ",
      },
    },
    expectedStart: {
      datetime: "2026-01-19T10:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    expectedEnd: {
      datetime: "2026-01-19T14:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualStart: {
      datetime: "2026-01-19T10:30:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualEnd: {
      datetime: "2026-01-19T14:30:00Z",
      timezone: "America/Sao_Paulo",
    },
    classes: ["Laser", "Windsurf"],
    tags: ["Regata", "Competição"],
    coachIds: ["coach-2"],
    sailorIds: ["sailor-1", "sailor-3", "sailor-4"],
    tunningModelIds: [],
    mediaIds: [],
    metereologySummary: {
      condition: "sunny",
      temperature: 26,
      feelsLikeTemperature: 27,
      wind: { speed: 18, direction: 45, gust: 22, shift: 10 },
      current: { speed: 0.5, direction: 45 },
      waves: { height: 0.6, period: 5 },
    },
    otherMetereologySummaries: [],
  },

  // 10. Scheduled - Equipment Maintenance/Test
  {
    id: "practice-010",
    status: "scheduled",
    name: "Teste de Material Novo",
    descriptionMarkdown:
      "Teste das velas novas da North Sails e ajuste de mastro. Não haverá regatas, apenas _speed test_ em linha reta contra outro barco referência.",
    rating: null,
    location: {
      place: {
        location: { latitude: -22.9068, longitude: -43.1729 },
        name: "Rio de Janeiro, RJ",
      },
    },
    expectedStart: {
      datetime: "2026-01-26T14:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    expectedEnd: {
      datetime: "2026-01-26T16:00:00Z",
      timezone: "America/Sao_Paulo",
    },
    actualStart: null,
    actualEnd: null,
    classes: ["470", "420"],
    tags: ["Material", "Speed Test"],
    coachIds: ["coach-1"],
    sailorIds: ["sailor-2", "sailor-3"],
    tunningModelIds: [],
    mediaIds: [],
    metereologySummary: {
      condition: "cloudy",
      temperature: 25,
      feelsLikeTemperature: 26,
      wind: { speed: 10, direction: 135, gust: 12, shift: 5 },
      current: { speed: 0.8, direction: 180 },
      waves: { height: 0.6, period: 6 },
    },
    otherMetereologySummaries: [],
  },
];
