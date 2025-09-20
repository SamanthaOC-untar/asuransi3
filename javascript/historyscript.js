// ===== Helpers =====
function rupiah(n){
  return new Intl.NumberFormat('id-ID', {
    style:'currency', currency:'IDR', minimumFractionDigits:0, maximumFractionDigits:0
  }).format(n || 0);
}
function tanggalIndo(iso){
  const d = new Date(iso);
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long', timeStyle: 'short'
  }).format(d);
}

// ===== Data Dummy =====
const DUMMY_AWAL = [
  { id:'ORD-1001', waktu:'2025-01-15T09:32:00.000Z', produk:'Asuransi Jiwa', jenis:'Jiwa',       nama:'Samantha', premi:2500000, status:'Lunas' },
  { id:'ORD-1002', waktu:'2025-02-02T13:05:00.000Z', produk:'Asuransi Jiwa', jenis:'Jiwa',       nama:'Samantha', premi:1800000, status:'Belum Lunas' },
  { id:'ORD-1003', waktu:'2025-02-10T19:45:00.000Z', produk:'Asuransi Kesehatan', jenis:'Kesehatan', nama:'Samantha', premi:3200000, status:'Belum Lunas' }
];
let historyArr = JSON.parse(JSON.stringify(DUMMY_AWAL));

// Tandai lunas jika dipanggil dengan ?paid=true&id=ORD-xxxx
const q = new URLSearchParams(location.search);
const paid = q.get('paid');
const id = q.get('id');
if (paid === 'true' && id) {
  const idx = historyArr.findIndex(x => x.id === id);
  if (idx !== -1) historyArr[idx].status = 'Lunas';
}

// ===== UI binding =====
const loginInfo  = document.getElementById('loginInfo');
const tbody      = document.getElementById('tbodyHistory');
const emptyState = document.getElementById('emptyState');
const btnKembali = document.getElementById('btnKembali');
const btnReload  = document.getElementById('btnReload');

// Asumsikan sudah login
loginInfo.textContent = `Login sebagai — ${historyArr[0]?.nama || 'Pengguna'}`;

// Render
function render(){
  if (!historyArr.length) {
    emptyState.textContent = 'Belum ada transaksi (data dummy kosong).';
    return;
  } else {
    emptyState.textContent = '';
  }

  tbody.innerHTML = historyArr.map(item => `
    <tr>
      <td style="padding:10px; border-bottom:1px solid var(--border);">${item.produk}</td>
      <td style="padding:10px; border-bottom:1px solid var(--border);">${item.jenis}</td>
      <td style="padding:10px; border-bottom:1px solid var(--border);">${tanggalIndo(item.waktu)}</td>
      <td style="padding:10px; border-bottom:1px solid var(--border);">${rupiah(item.premi)}</td>
      <td style="padding:10px; border-bottom:1px solid var(--border);">
        ${item.status === 'Lunas' ? 'Lunas' : 'Belum Lunas'}
      </td>
    </tr>
  `).join('');
}
render();

// Aksi
btnKembali.addEventListener('click', () => {
  history.length > 1 ? history.back() : (location.href = 'index.html');
});
btnReload.addEventListener('click', () => {
  historyArr = JSON.parse(JSON.stringify(DUMMY_AWAL));
  render();
});
