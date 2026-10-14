/* =========================================================
   SCRIPT.JS
   BAGIAN 1: DATA  -> bagian inilah yang kamu isi/ganti
   BAGIAN 2: KODE  -> tidak perlu diubah
   ========================================================= */

/* =========================================================
   BAGIAN 1: DATA PRIBADI
   Semua gambar disimpan di folder /picture/.
   Jika file gambar belum ada, website otomatis menampilkan
   gambar pengganti (placeholder) sehingga tampilan tetap rapi.
   ========================================================= */
const DATA = {

  /* ---------- Profil utama ---------- */
  profil: {
    nama: "Gagah prabaswara",                          // GANTI: nama lengkap
    inisial: "GPA",                              // GANTI: 2 huruf untuk logo navbar
    foto: "picture/gagah.jpg",             // GANTI: foto profil (rasio 4:5 paling bagus)
    lokasi: "Semarang, Indonesia",              // GANTI: kota, kosongkan "" untuk menyembunyikan
    tagline: "Usaha dan doa (ikhtiar)", // GANTI
    profesi: [                                  // GANTI: teks yang diketik bergantian di hero
      "Mahasiswa Teknologi Rekayasa Otomasi",
      "Aktivis Organisasi",
      "Juara Lomba"
    ],
    // Deskripsi diri: satu item = satu paragraf
    deskripsi: [
      "Mahasiswa teknologi rekasaya otomasi, Universitas diponegoro-2026",
      "Workflow & Process Automation: Merancang dan mengoptimalkan alur kerja digital agar berjalan secara efisien, minim intervensi manual, dan terintegrasi mulus antar-platform..",
      "Bertransformasi menjadi seorang Senior Automation Architect atau Head of Engineering Systems, yang mampu merancang infrastruktur otomatisasi lintas industri berskala besar dan membangun solusi teknologi yang berkelanjutan untuk masa depan.."
    ],
    // Keahlian: level 0-100
    keahlian: [
      { nama: "Kepemimpinan", level: 99 },
      { nama: "Public Speaking", level: 87 },
      { nama: "Microsoft Office", level: 70 },
      { nama: "Desain Grafis", level: 70 },
      { nama: "Analisis Data", level: 95 }
    ]
  },

  /* ---------- Kontak & media sosial ---------- */
  kontak: {
    email: "gagahprabaswara27@gmail.com",               // GANTI
    whatsapp: "0812345678",                  // GANTI: format 62..., tanpa tanda + dan spasi
    sosmed: [                                   // Hapus baris yang tidak dipakai
      { nama: "LinkedIn",  teks: "linkedin.com/in/gagah-prabaswara", url: "https://www.linkedin.com/in/gagah-prabaswara-a20011433/" },
      { nama: "Instagram", teks: "@prbsvvr",               url: "https://instagram.com/usernamekamu" },
      { nama: "GitHub",    teks: "github.com/gagahprbs",     url: "https://github.com/gagahprbs" }
    ]
  },

  /* ---------- Pengalaman organisasi (urutkan dari terbaru) ---------- */
  organisasi: [
    {
      organisasi: "Threvora 37",          // GANTI
      jabatan: "Koordinator lapangan",     // GANTI
      periode: "2026 january-june",                   // GANTI
      deskripsi: "Membuat jalannya acara menjadi sukse dan lancar"
    },
    {
      organisasi: "Karang taruna ",
      jabatan: "Bendahara",
      periode: "2024-2025",
      deskripsi: "Mengatur uang."
    }
  ],

  /* ---------- Projek (foto + deskripsi) ---------- */
  projek: [
    {
      judul: "ESP32",                   // GANTI
      deskripsi: "Mengembangkan sistem otomatisasi cerdas berbasis Internet of Things (IoT) menggunakan mikrokontroler ESP32. Proyek ini bertujuan untuk menghilangkan intervensi manual dalam pemantauan dan kontrol perangkat fisik, mengintegrasikan sensor lingkungan secara real-time, serta menciptakan alur kerja otomatis (automated workflow) antara perangkat keras (hardware) dan sistem digital.", // GANTI
      gambar: "picture/ESP32.jpeg"            // GANTI: foto projek
    }
  ],

  /* ---------- Sertifikat kejuaraan ---------- */
  // tingkat: bebas (Kampus, Kota, Provinsi, Nasional, Internasional, dst.)
  prestasi: [
    {
      lomba: "Liga AAFI Jakarta 3",                    // GANTI
      peringkat: "Juara 2",                     // GANTI
      penyelenggara: "AAFI",      // GANTI
      tahun: 2023,                              // GANTI
      tingkat: "Nasional",                      // GANTI
      gambar: "picture/FUTSA.jpg"         // GANTI: foto/scan sertifikat
    }
  ],

  /* ---------- Galeri foto ---------- */
  galeri: [
    { gambar: "picture/daulima.jpeg", keterangan: "Keterangan foto 1", kategori: "Kegiatan" },
    { gambar: "picture/duaempat.jpeg", keterangan: "Keterangan foto 2", kategori: "Perjalanan" },
    { gambar: "picture/duatiga.jpeg", keterangan: "Keterangan foto 3", kategori: "Lomba" },
    { gambar: "picture/ujan.jpeg", keterangan: "Keterangan foto 4", kategori: "Kegiatan" },
    { gambar: "picture/main.jpeg", keterangan: "Keterangan foto 5", kategori: "Perjalanan" },
    { gambar: "picture/tro.jpeg", keterangan: "Keterangan foto 6", kategori: "Lomba" }
  ]
};


