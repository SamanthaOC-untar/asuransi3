const beliJiwaForm = document.getElementById('beliJiwaForm');
const hargaPremi=document.getElementById('hargaPremi');
const namaLengkap=document.getElementById('namaLengkap');
const tanggalLahir=document.getElementById('tanggalLahir');
const tanggungan =document.getElementById('tanggungan');
const errors=document.getElementById('errors');

beliJiwaForm.addEventListener("submit", function(e){
    e.preventDefault();

    console.log(tanggungan);
    let nama = namaLengkap.value.trim();
    let tanggal = tanggalLahir.value.trim();
    let tanggung = tanggungan.value.trim();

    //input validation
    let errs=[];

    if(!nama) errs.push("Nama Lengkap is required.");
    if(!tanggal) errs.push("Tanggal Lahir is required.");
    if(!tanggung) errs.push("Tanggungan is required.");
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
        let premi;
        let tahunLahir = new Date(tanggal).getFullYear();
        let umur = 2025-tahunLahir;

        if(umur<=30) premi = tanggung*0.002;
        else if(umur<=50) premi = tanggung*0.004;
        else premi = tanggung*0.01;

        hargaPremi.innerHTML =`
            <br>
            <h1 style="border:1px solid black; padding:10px;">
                Harga Premi: ${new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',minimumFractionDigits:0,maximumFractionDigits:0}).format(premi)},00/bulan
            </h1>
            <br>
             <button type="button" id="btnCheckout" class="btn-checkout">Checkout</button>
        `;


        alert("Data Asuransi Jiwa berhasil diinput!");
    }

    btnCheckout.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });
  return;
});

