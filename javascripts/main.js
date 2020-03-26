window.onload = () => {
    document.getElementsByClassName("startButton")[0].onclick = () => {
        const canvas = document.querySelector("canvas");
        const game = new Game(canvas)
        game.start();
    }
}