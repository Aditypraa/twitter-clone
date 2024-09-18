class User {
  // Construktor
  constructor() {
    this._users = null; // Membuat properti/Attribute _users yang nilainya null
  }

  // Method : mendapatkan data user
  getUsers() {
    // Jika _users sama dengan null/kosong
    if (this._users === null) {
      try {
        const storedUsers = localStorage.getItem("users"); // Mengambil data dari local storage yang DEFAULT formatnya String JSON
        this._users = storedUsers ? JSON.parse(storedUsers) : []; // Jika storedUsers ada maka di parse ke object JSON atau DATA aslinya yaitu OBJECT, jika tidak maka di isi array kosong
      } catch (error) {
        // jika terjadi error
        return (this._users = []); // Mengirim Array Kosong
      }
    }
    return this._users;
  }
}
