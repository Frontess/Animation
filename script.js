document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("backgroundVideo");
  const canvases = document.querySelectorAll(".cutout");

  video.addEventListener("loadeddata", function () {
    console.log(
      "Видео загружено. Размеры:",
      video.videoWidth,
      video.videoHeight
    );

    video.addEventListener("play", function () {
      console.log("Видео воспроизводится.");

      function drawVideoFragments() {
        console.log("Текущее время воспроизведения:", video.currentTime); // Проверяем время воспроизведения

        canvases.forEach((canvas, index) => {
          const ctx = canvas.getContext("2d");
          const canvasWidth = canvas.offsetWidth;
          const canvasHeight = canvas.offsetHeight;

          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          // Расчёт координат для каждого фрагмента
          const sx = (videoWidth / canvases.length) * index;
          const sy = 0;
          const sWidth = videoWidth / canvases.length;
          const sHeight = videoHeight;

          // Очистка canvas перед отрисовкой
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);

          // Рисуем видео фрагмент в canvas
          try {
            ctx.drawImage(
              video,
              sx,
              sy,
              sWidth,
              sHeight, // Источник
              0,
              0,
              canvasWidth,
              canvasHeight // Назначение
            );
            console.log(`Отрисовка фрагмента ${index + 1}`);
          } catch (error) {
            console.error(
              `Ошибка при отрисовке фрагмента ${index + 1}:`,
              error
            );
          }
        });

        requestAnimationFrame(drawVideoFragments); // Обновление кадров
      }

      drawVideoFragments();
    });

    // Явный запуск воспроизведения видео
    video
      .play()
      .catch((error) => console.error("Ошибка воспроизведения видео:", error));
  });

  video.addEventListener("error", function () {
    console.error("Ошибка загрузки видео.");
  });
});
