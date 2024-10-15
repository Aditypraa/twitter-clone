class Twitt {
    constructor() {
        this._twitts = null;
    }

    // Method untuk mendapatkan data pengguna dari localStorage
    getTwitts() {
        // Jika _twitts belum diinisialisasi (masih null)
        if (this._twitts === null) {
            try {
                // Mengambil data pengguna yang tersimpan di localStorage dengan key 'users'
                const storedTwitts = localStorage.getItem("twitts"); // Mengambil data dari local storage yang DEFAULT formatnya adalah String JSON

                // Jika ada data yang ditemukan di localStorage, data JSON tersebut di-parse menjadi array object
                // Jika tidak ada data (storedTwitts null), _twitts diisi dengan array kosong
                this._twitts = storedTwitts ? JSON.parse(storedTwitts) : []; // Mengubah string JSON menjadi objek array, atau mengisi dengan array kosong jika null
            } catch (error) {
                // Jika terjadi kesalahan saat mengambil atau mem-parse data dari localStorage
                return (this._twitts = []); // Jika terjadi error, kembalikan nilai _twitts sebagai array kosong
            }
        }

        // Mengembalikan data pengguna (baik dari localStorage atau array kosong jika tidak ada)
        return this._twitts;
    }

    // Method untuk menambahkan data pengguna ke localStorage
    addTwitt(twittData) {
        const { twittContent, twittFeeling } = twittData; // Destructuring object twittData

        if (typeof twittContent !== "string" || twittContent.trim() === "") { // Jika twittContent bukan string atau string kosong
            return {
                success: false,
                error: "Twitt content is missing",
            };
        }

        if (twittContent > 150) { // Jika twittContent lebih dari 150 karakter
            return {
                success: false,
                error: "Twitt content is more than 150 characters",
            };
        }

        if (typeof twittFeeling !== "string" || twittFeeling.trim() === "") { // Jika twittFeeling bukan string atau string kosong
            return {
                success: false,
                error: "Twitt feeling is missing",
            };
        }

        const newTwitt = { // Membuat objek newTwitt
            id: Date.now(), // Menggunakan timestamp sebagai id
            isActive: true, // Menandakan twitt aktif
            ...twittData // Menggabungkan data twittData dengan id dan isActive
        }

        const twitss = this.getTwitts(); // Mengambil data twitts dari localStorage
        twitss.push(newTwitt); // Menambahkan data twittData ke array twitss

        try {
            localStorage.setItem("twitts", JSON.stringify(twitss)); // Menyimpan data twitss ke localStorage dengan key 'twitts'
            return {
                success: true, // Jika berhasil, kembalikan nilai success true
                error: null, // Tidak ada error
            };
        } catch (error) {
            return {
                success: false, // Jika gagal, kembalikan nilai success false
                error: error.message, // Tampilkan pesan error
            };
        }
    }
}