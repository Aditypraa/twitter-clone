// DOMContentLoaded event yang akan dijalankan ketika seluruh HTML berhasil di-load
document.addEventListener("DOMContentLoaded", () => {
    // Mendapatkan elemen form dengan ID 'form-manager'
    const formManager = document.getElementById("formManager");

    const userUsername = document.getElementById("username");
    const userPassword = document.getElementById("password");

    // Mendapatkan elemen feedback untuk menampilkan pesan error atau sukses
    const instantFeedback = document.getElementById("instantFeedback");

    instantFeedback.style.display = "none"; // Menyembunyikan feedback

    // Membuat instance dari class User untuk mengelola data pengguna
    const userManager = new User(); // UserManager adalah instance Object dari class User

    // Menambahkan event listener ketika form di-submit
    formManager.addEventListener("submit", (event) => {
        event.preventDefault(); // Mencegah submit default dari form, agar tidak refresh halaman

        // Membuat objek data pengguna berdasarkan input dari form
        const userData = {
            username: userUsername.value, // Mengambil nilai dari input 'username'
            password: userPassword.value, // Mengambil nilai dari input 'password'
        };

        // Memanggil method userSignin dari userManager untuk menyimpan data pengguna
        const result = userManager.userSignin(userData); // Menyimpan data user ke dalam local storage

        // Mengecek apakah penyimpanan berhasil atau gagal
        if (result.success) {
            instantFeedback.style.display = "none"; // Menyembunyikan feedback jika berhasil
            localStorage.setItem("usernameLoggedIn", userUsername.value); // Menyimpan data pengguna yang berhasil login
            // Mengarahkan pengguna ke halaman login setelah berhasil menyimpan data
            window.location.href = "index.html";
        } else {
            // Menampilkan pesan error jika penyimpanan gagal
            instantFeedback.style.display = "flex"; // Menampilkan feedback
            instantFeedback.textContent = result.error; // Menampilkan pesan error
        }
    });
});
