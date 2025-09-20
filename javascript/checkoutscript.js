// Helper format rupiah
function rupiah(n){
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(n || 0);
}

// Ambil parameter dari URL (dikirim dari halaman sebelumnya)
const params = new URLSearchParams(location.search);
const nama = params.get('nama') || 'Pengguna';
const premi = Number(params.get('premi') || 0);

// Elemen
const loginInfo = document.getElementById('loginInfo');
const namaTertanggung = document.getElementById('namaTertanggung');
const hargaPremiText = document.getElementById('hargaPremiText');
const paymentForm = document.getElementById('paymentForm');
const btnBayar = document.getElementById('btnBayar');
const btnKembali = document.getElementById('btnKembali');
const processingCard = document.getElementById('processingCard');
const errors = document.getElementById('errors');

// Tampilkan ringkasan
namaTertanggung.textContent = nama;
hargaPremiText.textContent = premi ? rupiah(premi) : '-';

// Aktifkan tombol Bayar setelah pilih metode
paymentForm.addEventListener('change', (e) => {
  if (e.target.name === 'metode') btnBayar.disabled = false;
});

// Kembali
btnKembali.addEventListener('click', () => {
  history.length > 1 ? history.back() : (location.href = 'index.html');
});

// Submit: asumsi pembayaran sukses lalu arahkan ke histori
paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  errors.innerHTML = '';

  const metode = paymentForm.querySelector('input[name="metode"]:checked');
  if (!metode) {
    errors.innerHTML = '<ul><li>Silakan pilih metode pembayaran.</li></ul>';
    return;
  }

  // processingCard.classList.remove('hidden');
  btnBayar.disabled = true;
  // Redirect ke histori
  location.href = "history.html?";
});
