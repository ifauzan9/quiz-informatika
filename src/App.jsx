import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, Play, CheckCircle2, XCircle, Clock, Keyboard, RotateCcw, MonitorPlay, Home, Star, Volume2, VolumeX } from 'lucide-react';

// Bank Soal Dasar (Tepat 180 Soal Unik Tingkat SMP)
const QUESTION_BANK = [
  // --- HARDWARE (1 - 30) ---
  { q: "Perangkat keras komputer yang berfungsi sebagai otak utama untuk memproses data adalah...", options: ["RAM", "CPU (Prosesor)", "Hardisk", "Motherboard"], answer: 1 },
  { q: "Berikut ini yang termasuk perangkat keluaran (Output Device) adalah...", options: ["Mouse", "Keyboard", "Scanner", "Printer"], answer: 3 },
  { q: "Perangkat keras yang digunakan untuk memasukkan huruf dan angka ke dalam komputer adalah...", options: ["Monitor", "Mouse", "Keyboard", "Printer"], answer: 2 },
  { q: "Perangkat yang berfungsi untuk memindahkan penunjuk atau kursor pada layar adalah...", options: ["Mouse", "Keyboard", "Flashdisk", "Speaker"], answer: 0 },
  { q: "Layar yang menampilkan gambar dan tulisan dari komputer disebut...", options: ["Proyektor", "Printer", "Monitor", "Scanner"], answer: 2 },
  { q: "Perangkat yang digunakan untuk mencetak dokumen dari komputer ke atas kertas adalah...", options: ["Scanner", "Printer", "Monitor", "Webcam"], answer: 1 },
  { q: "Perangkat yang berfungsi untuk memindai dokumen fisik menjadi file digital (gambar/PDF) adalah...", options: ["Printer", "Scanner", "Proyektor", "Speaker"], answer: 1 },
  { q: "Komponen yang menyuplai daya listrik ke seluruh perangkat keras komputer disebut...", options: ["Motherboard", "Power Supply", "Baterai", "RAM"], answer: 1 },
  { q: "Papan sirkuit utama di mana semua komponen komputer saling terhubung disebut...", options: ["Motherboard", "VGA Card", "Sound Card", "Processor"], answer: 0 },
  { q: "Perangkat keras yang memproses data grafis agar bisa ditampilkan di monitor adalah...", options: ["Sound Card", "VGA Card", "Ethernet Card", "RAM"], answer: 1 },
  { q: "Satuan terkecil dari data di dalam memori komputer adalah...", options: ["Byte", "Megabyte", "Bit", "Kilobyte"], answer: 2 },
  { q: "8 Bit sama dengan...", options: ["1 Byte", "1 Kilobyte", "1 Megabyte", "1 Gigabyte"], answer: 0 },
  { q: "Perangkat keras yang berfungsi untuk merekam suara kita ke dalam komputer adalah...", options: ["Speaker", "Monitor", "Mikrofon", "Webcam"], answer: 2 },
  { q: "Kamera kecil yang biasanya menempel di atas layar laptop disebut...", options: ["CCTV", "Webcam", "Handycam", "Kamera DSLR"], answer: 1 },
  { q: "Media penyimpanan portabel yang bentuknya kecil dan dihubungkan lewat port USB adalah...", options: ["Hardisk Internal", "CD-ROM", "Disket", "Flashdisk"], answer: 3 },
  { q: "Perangkat penyimpanan data permanen berkapasitas besar di dalam komputer adalah...", options: ["RAM", "Prosesor", "VGA", "Hardisk / SSD"], answer: 3 },
  { q: "Kelebihan SSD dibandingkan dengan Hardisk (HDD) biasa adalah...", options: ["Lebih berat", "Lebih cepat memproses data", "Lebih cepat rusak", "Kapasitas selalu lebih kecil"], answer: 1 },
  { q: "Jenis memori yang isinya tidak akan hilang meskipun komputer dimatikan adalah...", options: ["RAM", "Cache", "ROM", "Register"], answer: 2 },
  { q: "Memori penyimpanan sementara yang isinya hilang saat komputer dimatikan disebut...", options: ["ROM", "Flashdisk", "SSD", "RAM"], answer: 3 },
  { q: "Kepanjangan dari RAM adalah...", options: ["Random Access Memory", "Read Access Memory", "Random Active Memory", "Read Active Memory"], answer: 0 },
  { q: "Tombol pada komputer yang berfungsi untuk mematikan dan menyalakan disebut...", options: ["Tombol Reset", "Tombol Power", "Tombol Sleep", "Tombol Shift"], answer: 1 },
  { q: "Istilah untuk menghidupkan komputer dari keadaan mati total disebut...", options: ["Sleep Mode", "Cold Booting", "Warm Booting", "Restart"], answer: 1 },
  { q: "Istilah untuk memulai ulang komputer yang sedang menyala adalah...", options: ["Shutdown", "Sleep", "Restart", "Log off"], answer: 2 },
  { q: "Proyektor LCD biasanya digunakan untuk...", options: ["Mencetak foto", "Menampilkan presentasi di layar besar", "Menyimpan data", "Memutar musik"], answer: 1 },
  { q: "Kipas kecil di atas prosesor yang berfungsi mendinginkan suhu prosesor disebut...", options: ["Power Supply", "Heatsink / Fan", "Casing", "VGA"], answer: 1 },
  { q: "Port berbentuk lubang kecil untuk mencolokkan earphone/headphone disebut...", options: ["Port USB", "Port Audio (Jack 3.5mm)", "Port VGA", "Port LAN"], answer: 1 },
  { q: "Alat pemindai kode garis yang sering kita lihat di kasir minimarket adalah...", options: ["Webcam", "Scanner Dokumen", "Barcode Scanner", "Printer Struk"], answer: 2 },
  { q: "Bagian komputer yang berfungsi mengubah data digital menjadi suara adalah...", options: ["Sound Card", "VGA Card", "RAM", "ROM"], answer: 0 },
  { q: "Kepanjangan dari CPU adalah...", options: ["Central Process Unit", "Control Processing Unit", "Central Processing Unit", "Control Process Unit"], answer: 2 },
  { q: "Perangkat keras sering juga disebut dengan istilah bahasa Inggris...", options: ["Software", "Hardware", "Brainware", "Malware"], answer: 1 },

  // --- SOFTWARE & OS (31 - 60) ---
  { q: "Pengguna komputer (manusia yang mengoperasikan komputer) disebut juga...", options: ["Hardware", "Software", "Brainware", "Malware"], answer: 2 },
  { q: "Program atau aplikasi di dalam komputer yang tidak bisa diraba secara fisik disebut...", options: ["Hardware", "Software", "Brainware", "CPU"], answer: 1 },
  { q: "Perangkat lunak dasar yang menjembatani hardware dan aplikasi lainnya adalah...", options: ["Sistem Operasi (OS)", "Microsoft Word", "Google Chrome", "Antivirus"], answer: 0 },
  { q: "Di bawah ini yang merupakan contoh Sistem Operasi (OS) komputer adalah...", options: ["Microsoft Office", "Windows", "Google", "Instagram"], answer: 1 },
  { q: "Sistem operasi berlogo pinguin yang sifatnya gratis dan open-source adalah...", options: ["Windows", "macOS", "Linux", "Android"], answer: 2 },
  { q: "Sistem operasi yang umum digunakan pada perangkat smartphone/HP adalah...", options: ["Windows dan Linux", "Android dan iOS", "macOS dan Windows", "Linux dan DOS"], answer: 1 },
  { q: "Aplikasi yang dibuat secara khusus untuk mengganggu atau merusak sistem adalah...", options: ["Utility", "Software", "Driver", "Virus"], answer: 3 },
  { q: "Program lunak yang berfungsi untuk mencegah dan menghapus virus komputer adalah...", options: ["Browser", "Antivirus", "Sistem Operasi", "Game"], answer: 1 },
  { q: "File dokumen gambar biasanya memiliki ekstensi (akhiran)...", options: [".docx atau .txt", ".mp4 atau .avi", ".mp3 atau .wav", ".jpg atau .png"], answer: 3 },
  { q: "Ekstensi file yang umumnya digunakan untuk menyimpan file musik/lagu adalah...", options: [".mp3", ".mp4", ".png", ".exe"], answer: 0 },
  { q: "Ekstensi file .mp4 biasanya merupakan jenis file...", options: ["Teks", "Gambar", "Suara", "Video"], answer: 3 },
  { q: "Tempat penampungan sementara untuk file yang baru saja dihapus di OS Windows adalah...", options: ["Control Panel", "Task Manager", "Recycle Bin", "My Documents"], answer: 2 },
  { q: "Kumpulan folder dan tempat penyimpanan utama di Windows dapat diakses melalui...", options: ["Paint", "Notepad", "File Explorer", "Browser"], answer: 2 },
  { q: "Proses memperbarui aplikasi atau sistem operasi ke versi terbaru disebut...", options: ["Download", "Upload", "Update", "Delete"], answer: 2 },
  { q: "Aplikasi bawaan Windows yang sering digunakan untuk menggambar sederhana adalah...", options: ["Photoshop", "CorelDraw", "Paint", "Illustrator"], answer: 2 },
  { q: "Aplikasi bawaan Windows yang fungsinya hanya untuk mencatat teks tanpa format rumit adalah...", options: ["Microsoft Word", "Notepad", "Excel", "PowerPoint"], answer: 1 },
  { q: "Software yang fungsinya untuk memadatkan (compress) file agar ukurannya lebih kecil adalah...", options: ["WinRAR / ZIP", "Antivirus", "VLC Player", "Google Chrome"], answer: 0 },
  { q: "Software yang digunakan untuk membaca dokumen berformat PDF adalah...", options: ["Microsoft Excel", "Adobe Reader", "Winamp", "Notepad"], answer: 1 },
  { q: "Software desain grafis yang populer untuk mengedit foto adalah...", options: ["Microsoft Word", "Adobe Photoshop", "WinRAR", "Notepad"], answer: 1 },
  { q: "Perangkat lunak yang dapat didownload dan digunakan secara gratis disebut...", options: ["Freeware", "Shareware", "Malware", "Hardware"], answer: 0 },
  { q: "Tampilan awal saat komputer Windows selesai dinyalakan dan siap digunakan disebut...", options: ["Desktop", "Recycle Bin", "Folder", "File Explorer"], answer: 0 },
  { q: "Gambar latar belakang pada layar utama komputer (Desktop) biasa disebut...", options: ["Screensaver", "Wallpaper", "Icon", "Taskbar"], answer: 1 },
  { q: "Barisan memanjang di bagian bawah layar Windows yang berisi menu Start dan jam disebut...", options: ["Scrollbar", "Title bar", "Taskbar", "Menu bar"], answer: 2 },
  { q: "Gambar kecil yang mewakili sebuah file, folder, atau aplikasi di komputer disebut...", options: ["Icon", "Kursor", "Wallpaper", "Taskbar"], answer: 0 },
  { q: "Tindakan menekan tombol kiri mouse satu kali dan menahannya lalu digeser disebut...", options: ["Click", "Double Click", "Right Click", "Drag and Drop"], answer: 3 },
  { q: "Tindakan menekan tombol kiri mouse dua kali dengan cepat disebut...", options: ["Click", "Drag", "Double Click", "Scroll"], answer: 2 },
  { q: "Perintah pada Windows untuk melihat pengaturan jam, bahasa, dan sistem lainnya ada di...", options: ["Recycle Bin", "Control Panel / Settings", "Notepad", "File Explorer"], answer: 1 },
  { q: "Mode pada komputer di mana komputer hemat daya namun aplikasi tetap terbuka disebut...", options: ["Shutdown", "Restart", "Sleep Mode", "Log off"], answer: 2 },
  { q: "Sebuah tempat (wadah) untuk mengumpulkan beberapa file agar rapi disebut...", options: ["Icon", "Folder", "Taskbar", "Wallpaper"], answer: 1 },
  { q: "Shortcut (tombol pintas) untuk membuka menu pencarian di Windows biasanya...", options: ["Tombol Windows + S", "Ctrl + P", "Alt + F4", "Shift + Delete"], answer: 0 },

  // --- JARINGAN KOMPUTER & INTERNET (61 - 90) ---
  { q: "Jaringan komputer yang hanya mencakup area satu ruangan, gedung, atau sekolah disebut...", options: ["WAN", "MAN", "LAN", "PAN"], answer: 2 },
  { q: "Jaringan komputer yang mencakup wilayah satu kota disebut...", options: ["LAN", "MAN", "WAN", "PAN"], answer: 1 },
  { q: "Jaringan komputer global yang menghubungkan seluruh dunia disebut...", options: ["LAN", "MAN", "WAN", "Internet"], answer: 3 },
  { q: "Kepanjangan dari Wi-Fi adalah...", options: ["Wireless Fidelity", "Wide Fire", "Wireless File", "Wide Fidelity"], answer: 0 },
  { q: "Jaringan tanpa kabel sering disebut juga dengan jaringan...", options: ["Wired", "Wireless", "Fiber Optik", "LAN"], answer: 1 },
  { q: "Perangkat yang mengubah sinyal digital menjadi analog dan sebaliknya agar bisa internetan adalah...", options: ["Router", "Switch", "Modem", "Access Point"], answer: 2 },
  { q: "Topologi jaringan di mana setiap komputer terhubung ke satu pusat (hub/switch) disebut...", options: ["Star", "Ring", "Bus", "Mesh"], answer: 0 },
  { q: "Jenis kabel yang mentransfer data menggunakan cahaya dan sangat cepat adalah...", options: ["Kabel UTP", "Kabel Coaxial", "Kabel Fiber Optik", "Kabel Telepon"], answer: 2 },
  { q: "Kabel jaringan yang paling sering digunakan untuk koneksi LAN di sekolah adalah...", options: ["Fiber Optik", "Kabel UTP (LAN)", "Kabel Listrik", "Kabel Audio"], answer: 1 },
  { q: "Kepanjangan dari WWW pada alamat website adalah...", options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"], answer: 0 },
  { q: "Aplikasi peramban yang sering digunakan untuk membuka halaman web (internetan) disebut...", options: ["Browser", "Antivirus", "Windows", "Game"], answer: 0 },
  { q: "Berikut ini yang merupakan contoh aplikasi Browser adalah...", options: ["Microsoft Word", "Google Chrome", "Windows Explorer", "Adobe Photoshop"], answer: 1 },
  { q: "Mesin pencari (Search Engine) paling populer di dunia saat ini adalah...", options: ["Bing", "Yahoo", "Google", "DuckDuckGo"], answer: 2 },
  { q: "Istilah untuk mencari informasi di internet menggunakan mesin pencari disebut...", options: ["Browsing / Surfing", "Chatting", "Upload", "Download"], answer: 0 },
  { q: "Istilah untuk mengambil/mengunduh file dari internet ke perangkat kita adalah...", options: ["Upload", "Download", "Streaming", "Browsing"], answer: 1 },
  { q: "Istilah untuk mengirim/mengunggah file dari perangkat kita ke internet adalah...", options: ["Upload", "Download", "Streaming", "Browsing"], answer: 0 },
  { q: "Menonton video secara langsung di internet tanpa harus mendownloadnya disebut...", options: ["Browsing", "Chatting", "Streaming", "Upload"], answer: 2 },
  { q: "Layanan surat menyurat secara elektronik di internet disebut...", options: ["E-commerce", "E-mail", "E-learning", "E-money"], answer: 1 },
  { q: "Penyedia layanan email gratis dari Google adalah...", options: ["Yahoo Mail", "Outlook", "iCloud", "Gmail"], answer: 3 },
  { q: "Dalam email, fitur untuk menyisipkan/melampirkan file disebut...", options: ["Send", "Reply", "Attachment", "Forward"], answer: 2 },
  { q: "Satuan kecepatan transfer data internet yang umum digunakan adalah...", options: ["Km/jam", "GHz", "Mbps (Megabit per second)", "Volt"], answer: 2 },
  { q: "Komputer pusat yang menyimpan data dan melayani komputer lain di jaringan disebut...", options: ["Client", "Server", "Router", "Modem"], answer: 1 },
  { q: "Komputer pengguna yang meminta layanan dari server disebut...", options: ["Server", "Modem", "Router", "Client"], answer: 3 },
  { q: "Alamat unik yang dimiliki setiap komputer yang terhubung ke internet berupa deretan angka disebut...", options: ["MAC Address", "Alamat Email", "IP Address", "URL"], answer: 2 },
  { q: "Alamat sebuah situs web (contoh: www.google.com) secara teknis disebut...", options: ["IP Address", "URL / Domain", "Email", "Password"], answer: 1 },
  { q: "Akhiran domain website (URL) yang ditujukan untuk sekolah di Indonesia adalah...", options: [".com", ".go.id", ".sch.id", ".co.id"], answer: 2 },
  { q: "Akhiran domain website untuk lembaga pemerintahan Indonesia adalah...", options: [".go.id", ".ac.id", ".net", ".org"], answer: 0 },
  { q: "Perusahaan yang menyediakan layanan koneksi internet kepada kita (seperti Indihome, Biznet) disebut...", options: ["URL", "ISP (Internet Service Provider)", "LAN", "Browser"], answer: 1 },
  { q: "Istilah untuk komunikasi bertatap muka melalui layar antar pengguna internet adalah...", options: ["Chatting", "Video Call", "Email", "Podcast"], answer: 1 },
  { q: "Jaringan pribadi dalam sebuah perusahaan/sekolah yang menggunakan teknologi seperti internet disebut...", options: ["Extranet", "Intranet", "Internet", "Wi-Fi"], answer: 1 },

  // --- APLIKASI PERKANTORAN: WORD, EXCEL, PPT (91 - 130) ---
  { q: "Perangkat lunak Microsoft yang paling tepat digunakan untuk membuat surat atau makalah adalah...", options: ["Microsoft Word", "Microsoft Excel", "CorelDraw", "Notepad"], answer: 0 },
  { q: "Perangkat lunak yang khusus digunakan untuk mengolah angka dan tabel adalah...", options: ["Microsoft Word", "Microsoft PowerPoint", "Microsoft Excel", "Adobe Photoshop"], answer: 2 },
  { q: "Perangkat lunak yang dibuat khusus untuk keperluan presentasi adalah...", options: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft Access"], answer: 2 },
  { q: "Kombinasi tombol keyboard (shortcut) untuk menyalin teks (Copy) adalah...", options: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + P"], answer: 0 },
  { q: "Shortcut pada keyboard untuk menempelkan hasil salinan (Paste) adalah...", options: ["Ctrl + P", "Ctrl + V", "Ctrl + X", "Ctrl + C"], answer: 1 },
  { q: "Shortcut untuk memotong teks/file (Cut) sehingga hilang dari tempat asalnya adalah...", options: ["Ctrl + C", "Ctrl + X", "Ctrl + V", "Ctrl + Z"], answer: 1 },
  { q: "Kombinasi tombol untuk membatalkan perintah terakhir (Undo) adalah...", options: ["Ctrl + U", "Ctrl + Z", "Ctrl + Y", "Ctrl + A"], answer: 1 },
  { q: "Kombinasi tombol untuk memilih semua teks dalam dokumen (Select All) adalah...", options: ["Ctrl + S", "Ctrl + P", "Ctrl + A", "Ctrl + Z"], answer: 2 },
  { q: "Kombinasi tombol keyboard untuk menyimpan dokumen (Save) adalah...", options: ["Ctrl + P", "Ctrl + S", "Ctrl + O", "Ctrl + N"], answer: 1 },
  { q: "Shortcut untuk mencetak dokumen (Print) ke printer adalah...", options: ["Ctrl + P", "Ctrl + C", "Ctrl + S", "Ctrl + PrtScn"], answer: 0 },
  { q: "Ikon huruf 'B' (Bold) pada Microsoft Word berfungsi untuk...", options: ["Menebalkan huruf", "Memiringkan huruf", "Memberi garis bawah", "Mewarnai huruf"], answer: 0 },
  { q: "Ikon huruf 'I' (Italic) pada Microsoft Word berfungsi untuk...", options: ["Menebalkan huruf", "Memiringkan huruf", "Memberi garis bawah", "Mencoret huruf"], answer: 1 },
  { q: "Ikon huruf 'U' (Underline) pada Microsoft Word berfungsi untuk...", options: ["Menebalkan huruf", "Memiringkan huruf", "Memberi garis bawah", "Memperbesar huruf"], answer: 2 },
  { q: "Pengaturan paragraf agar teks rata di sebelah kiri disebut...", options: ["Align Center", "Align Right", "Justify", "Align Left"], answer: 3 },
  { q: "Pengaturan paragraf agar teks rata di tengah disebut...", options: ["Align Left", "Align Center", "Align Right", "Justify"], answer: 1 },
  { q: "Pengaturan paragraf agar teks rata di kiri sekaligus di kanan secara rapi disebut...", options: ["Align Left", "Align Center", "Align Right", "Justify"], answer: 3 },
  { q: "Di Microsoft Excel, pertemuan antara baris (row) dan kolom (column) disebut...", options: ["Cell (Sel)", "Range", "Sheet", "Tabel"], answer: 0 },
  { q: "Di Excel, deretan kotak yang mendatar (ke samping) dan ditandai dengan angka (1,2,3...) disebut...", options: ["Kolom (Column)", "Baris (Row)", "Cell", "Range"], answer: 1 },
  { q: "Di Excel, deretan kotak yang menurun (ke bawah) dan ditandai dengan huruf (A,B,C...) disebut...", options: ["Kolom (Column)", "Baris (Row)", "Cell", "Range"], answer: 0 },
  { q: "Kumpulan dari beberapa Cell yang diblok/dipilih bersamaan di Excel disebut...", options: ["Sheet", "Table", "Range", "Row"], answer: 2 },
  { q: "Setiap rumus/formula pada Microsoft Excel harus selalu diawali dengan tanda...", options: ["+ (Tambah)", "- (Kurang)", "= (Sama dengan)", "@ (Keong)"], answer: 2 },
  { q: "Rumus Excel yang digunakan untuk menjumlahkan sekumpulan angka adalah...", options: ["=AVERAGE", "=SUM", "=MAX", "=MIN"], answer: 1 },
  { q: "Rumus Excel untuk mencari nilai rata-rata dari sekumpulan data adalah...", options: ["=MAX", "=SUM", "=AVERAGE", "=COUNT"], answer: 2 },
  { q: "Rumus Excel untuk mencari nilai terbesar dari sebuah range data adalah...", options: ["=MIN", "=MAX", "=SUM", "=COUNT"], answer: 1 },
  { q: "Rumus Excel untuk mencari nilai terkecil dari sebuah range data adalah...", options: ["=MAX", "=MIN", "=SUM", "=AVERAGE"], answer: 1 },
  { q: "Rumus Excel untuk menghitung BANYAKNYA sel yang berisi angka adalah...", options: ["=COUNT", "=SUM", "=AVERAGE", "=MAX"], answer: 0 },
  { q: "Satu halaman kerja/lembar di dalam Microsoft PowerPoint disebut...", options: ["Page", "Sheet", "Slide", "Document"], answer: 2 },
  { q: "Efek pergerakan saat berpindah dari satu slide ke slide lainnya di PowerPoint disebut...", options: ["Animation", "Transition", "Design", "Format"], answer: 1 },
  { q: "Efek pergerakan pada teks atau gambar di dalam satu slide yang sama disebut...", options: ["Transition", "Animation", "Slideshow", "Layout"], answer: 1 },
  { q: "Tombol keyboard untuk menjalankan presentasi (Slide Show) dari awal di PowerPoint adalah...", options: ["F5", "F1", "Ctrl + S", "Esc"], answer: 0 },
  { q: "Ekstensi file standar untuk dokumen Microsoft Word yang baru adalah...", options: [".doc / .docx", ".xls / .xlsx", ".ppt / .pptx", ".pdf"], answer: 0 },
  { q: "Ekstensi file standar untuk dokumen Microsoft Excel adalah...", options: [".docx", ".xlsx", ".pptx", ".txt"], answer: 1 },
  { q: "Ekstensi file standar untuk dokumen presentasi Microsoft PowerPoint adalah...", options: [".xls", ".pdf", ".pptx", ".doc"], answer: 2 },
  { q: "Format file dokumen universal yang tidak bisa diedit dengan mudah dan bentuknya tetap adalah...", options: [".docx", ".xlsx", ".pdf", ".txt"], answer: 2 },
  { q: "Tombol keyboard untuk menangkap gambar layar secara utuh (Screenshot) di komputer adalah...", options: ["Ctrl + C", "PrtScn (Print Screen)", "F5", "Alt + Tab"], answer: 1 },
  { q: "Fasilitas di MS Word untuk membuat surat yang isinya sama tapi ditujukan ke banyak nama berbeda secara otomatis adalah...", options: ["Mail Merge", "Find and Replace", "Page Layout", "Insert Table"], answer: 0 },
  { q: "Batas ruang kosong antara tepi kertas dengan teks pada sebuah dokumen disebut...", options: ["Spacing", "Indent", "Margin", "Border"], answer: 2 },
  { q: "Orientasi kertas yang memanjang ke samping (horizontal) disebut...", options: ["Portrait", "Landscape", "Legal", "Letter"], answer: 1 },
  { q: "Orientasi kertas yang memanjang ke atas (vertikal) disebut...", options: ["Landscape", "Portrait", "A4", "Square"], answer: 1 },
  { q: "Menu untuk menyisipkan gambar di Microsoft Word terdapat pada tab...", options: ["Home", "Insert", "Page Layout", "View"], answer: 1 },

  // --- KEAMANAN DIGITAL & ETIKA (131 - 150) ---
  { q: "Tindakan manipulasi atau menipu untuk mencuri data rahasia (seperti sandi/password) disebut...", options: ["Bullying", "Phishing", "Browsing", "Spamming"], answer: 1 },
  { q: "Tindakan menyebarkan pesan atau iklan yang tidak diinginkan secara massal (terus menerus) disebut...", options: ["Hacking", "Carding", "Phishing", "Spamming"], answer: 3 },
  { q: "Kejahatan menyandera/mengunci data komputer pengguna dan meminta tebusan uang disebut...", options: ["Ransomware", "Adware", "Spyware", "Worm"], answer: 0 },
  { q: "Perangkat lunak jahat yang diam-diam memata-matai aktivitas pengguna komputer disebut...", options: ["Spyware", "Adware", "Antivirus", "Hardware"], answer: 0 },
  { q: "Berita bohong atau informasi palsu yang sengaja disebarkan di internet disebut...", options: ["Fakta", "Hoaks (Hoax)", "Phishing", "Spam"], answer: 1 },
  { q: "Tindakan perundungan, penghinaan, atau pelecehan yang dilakukan melalui media sosial disebut...", options: ["Cybersecurity", "Cyberbullying", "Cyberspace", "Cybercafe"], answer: 1 },
  { q: "Orang yang menyusup ke dalam sistem komputer tanpa izin untuk tujuan yang merusak disebut...", options: ["Programmer", "Gamer", "Cracker / Black Hat Hacker", "Desainer"], answer: 2 },
  { q: "Sistem keamanan jaringan yang bertugas menyaring akses yang masuk dan keluar untuk mencegah penyusup adalah...", options: ["Router", "Antivirus", "Firewall", "Webcam"], answer: 2 },
  { q: "Kata sandi rahasia yang digunakan untuk masuk ke suatu akun disebut...", options: ["Username", "Password", "Email", "Domain"], answer: 1 },
  { q: "Ciri-ciri password yang KUAT dan aman adalah...", options: ["Tanggal lahir sendiri", "12345678", "Hanya huruf kecil saja", "Kombinasi huruf besar, kecil, angka, dan simbol"], answer: 3 },
  { q: "Aturan atau sopan santun dalam berkomunikasi di internet disebut...", options: ["Logika", "Netiket (Network Etiquette)", "Algoritma", "Sistem"], answer: 1 },
  { q: "Mengambil karya orang lain di internet (teks/gambar) lalu diakui sebagai karya sendiri disebut...", options: ["Inovasi", "Plagiarisme", "Kreativitas", "Download"], answer: 1 },
  { q: "Jejak data yang kita tinggalkan saat beraktivitas di internet (history, postingan) disebut...", options: ["Jejak Kaki", "Jejak Digital", "File System", "Cookie"], answer: 1 },
  { q: "Apabila kita menerima link tautan aneh dari orang tidak dikenal di WA, yang harus dilakukan adalah...", options: ["Langsung diklik", "Dibagikan ke grup lain", "Dihapus dan tidak di-klik", "Disimpan di memori"], answer: 2 },
  { q: "Jika ada orang di internet yang meminta foto pribadi atau password, tindakan kita adalah...", options: ["Memberikannya", "Menolak dan memblokir kontaknya", "Menyuruhnya menunggu", "Meminta imbalan"], answer: 1 },
  { q: "Hukum di Indonesia yang mengatur tentang informasi dan transaksi elektronik (termasuk medsos) adalah...", options: ["UU ITE", "UU KPK", "UU Lalu Lintas", "UU Pendidikan"], answer: 0 },
  { q: "Tindakan membajak software berbayar untuk dipakai secara gratis merupakan pelanggaran...", options: ["Hak Asasi", "Hak Cipta (Copyright)", "Hak Pilih", "Hak Milik Komputer"], answer: 1 },
  { q: "Aplikasi filter pada internet untuk memblokir konten yang tidak pantas bagi anak disebut...", options: ["Parental Control", "Task Manager", "Control Panel", "Device Manager"], answer: 0 },
  { q: "Tanda gembok terkunci pada alamat URL (https://) di browser menandakan bahwa...", options: ["Website sedang rusak", "Koneksi ke website tersebut aman/dienkripsi", "Website berbayar", "Website berisi virus"], answer: 1 },
  { q: "Huruf 's' pada awalan https:// singkatan dari...", options: ["System", "Speed", "Secure (Aman)", "Site"], answer: 2 },

  // --- BERPIKIR KOMPUTASIONAL, LOGIKA, & ALGORITMA DASAR (151 - 180) ---
  { q: "Langkah-langkah logis dan terstruktur/berurutan untuk menyelesaikan suatu masalah disebut...", options: ["Algoritma", "Coding", "Program", "Jaringan"], answer: 0 },
  { q: "Bentuk diagram atau bagan alir yang digunakan untuk menggambarkan sebuah algoritma disebut...", options: ["Grafik", "Flowchart", "Tabel", "Bagan Struktur"], answer: 1 },
  { q: "Dalam Flowchart, bentuk Oval (kapsul) biasanya digunakan untuk melambangkan...", options: ["Proses", "Input / Output", "Mulai (Start) dan Selesai (End)", "Keputusan (Decision)"], answer: 2 },
  { q: "Dalam Flowchart, bentuk Jajar Genjang digunakan untuk melambangkan...", options: ["Mulai / Selesai", "Input / Output Data", "Proses Data", "Keputusan (Cabang)"], answer: 1 },
  { q: "Dalam Flowchart, bentuk Persegi Panjang digunakan untuk melambangkan...", options: ["Mulai", "Input", "Proses / Menghitung", "Pilihan"], answer: 2 },
  { q: "Dalam Flowchart, bentuk Belah Ketupat (Diamond) digunakan untuk melambangkan...", options: ["Proses", "Keputusan (Ya/Tidak)", "Start", "Output"], answer: 1 },
  { q: "Konsep berpikir untuk menyelesaikan masalah layaknya seorang ilmuwan komputer disebut...", options: ["Computational Thinking", "Critical Thinking", "Design Thinking", "Creative Thinking"], answer: 0 },
  { q: "Memecah masalah yang besar dan rumit menjadi bagian-bagian kecil yang lebih mudah diselesaikan disebut...", options: ["Pengenalan Pola", "Abstraksi", "Dekomposisi", "Algoritma"], answer: 2 },
  { q: "Mencari kesamaan atau pola dari suatu masalah agar lebih cepat diselesaikan disebut...", options: ["Dekomposisi", "Pengenalan Pola (Pattern Recognition)", "Abstraksi", "Algoritma"], answer: 1 },
  { q: "Mengabaikan detail yang tidak penting dan hanya fokus pada informasi utama dari suatu masalah disebut...", options: ["Dekomposisi", "Pola", "Abstraksi", "Algoritma"], answer: 2 },
  { q: "Bahasa mesin komputer yang paling dasar hanya terdiri dari dua angka (0 dan 1) disebut bilangan...", options: ["Desimal", "Biner", "Oktal", "Heksadesimal"], answer: 1 },
  { q: "Dalam bilangan biner, angka 0 dan 1 biasanya merepresentasikan logika...", options: ["Panas dan Dingin", "Mati (Off) dan Hidup (On)", "Besar dan Kecil", "Cepat dan Lambat"], answer: 1 },
  { q: "Kegiatan menulis sekumpulan instruksi kode agar dimengerti oleh komputer disebut...", options: ["Browsing", "Editing", "Coding / Pemrograman", "Gaming"], answer: 2 },
  { q: "Bahasa pemrograman visual yang sangat cocok diajarkan untuk anak sekolah dengan menyusun blok-blok warna adalah...", options: ["Python", "Java", "Scratch", "C++"], answer: 2 },
  { q: "Tempat sementara di dalam memori program untuk menyimpan nilai yang bisa berubah-ubah (misal: Skor Game) disebut...", options: ["Konstanta", "Variabel", "Looping", "Kondisi"], answer: 1 },
  { q: "Struktur algoritma yang digunakan untuk MENGULANG perintah berkali-kali disebut...", options: ["Percabangan (If)", "Perulangan (Looping)", "Variabel", "Tipe Data"], answer: 1 },
  { q: "Struktur algoritma yang membuat pilihan JIKA syarat terpenuhi maka lakukan A, JIKA TIDAK lakukan B, disebut...", options: ["Percabangan (If-Else)", "Perulangan (Loop)", "Sekuensial", "Variabel"], answer: 0 },
  { q: "Tipe data yang hanya bernilai Benar (True) atau Salah (False) disebut tipe data...", options: ["Integer", "String", "Boolean", "Float"], answer: 2 },
  { q: "Tipe data yang digunakan untuk menyimpan teks (kumpulan huruf) disebut tipe data...", options: ["String", "Integer", "Boolean", "Float"], answer: 0 },
  { q: "Tipe data yang digunakan untuk menyimpan bilangan bulat (seperti 1, 5, -10) disebut...", options: ["String", "Integer", "Boolean", "Char"], answer: 1 },
  { q: "Perintah/fungsi untuk menampilkan tulisan di layar pada banyak bahasa pemrograman (seperti Python) adalah...", options: ["Read", "Input", "Print", "Delete"], answer: 2 },
  { q: "Jika kita ingin komputer mencetak kata 'Halo' sebanyak 100 kali, konsep pemrograman yang paling hemat digunakan adalah...", options: ["Menulis Print 100 kali", "Menggunakan Looping (Perulangan)", "Menggunakan If-Else", "Menggunakan Variabel"], answer: 1 },
  { q: "Penulisan algoritma yang menggunakan bahasa manusia namun disingkat menyerupai kode komputer disebut...", options: ["Flowchart", "Pseudocode", "Diagram", "Tabel"], answer: 1 },
  { q: "Tokoh matematikawan Inggris yang sering dijuluki sebagai 'Bapak Komputer' adalah...", options: ["Albert Einstein", "Charles Babbage", "Bill Gates", "Mark Zuckerberg"], answer: 1 },
  { q: "Tokoh pendiri perusahaan Microsoft yang menciptakan OS Windows adalah...", options: ["Steve Jobs", "Mark Zuckerberg", "Bill Gates", "Elon Musk"], answer: 2 },
  { q: "Berdasarkan prinsip cara kerjanya, siklus dasar sebuah sistem komputer terdiri dari 3 tahap utama, yaitu...", options: ["Mulai - Proses - Selesai", "Input - Proses - Output", "Download - Proses - Upload", "Ketik - Simpan - Cetak"], answer: 1 },
  { q: "Berikut ini adalah contoh perangkat Input (Masukan), KECUALI...", options: ["Keyboard", "Mouse", "Monitor", "Scanner"], answer: 2 },
  { q: "Kemampuan komputer untuk melakukan banyak tugas/aplikasi secara bersamaan disebut...", options: ["Multitasking", "Multilayer", "Multimedia", "Multiuser"], answer: 0 },
  { q: "Kata 'Komputer' berasal dari bahasa latin 'Computare' yang artinya...", options: ["Menggambar", "Menghitung", "Berkomunikasi", "Mengingat"], answer: 1 },
  { q: "Jaringan Internet pada awalnya dikembangkan oleh Departemen Pertahanan Amerika Serikat dengan nama...", options: ["ARPANET", "TELKOMNET", "DARPAWEB", "USANET"], answer: 0 }
];

const SHUFFLE_ARRAY = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- LOGIKA PEMBUATAN 225 SOAL (SESI 1-15) ---
const allUniqueQuestions = [...QUESTION_BANK]; // 180 soal
const duplicateQuestions = SHUFFLE_ARRAY([...QUESTION_BANK]).slice(0, 45); // 45 soal acak
const combined225 = SHUFFLE_ARRAY([...allUniqueQuestions, ...duplicateQuestions]); // Total 225 soal acak

const FULL_BANK = [];
for (let sesi = 1; sesi <= 15; sesi++) {
  const startIndex = (sesi - 1) * 15;
  const endIndex = startIndex + 15;
  const sessionQs = combined225.slice(startIndex, endIndex).map((q) => ({
    ...q,
    q: `[Sesi ${sesi}] ${q.q}` 
  }));
  FULL_BANK.push(...sessionQs);
}

// ================= AUDIO CONTEXT SYSTEM =================
let audioCtx = null;

const initAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export default function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'result', 'ready_check', 'end'
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  
  const [scoreMerah, setScoreMerah] = useState(0);
  const [scoreBiru, setScoreBiru] = useState(0);
  
  const [answerMerah, setAnswerMerah] = useState(null);
  const [answerBiru, setAnswerBiru] = useState(null);

  const [readyMerah, setReadyMerah] = useState(false);
  const [readyBiru, setReadyBiru] = useState(false);
  
  const [selectedSession, setSelectedSession] = useState(1);
  const [timeLeft, setTimeLeft] = useState(20);
  const [feedback, setFeedback] = useState(null); 
  const [showExitModal, setShowExitModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // --- FUNGSI PLAY AUDIO ---
  const playTickSound = useCallback((urgent = false) => {
    if (!audioCtx || isMuted) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(urgent ? 600 : 300, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.warn("Audio Context play error:", e);
    }
  }, [isMuted]);

  const playEvaluationSound = useCallback(() => {
    if (!audioCtx || isMuted) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
      osc.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.1); // C#5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.2); // E5
      
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.warn("Audio Context play error:", e);
    }
  }, [isMuted]);

  // --- CORE LOGIC ---
  const returnToMenu = useCallback(() => {
    setShowExitModal(false);
    setGameState('start');
    setFeedback(null);
    setAnswerMerah(null);
    setAnswerBiru(null);
    setReadyMerah(false);
    setReadyBiru(false);
    setScoreMerah(0);
    setScoreBiru(0);
  }, []);

  const handleHomeClick = useCallback(() => {
    if (gameState === 'playing' || gameState === 'result' || gameState === 'ready_check') {
      setShowExitModal(true);
    } else {
      returnToMenu();
    }
  }, [gameState, returnToMenu]);

  const handleEvaluate = useCallback(() => {
    if (gameState !== 'playing') return;
    setGameState('result');
    playEvaluationSound(); // 🔔 Mainkan suara selesai/evaluasi

    const currentQ = questions[currentQIndex];
    const correctIdx = currentQ.answer;

    let diffMerah = 0;
    let diffBiru = 0;

    if (answerMerah !== null) {
      diffMerah = answerMerah === correctIdx ? 10 : -5;
      setScoreMerah((prev) => prev + diffMerah);
    }
    
    if (answerBiru !== null) {
      diffBiru = answerBiru === correctIdx ? 10 : -5;
      setScoreBiru((prev) => prev + diffBiru);
    }

    let msgMerah = answerMerah === null ? "Tidak Menjawab (0)" : (diffMerah > 0 ? "BENAR (+10)" : "SALAH (-5)");
    let msgBiru = answerBiru === null ? "Tidak Menjawab (0)" : (diffBiru > 0 ? "BENAR (+10)" : "SALAH (-5)");

    setFeedback({
      message: timeLeft === 0 ? "WAKTU HABIS!" : "EVALUASI JAWABAN",
      subMessage: `MERAH: ${msgMerah}  |  BIRU: ${msgBiru}`,
      color: selectedSession === 'final' ? "bg-amber-900 text-amber-100 border-b-4 border-amber-500 shadow-xl" : "bg-slate-800 text-white border-b-4 border-slate-500 shadow-xl"
    });

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setGameState('ready_check');
        setReadyMerah(false);
        setReadyBiru(false);
        setFeedback(null);
      } else {
        setGameState('end');
      }
    }, 4000);
  }, [gameState, answerMerah, answerBiru, questions, currentQIndex, timeLeft, selectedSession, playEvaluationSound]);

  useEffect(() => {
    if (gameState === 'ready_check' && readyMerah && readyBiru) {
      const t = setTimeout(() => {
        setCurrentQIndex(prev => prev + 1);
        resetRound();
      }, 500);
      return () => clearTimeout(t);
    }
  }, [gameState, readyMerah, readyBiru]);

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0 && !showExitModal) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      handleEvaluate();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, handleEvaluate, showExitModal]);

  // 🔔 Efek Suara Detik Waktu (Triggered setiap kali timeLeft berkurang)
  useEffect(() => {
    if (gameState === 'playing' && timeLeft < 20 && timeLeft > 0 && !showExitModal) {
      playTickSound(timeLeft <= 5); // Suara urgent jika <= 5 detik
    }
  }, [timeLeft, gameState, showExitModal, playTickSound]);

  useEffect(() => {
    if (gameState === 'playing' && answerMerah !== null && answerBiru !== null) {
      const timeout = setTimeout(() => {
        handleEvaluate();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [answerMerah, answerBiru, gameState, handleEvaluate]);

  const startGame = () => {
    initAudioContext(); // 🔊 Inisialisasi Audio saat tombol mulai diklik agar izin browser diberikan

    let sessionQuestions = [];
    if (selectedSession === 'final') {
      sessionQuestions = SHUFFLE_ARRAY([...QUESTION_BANK]).slice(0, 20).map((q, i) => ({
        ...q,
        q: `[FINAL - Soal ${i + 1}] ${q.q}`
      }));
    } else {
      const startIndex = (selectedSession - 1) * 15;
      const endIndex = startIndex + 15;
      sessionQuestions = FULL_BANK.slice(startIndex, endIndex);
    }

    setQuestions(sessionQuestions);
    setCurrentQIndex(0);
    setScoreMerah(0);
    setScoreBiru(0);
    resetRound();
  };

  const resetRound = () => {
    setAnswerMerah(null);
    setAnswerBiru(null);
    setReadyMerah(false);
    setReadyBiru(false);
    setTimeLeft(20);
    setFeedback(null);
    setGameState('playing');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showExitModal) return;
      if (e.repeat) return;
      const key = e.key.toLowerCase();

      if (gameState === 'playing') {
        if (answerMerah === null) {
          if (key === 'a') setAnswerMerah(0);
          if (key === 's') setAnswerMerah(1);
          if (key === 'd') setAnswerMerah(2);
          if (key === 'f') setAnswerMerah(3);
        }
        if (answerBiru === null) {
          if (key === 'h') setAnswerBiru(0);
          if (key === 'j') setAnswerBiru(1);
          if (key === 'k') setAnswerBiru(2);
          if (key === 'l') setAnswerBiru(3);
        }
      }

      if (gameState === 'ready_check') {
        if (['a', 's', 'd', 'f'].includes(key)) setReadyMerah(true);
        if (['h', 'j', 'k', 'l'].includes(key)) setReadyBiru(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, answerMerah, answerBiru, showExitModal]);


  // ================= RENDER START SCREEN =================
  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-2 text-slate-100">
        <div className="bg-slate-800 p-5 rounded-2xl shadow-2xl max-w-4xl w-full text-center border border-slate-700 relative">
          
          <button 
            onClick={() => {
                initAudioContext();
                setIsMuted(!isMuted);
            }} 
            className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
            title={isMuted ? "Suara Dimatikan" : "Suara Dinyalakan"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
          </button>

          <MonitorPlay className="w-12 h-12 mx-auto text-indigo-400 mb-2" />
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Kuis Cerdas Cermat Informatika
          </h1>
          <p className="text-sm text-slate-300 mb-4">
            Dua perwakilan kelompok maju ke depan! Bersiaplah adu kecepatan dan ketepatan.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-red-900/40 p-3 rounded-xl border border-red-500/30">
              <h2 className="text-lg font-bold text-red-400 mb-1">TIM MERAH</h2>
              <p className="text-xs text-slate-400 mb-2">Gunakan Keyboard Kiri</p>
              <div className="flex justify-center gap-1">
                {['A', 'S', 'D', 'F'].map(k => (
                  <kbd key={k} className="px-2 py-1 bg-slate-700 rounded-md font-mono font-bold text-red-300 border-b-2 border-slate-900 text-sm">{k}</kbd>
                ))}
              </div>
            </div>
            <div className="bg-blue-900/40 p-3 rounded-xl border border-blue-500/30">
              <h2 className="text-lg font-bold text-blue-400 mb-1">TIM BIRU</h2>
              <p className="text-xs text-slate-400 mb-2">Gunakan Keyboard Kanan</p>
              <div className="flex justify-center gap-1">
                {['H', 'J', 'K', 'L'].map(k => (
                  <kbd key={k} className="px-2 py-1 bg-slate-700 rounded-md font-mono font-bold text-blue-300 border-b-2 border-slate-900 text-sm">{k}</kbd>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-700/50 p-2.5 rounded-lg text-left mb-4 max-w-2xl mx-auto">
            <h3 className="font-bold text-amber-400 mb-1 text-sm">Aturan Main:</h3>
            <ul className="list-disc pl-5 text-xs text-slate-300 space-y-0.5">
              <li>Pilih jawaban secara rahasia! Lawan tidak tahu jawabanmu.</li>
              <li>Hasil dievaluasi <b>setelah kedua tim menjawab</b> ATAU waktu habis.</li>
              <li>Setiap ganti soal, kedua tim harus mengonfirmasi kesiapan.</li>
              <li>Benar = <span className="text-emerald-400 font-bold">+10</span>, Salah = <span className="text-red-400 font-bold">-5</span></li>
            </ul>
          </div>

          <div className="mb-4 w-full max-w-2xl mx-auto">
            <h3 className="text-sm font-bold text-slate-300 mb-2 text-center">Pilih Sesi Permainan:</h3>
            
            {/* Sesi Reguler 1-15 */}
            <div className="grid grid-cols-5 gap-2 mb-3">
              {Array.from({ length: 15 }, (_, i) => i + 1).map(sesi => (
                <button
                  key={sesi}
                  onClick={() => setSelectedSession(sesi)}
                  className={`py-1.5 rounded-lg font-bold border transition-all text-sm ${
                    selectedSession === sesi 
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_10px_rgba(79,70,229,0.5)]' 
                      : 'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  }`}
                >
                  Sesi {sesi}
                </button>
              ))}
            </div>

            {/* Tombol Sesi Final */}
            <button
              onClick={() => setSelectedSession('final')}
              className={`w-full py-2.5 rounded-lg font-black border-2 transition-all flex items-center justify-center gap-2 text-sm md:text-base tracking-widest uppercase ${
                selectedSession === 'final'
                  ? 'bg-amber-500 border-amber-200 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                  : 'bg-slate-800 border-amber-600/50 text-amber-500 hover:bg-amber-900/40 hover:text-amber-400'
              }`}
            >
              <Star className={`w-5 h-5 ${selectedSession === 'final' ? 'fill-slate-900' : 'fill-amber-500'}`} />
              Sesi Final (Acak 20 Soal)
              <Star className={`w-5 h-5 ${selectedSession === 'final' ? 'fill-slate-900' : 'fill-amber-500'}`} />
            </button>
          </div>

          <button 
            onClick={startGame}
            className={`flex items-center justify-center mx-auto gap-2 px-6 py-2 rounded-full text-lg font-bold transition-transform hover:scale-105 active:scale-95 shadow-md ${
              selectedSession === 'final' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-amber-500/40' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-indigo-500/30'
            }`}
          >
            <Play className="w-5 h-5 fill-current" />
            MULAI PERTANDINGAN
          </button>
        </div>
      </div>
    );
  }

  // ================= RENDER END SCREEN =================
  if (gameState === 'end') {
    const winner = scoreMerah > scoreBiru ? 'Merah' : scoreBiru > scoreMerah ? 'Biru' : 'Seri';
    
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-slate-100">
         <div className={`bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-xl w-full text-center border ${selectedSession === 'final' ? 'border-amber-500 shadow-amber-500/20' : 'border-slate-700'}`}>
          
          {selectedSession === 'final' && <h2 className="text-amber-500 font-black tracking-widest mb-4">HASIL SESI FINAL</h2>}
          <Trophy className={`w-24 h-24 mx-auto mb-4 ${winner === 'Merah' ? 'text-red-500' : winner === 'Biru' ? 'text-blue-500' : 'text-amber-500'}`} />
          
          <h1 className="text-4xl font-black mb-2 uppercase">
            {winner === 'Seri' ? 'PERTANDINGAN SERI!' : `TIM ${winner} MENANG!`}
          </h1>
          <p className="text-slate-400 mb-6 text-sm">Permainan Selesai</p>

          <div className="flex justify-around items-center mb-8 bg-slate-900 p-4 rounded-xl">
            <div className="text-center">
              <h3 className="text-xl font-bold text-red-500 mb-1">TIM MERAH</h3>
              <p className="text-5xl font-black text-white">{scoreMerah}</p>
            </div>
            <div className="text-3xl font-black text-slate-600">VS</div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-blue-500 mb-1">TIM BIRU</h3>
              <p className="text-5xl font-black text-white">{scoreBiru}</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button 
              onClick={returnToMenu}
              className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 text-sm"
            >
              <Home className="w-4 h-4" />
              Menu Utama
            </button>
            <button 
              onClick={startGame}
              className={`flex items-center justify-center gap-2 text-white px-6 py-3 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 shadow-md text-sm ${
                selectedSession === 'final' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-amber-500/30'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-indigo-500/30'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Main Lagi Sesi Ini
            </button>
          </div>
         </div>
      </div>
    );
  }

  // ================= RENDER GAME SCREEN =================
  const currentQ = questions[currentQIndex];
  const isFinalMode = selectedSession === 'final';

  return (
    <div className={`min-h-screen flex flex-col font-sans overflow-hidden ${isFinalMode ? 'bg-slate-950' : 'bg-slate-900'}`}>
      
      {/* Overlay Fitur Kesiapan (Ready Check) */}
      {gameState === 'ready_check' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm">
          <div className={`p-8 rounded-2xl shadow-2xl border text-center max-w-xl w-full animate-in zoom-in-95 duration-200 ${isFinalMode ? 'bg-slate-900 border-amber-600/50' : 'bg-slate-800 border-slate-700'}`}>
            <h2 className="text-3xl font-black text-white mb-2">SOAL SELANJUTNYA</h2>
            <p className="text-slate-400 mb-6 text-sm">Tekan <b>TOMBOL JAWABAN MANA SAJA</b> di keyboard Anda untuk konfirmasi siap.</p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${readyMerah ? 'bg-red-900/80 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-slate-800 border-slate-600'}`}>
                <h3 className="text-xl font-bold text-red-400 mb-2">TIM MERAH</h3>
                <div className={`text-xl font-black ${readyMerah ? 'text-white' : 'text-slate-500 animate-pulse'}`}>
                  {readyMerah ? '✅ SIAP!' : '⏳ MENUNGGU...'}
                </div>
              </div>
              <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${readyBiru ? 'bg-blue-900/80 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-slate-800 border-slate-600'}`}>
                <h3 className="text-xl font-bold text-blue-400 mb-2">TIM BIRU</h3>
                <div className={`text-xl font-black ${readyBiru ? 'text-white' : 'text-slate-500 animate-pulse'}`}>
                  {readyBiru ? '✅ SIAP!' : '⏳ MENUNGGU...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exit Modal Konfirmasi */}
      {showExitModal && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-700 max-w-sm w-full text-center animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-white mb-2">Kembali ke Menu?</h3>
            <p className="text-slate-400 mb-6 text-sm">Pertandingan saat ini akan dihentikan dan semua skor akan direset.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowExitModal(false)} className="px-4 py-2 rounded-lg font-bold bg-slate-700 text-white hover:bg-slate-600 transition-colors w-full text-sm">Batal</button>
              <button onClick={returnToMenu} className="px-4 py-2 rounded-lg font-bold bg-red-600 text-white hover:bg-red-500 transition-colors w-full text-sm">Ya, Kembali</button>
            </div>
          </div>
        </div>
      )}

      {/* Header Info */}
      <header className={`grid grid-cols-3 items-center px-4 py-2 shadow-md relative z-10 border-b ${isFinalMode ? 'bg-slate-900 border-amber-900/50' : 'bg-slate-800 border-slate-700'}`}>
        <div className="flex items-center gap-2 justify-start">
          <button onClick={handleHomeClick} className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors shrink-0" title="Kembali ke Menu Utama">
            <Home className="w-5 h-5" />
          </button>
          <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors shrink-0" title={isMuted ? "Suara Dimatikan" : "Suara Dinyalakan"}>
            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
          </button>

          <div className="flex items-center gap-2 bg-red-950/50 px-3 py-1 rounded-xl border border-red-500/30 ml-2">
            <span className="font-bold text-red-400 text-sm tracking-wider hidden sm:block">MERAH</span>
            <span className="text-2xl font-black text-white">{scoreMerah}</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className={`flex items-center gap-1.5 px-3 py-0.5 rounded-full border mb-0.5 ${isFinalMode ? 'bg-amber-900/50 border-amber-500 text-amber-400' : 'text-amber-400 bg-amber-900/30 border-amber-500/30'} ${timeLeft <= 5 && gameState === 'playing' ? 'animate-pulse text-red-400 border-red-500 bg-red-900/30' : ''}`}>
            <Clock className="w-4 h-4" />
            <span className="text-xl font-black">{timeLeft}s</span>
          </div>
          <div className={`text-[10px] md:text-xs font-bold tracking-widest uppercase text-center ${isFinalMode ? 'text-amber-500' : 'text-slate-400'}`}>
            {isFinalMode && <Star className="w-3 h-3 inline-block mr-1 pb-0.5" />}
            Soal {currentQIndex + 1} / {questions.length}
            {isFinalMode && <Star className="w-3 h-3 inline-block ml-1 pb-0.5" />}
          </div>
        </div>

        <div className="flex items-center gap-2 bg-blue-950/50 px-3 py-1 rounded-xl border border-blue-500/30 justify-end ml-auto">
          <span className="text-2xl font-black text-white">{scoreBiru}</span>
          <span className="font-bold text-blue-400 text-sm tracking-wider hidden sm:block">BIRU</span>
        </div>
      </header>

      {/* Main Arena */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
        
        {/* Split Background Effect */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="flex-1 bg-red-900/10"></div>
          <div className={`w-px ${isFinalMode ? 'bg-amber-900/50' : 'bg-slate-800/50'}`}></div>
          <div className="flex-1 bg-blue-900/10"></div>
        </div>

        {/* Indikator "Sudah Menjawab" */}
        {gameState === 'playing' && answerMerah !== null && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-2 rounded-r-xl font-bold shadow-lg animate-pulse z-20 border-y border-r border-red-400 text-sm">
             🔥 Merah Sudah Menjawab
          </div>
        )}
        {gameState === 'playing' && answerBiru !== null && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-l-xl font-bold shadow-lg animate-pulse z-20 border-y border-l border-blue-400 text-sm">
             Biru Sudah Menjawab 🔥
          </div>
        )}

        {/* Status Feedback Banner */}
        {feedback && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-4 duration-300">
            <div className={`px-6 py-3 rounded-xl shadow-xl text-center ${feedback.color}`}>
              <h2 className="text-xl font-black uppercase tracking-wider mb-1">{feedback.message}</h2>
              <div className="text-sm font-bold bg-black/30 px-4 py-1 rounded-md tracking-wide">{feedback.subMessage}</div>
            </div>
          </div>
        )}

        {/* Question Area */}
        <div className={`p-5 rounded-2xl shadow-lg w-full max-w-4xl z-10 relative mt-4 mb-4 border ${isFinalMode ? 'bg-slate-900 border-amber-600/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'bg-slate-800 border-slate-700'}`}>
           <div className={`text-xl md:text-2xl font-bold text-center leading-snug ${isFinalMode ? 'text-amber-50' : 'text-white'}`}>
             {currentQ?.q}
           </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-4xl z-10">
          {currentQ?.options.map((opt, i) => {
            let isCorrect = gameState === 'result' && i === currentQ.answer;
            let pickedByMerah = gameState === 'result' && i === answerMerah;
            let pickedByBiru = gameState === 'result' && i === answerBiru;

            let boxClass = isFinalMode ? "bg-slate-900 border-slate-700" : "bg-slate-800 border-slate-600";
            
            if (gameState === 'result') {
                if (isCorrect) boxClass = "bg-emerald-900/90 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                else if (pickedByMerah || pickedByBiru) boxClass = "bg-red-900/80 border-red-500/50 opacity-80";
                else boxClass = `${isFinalMode ? 'bg-slate-900/50' : 'bg-slate-800/50'} border-slate-700 opacity-40`;
            }

            return (
              <div key={i} className={`border-2 rounded-xl p-3 flex items-center shadow relative transition-all duration-300 min-h-[4rem] ${boxClass}`}>
                <div className={`absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-center items-center border-r rounded-l-xl ${isFinalMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-700/50 border-slate-600/50'}`}>
                  <div className="flex flex-col gap-1">
                    <span className="bg-red-500/20 text-red-300 font-black px-1.5 py-0.5 rounded border border-red-500/50 text-xs">{['A', 'S', 'D', 'F'][i]}</span>
                    <span className="bg-blue-500/20 text-blue-300 font-black px-1.5 py-0.5 rounded border border-blue-500/50 text-xs">{['H', 'J', 'K', 'L'][i]}</span>
                  </div>
                </div>

                <span className={`text-base font-semibold pl-16 pr-24 ${gameState === 'result' && isCorrect ? 'text-emerald-100' : 'text-slate-200'}`}>{opt}</span>

                {/* Indikator Jawaban Evaluasi */}
                {gameState === 'result' && (pickedByMerah || pickedByBiru || isCorrect) && (
                    <div className="absolute right-2 flex flex-col gap-1">
                        {pickedByMerah && <span className="bg-red-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow">MERAH {isCorrect ? '✅' : '❌'}</span>}
                        {pickedByBiru && <span className="bg-blue-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow">BIRU {isCorrect ? '✅' : '❌'}</span>}
                        {isCorrect && !pickedByMerah && !pickedByBiru && <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow">BENAR</span>}
                    </div>
                )}
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer Key Guides */}
      <footer className="bg-slate-950 p-2 border-t border-slate-800 z-10 flex justify-between px-6 relative">
         <div className={`flex items-center gap-3 transition-all duration-300 ${answerMerah !== null ? 'opacity-30 grayscale blur-[1px]' : 'opacity-100'}`}>
           <Keyboard className="text-red-500 w-5 h-5" />
           <div className="flex gap-1.5">
             {['A', 'S', 'D', 'F'].map((k, i) => (
               <div key={k} className="text-center">
                 <kbd className="inline-block px-2 py-0.5 bg-red-900 text-red-200 rounded text-xs font-mono font-bold border-b-2 border-red-950">{k}</kbd>
               </div>
             ))}
           </div>
         </div>

         <div className={`flex items-center gap-3 transition-all duration-300 ${answerBiru !== null ? 'opacity-30 grayscale blur-[1px]' : 'opacity-100'}`}>
           <div className="flex gap-1.5">
             {['H', 'J', 'K', 'L'].map((k, i) => (
               <div key={k} className="text-center">
                 <kbd className="inline-block px-2 py-0.5 bg-blue-900 text-blue-200 rounded text-xs font-mono font-bold border-b-2 border-blue-950">{k}</kbd>
               </div>
             ))}
           </div>
           <Keyboard className="text-blue-500 w-5 h-5" />
         </div>
      </footer>
    </div>
  );
}