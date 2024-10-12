function getViewerCount(user) {
  return new Promise((resolve, reject) => {
    fetch("https://content-dl.freedeck.app/TwitchPlugin.php?streamer=" + user, {
      method: "GET",
    }).then((res) => {
      res.text().then((data) => {
        resolve(data);
      });
    })
  })
}

function updateViewerCount() {
  document.querySelectorAll(".button").forEach((button) => {
    if(!button.getAttribute("data-interaction")) return;
    const inter = JSON.parse(button.getAttribute("data-interaction"));
    if(inter.type !== "t.vc" || inter.type !== "t.vcn") return;
    getViewerCount(inter.data.streamer).then((vc) => {
      if(inter.type === "t.vc") button.innerText = inter.data.streamer+": " +vc;
      else button.innerText = vc;
    });
  });
}

universal.listenFor("page_change", updateViewerCount);
updateViewerCount();
setInterval(() => {
  updateViewerCount();
}, 60000);