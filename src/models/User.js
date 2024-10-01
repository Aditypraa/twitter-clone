class User {
  // Constructor
  constructor() {
    // Inisialisasi properti _users yang akan menyimpan data pengguna
    // Diinisialisasi dengan nilai null, nantinya akan diisi dengan data dari localStorage
    this._users = null; // Membuat properti/Attribute _users yang nilainya null
  }

  // Method untuk mendapatkan data pengguna dari localStorage
  getUsers() {
    // Jika _users belum diinisialisasi (masih null)
    if (this._users === null) {
      try {
        // Mengambil data pengguna yang tersimpan di localStorage dengan key 'users'
        const storedUsers = localStorage.getItem("users"); // Mengambil data dari local storage yang DEFAULT formatnya adalah String JSON

        // Jika ada data yang ditemukan di localStorage, data JSON tersebut di-parse menjadi array object
        // Jika tidak ada data (storedUsers null), _users diisi dengan array kosong
        this._users = storedUsers ? JSON.parse(storedUsers) : []; // Mengubah string JSON menjadi objek array, atau mengisi dengan array kosong jika null
      } catch (error) {
        // Jika terjadi kesalahan saat mengambil atau mem-parse data dari localStorage
        return (this._users = []); // Jika terjadi error, kembalikan nilai _users sebagai array kosong
      }
    }

    // Mengembalikan data pengguna (baik dari localStorage atau array kosong jika tidak ada)
    return this._users;
  }

  saveUser(userData) {
    // Proses Validasi Data
    const { name, username, avatar, password } = userData; // Destructuring object userData

    // Validasi data pengguna
    if (!name || !username || !avatar || !password) {
      return {
        success: false,
        error: "Semua data pengguna harus diisi!",
      };
    }

    // Validasi panjang username
    if (username.length < 4) {
      return {
        success: false,
        error: "Username harus memiliki minimal 4 karakter.",
      };
    }

    // Validasi format email (jika username berupa email)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(username)) {
      return {
        success: false,
        error: "Format email tidak valid.",
      };
    }

    // Validasi panjang password
    if (password.length < 8) {
      return {
        success: false,
        error: "Password harus memiliki minimal 8 karakter.",
      };
    }

    // Validasi kompleksitas password (opsional: huruf besar, kecil, angka, dan simbol)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      return {
        success: false,
        error: "Password harus mengandung minimal satu huruf besar, satu huruf kecil, satu angka, dan satu simbol.",
      };
    }

    // // Jika semua validasi lolos, proses penyimpanan data
    // return {
    //   success: true,
    //   message: "Data pengguna berhasil disimpan!",
    // };
  }
}
