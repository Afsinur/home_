//system variables
let settingsDivOpen = false;

//DOM declaration
const settingsButton = document.querySelector(".settingsButton");
const settingsDiv = document.querySelector(".settingsDiv");
const settingsForm = document.querySelector(".settingsForm");
const wallpaperForm = document.querySelector(".addwallpaper");
const siteName = document.querySelector("input[name='siteName']");
const siteLink = document.querySelector("input[name='siteLink']");
const imageLink = document.querySelector("input[name='imageLink']");
const addSiteBTN = document.querySelector(".settingsForm div:last-child input");
const addWallBTN = document.querySelector(".addwallpaper input[type='submit']");
const siteNameError = document.querySelector(".siteNameError");
const siteLinkError = document.querySelector(".siteLinkError");
const imageLinkError = document.querySelector(".imageLinkError");
const localApps = document.querySelector(".localApps");

//functions
const hideSettingsDiv = (e) => {
  /*console.log(e.target);
  console.log(`parent-className: ${e.target.parentNode.className}`);
  console.log(`className: ${e.target.className}`);*/
};

const openSettings = () => {
  if (settingsDivOpen) {
    settingsDivOpen = false;
    settingsDiv.style.display = `none`;
  } else {
    settingsDivOpen = true;
    settingsDiv.style.display = `flex`;
  }
};

const addSites = (e) => {
  e.preventDefault();
  addSiteBTN.focus();

  let addObject = { siteName: "", siteLink: "" };
  let err = { siteName: "", siteLink: "" };
  siteNameError.textContent = "";
  siteLinkError.textContent = "";

  //making Object
  if (siteName.value !== "" && siteLink.value !== "") {
    addObject = { siteName: siteName.value, siteLink: siteLink.value };
  } else {
    addObject = null;

    if (siteName.value === "") {
      err.siteName = `Site Name Required!`;
    } else if (siteLink.value === "") {
      err.siteLink = `Site Link Required!`;
    }
  }

  if (addObject) {
    console.log(JSON.stringify(addObject));
    localStorage.setItem(`${addObject.siteName}`, `${addObject.siteLink}`);

    window.location.reload();
  } else {
    siteNameError.textContent = err.siteName;
    siteLinkError.textContent = err.siteLink;
  }
};

const addWallpaper = (e) => {
  e.preventDefault();
  addWallBTN.focus();

  let addObject = { wallLink: "" };
  let err = { wallLink: "" };
  imageLinkError.textContent = "";

  //making Object
  if (imageLink.value !== "") {
    addObject = { wallLink: imageLink.value };
  } else {
    addObject = null;

    if (imageLink.value === "") {
      err.wallLink = `Wallpaper Link Required!`;
    }
  }

  if (addObject) {
    console.log(JSON.stringify(addObject));
    localStorage.setItem(`wallBrowse`, `${addObject.wallLink}`);

    window.location.reload();
  } else {
    imageLinkError.textContent = err.wallLink;
  }
};

//event listeners setup
settingsButton.addEventListener("click", openSettings);
window.addEventListener("click", hideSettingsDiv);
settingsForm.addEventListener("submit", addSites);
wallpaperForm.addEventListener("submit", addWallpaper);

//console.log all localStorageItem
let ul_ = document.createElement("ul");

for (const key in localStorage) {
  if (Object.hasOwnProperty.call(localStorage, key)) {
    const element = localStorage[key];

    if (element !== "") {
      if (key === `wallBrowse`) {
        document.body.style.backgroundImage = `url("${element}")`;
      } else {
        let li_ = document.createElement("li");
        let a_ = document.createElement("a");

        a_.href = element;
        a_.setAttribute("target", "_blank");
        a_.textContent = key;

        li_.appendChild(a_);
        ul_.appendChild(li_);
      }
    }
  }
}

localApps.appendChild(ul_);
