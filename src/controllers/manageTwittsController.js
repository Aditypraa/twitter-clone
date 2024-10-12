document.addEventListener("DOMContentLoaded", () => {
    const twittForm = document.getElementById("twittForm"); // mengambil id twittForm
    const ownerPhoto = document.getElementById("ownerPhoto"); // mengambil id ownerPhoto
    const twitstWrapper = document.getElementById("twittsWrapper"); // mengambil id twittsWrapper

    let selectedFeeling = null // membuat variabel selectedFeeling dengan nilai null

    const feelingItems = document.querySelectorAll(".item-feeling"); // mengambil class item-feeling

    feelingItems.forEach((item) => { // melakukan perulangan pada setiap item
        item.addEventListener("click", () => { // menambahkan event click pada setiap item
            selectedFeeling = item.getAttribute("data-feeling"); // mengambil data-feeling pada setiap item
            feelingItems.forEach((i) => i.classList.remove("border-[#1880e8]")); // melakukan perulangan pada setiap item dan menghapus class border-[#1880e8]
            item.classList.add("border-[#1880e8]"); // menambahkan class border-[#1880e8] pada item yang di klik
        });
    });
})