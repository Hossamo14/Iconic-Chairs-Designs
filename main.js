let generateBtn = document.querySelector(".generate");
let autoBtn = document.querySelector(".auto");
let stopBtn = document.querySelector(".stop");
let chairImg = document.querySelector(".chairImg");
let chairDiv = document.querySelector(".chairName");
let chairId = document.querySelector(".chair-id");
let textNote = document.querySelector(".textNote");
let author = document.querySelector(".author");
let year = document.querySelector(".year");
let musicIcon = document.querySelector(".musicIcon use"); // importamt catch the use that contains svg
let audio = document.querySelector("audio");
let autoStatus = document.querySelector(".auto-status");
let intervalId; // to control quotes lifetime
let musicActive = false; // g;obal var as each time you clicked the
//  function starts with false so it go directly to else state

const chairsImges = [
    { id: 1, title: "The Acapulco Chair", src: "/chairs/The Acapulco Chair.png" },
    { id: 2, title: "The Ball Chair", src: "/chairs/The Ball Chair.png" },
    { id: 3, title: "The Barcelona Chair", src: "/chairs/The Barcelona Chair.png" },
    { id: 4, title: "The Butterfly Chair", src: "/chairs/The Butterfly Chair.png" },
    { id: 5, title: "The Diamond Lounge Chair", src: "/chairs/The Diamond Lounge Chair.png" },
    { id: 6, title: "The Eames LCW Chair", src: "/chairs/The Eames LCW Chair.png" },
    { id: 7, title: "The Eames Lounge Chair", src: "/chairs/The Eames Lounge Chair.png" },
    { id: 8, title: "The Eames Molded Plastic Armchair", src: "/chairs/The Eames Molded Plastic Armchair.png" },
    { id: 9, title: "The Egg Chair", src: "/chairs/The Egg Chair.png" },
    { id: 10, title: "The Ghost Chair", src: "/chairs/The Ghost Chair.png" },
    { id: 11, title: "The Panton Chair", src: "/chairs/The Panton Chair.png" },
    { id: 12, title: "The Red-Blue Chair", src: "/chairs/The Red-Blue Chair.png" },
    { id: 13, title: "The Shell Chair", src: "/chairs/The Shell Chair.png" },
    { id: 14, title: "The Thonet 14 chair", src: "/chairs/The Thonet 14 chair.png" },
    { id: 15, title: "The Tulip Chair", src: "/chairs/The Tulip Chair.jpg" },
    { id: 16, title: "The Wassily Chair", src: "/chairs/The Wassily Chair.png" },
    { id: 17, title: "The Wiggle Side Chair", src: "/chairs/The Wiggle Side Chair.png" },
    { id: 18, title: "The Wishbone Chair", src: "/chairs/The Wishbone Chair.png" },
    { id: 19, title: "The Womb Chair", src: "/chairs/The Womb Chair.png" },
    { id: 20, title: "The Zig Zag Chair", src: "/chairs/The Zig Zag Chair.png" }];

generateBtn.onclick = generateQuotes;
autoBtn.onclick = startAutoPlay;
stopBtn.onclick = stopAutoPlay;
musicIcon.onclick = muteMusic;


async function getQuotes() {
    const response = await fetch("chairs.json");
    const data = await response.json();
    console.log(data);
    return data;
}


async function generateQuotes() {
    const chairs = await getQuotes();
    const chair = chairs[Math.floor(Math.random() * chairs.length)];
    chairDiv.innerHTML = chair.chairName;
    chairId.innerHTML = chair.id;
    textNote.innerHTML = chair.textNote;
    author.innerHTML = chair.designer;
    year.innerHTML = chair.year;

    const chairImage = chairsImges.find(img => img.id === chair.id);

    if (chairImage) {
        chairImg.src = chairImage.src;
        chairImg.alt = chairImage.title;
    }
}


function startAutoPlay() {
    intervalId = setInterval(generateQuotes, 10000);
    autoStatus.innerHTML = "Auto : ON";
}

function stopAutoPlay() {
    clearInterval(intervalId);
    autoStatus.innerHTML = "";
}

function muteMusic() {
    console.log("i'm clickable")
    if (musicActive) {
        audio.pause();
        musicIcon.setAttribute("href", "sprite.svg#music-off");
        musicActive = false;
    } else {
        audio.play();
        musicIcon.setAttribute("href", "sprite.svg#music-on");
        musicActive = true;
    }
}