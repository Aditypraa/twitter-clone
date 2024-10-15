class Twitt {
    constructor() {
        this._twitts = null;
        this._loveTwitts = null;
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

    userHashLikedTwittValidate(twittId, userId) {
        // Proses Pemeriksaan apakah user tersebut telah memberikan like pada twitt tersebut
        const loveTwitts = this.getLoveTwitts(); // Mengambil data loveTwitts dari localStorage

        return loveTwitts.some((loveTwitt) => loveTwitt.twittId === twittId && loveTwitt.userId === userId); // Mengecek apakah user tersebut telah memberikan like pada twitt tersebut
    }

    getLoveTwitts() {
        // Jika _loveTwitts belum diinisialisasi (masih null)
        if (this._loveTwitts === null) {
            try {
                // Mengambil data pengguna yang tersimpan di localStorage dengan key "lovetwitts"
                const storedLoveTwitts = localStorage.getItem("lovetwitts"); // Mengambil data dari local storage yang DEFAULT formatnya adalah String JSON

                // Jika ada data yang ditemukan di localStorage, data JSON tersebut di-parse menjadi array object
                // Jika tidak ada data (storedLoveTwitts null), _loveTwitts diisi dengan array kosong
                this._loveTwitts = storedLoveTwitts ? JSON.parse(storedLoveTwitts) : []; // Mengubah string JSON menjadi objek array, atau mengisi dengan array kosong jika null
            } catch (error) {
                // Jika terjadi kesalahan saat mengambil atau mem-parse data dari localStorage
                return (this._loveTwitts = []); // Jika terjadi error, kembalikan nilai _loveTwitts sebagai array kosong
            }
        }

        // Mengembalikan data pengguna (baik dari localStorage atau array kosong jika tidak ada)
        return this._loveTwitts;
    }

    // method untuk love twitt
    loveTwitt(loveTwittData) {
        const { twittId, userId } = loveTwittData // Destructuring object loveTwittData

        // Membuat Valdasi apakah user tersebut telah memeberikan like pada twitt tersebut
        if (this.userHashLikedTwittValidate(twittId, userId)) {
            return {
                success: false,
                error: "Kamu tidak bisa memberikan love lebih dari satu kali",
            }
        }

        const newLoveTwitt = { // Membuat objek newLoveTwitt
            id: Date.now(), // Menggunakan timestamp sebagai id
            ...loveTwittData // Menggabungkan data loveTwittData dengan id    
        }

        const loveTwitts = this.getLoveTwitts(); // Mengambil data loveTwitts dari localStorage
        loveTwitts.push(newLoveTwitt); // Menambahkan data loveTwittData ke array loveTwitts

        try {
            localStorage.setItem("lovetwitts", JSON.stringify(loveTwitts)); // Menyimpan data loveTwitts ke localStorage dengan key 'loveTwitts'
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

    // Method delete Twitt
    deleteTwitt(twittId) {
        const index = this.getTwitts().findIndex((twitt) => twitt.id === twittId); // Mencari index twitt berdasarkan id
        if (index !== -1) { // Jika index ditemukan
            this._twitts.splice(index, 1); // Menghapus data twitt berdasarkan index
            try {
                localStorage.setItem("twitts", JSON.stringify(this._twitts)); // Menyimpan data twitts ke localStorage dengan key 'twitts'
                return {
                    success: true, // Jika berhasil, kembalikan nilai success true
                    error: null, // Tidak ada error
                };
            } catch (error) {
                return {
                    success: false, // Jika gagal, kembalikan nilai success false
                    error: "Twitt Tidak Ditemukan"
                };
            }
        }

    }
}