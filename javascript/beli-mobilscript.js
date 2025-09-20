const beliMobilForm = document.getElementById('beliMobilForm');
const merkMobil=document.getElementById('merkMobil');
const jenisMobil=document.getElementById('jenisMobil');
const tahunMobil=document.getElementById('tahunMobil');
const hargaMobil=document.getElementById('hargaMobil');
const nomorPlatMobil=document.getElementById('nomorPlatMobil');
const nomorMesin=document.getElementById('nomorMesin');
const nomorRangka=document.getElementById('nomorRangka');
const namaPemilik=document.getElementById('namaPemilik');
const errors=document.getElementById('errors');
const hargaPremi=document.getElementById('hargaPremi');

console.log(beliMobilForm);
beliMobilForm.addEventListener("submit", function(e){
    e.preventDefault();

    let merk = merkMobil.value.trim();
    let jenis = jenisMobil.value.trim();
    let tahun = tahunMobil.value.trim();
    let harga = hargaMobil.value.trim();
    let plat = nomorPlatMobil.value.trim();
    let mesin = nomorMesin.value.trim();
    let rangka = nomorRangka.value.trim();
    let pemilik = namaPemilik.value.trim();

    //input validation
    let errs=[];

    if(!merk) errs.push("Merk Mobil is required.");
    if(!jenis) errs.push("Jenis Mobil is required.");
    if(!tahun) errs.push("Tahun Mobil is required.");
    if(!harga) errs.push("Harga Mobil is required.");
    if(!plat) errs.push("Nomor Plat Mobil is required.");
    if(!mesin) errs.push("Nomor Mesin is required.");
    if(!rangka) errs.push("Nomor Rangka is required.");
    if(!pemilik) errs.push("Nama Pemilik is required.");
    if(errs.length>0){
        errors.innerHTML = errs.join("<br>");
        errors.innerHTML =`
            <ul>
            ${errs.map((e) => `<li>${e}</li>`).join("")}
            </ul>
        `;
    }
    else{
            //Hitung harga premi asuransi
        let lama = 2025-tahun;
        if(lama < 3) premi = harga*0.025;
        if(lama>=3 &&lama<=5 ){
            if(harga<=200000000){
                premi = harga*0.04;
            }
            else{
                premi = harga*0.03;
            }
        }
        if(lama>5) premi = harga*0.05;

        hargaPremi.innerHTML =`
            <h1 style="border:1px solid black; padding:10px;">
                Harga Premi: ${new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',minimumFractionDigits:0,maximumFractionDigits:0}).format(premi)},00/tahun
            </h1>
            <br>
            <button type="button" id="btnCheckout" class="btn-checkout">Checkout</button>

        `;
        alert("Data asuransi mobil berhasil diinput!");
    }

    btnCheckout.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });

});


