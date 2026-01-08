
import { Question, Scenario } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Prioridade Máxima",
    text: "Quando um lead chama no WhatsApp vindo do tráfego pago, qual deve ser a prioridade do atendimento?",
    options: [
      { id: 'a', text: "Passar todas as informações do procedimento", isCorrect: false },
      { id: 'b', text: "Responder rápido e conduzir para o agendamento", isCorrect: true },
      { id: 'c', text: "Esperar o cliente perguntar tudo", isCorrect: false },
      { id: 'd', text: "Passar o preço o mais rápido possível", isCorrect: false }
    ],
    explanation: "O lead (pessoa interessada que deixou contato) vindo de tráfego pago (anúncios) tem um custo. No WhatsApp, não somos apenas um SAC (Serviço de Atendimento ao Cliente - que só tira dúvidas), somos uma força de pré-venda ativa!",
    funFact: "💡 SAC = Reativo (espera). Vendas = Ativo (conduz)."
  },
  {
    id: 2,
    title: "A Primeira Impressão",
    text: "Qual dessas aberturas é a mais indicada para iniciar um atendimento no WhatsApp?",
    options: [
      { id: 'a', text: "“Clínica X, bom dia.”", isCorrect: false },
      { id: 'b', text: "“Procedimento custa a partir de R$…”", isCorrect: false },
      { id: 'c', text: "“Oi, tudo bem? 😊 Que bom que chamou a Clínica X! Me conta, o que te motivou a procurar a gente hoje?”", isCorrect: true },
      { id: 'd', text: "“Qual procedimento você quer?”", isCorrect: false }
    ],
    explanation: "Essa abertura humaniza e foca no motivo do contato. É o início da conexão emocional antes da transação comercial.",
  },
  {
    id: 3,
    title: "Funil Mental",
    text: "Segundo o funil mental do cliente, em qual etapa ele está quando pergunta: “Quais são os benefícios do botox?”",
    options: [
      { id: 'a', text: "Atenção", isCorrect: false },
      { id: 'b', text: "Interesse", isCorrect: true },
      { id: 'c', text: "Desejo", isCorrect: false },
      { id: 'd', text: "Ação", isCorrect: false }
    ],
    explanation: "O cliente já deu Atenção ao anúncio e agora demonstra Interesse real. Ele quer saber se a solução serve para ele. É a fase de nutrir e educar!",
  },
  {
    id: 4,
    title: "Valor vs Preço",
    text: "Qual é o maior erro ao passar o valor de um procedimento logo no início da conversa?",
    options: [
      { id: 'a', text: "Demorar demais", isCorrect: false },
      { id: 'b', text: "O cliente não entender o procedimento", isCorrect: false },
      { id: 'c', text: "Não gerar valor antes do preço", isCorrect: true },
      { id: 'd', text: "O cliente pedir desconto", isCorrect: false }
    ],
    explanation: "Preço é o custo financeiro. Valor é a percepção de benefício. Sem gerar valor (mostrar benefícios/transformação), o preço sempre parecerá caro.",
    funFact: "⚠️ Dica: Valor vem da percepção; Preço vem da conta bancária."
  },
  {
    id: 5,
    title: "Condução da Venda",
    text: "Qual dessas frases é a melhor forma de conduzir o cliente para o agendamento?",
    options: [
      { id: 'a', text: "“Se quiser, podemos agendar.”", isCorrect: false },
      { id: 'b', text: "“Você quer marcar?”", isCorrect: false },
      { id: 'c', text: "“Tenho horário amanhã ou quinta, qual fica melhor pra você?”", isCorrect: true },
      { id: 'd', text: "“Quando puder, me avisa.”", isCorrect: false }
    ],
    explanation: "A técnica da 'Alternativa' conduz a decisão. Em vez de perguntar 'se' ele quer, você pergunta 'qual' opção ele prefere.",
  },
  {
    id: 6,
    title: "Regra do Áudio",
    text: "No atendimento via WhatsApp, qual é a forma correta de usar áudios?",
    options: [
      { id: 'a', text: "Sempre usar áudios longos", isCorrect: false },
      { id: 'b', text: "Nunca usar áudio", isCorrect: false },
      { id: 'c', text: "Usar apenas quando o cliente usar primeiro ou em áudios curtos/objetivos", isCorrect: true },
      { id: 'd', text: "Mandar áudio explicando tudo de uma vez", isCorrect: false }
    ],
    explanation: "WhatsApp não é podcast! Áudios longos são invasivos. Siga o ritmo do cliente para manter o Rapport (conexão/sintonia).",
  },
  {
    id: 7,
    title: "Acompanhamento (Follow-up)",
    text: "Se o cliente não respondeu após o primeiro contato, o que deve ser feito?",
    options: [
      { id: 'a', text: "Arquivar e esquecer", isCorrect: false },
      { id: 'b', text: "Esperar o cliente responder", isCorrect: false },
      { id: 'c', text: "Fazer follow-up educado e estratégico", isCorrect: true },
      { id: 'd', text: "Enviar desconto imediatamente", isCorrect: false }
    ],
    explanation: "O Follow-up (acompanhamento/retorno) é essencial. Muitas vezes o cliente só se distraiu. Não é ser chato, é ser profissional.",
  },
  {
    id: 8,
    title: "Exemplo de Sucesso",
    text: "Qual dessas mensagens é um bom exemplo de follow-up?",
    options: [
      { id: 'a', text: "“E aí, vai fechar?”", isCorrect: false },
      { id: 'b', text: "“Estou aguardando resposta.”", isCorrect: false },
      { id: 'c', text: "“Oi 😊 passando pra retomar nossa conversa sobre seu agendamento. Qual dia da semana fica melhor pra você?”", isCorrect: true },
      { id: 'd', text: "“Última chance.”", isCorrect: false }
    ],
    explanation: "Uma mensagem eficaz deve ter um CTA (Call to Action - Chamada para Ação). É a instrução clara do próximo passo.",
    funFact: "🚀 Sem CTA, o cliente fica perdido e a conversa morre."
  },
  {
    id: 9,
    title: "Personalização",
    text: "Por que entender o perfil do cliente (mais reservado ou comunicativo) é importante?",
    options: [
      { id: 'a', text: "Para responder mais rápido", isCorrect: false },
      { id: 'b', text: "Para adaptar o tom, a linguagem e o ritmo do atendimento", isCorrect: true },
      { id: 'c', text: "Para vender mais caro", isCorrect: false },
      { id: 'd', text: "Para encerrar rápido a conversa", isCorrect: false }
    ],
    explanation: "Isso cria Rapport (conexão). Adaptar-se ao estilo do cliente gera confiança e quebra barreiras de venda.",
  },
  {
    id: 10,
    title: "O Fechamento",
    text: "Complete a frase: “O marketing traz o cliente até o WhatsApp, mas quem transforma conversa em ________ é o atendimento.”",
    options: [
      { id: 'a', text: "Curtida", isCorrect: false },
      { id: 'b', text: "Orçamento", isCorrect: false },
      { id: 'c', text: "Agendamento", isCorrect: true },
      { id: 'd', text: "Desconto", isCorrect: false }
    ],
    explanation: "Em clínicas, o 'gol' do WhatsApp é o agendamento. Sem agenda cheia, a clínica não fatura.",
  }
];

