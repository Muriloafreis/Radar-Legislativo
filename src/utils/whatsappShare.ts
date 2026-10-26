/**
 * Utilitário de compartilhamento rápido e formatado no WhatsApp
 * com textos didáticos e neutros para eleitores e cidadãos comuns.
 */

export const APP_PUBLIC_URL = 'https://tinyurl.com/29gjfn36';

export function shareOnWhatsApp(text: string) {
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

export function shareProjectWhatsApp(code: string, title: string, simpleSummary: string, status: string) {
  const message = `🏛️ *Radar Legislativo Brasil*\n\n` +
    `Fique de olho no que o Congresso está votando agora:\n` +
    `📌 *Projeto:* ${code} - ${title}\n` +
    `🚦 *Situação:* ${status}\n\n` +
    `💬 *O que muda na prática para você:*\n` +
    `"${simpleSummary}"\n\n` +
    `🔍 Veja a lista completa de quem votou a favor ou contra e as fontes oficiais (.gov.br):\n` +
    `${APP_PUBLIC_URL}`;

  shareOnWhatsApp(message);
}

export function sharePoliticianWhatsApp(name: string, party: string, state: string, alignmentGov: number, flagProposal: string) {
  const message = `🗳️ *Raio-X do Parlamentar (Eleições)*\n\n` +
    `👤 *Político:* ${name} (${party}/${state})\n` +
    `📊 *Alinhamento com o Governo Federal:* ${alignmentGov}%\n` +
    `📜 *Principal Proposta:* ${flagProposal}\n\n` +
    `Antes de votar, veja o histórico real de votações nominais e coerência ideológica aqui:\n` +
    `${APP_PUBLIC_URL}`;

  shareOnWhatsApp(message);
}

export function sharePublicWorkWhatsApp(name: string, city: string, uf: string, investment: string, daysRemaining: number, simpleDesc: string) {
  const daysText = daysRemaining === 0 ? 'Obra Concluída' : `Restam ${daysRemaining} dias`;
  const message = `🚧 *Fiscalização de Obras Públicas*\n\n` +
    `📍 *Local:* ${city} / ${uf}\n` +
    `🏗️ *Obra:* ${name}\n` +
    `💰 *Investimento Público:* ${investment}\n` +
    `⏱️ *Prazo Previsto:* ${daysText}\n\n` +
    `💬 *Em bom português (o que muda):*\n` +
    `"${simpleDesc}"\n\n` +
    `Confira o andamento das obras da sua cidade no Radar Brasil:\n` +
    `${APP_PUBLIC_URL}`;

  shareOnWhatsApp(message);
}

export function shareColinhaWhatsApp(colinhaItems: { cargoLabel: string; candidateNumber: string; candidateName: string; party: string }[]) {
  let list = '';
  colinhaItems.forEach(item => {
    list += `▫️ *${item.cargoLabel}:* ${item.candidateNumber || 'Não preenchido'} - ${item.candidateName || ''} (${item.party || ''})\n`;
  });

  const message = `🗳️ *Minha Colinha Eleitoral para o Dia da Votação*\n\n` +
    `Lembrete: não pode entrar com celular na cabine, anote estes números num papel!\n\n` +
    `${list}\n` +
    `💡 Monte a sua colinha eleitoral e confira o histórico dos políticos antes de votar:\n` +
    `${APP_PUBLIC_URL}`;

  shareOnWhatsApp(message);
}
