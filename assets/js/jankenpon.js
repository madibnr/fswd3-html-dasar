let welcome = confirm("Selamat Datang di Jankenpon");
let pertanyaan = confirm("Apakah kamu ingin bermain?");
let nama = prompt("Masukkan Nama Anda :");

var tanya = true;
while(tanya) {
    var p = prompt('pilihlah: batu, kertas, gunting')

    var comp = Math.random();

    if( comp < 0.34) {
        comp = 'batu';
    } else if( comp >= 0.34 && comp < 0.67) {
        comp = 'gunting';
    } else{
        comp = 'kertas';
    }

    var hasil = '';
    if( p == comp) {
        hasil = 'SERI!';    
    } else if( p == 'batu') {
        if( comp == 'gunting') {
            hasil = 'MENANG!';
        } else {
            hasil = 'KALAH!';
        }
    } else if( p == 'gunting') {
        if( comp == 'batu') {
            hasil = 'KALAH!';
        } else {
            hasil = 'MENANG!';
        }
    } else if( p == 'kertas') {
        hasil = (comp == 'batu') ? 'MENANG!' : 'KALAH!';
    } else {
        hasil = "tidak terdeteksi!"
    }

    alert('Kamu memilih : ' + p + ' dan Komputer memilih : ' + comp +'\nMaka hasilnya : Kamu ' + hasil)

    tanya = confirm('bermain lagi?');
}

alert('Terimakasih sudah bermain.')
console.log('Nama : ' + nama)
console.log('Kamu memilih : ' + p + ' dan Komputer memilih : ' + comp +'\nMaka hasilnya : Kamu ' + hasil)