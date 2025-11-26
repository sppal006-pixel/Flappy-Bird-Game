// Initialize after DOM is ready to avoid null references
window.addEventListener('load', () => { 
    const move_speed = 4;
    const gravity = 0.4;

    // find the bird image element (class and id from index.html)
    const bird = document.querySelector('.bird');
    const img = document.getElementById('bird1');
    const sound_start = new Audio('sounds effect/Gamestart.mp3');
    const sound_point = new Audio('sounds effect/point.mp3');
    const sound_die = new Audio('sounds effect/die.mp3');

    if (!bird || !img) return; // safety
    // getting bird element properties
    let bird_props = bird.getBoundingClientRect();

    // This method returns DOMRect -> top, right, bottom, left, x, y, width and height
    let background = document.querySelector('.background').getBoundingClientRect();

    const score_val = document.querySelector('.score_val');
    const message = document.querySelector('.message');
    const score_title = document.querySelector('.score_title');

    let game_state = 'Start';
    img.style.display = 'none';
    message && message.classList.add('messageStyle');

    // single handlers for controls (added once)
    document.addEventListener('keydown', (e) => {
        // Start game on Enter
        if (e.key === 'Enter' && game_state !== 'Play') {
            document.querySelectorAll('.pipe_sprite').forEach((el) => el.remove());
            img.style.display = 'block';
            bird.style.top = '40vh';
            game_state = 'Play';
            message && (message.innerHTML = '');
            score_title && (score_title.innerHTML = 'Score : ');
            score_val && (score_val.innerHTML = '0');
            message && message.classList.remove('messageStyle');
            sound_start.play();
            play();
        }

        // Show different bird image when game ends
        if ((e.key === 'ArrowUp' || e.key === ' ') && game_state === 'End') {
            img.style.display = 'block'; // Make sure image is visible
            img.src = 'images/flappy bird3.png';
            bird.dataset.flap = '0';
            
            // Hide image after 1.5 seconds
            setTimeout(() => {
            img.style.display = 'none';
            }, 1500);
        }

        // Flap while playing
        if ((e.key === 'ArrowUp' || e.key === ' ') && game_state === 'Play') {
            img.src = 'images/flappy bird 2.png';
            // store flap impulse on a custom property to be consumed in the gravity loop
            bird.dataset.flap = '1';
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowUp' || e.key === ' ') {
            img.src = 'images/flappy bird 1.png';
            bird.dataset.flap = '0';
        }
    });

    function play() {
        function move() {
            if (game_state !== 'Play') return;

            const pipe_sprite = document.querySelectorAll('.pipe_sprite');
            pipe_sprite.forEach((element) => {
                const pipe_sprite_props = element.getBoundingClientRect();
                bird_props = bird.getBoundingClientRect();

                if (pipe_sprite_props.right <= 0) {
                    element.remove();
                } else {
                    // collision detection
                    if (
                        bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
                        bird_props.left + bird_props.width > pipe_sprite_props.left &&
                        bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
                        bird_props.top + bird_props.height > pipe_sprite_props.top
                    ) {
                        game_state = 'End';
                        if (message) {
                            message.innerHTML = '<span style="color:red;">Game Over</span><br>Press Enter To Restart';
                            message.classList.add('messageStyle');
                        }
                        img.style.display = 'none';
                        sound_die.play();
                        return;
                    } else {
                        // scoring when pipe just passed the bird
                        if (
                            pipe_sprite_props.right < bird_props.left &&
                            pipe_sprite_props.right + move_speed >= bird_props.left &&
                            element.increase_score === '1'
                        ) {
                            if (score_val) {
                                const current = parseInt(score_val.innerHTML) || 0;
                                score_val.innerHTML = current + 1;
                            }
                            element.increase_score = '0'; // prevent multiple scoring from same pipe
                            sound_point.play();
                        }
                        element.style.left = pipe_sprite_props.left - move_speed + 'px';
                    }
                }
            });
            requestAnimationFrame(move);
        }
        requestAnimationFrame(move);

        let bird_dy = 0;
        function apply_gravity() {
            if (game_state !== 'Play') return;

            // apply gravity
            bird_dy = bird_dy + gravity;

            // apply flap impulse if user pressed flap (handled by dataset flag set in keydown)
            if (bird.dataset.flap === '1') {
                bird_dy = -7.6;
                bird.dataset.flap = '0'; // consume impulse
            }

            // update background rect in case layout changed
            background = document.querySelector('.background').getBoundingClientRect();

            bird_props = bird.getBoundingClientRect();
            if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
                game_state = 'End';
                if (message) {
                    message.style.left = '28vw';
                    message.classList.remove('messageStyle');
                }
                // Reload is optional; keep it if you want restart on death
                window.location.reload();
                return;
            }
            bird.style.top = bird_props.top + bird_dy + 'px';
            bird_props = bird.getBoundingClientRect();
            requestAnimationFrame(apply_gravity);
        }
        requestAnimationFrame(apply_gravity);

        let pipe_seperation = 0;
        const pipe_gap = 35;

        function create_pipe() {
            if (game_state !== 'Play') return;

            if (pipe_seperation > 115) {
                pipe_seperation = 0;

                const pipe_posi = Math.floor(Math.random() * 43) + 8;
                const pipe_sprite_inv = document.createElement('div');
                pipe_sprite_inv.className = 'pipe_sprite';
                pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
                pipe_sprite_inv.style.left = '100vw';
                pipe_sprite_inv.increase_score = '0';
                document.body.appendChild(pipe_sprite_inv);

                const pipe_sprite = document.createElement('div');
                pipe_sprite.className = 'pipe_sprite';
                pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
                pipe_sprite.style.left = '100vw';
                pipe_sprite.increase_score = '1';
                document.body.appendChild(pipe_sprite);
            }
            pipe_seperation++;
            requestAnimationFrame(create_pipe);
        }
        requestAnimationFrame(create_pipe);
    }
});
