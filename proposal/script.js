let highestZ = 1;
class Paper {
    holdingPaper = false;
    touchStartX = 0;
    touchStartY = 0;
    touchX = 0;
    touchY = 0;
    prevTouchX = 0;
    prevTouchY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;

    init(paper) {
        const moveHandler = (x, y) => {
            this.touchX = x;
            this.touchY = y;
            this.velX = this.touchX - this.prevTouchX;
            this.velY = this.touchY - this.prevTouchY;

            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velX;
                    this.currentPaperY += this.velY;
                }
                this.prevTouchX = this.touchX;
                this.prevTouchY = this.touchY;
                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
            }
        };

        const startHandler = (x, y, isRightClick) => {
            if (this.holdingPaper) return;
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;

            this.touchStartX = x;
            this.touchStartY = y;
            this.prevTouchX = x;
            this.prevTouchY = y;

            if (isRightClick) {
                this.rotating = true;
            }
        };

        const endHandler = () => {
            this.holdingPaper = false;
            this.rotating = false;
        };

        // Mouse Events
        paper.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startHandler(e.clientX, e.clientY, e.button === 2);
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.rotating) moveHandler(e.clientX, e.clientY);
        });

        window.addEventListener('mouseup', endHandler);

        // Touch Events
        paper.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startHandler(touch.clientX, touch.clientY, false);
        });

        paper.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            moveHandler(touch.clientX, touch.clientY);
        });

        window.addEventListener('touchend', endHandler);
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});

// Popup and Button Logic
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const popup = document.getElementById("popup");

noButton.addEventListener("mouseover", () => {
    noButton.style.position = "absolute";
    noButton.style.left = Math.random() * 80 + "vw";
    noButton.style.top = Math.random() * 80 + "vh";
});

yesButton.addEventListener("click", () => {
    popup.style.display = "block";
});

popup.style.display = "none";