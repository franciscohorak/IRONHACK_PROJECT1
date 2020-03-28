window.onload = () => {
    const canvas = document.querySelector("canvas");
    const game = new Game(canvas)
    game.instructions();
    window.addEventListener("keydown", event => {
        if (event.keyCode == 32) {
            const game = new Game(canvas)
            game.start();
            console.log("Game Started")
        }
    })
}