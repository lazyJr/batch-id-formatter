const source = document.getElementById('source');
const result = document.getElementById('result');
const count = document.getElementById('count');
const copy = document.getElementById('copy');
const status = document.getElementById('status');
const numberLength = document.getElementById('number-length');
const quoteValues = { double: '"', single: "'", none: '' };
let selectedQuote = 'double';

function refresh() {
  const ids = extractIds(source.value, numberLength.value);
  result.value = formatIds(source.value, quoteValues[selectedQuote], numberLength.value);
  count.textContent = `${ids.length} 个编号`;
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
    status.textContent = '已复制到剪贴板';
  } catch {
    result.select();
    status.textContent = '复制失败，请手动复制已选中的结果';
  }
});
