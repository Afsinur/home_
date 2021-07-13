//DOM declaration
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
const reload_ = () => {
  window.location.reload();
};

const hideSettingsDiv = (e) => {
  let found_ = 0;
  const keyArray = [
    "settingsDiv",
    "settingsForm",
    "formGroup",
    "addwallpaper",
    "settingsButton",
  ];

  keyArray.forEach((itm, i) => {
    if (
      e.target.parentNode.className === `${itm}` ||
      e.target.className === `${itm}`
    ) {
      found_++;
      settingsDiv.style.display = `flex`;
    }

    if (found_ === 0 && i + 1 === keyArray.length) {
      settingsDiv.style.display = `none`;
    }
  });
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

    reload_();
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

    reload_();
  } else {
    imageLinkError.textContent = err.wallLink;
  }
};

const delete_ = (e) => {
  let sibling_ = e.target.parentNode.children[1];
  let trimedParent = sibling_.innerText.trim();
  sibling_.removeAttribute("href");

  localStorage.setItem(trimedParent, "");
  reload_();
};

//console.log all localStorageItem
const loadLinks = new Promise((resolve, reject) => {
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
          let a_span_ = document.createElement("span");

          a_.href = element;
          a_.setAttribute("target", "_blank");
          a_.textContent = key;

          a_span_.textContent = `x`;

          li_.appendChild(a_span_);
          li_.appendChild(a_);

          ul_.appendChild(li_);
        }
      } else {
        delete localStorage[key];
      }
    }
  }

  localApps.appendChild(ul_);
  resolve(1);
});

(async () => {
  try {
    const afterLinkLoad = await loadLinks;

    if (afterLinkLoad === 1) {
      //DOM declaration
      const localAppsA_span = document.querySelectorAll(
        ".localApps ul li span"
      );

      //event listeners setup
      window.addEventListener("click", hideSettingsDiv);
      settingsForm.addEventListener("submit", addSites);
      wallpaperForm.addEventListener("submit", addWallpaper);
      localAppsA_span.forEach((itm) => {
        itm.addEventListener("click", delete_);
      });
    }
  } catch (err) {
    console.log(err);
  }
})();
