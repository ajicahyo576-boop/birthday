BIRTHDAY MOBILE-FIRST WEBSITE

Cara menjalankan:
1. Ekstrak folder birthday_mobile ke C:\xampp\htdocs\
2. Jalankan Apache di XAMPP.
3. Buka: http://localhost/birthday_mobile/

Kode rahasia demo: 2709
Untuk mengganti kode, buka js/script.js dan ubah:
const secretCode = "2709";

Untuk menambahkan foto:
- Masukkan foto ke assets/images/
- Ubah div .photo-placeholder di index.html menjadi <img src="assets/images/nama.jpg" alt="...">

Untuk menambahkan musik:
- Masukkan file MP3 ke assets/music/song.mp3
- Di js/script.js, aktifkan:
  audio.src = "assets/music/song.mp3";

Konten nama, surat, caption, dan playlist dapat diganti langsung di index.html.
