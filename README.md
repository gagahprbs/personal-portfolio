# Website Profil Pribadi

Website profil dan portofolio satu halaman, dibuat dengan **HTML, CSS, dan JavaScript murni** tanpa framework dan tanpa backend. Semua konten (organisasi, projek, sertifikat, galeri) diatur dari satu tempat, yaitu objek `DATA` di `script.js`, sehingga kamu tidak perlu mengedit HTML.

## Fitur

- **Hero** dengan foto profil dan efek teks mengetik
- **Tentang**: deskripsi diri, bar keahlian, dan statistik dengan animasi hitung (angkanya otomatis dari jumlah data)
- **Pengalaman organisasi** dalam bentuk timeline
- **Projek** berupa kartu foto dan deskripsi
- **Sertifikat kejuaraan** dengan filter tingkat lomba dan tahun, bisa diperbesar
- **Galeri foto** bentuk masonry dengan filter kategori dan lightbox
- **Kontak**: tautan media sosial dan form dengan validasi, kirim lewat WhatsApp atau email
- Mode terang/gelap (pilihan tersimpan di browser)
- Navbar menempel di atas, menu aktif ikut berubah saat scroll, menu hamburger di HP
- Responsif (HP, tablet, desktop), lazy loading gambar, dan mendukung navigasi keyboard

## Struktur Folder

```
profil/
├── index.html      # Kerangka halaman
├── style.css       # Tampilan dan warna
├── script.js       # DATA pribadi (bagian atas) + fitur interaktif
├── README.md
└── picture/        # Semua foto kamu taruh di sini
    ├── foto-profil.jpg
    ├── projek-1.jpg
    ├── sertifikat-1.jpg
    └── galeri-1.jpg
```

## Cara Menjalankan

1. Taruh `index.html`, `style.css`, `script.js`, dan folder `picture/` dalam satu folder.
2. Klik dua kali `index.html` untuk membukanya di browser.

Tidak perlu instalasi apa pun. Koneksi internet hanya dibutuhkan untuk memuat font dari Google Fonts. Tanpa internet, font akan diganti font bawaan sistem dan semua fitur tetap berjalan.

## Cara Mengisi Data

Buka `script.js`, lalu edit objek `DATA` di bagian paling atas. Setiap baris yang diberi komentar `GANTI` adalah bagian yang perlu kamu isi.

| Bagian | Isi yang diatur |
|---|---|
| `profil` | nama, inisial logo, foto, lokasi, tagline, daftar profesi (teks yang diketik), deskripsi (satu item = satu paragraf), keahlian dengan level 0-100 |
| `kontak` | email, nomor WhatsApp (format `62...`, tanpa `+` dan spasi), daftar media sosial |
| `organisasi` | organisasi, jabatan, periode, deskripsi |
| `projek` | judul, deskripsi, gambar |
| `prestasi` | lomba, peringkat, penyelenggara, tahun, tingkat, gambar |
| `galeri` | gambar, keterangan, kategori |

**Menambah item:** salin satu blok `{ ... }` di dalam daftar yang sama, tempel di bawahnya (jangan lupa koma di antara blok), lalu ubah isinya.

**Menghapus item atau media sosial:** hapus blok yang bersangkutan.

**Filter otomatis:** pilihan filter di Prestasi (tingkat dan tahun) dan Galeri (kategori) dibuat dari data yang kamu isi. Cukup tulis nilai `tingkat`, `tahun`, atau `kategori` pada tiap item, tidak perlu mengubah kode lain.

## Cara Memasang Foto

1. Simpan foto di folder `picture/`.
2. Pastikan nama file di folder **sama persis** dengan yang tertulis di `DATA`, termasuk huruf besar-kecil dan ekstensinya (`.jpg` berbeda dengan `.jpeg` dan `.JPG`).
3. Jika sebuah file belum ada, website menampilkan gambar pengganti otomatis agar tampilan tetap rapi.

Saran ukuran:

| Jenis | Rasio yang pas | Catatan |
|---|---|---|
| Foto profil | 4:5 (potret) | Wajah di tengah |
| Foto projek | 16:10 (landscape) | Dipotong otomatis ke rasio ini |
| Sertifikat | 4:3 | Agar tulisan tetap terbaca |
| Galeri | Bebas | Tampil dengan rasio aslinya |

Kompres foto sebelum diunggah (idealnya di bawah 500 KB per foto) supaya website cepat dibuka.

## Mengubah Tampilan

- **Warna:** ubah variabel di `:root` (mode terang) dan `[data-theme="dark"]` (mode gelap) pada `style.css`. Warna utama ada di `--accent`, warna sorotan di `--pop`.
- **Font:** ubah `--font-display` dan `--font-body` di `style.css`, lalu ganti tautan Google Fonts di bagian `<head>` pada `index.html`.
- **Judul dan deskripsi untuk SEO:** ubah `<title>` dan tag `<meta>` di `<head>` pada `index.html`.
- **Menambah atau menghapus bagian:** tambahkan atau hapus `<section>` di `index.html` beserta tautannya di navbar. Untuk bagian baru yang datanya dinamis, tambahkan data di `DATA` dan satu fungsi render di `script.js`.

## Form Kontak

Form tidak menyimpan data di server. Saat tombol ditekan, pesan dikirim lewat:

- **WhatsApp:** membuka `wa.me` ke nomor di `DATA.kontak.whatsapp` dengan isi pesan terisi otomatis
- **Email:** membuka aplikasi email dengan `mailto:` ke alamat di `DATA.kontak.email`

Pengiriman tetap dilakukan oleh pengunjung dari aplikasi masing-masing.

## Publikasi

### GitHub Pages

1. Buat repository baru di GitHub, lalu unggah semua file dan folder `picture/`.
2. Buka **Settings → Pages**.
3. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu simpan.
4. Setelah beberapa menit, website tersedia di `https://username.github.io/nama-repository/`.

### Netlify

1. Buka Netlify Drop (`app.netlify.com/drop`).
2. Seret seluruh folder proyek ke halaman tersebut.
3. Website langsung online dan alamatnya bisa diganti di pengaturan situs.

## Pemecahan Masalah

| Masalah | Penyebab dan solusi |
|---|---|
| Foto tidak muncul dan hanya ada kotak berwarna | Nama atau ekstensi file tidak sama dengan di `DATA`, atau file tidak ada di folder `picture/` |
| Halaman kosong atau fitur tidak jalan | Ada kesalahan penulisan di `script.js` (misalnya koma atau tanda kutip kurang). Buka Console di browser (F12) untuk melihat pesan errornya |
| Tombol WhatsApp tidak membuka chat ke nomormu | Format nomor salah. Gunakan `62812...`, tanpa `0` di depan, tanpa `+` dan spasi |
| Tema tidak tersimpan | Browser memblokir penyimpanan lokal (misalnya mode privat). Fitur lain tetap normal |
| Perubahan tidak terlihat setelah dipublikasikan | Muat ulang paksa dengan `Ctrl + Shift + R` (atau `Cmd + Shift + R` di Mac) |

## Teknologi

HTML5, CSS3 (variabel CSS, Grid, Flexbox), JavaScript ES6+, dan elemen `<dialog>` untuk lightbox. Tidak ada library atau dependensi tambahan.