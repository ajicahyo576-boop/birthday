document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       BASIC ELEMENTS
    ===================================================== */

    const screens = document.querySelectorAll(".screen");

    const audio = document.getElementById("audio");

    const playBtn = document.getElementById("playBtn");

    const prevBtn = document.getElementById("prevBtn");

    const nextBtn = document.getElementById("nextBtn");

    const progressBar = document.getElementById("progressBar");

    const vinyl = document.getElementById("vinyl");

    const songTitle = document.getElementById("songTitle");

    const songArtist = document.getElementById("songArtist");

    const musicNote = document.getElementById("musicNote");



    /* =====================================================
       SCREEN NAVIGATION
    ===================================================== */

    function showScreen(screenId) {

        screens.forEach(function (screen) {

            screen.classList.remove("active");

        });


        const target = document.getElementById(screenId);

        if (target) {

            target.classList.add("active");

            target.scrollTop = 0;

        }

    }



    document.querySelectorAll(".next").forEach(function (button) {

        button.addEventListener("click", function () {

            const nextScreen = button.dataset.next;

            if (nextScreen) {

                showScreen(nextScreen);

            }

        });

    });



    /* =====================================================
       LOCK / PIN
       
       PIN = 1810
    ===================================================== */

    const correctCode = "1810";

    let enteredCode = "";

    const codeDots = document.querySelectorAll(
        "#codeDots span"
    );

    const codeError = document.getElementById(
        "codeError"
    );


    function updateDots() {

        codeDots.forEach(function (dot, index) {

            if (index < enteredCode.length) {

                dot.classList.add("filled");

            } else {

                dot.classList.remove("filled");

            }

        });

    }



    function checkCode() {

        if (enteredCode.length !== 4) {

            return;

        }


        if (enteredCode === correctCode) {

            codeError.textContent = "";

            showScreen("heroScreen");

            enteredCode = "";

            updateDots();

        } else {

            codeError.textContent =
                "Kode salah, coba lagi ✦";

            enteredCode = "";

            updateDots();

        }

    }



    document.querySelectorAll("[data-key]").forEach(function (button) {

        button.addEventListener("click", function () {

            if (enteredCode.length >= 4) {

                return;

            }


            enteredCode += button.dataset.key;

            updateDots();

            checkCode();

        });

    });



    document.querySelectorAll("[data-action]").forEach(function (button) {

        button.addEventListener("click", function () {

            const action = button.dataset.action;


            if (action === "clear") {

                enteredCode = "";

                codeError.textContent = "";

                updateDots();

            }


            if (action === "back") {

                enteredCode =
                    enteredCode.slice(0, -1);

                codeError.textContent = "";

                updateDots();

            }

        });

    });



    /* =====================================================
       MUSIC
    ===================================================== */

    let isPlaying = false;


    function playMusic() {

        if (!audio) {

            return;

        }


        const playPromise = audio.play();


        if (playPromise !== undefined) {

            playPromise

                .then(function () {

                    isPlaying = true;

                    updateMusicUI();

                })

                .catch(function (error) {

                    console.log(
                        "Audio tidak dapat diputar:",
                        error
                    );

                });

        }

    }



    function pauseMusic() {

        if (!audio) {

            return;

        }


        audio.pause();

        isPlaying = false;

        updateMusicUI();

    }



    function updateMusicUI() {

        if (!playBtn) {

            return;

        }


        if (isPlaying) {

            playBtn.textContent = "❚❚";

            playBtn.setAttribute(
                "aria-label",
                "Pause"
            );


            if (vinyl) {

                vinyl.classList.add(
                    "vinyl-playing"
                );

            }


            if (musicNote) {

                musicNote.classList.add(
                    "music-active"
                );

            }

        } else {

            playBtn.textContent = "▶";

            playBtn.setAttribute(
                "aria-label",
                "Play"
            );


            if (vinyl) {

                vinyl.classList.remove(
                    "vinyl-playing"
                );

            }


            if (musicNote) {

                musicNote.classList.remove(
                    "music-active"
                );

            }

        }

    }



    if (playBtn) {

        playBtn.addEventListener(
            "click",
            function () {

                if (audio.paused) {

                    playMusic();

                } else {

                    pauseMusic();

                }

            }
        );

    }



    /* =====================================================
       AUDIO PROGRESS
    ===================================================== */

    if (audio) {

        audio.addEventListener(
            "timeupdate",
            function () {

                if (!audio.duration) {

                    return;

                }


                const percentage =
                    (audio.currentTime /
                        audio.duration) * 100;


                if (progressBar) {

                    progressBar.style.width =
                        percentage + "%";

                }

            }
        );



        audio.addEventListener(
            "loadedmetadata",
            function () {

                console.log(
                    "Audio berhasil dimuat."
                );

            }
        );



        audio.addEventListener(
            "play",
            function () {

                isPlaying = true;

                updateMusicUI();

            }
        );



        audio.addEventListener(
            "pause",
            function () {

                isPlaying = false;

                updateMusicUI();

            }
        );



        audio.addEventListener(
            "ended",
            function () {

                isPlaying = false;

                if (progressBar) {

                    progressBar.style.width =
                        "0%";

                }

                updateMusicUI();

            }
        );



        audio.addEventListener(
            "error",
            function () {

                console.log(
                    "Gagal memuat song.mp3"
                );

            }
        );

    }



    /* =====================================================
       PLAYLIST BUTTONS
       
       Saat ini semua tombol menggunakan song.mp3.
       Kita belum menggunakan 3 file lagu berbeda.
    ===================================================== */

    const songButtons =
        document.querySelectorAll(".song");


    songButtons.forEach(function (songButton) {

        songButton.addEventListener(
            "click",
            function () {

                songButtons.forEach(
                    function (button) {

                        button.classList.remove(
                            "active-song"
                        );

                    }
                );


                songButton.classList.add(
                    "active-song"
                );


                const title =
                    songButton.dataset.title;


                const artist =
                    songButton.dataset.artist;


                if (songTitle) {

                    songTitle.textContent =
                        title;

                }


                if (songArtist) {

                    songArtist.textContent =
                        artist;

                }


                /*
                 * Karena kita baru mempunyai
                 * satu file song.mp3, lagu yang
                 * diputar tetap song.mp3.
                 */

                audio.currentTime = 0;

                playMusic();

            }
        );

    });



    /* =====================================================
       PREVIOUS / NEXT
    ===================================================== */

    let currentSong = 0;


    function selectSong(index) {

        if (!songButtons.length) {

            return;

        }


        if (index < 0) {

            index = songButtons.length - 1;

        }


        if (index >= songButtons.length) {

            index = 0;

        }


        currentSong = index;


        const selected =
            songButtons[currentSong];


        songButtons.forEach(
            function (button) {

                button.classList.remove(
                    "active-song"
                );

            }
        );


        selected.classList.add(
            "active-song"
        );


        if (songTitle) {

            songTitle.textContent =
                selected.dataset.title;

        }


        if (songArtist) {

            songArtist.textContent =
                selected.dataset.artist;

        }


        audio.currentTime = 0;

        playMusic();

    }



    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            function () {

                selectSong(
                    currentSong - 1
                );

            }
        );

    }



    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            function () {

                selectSong(
                    currentSong + 1
                );

            }
        );

    }



    /* =====================================================
       RESTART
    ===================================================== */

    const restartBtn =
        document.getElementById(
            "restartBtn"
        );


    if (restartBtn) {

        restartBtn.addEventListener(
            "click",
            function () {

                pauseMusic();


                if (audio) {

                    audio.currentTime = 0;

                }


                if (progressBar) {

                    progressBar.style.width =
                        "0%";

                }


                showScreen(
                    "lockScreen"
                );

            }
        );

    }



    /* =====================================================
       PETALS
    ===================================================== */

    const petals =
        document.getElementById("petals");


    if (petals) {

        for (
            let i = 0;
            i < 18;
            i++
        ) {

            const petal =
                document.createElement(
                    "span"
                );


            petal.classList.add(
                "petal"
            );


            petal.style.left =
                Math.random() * 100 + "%";


            petal.style.animationDelay =
                Math.random() * 8 + "s";


            petal.style.animationDuration =
                6 + Math.random() * 6 + "s";


            petals.appendChild(
                petal
            );

        }

    }



    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateDots();

    updateMusicUI();

});
