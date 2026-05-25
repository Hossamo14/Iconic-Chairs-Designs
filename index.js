// 1. Direct JSON Import (No fetch required!)
import chairsData from "./chairs.json"; // Works perfectly if it's in the root folder
// import musicSprite from "./sprite.svg"; // 1. Import the SVG sprite directly!

let generateBtn = document.querySelector(".generate");
let autoBtn = document.querySelector(".auto");
let stopBtn = document.querySelector(".stop");
let chairImg = document.querySelector(".chairImg");
let chairDiv = document.querySelector(".chairName");
let chairId = document.querySelector(".chair-id");
let textNote = document.querySelector(".textNote");
let author = document.querySelector(".author");
let year = document.querySelector(".year");
let musicIcon = document.querySelector(".musicIcon use"); 
let audio = document.querySelector("audio");
let autoStatus = document.querySelector(".auto-status");

let intervalId; 
let musicActive = false; 
let cachedChairs = chairsData; // Populated instantly on load

// 2. Wrap your image paths using Parcel's URL dependency syntax.
// This tells Parcel: "Find these files, compile them, and give me their real output URLs."
const chairsImges = [
    { id: 1, title: "The Acapulco Chair", src: new URL("/chairs/The Acapulco Chair.png", import.meta.url).href },
    { id: 2, title: "The Ball Chair", src: new URL("/chairs/The Ball Chair.png", import.meta.url).href },
    { id: 3, title: "The Barcelona Chair", src: new URL("/chairs/The Barcelona Chair.png", import.meta.url).href },
    { id: 4, title: "The Butterfly Chair", src: new URL("/chairs/The Butterfly Chair.png", import.meta.url).href },
    { id: 5, title: "The Diamond Lounge Chair", src: new URL("/chairs/The Diamond Lounge Chair.png", import.meta.url).href },
    { id: 6, title: "The Eames LCW Chair", src: new URL("/chairs/The Eames LCW Chair.png", import.meta.url).href },
    { id: 7, title: "The Eames Lounge Chair", src: new URL("/chairs/The Eames Lounge Chair.png", import.meta.url).href },
    { id: 8, title: "The Eames Molded Plastic Armchair", src: new URL("/chairs/The Eames Molded Plastic Armchair.png", import.meta.url).href },
    { id: 9, title: "The Egg Chair", src: new URL("/chairs/The Egg Chair.png", import.meta.url).href },
    { id: 10, title: "The Ghost Chair", src: new URL("/chairs/The Ghost Chair.png", import.meta.url).href },
    { id: 11, title: "The Panton Chair", src: new URL("/chairs/The Panton Chair.png", import.meta.url).href },
    { id: 12, title: "The Red-Blue Chair", src: new URL("/chairs/The Red-Blue Chair.png", import.meta.url).href },
    { id: 13, title: "The Shell Chair", src: new URL("/chairs/The Shell Chair.png", import.meta.url).href },
    { id: 14, title: "The Thonet 14 chair", src: new URL("/chairs/The Thonet 14 chair.png", import.meta.url).href },
    { id: 15, title: "The Tulip Chair", src: new URL("/chairs/The Tulip Chair.jpg", import.meta.url).href },
    { id: 16, title: "The Wassily Chair", src: new URL("/chairs/The Wassily Chair.png", import.meta.url).href },
    { id: 17, title: "The Wiggle Side Chair", src: new URL("/chairs/The Wiggle Side Chair.png", import.meta.url).href },
    { id: 18, title: "The Wishbone Chair", src: new URL("/chairs/The Wishbone Chair.png", import.meta.url).href },
    { id: 19, title: "The Womb Chair", src: new URL("/chairs/The Womb Chair.png", import.meta.url).href },
    { id: 20, title: "The Zig Zag Chair", src: new URL("/chairs/The Zig Zag Chair.png", import.meta.url).href }
];

// Event Listeners
generateBtn.onclick = displayRandomQuote;
autoBtn.onclick = startAutoPlay;
stopBtn.onclick = stopAutoPlay;
musicIcon.onclick = muteMusic;

function displayRandomQuote() {
    if (cachedChairs.length === 0) return;

    const chair = cachedChairs[Math.floor(Math.random() * cachedChairs.length)];
    
    chairDiv.innerHTML = chair.chairName;
    chairId.innerHTML = chair.id;
    textNote.innerHTML = chair.textNote;
    author.innerHTML = chair.designer;
    year.innerHTML = chair.year;

    const chairImage = chairsImges.find(img => img.id === chair.id);
    if (chairImage) {
        // This will now correctly inject the bundled image URL (e.g., /The_Acapulco_Chair.25f6ba.png)
        chairImg.src = chairImage.src; 
        chairImg.alt = chairImage.title;
    }
}

function startAutoPlay() {
    if (intervalId) clearInterval(intervalId); 
    intervalId = setInterval(displayRandomQuote, 10000);
    autoStatus.innerHTML = "Auto : ON";
}

function stopAutoPlay() {
    clearInterval(intervalId);
    autoStatus.innerHTML = "";
}


// Remove any "import musicSprite from ..." lines from the top!

function muteMusic() {
    console.log("Icon clicked");
    
    if (musicActive) {
        audio.pause();
        // Simply point to the local ID definition inside the HTML document
        musicIcon.setAttribute("href", "#music-off");
        musicActive = false;
    } else {
        audio.play().catch(err => console.log("Audio play blocked."));
        // Simply point to the local ID definition inside the HTML document
        musicIcon.setAttribute("href", "#music-on");
        musicActive = true;
    }
}
// Show an initial chair immediately when page loads
// displayRandomQuote();