export const ROLEPLAY_SCENARIOS: Scenario[] = [
  {
    id: 'preco',
    title: 'Cliente Preço',
    emoji: '💰',
    context: 'O lead acabou de ver um anúncio e quer saber o valor imediatamente.',
    objective: 'Levar o cliente para a avaliação agendada, sem falar preço de cara.',
    idealExample: 'Entendo 😊 antes de falar de valores, me conta: você já fez botox antes ou seria a primeira vez?',
    initialMessage: 'Oi, quanto custa o botox?',
    type: 'NORMAL'
  },
  {
    id: 'dor',
    title: 'Cliente com Dor',
    emoji: '🦷',
    context: 'O lead está com uma dor urgente e precisa de uma solução rápida.',
    objective: 'Demonstrar empatia, transmitir segurança e agendar o mais rápido possível.',
    idealExample: 'Sinto muito que esteja com dor 😥. Tenho um horário ainda hoje, prefere agora à tarde ou no final do dia?',
    initialMessage: 'Tô com muita dor de dente, vocês atendem hoje?',
    type: 'NORMAL'
  },
  {
    id: 'frio',
    title: 'Cliente Frio',
    emoji: '🧊',
    context: 'O lead é direto e parece estar sem paciência para conversa.',
    objective: 'Quebrar a resistência e gerar interesse sem confronto.',
    idealExample: 'Claro 😊 o valor varia de acordo com a avaliação. O que mais te incomoda hoje?',
    initialMessage: 'Só quero saber o valor.',
    type: 'NORMAL'
  },
  {
    id: 'sumido',
    title: 'Cliente Sumido',
    emoji: '👻',
    context: 'O cliente parou de responder após você passar as primeiras informações.',
    objective: 'Fazer um follow-up (acompanhamento) educado com CTA claro.',
    idealExample: 'Oi 😊 passando pra retomar nossa conversa. Qual dia da semana fica melhor pra você?',
    initialMessage: '(Silêncio do lead há 24h)',
    type: 'NORMAL'
  },
  {
    id: 'inseguro',
    title: 'Cliente Inseguro',
    emoji: '😰',
    context: 'O lead tem medo de resultados artificiais ou do procedimento em si.',
    objective: 'Gerar confiança, autoridade e segurança.',
    idealExample: 'Aqui focamos em naturalidade 😊. Posso agendar uma avaliação para tirar suas dúvidas?',
    initialMessage: 'Tenho medo de ficar artificial.',
    type: 'NORMAL'
  },
  {
    id: 'surpresa_caro',
    title: 'Objeção: Caro',
    emoji: '⚠️',
    context: 'O cliente achou o valor alto após você finalmente informar.',
    objective: 'Retomar o valor e reforçar benefícios.',
    idealExample: 'Entendo 😊 o valor reflete o cuidado e a segurança. Vamos agendar uma avaliação?',
    initialMessage: 'Achei caro.',
    type: 'SURPRISE'
  }
];
