const seriesData: { [key: string]: string } = {
  aurora: "Pretty Rhythm Aurora Dream",
  future: "Pretty Rhythm Dear My Future",
  rainbow: "Pretty Rhythm Rainbow Live",
  paradise: "PriPara",
  time: "Idol Time PriPara",
  adopara: "Idol Land PriPara",
  king: "King of Prism: Shiny Seven Stars",
  channel: "Kiratto Pri☆Chan ",
  magic: "Waccha PriMaji",
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://soundgate.mew151.net/api/puririzu.php")
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const dataProgress = data.progress as number;
          const dataSeries = data.series as string;
          if (
            typeof dataProgress !== "number" ||
            typeof dataSeries !== "string"
          ) {
            return;
          }
          const progress = (dataProgress * 100).toPrecision(3);
          const series = seriesData[dataSeries] || "Pretty Rhythm Rainbow Live";
          const last = data.last_episode;

          const percentBar = document.querySelector(
            "meter#percent_bar"
          ) as HTMLMeterElement | null;
          if (percentBar) {
            percentBar.value = parseInt(progress);
          }

          const percentText = document.getElementById("percent_text");
          if (percentText) {
            percentText.innerHTML = `${progress}%`;
          }

          const seriesName = document.getElementById("series_name");
          if (seriesName) {
            seriesName.innerHTML = series + ".";
          }

          const episodeNumber = document.getElementById("episode_number");
          if (episodeNumber) {
            episodeNumber.innerHTML = last.toString().padStart(2, "0");
          }

          const progressData = document.getElementById("progress_data");
          if (progressData) {
            progressData.style.display = "block";
          }

          const progressLoading = document.getElementById("progress_loading");
          if (progressLoading) {
            progressLoading.style.display = "none";
          }
        });
      }
    })
    .catch(() => {
      // Do nothing
    });
});
