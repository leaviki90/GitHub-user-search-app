let image = document.getElementById("toggle-image");
let sun = "css/images/icon-sun.svg";
let moon = "css/images/icon-moon.svg";
let text = document.getElementById("toggle-text");
let textLight = "LIGHT";
let textDark = "DARK";
let form = document.getElementById("form");

const btn = document.querySelector("#switch");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
  image.src = sun;
  text.innerText = textLight;
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
  image.src = moon;
  text.innerText = textDark;
}

btn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme == "dark") {
    image.src = sun;
    text.innerText = textLight;
  } else if (currentTheme == "light") {
    image.src = moon;
    text.innerText = textDark;
  }
});

document.addEventListener("DOMContentLoaded", (event) => {
  // check if browser or system set theme exists
  const checkLightTheme = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;
  const checkDarkTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // if local storage saved theme exists
  const dataTheme = localStorage.getItem("theme");
  if (dataTheme) {
    document.documentElement.setAttribute("data-theme", dataTheme);
    if (dataTheme === "light") {
      image.src = moon;
      text.innerText = textDark;
    } else if (dataTheme === "dark") {
      image.src = sun;
      text.innerText = textLight;
    }
    // if local storage saved theme doesnt exist but browser or system set theme exists
  } else if (checkLightTheme) {
    image.src = moon;
    text.innerText = textDark;
  } else if (checkDarkTheme) {
    image.src = sun;
    text.innerText = textLight;
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let search = document.getElementById("search").value.trim();
  let originalName = search.split(" ").join("");
  if (originalName) {
    fetchData(originalName);
  } else {
    alert("You must enter search term");
  }
});

document.addEventListener("DOMContentLoaded", function (e) {
  fetchData("Octocat");
});

const fetchData = (originalName) => {
  fetch("https://api.github.com/users/" + originalName, {})
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        console.log(response.status);
        if (response.status == 404) {
          document.querySelector("small").classList.add("visible");
          document.querySelector("small").classList.remove("hidden");
        }
        throw Error(response.status);
      }
    })
    .then((data) => {
      console.log(data);
      let user = data;
      let userId = user.id;
      let userName = user.name;
      let userLogin = user.login;
      let userBio = user.bio;
      let userDate = user.created_at;
      let myDateFormat = new Date(userDate).getTime();
      let Day = new Date(myDateFormat).getDate();
      let Month = new Date(myDateFormat).toLocaleString("default", {
        month: "short",
      });
      let Year = new Date(myDateFormat).getFullYear();
      let fullDate = `Joined ${Day} ${Month} ${Year}`;
      let userLocation = user.location;
      let userWebsite = user.blog;
      let userTwitter = user.twitter_username;
      let userCompany = user.company;
      let userRepos = user.public_repos;
      let userFollowing = user.following;
      let userFollowers = user.followers;

      document.querySelector("small").classList.add("hidden");
      document.querySelector("small").classList.remove("visible");
      if (userName === null) {
        document.getElementById("github-name").innerText = userLogin;
      } else {
        document.getElementById("github-name").innerText = userName;
      }

      document.getElementById("github-login").innerText = `@${userLogin}`;
      document.getElementById("github-date").innerText = fullDate;
      document.getElementById(
        "avatar"
      ).innerHTML = `<a href="https://www.github.com/${originalName}" target="_blank">
          <img src="${data.avatar_url}" alt="" />
        </a>`;
      if (userBio !== null) {
        document.getElementById("github-bio").innerText = userBio;
        document.getElementById("github-bio").style["opacity"] = "unset";
      } else {
        document.getElementById("github-bio").innerText =
          "This profile has no bio";
        document.getElementById("github-bio").style["opacity"] = "0.7";
      }
      document.getElementById("github-repos").innerText = userRepos;
      document.getElementById("github-following").innerText = userFollowing;
      document.getElementById("github-followers").innerText = userFollowers;

      if (userLocation === null) {
        document.getElementById("link1").innerText = "Not Available";
        document.getElementById("link1").style["opacity"] = "0.5";
        document.getElementById("img1").style["opacity"] = "0.5";
      } else {
        document.getElementById("link1").innerText = userLocation;
        document.getElementById("link1").style["opacity"] = "unset";
        document.getElementById("img1").style["opacity"] = "unset";
      }

      if (userWebsite === "") {
        document.getElementById("link2").innerText = "Not Available";
        document.getElementById("link2").style["opacity"] = "0.5";
        document.getElementById("link2").removeAttribute("href");
        document.getElementById("img2").style["opacity"] = "0.5";
      } else {
        document.getElementById("link2").setAttribute("href", userWebsite);
        document.getElementById("link2").innerText = userWebsite;
        document.getElementById("link2").style["opacity"] = "unset";
        document.getElementById("img2").style["opacity"] = "unset";
      }

      if (userTwitter !== null) {
        document
          .getElementById("link3")
          .setAttribute("href", `https://twitter.com/${userTwitter}`);
        document.getElementById("link3").innerText = userTwitter;
        document.getElementById("link3").style["opacity"] = "unset";
        document.getElementById("img3").style["opacity"] = "unset";
      } else {
        document.getElementById("link3").innerText = "Not Available";
        document.getElementById("link3").style["opacity"] = "0.5";
        document.getElementById("link3").removeAttribute("href");
        document.getElementById("img3").style["opacity"] = "0.5";
      }

      if (userCompany !== null) {
        document
          .getElementById("link4")
          .setAttribute(
            "href",
            `https://github.com/${userCompany.replace("@", "")}`
          );
        document.getElementById("link4").innerText = userCompany;
        document.getElementById("link4").style["opacity"] = "unset";
        document.getElementById("img4").style["opacity"] = "unset";
      } else {
        document.getElementById("link4").innerText = "Not Available";
        document.getElementById("link4").style["opacity"] = "0.5";
        document.getElementById("link4").removeAttribute("href");
        document.getElementById("img4").style["opacity"] = "0.5";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
form.addEventListener("keydown", function () {
  document.querySelector("small").classList.add("hidden");
  document.querySelector("small").classList.remove("visible");
});
