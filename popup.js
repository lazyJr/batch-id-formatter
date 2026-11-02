const source = document.getElementById('source');
const result = document.getElementById('result');
const count = document.getElementById('count');
const copy = document.getElementById('copy');
const status = document.getElementById('status');
const numberLength = document.getElementById('number-length');
const quoteValues = { double: '"', single: "'", none: '' };
let selectedQuote = 'double';
const message = (key, substitutions) => chrome.i18n.getMessage(key, substitutions) || key;

document.documentElement.lang = chrome.i18n.getUILanguage();
document.title = message('extensionName');
document.querySelectorAll('[data-i18n]').forEach(element => {
  element.textContent = message(element.dataset.i18n);
});
document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
  element.placeholder = message(element.dataset.i18nPlaceholder);
});
document.querySelectorAll('[data-i18n-aria]').forEach(element => {
  element.setAttribute('aria-label', message(element.dataset.i18nAria));
});

function refresh() {
  const ids = extractIds(source.value, numberLength.value);
  result.value = formatIds(source.value, quoteValues[selectedQuote], numberLength.value);
  count.textContent = message('count', String(ids.length));
  copy.disabled = ids.length === 0;
  status.textContent = '';
}

source.addEventListener('input', refresh);
numberLength.addEventListener('input', refresh);
document.getElementById('clear').addEventListener('click', () => {
  source.value = '';
  refresh();
  source.focus();
});
document.querySelectorAll('[data-quote]').forEach(button => {
  button.addEventListener('click', () => {
    selectedQuote = button.dataset.quote;
    document.querySelectorAll('[data-quote]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    refresh();
  });
});
copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(result.value);
    status.textContent = message('copied');
  } catch {
    result.select();
    status.textContent = message('copyFailed');
  }
});
refresh();
