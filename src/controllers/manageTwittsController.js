document.addEventListener("DOMContentLoaded", () => {

    const usernameLoggedIn = localStorage.getItem("usernameLoggedIn"); // mengambil data usernameLoggedIn dari local storage

    const instantFeedback = document.getElementById("instantFeedback"); // mengambil id instantFeedback
    instantFeedback.style.display = "none"; // menyembunyikan instantFeedback

    const twittForm = document.getElementById("twittForm"); // mengambil id twittForm
    const ownerPhoto = document.getElementById("ownerPhoto"); // mengambil id ownerPhoto
    const twitstWrapper = document.getElementById("twittsWrapper"); // mengambil id twittsWrapper
    const twittContent = document.getElementById("twittContent"); // mengambil id twittContent

    let selectedFeeling = null // membuat variabel selectedFeeling dengan nilai null

    const feelingItems = document.querySelectorAll(".item-feeling"); // mengambil class item-feeling

    feelingItems.forEach((item) => { // melakukan perulangan pada setiap item
        item.addEventListener("click", () => { // menambahkan event click pada setiap item
            selectedFeeling = item.getAttribute("data-feeling"); // mengambil data-feeling pada setiap item
            feelingItems.forEach((i) => i.classList.remove("border-[#1880e8]")); // melakukan perulangan pada setiap item dan menghapus class border-[#1880e8]
            item.classList.add("border-[#1880e8]"); // menambahkan class border-[#1880e8] pada item yang di klik
        });
    });

    const twittManager = new Twitt(); // membuat objek twittManager dari class TwittManager
    const userManager = new User(); // membuat objek userManager dari class UserManager

    const twittUsers = userManager.getUsers(); // mengambil data user dari local storage

    const ownerLoggedIn = twittUsers.find(user => user.username.toLowerCase() === usernameLoggedIn.toLowerCase()); // mencari data user yang login

    ownerPhoto.src = ownerLoggedIn.avatar; // mengambil avatar user yang login

    // Membuat format tanggal hari ini dengan format YYYY-MM-DD
    const today = new Date(); // Membuat Object Date untuk mendapatkan tanggal hari ini
    const year = today.getFullYear(); // Mendapatkan Tahun saat ini
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Mendapatkan Bulan dan menambahkan 1 karena getMonth() dimulai dari 0
    const day = String(today.getDate()).padStart(2, "0"); // Mendapatkan Hari dan memastikan selalu 2 digit

    twittForm.addEventListener("submit", (event) => { // menambahkan event submit pada form twittForm
        event.preventDefault(); // mencegah submit default dari form, agar tidak refresh halaman

        const twittData = { // membuat objek twittData
            twittContent: twittContent.value, // mengambil value dari twittContent
            twittUsernameOwner: usernameLoggedIn, // mengambil username yang login
            twittFeeling: selectedFeeling, // mengambil selectedFeeling
            twittCreatedAt: `${year}-${month}-${day}`, // mengambil tanggal hari ini
        }

        const result = twittManager.addTwitt(twittData); // menambahkan twittData ke local storage

        if (result.success) {
            instantFeedback.style.display = "none"; // menyembunyikan instantFeedback
            twittContent.value = ""; // mengosongkan twittContent
            selectedFeeling = null; // mengosongkan selectedFeeling

            feelingItems.forEach((i) => i.classList.remove("border-[#1880e8]")); // melakukan perulangan pada setiap item dan menghapus class border-[#1880e8]
        } else {
            instantFeedback.style.display = "block"; // menampilkan instantFeedback
            instantFeedback.innerText = result.error; // menampilkan pesan error
        }
    });
})