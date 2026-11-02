function extractIds(input, numberLength = 0) {
  const length = Number(numberLength);
  const hasSeparators = /[\s,，、;；'"“”‘’]/.test(input);
  return input.split(/[\s,，、;；'"“”‘’]+/).filter(Boolean).flatMap(token => {
    if (/^\d+$/.test(token) && Number.isInteger(length) && length > 0 && token.length > length) {
      return token.match(new RegExp(`.{1,${length}}`, 'g'));
    }
    if (hasSeparators) return [token];
    const parts = token.match(/[A-Za-z]+\d+/g);
    if (parts && parts.length > 1 && parts.join('') === token) return parts;
    return [token];
  });
}

function formatIds(input, quote = '"', numberLength = 0) {
  const ids = extractIds(input, numberLength);
  return ids.map(id => `${quote}${id}${quote}`).join(',\n');
}

if (typeof module !== 'undefined') module.exports = { extractIds, formatIds };
