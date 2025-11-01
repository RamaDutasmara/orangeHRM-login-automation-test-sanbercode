# 🧪 OrangeHRM Login Automation Test

Nama: Rama Dutasmara  
Kelas / Program: Sanbercode QA Engineer Bootcamp  
ugas: Automation Testing – Feature Login (Cypress)

---

## 📋 Deskripsi
Proyek ini merupakan hasil implementasi otomatisasi pengujian pada fitur "Login OrangeHRM" menggunakan "Cypress.io".  
Seluruh test case diambil dari test case manual yang telah dibuat sebelumnya di Google Spreadsheet.

---

## 🧱 Struktur Test
| Jenis | ID | Deskripsi |
|-------|----|------------|
| Positive | TC_POS_001 | Login dengan kredensial valid |
| Positive | TC_POS_002 | Pastikan halaman login tampil normal |
| Positive | TC_POS_003 | Verifikasi tombol login aktif saat field terisi |
| Positive | TC_POS_004 | Verifikasi link “Forgot your password?” tampil |
| Positive | TC_POS_005 | Verifikasi logout kembali ke halaman login |
| Negative | TC_NEG_001 | Login gagal dengan username salah |
| Negative | TC_NEG_002 | Login gagal dengan password salah |
| Negative | TC_NEG_003 | Login gagal dengan field kosong |
| Negative | TC_NEG_004 | Login gagal dengan username berisi simbol |
| Negative | TC_NEG_005 | Login gagal dengan hanya mengisi username saja |

---

## ⚙️ Cara Menjalankan
1. Clone repository ini  
   ```bash
   git clone https://github.com/RamaDutasmara/orangeHRM-login-automation-test-sanbercode.git
