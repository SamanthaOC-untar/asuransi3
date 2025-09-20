const beliKesehatanForm = document.getElementById('beliKesehatanForm');
const hargaPremi=document.getElementById('hargaPremi');
const namaLengkap=document.getElementById('namaLengkap');
const tanggalLahir=document.getElementById('tanggalLahir');
const pekerjaan=document.getElementById('pekerjaan');
const merokok=document.getElementById('merokok');
const riwayatHipertensi=document.getElementById('riwayatHipertensi');
const riwayatDiabetes=document.getElementById('riwayatDiabetes');
const errors=document.getElementById('errors');

beliKesehatanForm.addEventListener("submit", function(e){
    e.preventDefault();
    
    console.log(pekerjaan);
    let nama = namaLengkap.value.trim();
    let tanggal = tanggalLahir.value.trim();
    let job = pekerjaan.value.trim();
    let rokok = merokok.value.trim();
    let hipertensi = riwayatHipertensi.value.trim();
    let diabetes = riwayatDiabetes.value.trim();

    //input validation
    let errs=[];

    if(!nama) errs.push("Nama Lengkap is required.");
    if(!tanggal) errs.push("Tanggal Lahir is required.");
    if(!job) errs.push("Pekerjaan is required.");
    if(!rokok) errs.push("Merokok is required.");
    if(!hipertensi) errs.push("Riwayat Hipertensi is required.");
    if(!diabetes) errs.push("Riwayat Diabetes is required.");
    if(errs.length>0){
        errors.innerHTML = errs.join("<br>");
        errors.innerHTML =`
            <ul>
            ${errs.map((e) => `<li>${e}</li>`).join("")}
            </ul>
        `;
        return;
    }
    else{
        //Hitung harga premi asuransi
        let premi=2000000;
        let tahunLahir = new Date(tanggal).getFullYear();
        let umur = 2025-tahunLahir;

        if(umur<=20) premi += premi*0.1;
        else if(umur<=35) premi += premi*0.2;
        else if(umur<=50) premi += premi*0.3;
        else premi += premi*0.4;

        if(merokok == "Ya") premi += premi*0.5;
        if(hipertensi == "Ya") premi += premi*0.4;
        if(diabetes == "Ya") premi += premi*0.5;

        hargaPremi.innerHTML =`
            <br>
            <h1 style="border:1px solid black; padding:10px;">
                Harga Premi: ${new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',minimumFractionDigits:0,maximumFractionDigits:0}).format(premi)},00
            </h1>
            <br>
        `;
        alert("Data Asuransi Jiwa berhasil diinput!");
        return;
    }

});


