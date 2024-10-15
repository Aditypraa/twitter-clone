document.addEventListener("DOMContentLoaded", () => {

    const usernameLoggedIn = localStorage.getItem("usernameLoggedIn"); // mengambil data usernameLoggedIn dari local storage
    const usernameProfileChosen = localStorage.getItem("usernameProfileChosen"); // mengambil data usernameProfileChosen dari local storage

    const ownerPhoto = document.getElementById("ownerPhoto"); // mengambil id ownerPhoto
    const twittsWrapper = document.getElementById("twittsWrapper"); // mengambil id twittsWrapper
    const userProfileName = document.getElementById("userProfileName"); // mengambil id userProfileName
    const userProfileUsername = document.getElementById("userProfileUsername"); // mengambil id userProfileUsername


    const twittManager = new Twitt(); // membuat objek twittManager dari class TwittManager
    const userManager = new User(); // membuat objek userManager dari class UserManager

    const twittUsers = userManager.getUsers(); // mengambil data user dari local storage

    const userProfileChosen = twittUsers.find(user => user.username.toLowerCase() === usernameProfileChosen.toLowerCase()); // mencari data user yang profilenya di klik

    // const ownerLoggedIn = twittUsers.find(user => user.username.toLowerCase() === usernameLoggedIn.toLowerCase()); // mencari data user yang login
    ownerPhoto.src = userProfileChosen.avatar; // mengambil avatar user yang login
    userProfileName.textContent = userProfileChosen.name; // mengambil nama user yang login
    userProfileUsername.textContent = `@${userProfileChosen.username}`; // mengambil username user yang login

    const existingTwitts = twittManager.getTwitts(); // mengambil data twitts dari local storage
    const existingLoveTwitts = twittManager.getLoveTwitts(); // mengambil data loveTwitts dari local storage

    const userProfileTwitts = existingTwitts.filter(twitt => twitt.twittUsernameOwner.toLowerCase() === userProfileChosen.username.toLowerCase()); // mencari data twitts yang memiliki username yang sama dengan user yang di klik

    function displayAllTwiits(twitts = userProfileTwitts) { // membuat fungsi displayAllTwiits dengan parameter twitts
        if (twitts.length === 0) { // jika existingTwitts kosong
            twittsWrapper.innerHTML = "Tidak Ada twitts yang tersedia"; // mengosongkan twittsWrapper
            console.log("Tidak Ada twitts yang tersedia")
        } else {
            console.log("tersedia twitts siap di tampilkan")

            twittsWrapper.innerHTML = ""; // mengosongkan twittsWrapper

            twitts.sort((a, b) => b.id - a.id); // mengurutkan twitts berdasarkan id dari yang terbaru ke yang lama

            twitts.forEach((twitt) => { // melakukan perulangan pada setiap twitt

                const ownerTwitt = twittUsers.find(user => user.username.toLowerCase() === twitt.twittUsernameOwner.toLowerCase()); // mencari data user yang memiliki twitt

                const getLoveTwitts = existingLoveTwitts.filter(loveTwitt => loveTwitt.twittId === twitt.id); // mencari data loveTwitts yang memiliki twitt
                const countLoveTwitts = getLoveTwitts.length; // menghitung jumlah loveTwitts

                const hasLiked = twittManager.userHashLikedTwittValidate(twitt.id, usernameLoggedIn); // mengecek apakah user telah memberikan like pada twitt tersebut

                const itemTwitt = document.createElement("div"); // membuat elemen div
                itemTwitt.className = "bg-primary p-4 border-b-2 border-line" // menambahkan class pada itemTwitt
                itemTwitt.id = `twitt-${twitt.id}`
                itemTwitt.innerHTML = `
            <div class="flex items-center justify-between">
              <div class="flex items-center justify-start">
                <img
                id = "visitProfile-${ownerTwitt.username}"
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
                id="loveTwitt-${twitt.id}"
                  href="#"
                  class="cursor flex justify-start items-center w-[93px] gap-1.5"
                >
                  <img
                    class="like-icon"
                    src="assets/icons/${hasLiked ? 'heart-fill.svg' : 'heart.svg'}"
                    alt="heart"
                  />
                  <p id='totalLikeThatTwitt' class="text-sm font-normal text-like">${countLoveTwitts} Likes</p>
                </a>
                ${twitt.twittUsernameOwner === usernameLoggedIn ?
                        `<a
                        id="deleteTwitt-${twitt.id}"
                  href="#"
                  class="cursor flex justify-start items-center w-[93px] gap-1.5"
                >
                  <img src="assets/icons/trash.svg" alt="heart" />
                  <p class="text-sm font-normal text-username">Delete</p>
                </a>`
                        :
                        `<a
                  href="#"
                  class="flex justify-start items-center w-[93px] gap-1.5"
                >
                  <img src="assets/icons/warning-2.svg" />
                  <p class="text-sm font-normal text-username">Report</p>
                </a>`
                    }
              </div>
            </div>
          </div>
            `;

                twittsWrapper.appendChild(itemTwitt); // menambahkan itemTwitt ke twittsWrapper

                itemTwitt.querySelector(`#visitProfile-${ownerTwitt.username}`).addEventListener("click", (event) => { // menambahkan event click pada visitProfile
                    event.preventDefault(); // mencegah submit default dari form, agar tidak refresh halaman
                    localStorage.setItem("usernameProfileChosen", ownerTwitt.username); // menyimpan data visitProfile ke local storage
                    return window.location.href = "profile.html"; // pindah ke halaman profile.html
                })

                const totalLikeThatTwitt = itemTwitt.querySelector("#totalLikeThatTwitt"); // mengambil totalLikeThatTwitt
                const likeIcon = itemTwitt.querySelector(".like-icon"); // mengambil class likeIcon

                // Bikin event listener untuk fitur like
                itemTwitt.querySelector(`#loveTwitt-${twitt.id}`).addEventListener("click", (event) => {
                    event.preventDefault(); // mencegah submit default dari form, agar tidak refresh halaman

                    const loveTwittData = { // membuat objek loveTwittData
                        twittId: twitt.id, // mengambil id twitt
                        userId: usernameLoggedIn // mengambil username yang login
                    }

                    const result = twittManager.loveTwitt(loveTwittData); // menambahkan loveTwittData ke local storage

                    if (result.success) { // jika berhasil
                        let currentLikes = parseInt(totalLikeThatTwitt.textContent) || 0; // mengambil jumlah like
                        totalLikeThatTwitt.textContent = currentLikes + 1 + " Likes" // menambahkan jumlah like
                        likeIcon.src = "assets/icons/heart-fill.svg"; // mengganti icon like
                    } else {
                        instantFeedback.style.display = "flex"; // menampilkan instantFeedback
                        instantFeedback.innerText = result.error; // menampilkan pesan error
                    }
                })

                const deleteTwittButton = itemTwitt.querySelector(`#deleteTwitt-${twitt.id}`); // mengambil deleteTwittButton

                if (deleteTwittButton) {
                    deleteTwittButton.addEventListener("click", (event) => { // menambahkan event click pada deleteTwittButton
                        event.preventDefault(); // mencegah submit default dari form, agar tidak refresh halaman
                        const result = twittManager.deleteTwitt(twitt.id); // menghapus twitt berdasarkan id   
                        if (result.success) {
                            displayAllTwiits(twittManager.getTwitts().filter(twitt => twitt.twittUsernameOwner.toLowerCase() === userProfileChosen.username.toLowerCase())); // menampilkan semua twitts yang memiliki username yang sama dengan user yang di klik
                        } else {
                            instantFeedback.style.display = "flex"; // menampilkan instantFeedback
                            instantFeedback.innerText = result.error; // menampilkan pesan error
                        }
                    })
                }

            })
        }
    }
    displayAllTwiits()
})