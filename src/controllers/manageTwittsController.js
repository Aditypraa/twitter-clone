document.addEventListener("DOMContentLoaded", () => {

    const usernameLoggedIn = localStorage.getItem("usernameLoggedIn"); // mengambil data usernameLoggedIn dari local storage

    const instantFeedback = document.getElementById("instantFeedback"); // mengambil id instantFeedback
    instantFeedback.style.display = "none"; // menyembunyikan instantFeedback

    const twittForm = document.getElementById("twittForm"); // mengambil id twittForm
    const ownerPhoto = document.getElementById("ownerPhoto"); // mengambil id ownerPhoto
    const twittsWrapper = document.getElementById("twittsWrapper"); // mengambil id twittsWrapper
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

            displayAllTwiits(twittManager.getTwitts()); // menampilkan semua twitts
        } else {
            instantFeedback.style.display = "block"; // menampilkan instantFeedback
            instantFeedback.innerText = result.error; // menampilkan pesan error
        }
    });

    const existingTwitts = twittManager.getTwitts(); // mengambil data twitts dari local storage

    function displayAllTwiits(twitts = existingTwitts) { // membuat fungsi displayAllTwiits dengan parameter twitts
        if (twitts.length === 0) { // jika existingTwitts kosong
            console.log("Tidak Ada twitts yang tersedia")
            twittsWrapper.innerHTML = ""; // mengosongkan twittsWrapper
        } else {
            console.log("tersedia twitts siap di tampilkan")

            twittsWrapper.innerHTML = ""; // mengosongkan twittsWrapper

            twitts.sort((a, b) => b.id - a.id); // mengurutkan twitts berdasarkan id dari yang terbaru ke yang lama

            twitts.forEach((twitt) => { // melakukan perulangan pada setiap twitt

                const ownerTwitt = twittUsers.find(user => user.username.toLowerCase() === twitt.twittUsernameOwner.toLowerCase()); // mencari data user yang memiliki twitt

                const itemTwitt = document.createElement("div"); // membuat elemen div
                itemTwitt.className = "bg-primary p-4 border-b-2 border-line" // menambahkan class pada itemTwitt
                itemTwitt.id = `twitt-${twitt.id}`
                itemTwitt.innerHTML = `
            <div class="flex items-center justify-between">
              <div class="flex items-center justify-start">
                <img
                  src="${ownerTwitt.avatar}"
                  alt="search"
                  srcset=""
                  class="object-cover w-[46px] h-[46px] rounded-full"
                />
                <div class="pl-2">
                  <div class="flex gap-1">
                    <p class="text-base font-bold inline-block">
                      ${ownerTwitt.name}
                      <img
                        src="assets/images/verify.png"
                        alt=""
                        srcset=""
                        class="inline w-5 h-5 rounded-full"
                      />
                    </p>
                  </div>
                  <p class="text-username text-sm">
                    @${twitt.twittUsernameOwner} • ${twitt.twittCreatedAt}
                  </p>
                </div>
              </div>
              <div
                class="flex justify-center items-center rounded-full px-3 py-1.5 border-line border-2 gap-1.5"
              >
                <p class="text-sm font-semibold">${twitt.twittFeeling}</p>
              </div>
            </div>

            <p class="pl-[55px] py-2.5 leading-7 text-base">
              ${twitt.twittContent}
            </p>

            <div class="flex justify-between items-center pl-[55px] w-[484px]">
              <div class="flex justify-center items-center gap-2.5 pr-[250px]">
                <a
                  href="#"
                  class="cursor flex justify-start items-center w-[93px] gap-1.5"
                >
                  <img
                    class="like-icon"
                    src="assets/icons/heart.svg"
                    alt="heart"
                  />
                  <p class="text-sm font-normal text-like">0 Likes</p>
                </a>
                <a
                  href="#"
                  class="cursor flex justify-start items-center w-[93px] gap-1.5"
                >
                  <img src="assets/icons/trash.svg" alt="heart" />
                  <p class="text-sm font-normal text-username">Delete</p>
                </a>
                <a
                  href="#"
                  class="flex justify-start items-center w-[93px] gap-1.5"
                >
                  <img src="assets/icons/warning-2.svg" />
                  <p class="text-sm font-normal text-username">Report</p>
                </a>
              </div>
            </div>
          </div>
            `;

                twittsWrapper.appendChild(itemTwitt); // menambahkan itemTwitt ke twittsWrapper
            })
        }
    }
    displayAllTwiits()
})