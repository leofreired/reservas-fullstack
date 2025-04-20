// utils.js

export function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
      hour12: false
    });
  }
  