const images = [
  {
    image: "./Wallpaper-1.JPG",
    thumbnail: "./Wallpaper-1.JPG",
    alt: "There is a lake with burds flying above and trees near it, and two japanese structures.",
  },
  {
    image: "./Wallpaper-2.JPG",
    thumbnail: "./Wallpaper-2.JPG",
    alt: "A master standing on a lake next to a big tree, looking at his own house. After fighting, finaly being able to return.",
  },
  {
    image: "./Wallpaper-3.JPG",
    thumbnail: "./Wallpaper-3.JPG",
    alt: "A plant that represents both life and death.",
  },
  {
    image: "./Wallpaper-4.JPG",
    thumbnail: "./Wallpaper-4.JPG",
    alt: "A student looking at the mountains and thinking of home, and all he has accomplished.",
  },
  {
    image: "./Wallpaper-5.JPG",
    thumbnail: "./Wallpaper-5.JPG",
    alt: "A Japanese soldier returning a victorious battlefield.",
  },
  {
    image: "./Wallpaper-6.JPG",
    thumbnail: "./Wallpaper-6.JPG",
    alt: "A elite man staring at the power of war.",
  },
  {
    image: "./Wallpaper-7.JPG",
    thumbnail: "./Wallpaper-7.JPG",
    alt: "Two brothers about to start an adventure to becoming a warroir and learn both mindset and leadership.",
  },
  {
    image: "./Wallpaper-8.JPG",
    thumbnail: "./Wallpaper-8.JPG",
    alt: "A warroir that has mastered the skill of a ninja.",
  },
  {
    image: "./Wallpaper-9.JPG",
    thumbnail: "./Wallpaper-9.JPG",
    alt: "A lone warrior with flowing hair stands amidst swirling mist, holding a sword, in a dramatic monochromatic landscape.",
  },
];

let thumbContainer = document.getElementById("thumb-container");
let currentImageIndex = 0;
const displayElem = document.getElementById("display");

function init() {
  console.log(images);
  updateDisplayImage(images[currentImageIndex]);
  createThumbnails();
}

function createThumbnails() {
  for (let image of images) {
    let thumbImg = document.createElement("img");
    thumbImg.setAttribute("src", image.image);
    thumbImg.setAttribute("alt", image.alt);
    thumbImg.setAttribute("tabindex", "0");
    thumbImg.classList.add("thumb-image");
    thumbContainer.appendChild(thumbImg);
    thumbImg.addEventListener("click", function () {
      updateDisplayImage(image);
      document.getElementById("announcer").textContent = image.alt;
    });
    thumbImg.addEventListener("keydown", function (event) {
      document.getElementById("announcer").textContent = image.alt;
      if (event.key === "Enter") updateDisplayImage(image);
    });
  }
}

function updateScrollBar(currentImage) {
  let thumbnails = thumbContainer.querySelectorAll(".thumb-image");
  let activeThumbnail;
  thumbnails.forEach(function (thumb) {
    if (thumb.getAttribute("src") === currentImage.thumbnail) {
      activeThumbnail = thumb;
    }
  });

  if (activeThumbnail) {
    const thumbRect = activeThumbnail.getBoundingClientRect();
    const containerRect = thumbContainer.getBoundingClientRect();
    let scrollLeftPos =
      activeThumbnail.offsetLeft +
      thumbRect.width / 2 -
      containerRect.width / 2;
    thumbContainer.scrollTo({
      left: scrollLeftPos,
      behavior: "smooth",
    });
  }
}

function updateDisplayImage(image) {
  let currentDisplayImage = displayElem.firstChild;

  if (!currentDisplayImage) {
    currentDisplayImage = document.createElement("img");
    displayElem.appendChild(currentDisplayImage);
  }

  currentDisplayImage.setAttribute("src", image.image);
  currentDisplayImage.setAttribute("alt", image.alt);
  updateScrollBar(image);
  document.getElementById("announcer").textContent = image.alt;
}

next.addEventListener("click", function () {
  selectNextImage(1);
});
prev.addEventListener("click", function () {
  selectNextImage(-1);
});

thumbContainerHideButton.addEventListener("click", function () {
  thumbContainer.classList.toggle("hidden");
  if (thumbContainer.classList.contains("hidden")) {
    thumbContainerHideButton.classList.add(
      "thumbContainerHideButton-thumbnailsHidden"
    );
  } else {
    thumbContainerHideButton.classList.remove(
      "thumbContainerHideButton-thumbnailsHidden"
    );
  }
});

function selectNextImage(index) {
  currentImageIndex += index;

  if (currentImageIndex >= images.length) currentImageIndex = 0;
  if (currentImageIndex < 0) currentImageIndex = images.length - 1;
  console.log(currentImageIndex);
  updateDisplayImage(images[currentImageIndex]);
}

window.onload = init;

let touchstartX = 0;
let touchendX = 0;

function handleGesture() {
  let threshold = 50;
  if (touchendX < touchstartX - threshold) {
    console.log("swipedright");
    selectNextImage(1);
  }

  if (touchendX > touchstartX + threshold) {
    console.log("swiped left");
    selectNextImage(-1);
  }
}

displayElem.addEventListener("touchstart", (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

displayElem.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  handleGesture();
});

window.addEventListener("keydown", handleArrowKeyPress);

function handleArrowKeyPress(event) {
  if (event.key === "ArrowRight") {
    selectNextImage(1);
  }
}
// this has been coppied word by word because of my confusion and lack of focus in this week, there are quite a few this that i still dont understand. Credits - https://image-galleryv2.vercel.app/ - and Manuel