/* =========================================================
   BAGIAN 2: KODE (tidak perlu diubah)
   ========================================================= */
(function () {
  "use strict";

  const $  = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Util: elemen aman (teks tidak dianggap HTML) ---------- */
  function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k.startsWith("data-") || k.startsWith("aria-")) node.setAttribute(k, v);
      else node[k] = v;
    }
    [].concat(children).forEach(c => c && node.append(c));
    return node;
  }

  /* ---------- Gambar pengganti jika file belum ada ---------- */
  function placeholder(teks, w = 800, h = 600) {
    const hue = [...teks].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
      `<rect width="100%" height="100%" fill="hsl(${hue},45%,82%)"/>` +
      `<text x="50%" y="50%" fill="hsl(${hue},40%,30%)" font-family="sans-serif" font-size="${Math.round(w / 18)}" ` +
      `text-anchor="middle" dominant-baseline="middle">${teks.replace(/[<>&"]/g, "")}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function gambar(src, alt, label, w, h, cls) {
    const img = el("img", { src, alt, loading: "lazy", decoding: "async" });
    if (cls) img.className = cls;
    if (w && h) { img.width = w; img.height = h; }
    img.addEventListener("error", () => { img.src = placeholder(label, w || 800, h || 600); }, { once: true });
    return img;
  }

  /* ---------- Isi data teks sederhana ---------- */
  function isiProfil() {
    const p = DATA.profil;
    $$("[data-bind=nama]").forEach(n => (n.textContent = p.nama));
    $$("[data-bind=inisial]").forEach(n => (n.textContent = p.inisial));
    $$("[data-bind=tagline]").forEach(n => (n.textContent = p.tagline));
    document.title = `${p.nama} | Profil & Portofolio`;
    $("#lokasiBadge").textContent = p.lokasi || "";
    $("#tahun").textContent = new Date().getFullYear();

    const foto = $("#fotoProfil");
    foto.src = p.foto;
    foto.alt = `Foto ${p.nama}`;
    foto.addEventListener("error", () => { foto.src = placeholder("Foto Profil", 480, 600); }, { once: true });

    // Deskripsi
    const d = $("#deskripsi");
    p.deskripsi.forEach(t => d.append(el("p", { text: t })));

    // Keahlian
    const ul = $("#skills");
    p.keahlian.forEach(s => {
      ul.append(el("li", { class: "skill" }, [
        el("div", { class: "skill__top" }, [el("span", { text: s.nama }), el("span", { text: s.level + "%" })]),
        el("div", { class: "skill__bar", role: "progressbar", "aria-valuenow": s.level, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": s.nama },
          [el("i", { "data-level": s.level })])
      ]));
    });
  }

  /* ---------- Statistik (otomatis dari jumlah data) ---------- */
  function isiStatistik() {
    const juara = DATA.prestasi.length;
    const item = [
      [DATA.organisasi.length, "Organisasi"],
      [DATA.projek.length, "Projek"],
      [juara, "Sertifikat kejuaraan"],
      [DATA.galeri.length, "Foto dokumentasi"]
    ];
    const dl = $("#stats");
    item.forEach(([n, label]) => {
      dl.append(el("div", { class: "stat" }, [
        el("dt", { text: label }),
        el("dd", { "data-count": n, text: "0" })
      ]));
    });
  }

  function animasiAngka(dd) {
    const target = +dd.dataset.count;
    if (reduceMotion || target === 0) { dd.textContent = target; return; }
    const durasi = 1100, mulai = performance.now();
    (function tick(now) {
      const t = Math.min((now - mulai) / durasi, 1);
      dd.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    })(mulai);
  }

  /* ---------- Organisasi ---------- */
  function isiOrganisasi() {
    const ol = $("#organisasiList");
    DATA.organisasi.forEach(o => {
      ol.append(el("li", { class: "tl reveal" }, [
        el("p", { class: "tl__period", text: o.periode }),
        el("h3", { class: "tl__title", text: o.jabatan }),
        el("p", { class: "tl__org", text: o.organisasi }),
        el("p", { text: o.deskripsi })
      ]));
    });
  }

  /* ---------- Projek ---------- */
  function isiProjek() {
    const wadah = $("#projekList");
    const list = DATA.projek.map(p => ({ src: p.gambar, alt: `Foto projek ${p.judul}`, caption: p.judul }));
    DATA.projek.forEach((p, i) => {
      const foto = el("button", { class: "project__photo", type: "button", "aria-label": `Perbesar foto projek ${p.judul}` }, [
        gambar(p.gambar, `Foto projek ${p.judul}`, p.judul, 800, 500)
      ]);
      foto.addEventListener("click", () => bukaLb(list, i, foto));
      wadah.append(el("article", { class: "project reveal" }, [
        foto,
        el("div", { class: "project__body" }, [
          el("h3", { class: "project__title", text: p.judul }),
          el("p", { text: p.deskripsi })
        ])
      ]));
    });
  }

  /* ---------- Lightbox (galeri, sertifikat, projek) ---------- */
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");
  let lbList = [], lbIdx = 0, lbOpener = null;

  function tampilLb() {
    const it = lbList[lbIdx];
    lbImg.src = it.src;
    lbImg.alt = it.alt;
    lbImg.onerror = () => { lbImg.onerror = null; lbImg.src = placeholder(it.alt, 1000, 750); };
    lbCap.textContent = it.caption;
    const single = lbList.length < 2;
    $('[data-lb="prev"]').hidden = single;
    $('[data-lb="next"]').hidden = single;
  }
  function bukaLb(list, idx, opener) {
    lbList = list; lbIdx = idx; lbOpener = opener;
    tampilLb();
    if (!lb.open) lb.showModal();
  }
  function geserLb(arah) {
    lbIdx = (lbIdx + arah + lbList.length) % lbList.length;
    tampilLb();
  }
  lb.addEventListener("click", e => {
    const aksi = e.target.dataset && e.target.dataset.lb;
    if (aksi === "close" || e.target === lb) lb.close();
    if (aksi === "prev") geserLb(-1);
    if (aksi === "next") geserLb(1);
  });
  lb.addEventListener("keydown", e => {
    if (lbList.length < 2) return;
    if (e.key === "ArrowLeft") geserLb(-1);
    if (e.key === "ArrowRight") geserLb(1);
  });
  lb.addEventListener("close", () => { if (lbOpener) lbOpener.focus(); });  // Esc sudah ditangani <dialog>

  /* ---------- Filter chip ---------- */
  function buatChip(wadah, daftar, onPilih) {
    wadah.textContent = "";
    daftar.forEach((nama, i) => {
      const b = el("button", { class: "chip", type: "button", text: nama, "aria-pressed": i === 0 ? "true" : "false" });
      b.addEventListener("click", () => {
        $$(".chip", wadah).forEach(c => c.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true");
        onPilih(nama);
      });
      wadah.append(b);
    });
  }

  /* ---------- Prestasi ---------- */
  function isiPrestasi() {
    const wadah = $("#prestasiList");
    const kosong = $("#prestasiKosong");
    const selTahun = $("#prestasiTahun");
    let tingkat = "Semua";

    const daftarTingkat = ["Semua", ...new Set(DATA.prestasi.map(p => p.tingkat))];
    const daftarTahun = [...new Set(DATA.prestasi.map(p => p.tahun))].sort((a, b) => b - a);
    selTahun.append(el("option", { value: "Semua", text: "Semua" }));
    daftarTahun.forEach(t => selTahun.append(el("option", { value: t, text: t })));

    function render() {
      const tahun = selTahun.value;
      const hasil = DATA.prestasi.filter(p =>
        (tingkat === "Semua" || p.tingkat === tingkat) &&
        (tahun === "Semua" || String(p.tahun) === tahun));

      wadah.textContent = "";
      kosong.hidden = hasil.length > 0;

      const list = hasil.map(p => ({ src: p.gambar, alt: `Sertifikat ${p.lomba}`, caption: `${p.peringkat} - ${p.lomba} (${p.penyelenggara}, ${p.tahun})` }));
      hasil.forEach((p, i) => {
        const tombol = el("button", { class: "cert", type: "button", "aria-label": `Lihat sertifikat ${p.lomba}, ${p.peringkat}` }, [
          gambar(p.gambar, `Sertifikat ${p.lomba}`, "Sertifikat", 800, 600, "cert__img"),
          el("div", { class: "cert__body" }, [
            el("span", { class: "cert__rank", text: p.peringkat }),
            el("h3", { class: "cert__title", text: p.lomba }),
            el("p", { class: "cert__meta", text: `${p.penyelenggara} | ${p.tingkat} | ${p.tahun}` })
          ])
        ]);
        tombol.addEventListener("click", () => bukaLb(list, i, tombol));
        wadah.append(tombol);
      });
    }

    buatChip($("#prestasiTingkat"), daftarTingkat, nama => { tingkat = nama; render(); });
    selTahun.addEventListener("change", render);
    render();
  }

  /* ---------- Galeri ---------- */
  function isiGaleri() {
    const wadah = $("#galeriList");
    const kategori = ["Semua", ...new Set(DATA.galeri.map(g => g.kategori))];

    function render(pilih) {
      wadah.textContent = "";
      const hasil = DATA.galeri.filter(g => pilih === "Semua" || g.kategori === pilih);
      const list = hasil.map(g => ({ src: g.gambar, alt: g.keterangan, caption: g.keterangan }));
      hasil.forEach((g, i) => {
        // Tinggi placeholder dibuat bervariasi supaya tampilan masonry terlihat
        const tinggi = [600, 800, 700][i % 3];
        const tombol = el("button", { class: "shot", type: "button", "aria-label": `Perbesar foto: ${g.keterangan}` }, [
          gambar(g.gambar, g.keterangan, g.keterangan, 800, tinggi)
        ]);
        tombol.addEventListener("click", () => bukaLb(list, i, tombol));
        wadah.append(tombol);
      });
    }
    buatChip($("#galeriKategori"), kategori, render);
    render("Semua");
  }

  /* ---------- Kontak ---------- */
  function isiKontak() {
    const ul = $("#sosmed");
    ul.append(el("li", {}, [el("a", { href: `mailto:${DATA.kontak.email}` }, [el("span", { text: DATA.kontak.email })])]));
    DATA.kontak.sosmed.forEach(s => {
      ul.append(el("li", {}, [
        el("a", { href: s.url, target: "_blank", rel: "noopener noreferrer" }, [
          el("span", { text: s.nama }), el("small", { text: s.teks })
        ])
      ]));
    });

    const form = $("#formKontak");
    const pesanError = {
      fNama: "Isi nama kamu.",
      fEmail: "Isi alamat email yang valid, misalnya nama@email.com.",
      fPesan: "Tulis pesan minimal 10 karakter."
    };

    function valid() {
      let ok = true;
      const aturan = {
        fNama: v => v.trim().length >= 2,
        fEmail: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
        fPesan: v => v.trim().length >= 10
      };
      Object.keys(aturan).forEach(id => {
        const input = $("#" + id);
        const err = $(`[data-err="${id}"]`);
        const baik = aturan[id](input.value);
        input.classList.toggle("invalid", !baik);
        input.setAttribute("aria-invalid", String(!baik));
        err.textContent = baik ? "" : pesanError[id];
        if (!baik) ok = false;
      });
      return ok;
    }

    form.addEventListener("input", e => {
      if (e.target.classList.contains("invalid")) valid();
    });

    $$("[data-kirim]", form).forEach(btn => btn.addEventListener("click", () => {
      if (!valid()) return;
      const nama = $("#fNama").value.trim();
      const email = $("#fEmail").value.trim();
      const pesan = $("#fPesan").value.trim();
      if (btn.dataset.kirim === "wa") {
        const teks = `Halo ${DATA.profil.nama}, saya ${nama} (${email}).\n\n${pesan}`;
        window.open(`https://wa.me/${DATA.kontak.whatsapp}?text=${encodeURIComponent(teks)}`, "_blank", "noopener");
      } else {
        const subjek = `Pesan dari ${nama}`;
        const isi = `${pesan}\n\nSalam,\n${nama}\n${email}`;
        window.location.href = `mailto:${DATA.kontak.email}?subject=${encodeURIComponent(subjek)}&body=${encodeURIComponent(isi)}`;
      }
    }));
  }

  /* ---------- Efek mengetik ---------- */
  function mengetik() {
    const target = $("#typed");
    const daftar = DATA.profil.profesi;
    if (!daftar.length) return;
    if (reduceMotion) { target.textContent = daftar[0]; return; }
    let i = 0, j = 0, hapus = false;
    (function langkah() {
      const kata = daftar[i];
      target.textContent = kata.slice(0, j);
      let jeda = hapus ? 40 : 85;
      if (!hapus && j === kata.length) { hapus = true; jeda = 1500; }
      else if (hapus && j === 0) { hapus = false; i = (i + 1) % daftar.length; jeda = 350; }
      else j += hapus ? -1 : 1;
      setTimeout(langkah, jeda);
    })();
  }

  /* ---------- Tema terang/gelap ---------- */
  function tema() {
    $("#temaBtn").addEventListener("click", () => {
      const root = document.documentElement;
      const baru = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", baru);
      try { localStorage.setItem("tema", baru); } catch (e) { /* abaikan */ }
    });
  }

  /* ---------- Navbar: menu mobile, bayangan, highlight section ---------- */
  function navbar() {
    const nav = $("#navbar");
    const burger = $("#burger");
    const menu = $("#menu");

    function tutup() { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Buka menu"); }
    burger.addEventListener("click", () => {
      const buka = !menu.classList.contains("open");
      menu.classList.toggle("open", buka);
      burger.setAttribute("aria-expanded", String(buka));
      burger.setAttribute("aria-label", buka ? "Tutup menu" : "Buka menu");
    });
    $$("a", menu).forEach(a => a.addEventListener("click", tutup));
    document.addEventListener("keydown", e => { if (e.key === "Escape") tutup(); });

    window.addEventListener("scroll", () => nav.classList.toggle("is-scrolled", window.scrollY > 8), { passive: true });

    const tautan = $$("a", menu);
    const sections = $$("main section[id]");
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          tautan.forEach(a => {
            const aktif = a.getAttribute("href") === "#" + en.target.id;
            a.classList.toggle("active", aktif);
            if (aktif) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => io.observe(s));
  }

  /* ---------- Animasi muncul saat scroll, bar keahlian, counter ---------- */
  function animasiScroll() {
    const reveals = $$(".reveal");
    const bars = $$(".skill__bar i");
    const counters = $$("[data-count]");

    if (!("IntersectionObserver" in window) || reduceMotion) {
      reveals.forEach(r => r.classList.add("in"));
      bars.forEach(b => (b.style.width = b.dataset.level + "%"));
      counters.forEach(animasiAngka);
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const t = en.target;
        if (t.classList.contains("reveal")) t.classList.add("in");
        if (t.matches(".skill__bar i")) t.style.width = t.dataset.level + "%";
        if (t.matches("[data-count]")) animasiAngka(t);
        obs.unobserve(t);
      });
    }, { threshold: 0.15 });
    [...reveals, ...bars, ...counters].forEach(n => io.observe(n));
  }

  /* ---------- Jalankan semuanya ---------- */
  isiProfil();
  isiStatistik();
  isiOrganisasi();
  isiProjek();
  isiPrestasi();
  isiGaleri();
  isiKontak();
  tema();
  navbar();
  mengetik();
  animasiScroll();
})();