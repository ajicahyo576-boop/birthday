/* =========================================================
   BIRTHDAY WEBSITE - MUSIC PLAYER
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const audio = document.getElementById("audio");
    const playBtn = document.getElementById("playBtn");
    const vinyl = document.getElementById("vinyl");
    const progressBar = document.getElementById("progressBar");
    const musicNote = document.getElementById("musicNote");

    let isPlaying = false;

    /* =====================================================
       AUDIO
       ===================================================== */

    // Pastikan file lagu diarahkan ke song.mp3
    audio.src = "song.mp3";
    audio.load();


    /* =====================================================
       PLAY / PAUSE
       ===================================================== */

    if (playBtn) {

        playBtn.addEventListener("click", function () {

            if (audio.paused) {

                audio.play()
                    .then(function () {

                        isPlaying = true;

                        playBtn.innerHTML = "❚❚";

                        if (vinyl) {
                            vinyl.classList.add("playing");
                        }

                        if (musicNote) {
                            musicNote.classList.add("show");
                        }

                    })
                    .catch(function (error) {

                        console.log("Audio gagal diputar:", error);

                        alert(
                            "Lagu belum bisa diputar. Pastikan file song.mp3 sudah berada satu folder dengan index.html."
                        );

                    });

            } else {

                audio.pause();

                isPlaying = false;

                playBtn.innerHTML = "▶";

                if (vinyl) {
                    vinyl.classList.remove("playing");
                }

            }

        });

    }


    /* =====================================================
       PROGRESS BAR
       ===================================================== */

    audio.addEventListener("timeupdate", function () {

        if (!audio.duration) return;

        const progress =
            (audio.currentTime / audio.duration) * 100;

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

    });


    /* =====================================================
       LAGU SELESAI
       ===================================================== */

    audio.addEventListener("ended", function () {

        isPlaying = false;

        if (playBtn) {
            playBtn.innerHTML = "▶";
        }

        if (vinyl) {
            vinyl.classList.remove("playing");
        }

    });


    /* =====================================================
       PILIH LAGU
       ===================================================== */

    const songs = document.querySelectorAll(".song");

    songs.forEach(function (song) {

        song.addEventListener("click", function () {

            const title = song.dataset.title;
            const artist = song.dataset.artist;

            const songTitle =
                document.getElementById("songTitle");

            const songArtist =
                document.getElementById("songArtist");

            if (songTitle) {
                songTitle.textContent = title;
            }

            if (songArtist) {
                songArtist.textContent = artist;
            }

            songs.forEach(function (item) {
                item.classList.remove("active-song");
            });

            song.classList.add("active-song");

        });

    });


    /* =====================================================
       TOMBOL NEXT / PREV
       ===================================================== */

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (nextBtn) {

        nextBtn.addEventListener("click", function () {

            audio.currentTime = 0;

            audio.play()
                .then(function () {

                    if (playBtn) {
                        playBtn.innerHTML = "❚❚";
                    }

                    if (vinyl) {
                        vinyl.classList.add("playing");
                    }

                })
                .catch(function (error) {

                    console.log(error);

                });

        });

    }


    if (prevBtn) {

        prevBtn.addEventListener("click", function () {

            audio.currentTime = 0;

        });

    }


    /* =====================================================
       PIN / LOCK SCREEN
       ===================================================== */

    const correctCode = "1810";

    let enteredCode = "";

    const keyButtons =
        document.querySelectorAll("[data-key]");

    const dots =
        document.querySelectorAll("#codeDots span");

    const codeError =
        document.getElementById("codeError");


    keyButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (enteredCode.length >= 4) {
                return;
            }

            enteredCode += button.dataset.key;

            updateDots();

            if (enteredCode.length === 4) {

                setTimeout(function () {

                    if (enteredCode === correctCode) {

                        showScreen("heroScreen");

                        enteredCode = "";

                        updateDots();

                    } else {

                        if (codeError) {
                            codeError.textContent =
                                "Kode salah, coba lagi ✦";
                        }

                        enteredCode = "";

                        setTimeout(function () {

                            updateDots();

                            if (codeError) {
                                codeError.textContent = "";
                            }

                        }, 1000);

                    }

                }, 250);

            }

        });

    });


    /* CLEAR */

    const clearButton =
        document.querySelector('[data-action="clear"]');

    if (clearButton) {

        clearButton.addEventListener("click", function () {

            enteredCode = "";

            updateDots();

            if (codeError) {
                codeError.textContent = "";
            }

        });

    }


    /* BACKSPACE */

    const backButton =
        document.querySelector('[data-action="back"]');

    if (backButton) {

        backButton.addEventListener("click", function () {

            enteredCode =
                enteredCode.slice(0, -1);

            updateDots();

        });

    }


    function updateDots() {

        dots.forEach(function (dot, index) {

            if (index < enteredCode.length) {
                dot.classList.add("filled");
            } else {
                dot.classList.remove("filled");
            }

        });

    }


    /* =====================================================
       PINDAH SECTION
       ===================================================== */

    const nextButtons =
        document.querySelectorAll(".next");

    nextButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const nextScreen =
                button.dataset.next;

            if (nextScreen) {
                showScreen(nextScreen);
            }

        });

    });


    function showScreen(id) {

        const screens =
            document.querySelectorAll(".screen");

        screens.forEach(function (screen) {
            screen.classList.remove("active");
        });

        const target =
            document.getElementById(id);

        if (target) {

            target.classList.add("active");

            target.scrollTop = 0;

        }

    }


    /* =====================================================
       RESTART
       ===================================================== */

    const restartBtn =
        document.getElementById("restartBtn");

    if (restartBtn) {

        restartBtn.addEventListener("click", function () {

            audio.pause();

            audio.currentTime = 0;

            if (playBtn) {
                playBtn.innerHTML = "▶";
            }

            if (vinyl) {
                vinyl.classList.remove("playing");
            }

            enteredCode = "";

            updateDots();

            showScreen("lockScreen");

        });

    }

});
