// DOMContentLoaded event yang akan dijalankan ketika seluruh HTML berhasil di-load
document.addEventListener("DOMContentLoaded", () => {
  // Mendapatkan elemen form dengan ID 'form-manager'
  const formManager = document.getElementById("formManager");

  // Mendapatkan elemen input untuk nama, avatar, username, dan password dari form berdasarkan ID
  const userName = document.getElementById("name");
  const userAvatar = document.getElementById("avatar");
  const userUsername = document.getElementById("username");
  const userPassword = document.getElementById("password");

  // Mendapatkan elemen feedback untuk menampilkan pesan error atau sukses
  const instantFeedback = document.getElementById("instantFeedback");
  instantFeedback.style.display = "none"; // Menyembunyikan feedback

  // Membuat instance dari class User untuk mengelola data pengguna
  const userManager = new User(); // UserManager adalah instance Object dari class User

  // Membuat format tanggal hari ini dengan format YYYY-MM-DD
  const today = new Date(); // Membuat Object Date untuk mendapatkan tanggal hari ini
  const year = today.getFullYear(); // Mendapatkan Tahun saat ini
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Mendapatkan Bulan dan menambahkan 1 karena getMonth() dimulai dari 0
  const day = String(today.getDate()).padStart(2, "0"); // Mendapatkan Hari dan memastikan selalu 2 digit

  // Menambahkan event listener ketika form di-submit
  formManager.addEventListener("submit", (event) => {
    event.preventDefault(); // Mencegah submit default dari form, agar tidak refresh halaman

    // Membuat objek data pengguna berdasarkan input dari form
    const userData = {
      name: userName.value, // Mengambil nilai dari input 'name'
      avatar: userAvatar.value, // Mengambil nilai dari input 'avatar'
      username: userUsername.value, // Mengambil nilai dari input 'username'
      password: userPassword.value, // Mengambil nilai dari input 'password'
      createdAt: `${year}-${month}-${day}`, // Mengatur tanggal pembuatan akun dengan format YYYY-MM-DD
    };

    // Memanggil method saveUser dari userManager untuk menyimpan data pengguna
    const result = userManager.saveUser(userData); // Menyimpan data user ke dalam local storage

    // Mengecek apakah penyimpanan berhasil atau gagal
    if (result.success) {
      instantFeedback.style.display = "none"; // Menyembunyikan feedback jika berhasil

      // Mengarahkan pengguna ke halaman login setelah berhasil menyimpan data
      window.location.href = "login.html";
    } else {
      // Menampilkan pesan error jika penyimpanan gagal
      instantFeedback.style.display = "flex"; // Menampilkan feedback
      instantFeedback.textContent = result.error; // Menampilkan pesan error
    }
  });
});
