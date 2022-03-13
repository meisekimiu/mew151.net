const seriesData = {
  'aurora': 'Pretty Rhythm Aurora Dream',
  'future': 'Pretty Rhythm Dear My Future',
  'rainbow': 'Pretty Rhythm Rainbow Live',
  'paradise': 'PriPara',
  'time': 'Idol Time PriPara',
  'adopara': 'Idol Land PriPara',
  'king': 'King of Prism: Shiny Seven Stars',
  'channel': 'Kiratto Pri☆Chan ',
  'magic': 'Waccha PriMaji',
};

document.addEventListener('DOMContentLoaded', () => {
  fetch("https://soundgate.mew151.net/api/puririzu.php").then((response) => {
    response.json().then((data) => {
      const progress = (data.progress * 100).toPrecision(3);
      const series = seriesData[data.series] || 'Pretty Rhythm Rainbow Live';
      const last = data.last_episode;
      document.getElementById("percent_bar").value = progress;
      document.getElementById("percent_text").innerHTML = `${progress}%`;
      document.getElementById("series_name").innerHTML = series + '.';
      document.getElementById("episode_number").innerHTML = last.toString().padStart(2, "0");
      document.getElementById("progress_data").style.display = "block";
      document.getElementById("progress_loading").style.display = "none";
    });
  });
});
