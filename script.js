const mainCard = document.getElementById('mainCard');
const successCard = document.getElementById('successCard');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const heartsContainer = document.getElementById('heartsContainer');

let noBtnMoveCount = 0;
const messages = [
    "No 😢",
    "Are you sure? 🥺",
    "Really sure?? 💔",
    "Pookie please... 😭",
    "Don't do this to me! 😤",
    "I'm gonna cry... 🐱‍👤",
    "Think about the teddy! 🧸",
    "Pretty please? 🥺",
    "You're breaking my heart 💔",
    "Just click YES! 💖",
    "I'll be the best valentine ever! ✨",
    "Last chance! 😤",
    "Still No? 😭",
    "Fine, I'll ask again! 🔄",
    "You leave me no choice... 😢",
    "Please say yes pookie! 💕"
];

// Move button when mouse gets close
document.addEventListener('mousemove', (e) => {
    // Increased proximity threshold to make it harder to touch
    const proximityThreshold = 150;
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) +
        Math.pow(e.clientY - btnCenterY, 2)
    );

    // Jump away before the mouse can even reach it
    if (distance < proximityThreshold) {
        moveNoButton();
    }
});

// Extra protection for mobile or fast clicks
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    // Distance the button should stay away from any screen edge
    const edgeMargin = 40;

    // Get current visual viewport dimensions (excluding scrollbars)
    const viewWidth = document.documentElement.clientWidth;
    const viewHeight = document.documentElement.clientHeight;

    // Get the button's actual size (with a fallback if not rendered)
    const btnWidth = noBtn.offsetWidth || 100;
    const btnHeight = noBtn.offsetHeight || 40;

    // The maximum possible X and Y positions (top-left corner of button)
    const maxSafeX = viewWidth - btnWidth - edgeMargin;
    const maxSafeY = viewHeight - btnHeight - edgeMargin;
    const minSafeX = edgeMargin;
    const minSafeY = edgeMargin;

    let finalX, finalY;

    // If screen is large enough for movement
    if (maxSafeX > minSafeX && maxSafeY > minSafeY) {
        finalX = minSafeX + Math.random() * (maxSafeX - minSafeX);
        finalY = minSafeY + Math.random() * (maxSafeY - minSafeY);
    } else {
        // Fallback for very small screens: Put it in the middle
        finalX = (viewWidth - btnWidth) / 2;
        finalY = (viewHeight - btnHeight) / 2;
    }

    // Apply the position strictly
    noBtn.style.position = 'fixed';
    noBtn.style.margin = '0'; // Prevent any external CSS from offsetting it
    noBtn.style.left = `${Math.floor(finalX)}px`;
    noBtn.style.top = `${Math.floor(finalY)}px`;
    noBtn.style.transition = 'none'; // Instant movement
    noBtn.style.zIndex = '1000000'; // Extremely high z-index
    noBtn.style.opacity = '1';
    noBtn.style.visibility = 'visible';
    noBtn.style.display = 'block';

    // Explicitly set high contrast colors when it moves
    noBtn.style.backgroundColor = '#f1f1f1';
    noBtn.style.color = '#333';
    noBtn.style.border = '2px solid #ff4d6d';

    // Update text messages
    noBtnMoveCount++;
    if (noBtnMoveCount < messages.length) {
        noBtn.innerText = messages[noBtnMoveCount];
    } else {
        noBtn.innerText = messages[messages.length - 1];
    }

    // Proactively grow the Yes button
    const currentScale = Math.min(1 + (noBtnMoveCount * 0.2), 3.5);
    yesBtn.style.transform = `scale(${currentScale})`;
}

// Mobile touch support
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Ensure button stays in view on resize
window.addEventListener('resize', () => {
    if (noBtn.style.position === 'fixed') {
        moveNoButton();
    }
});

yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    successCard.style.display = 'block';
    setTimeout(() => {
        successCard.classList.remove('hidden');
        createHearts();
    }, 10);
});

function createHearts() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = '-10px';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            heart.style.opacity = Math.random();
            const colors = ['#ff4d6d', '#ff758f', '#ff85a1', '#ffb3c1', '#c9184a'];
            heart.style.background = colors[Math.floor(Math.random() * colors.length)];

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}

// Logic for the final surprise page
const surpriseBtn = document.getElementById('surpriseBtn');

surpriseBtn.addEventListener('click', () => {
    // Navigate to the next page
    window.location.href = 'surprise.html';
});

// Touch/Click interaction for videos
document.querySelectorAll('.video-container').forEach(container => {
    container.addEventListener('click', (e) => {
        // Create a floating message
        const message = document.createElement('div');
        message.innerText = "❤️ I Love You! ❤️";
        message.style.position = 'fixed';
        message.style.left = e.clientX + 'px';
        message.style.top = e.clientY + 'px';
        message.style.color = '#ff0a54';
        message.style.fontWeight = 'bold';
        message.style.fontSize = '1.2rem';
        message.style.pointerEvents = 'none';
        message.style.zIndex = '10000';
        message.style.animation = 'floatUp 1.5s ease-out forwards';
        document.body.appendChild(message);

        // Burst hearts
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = (e.clientX + (Math.random() - 0.5) * 40) + 'px';
            heart.style.top = (e.clientY + (Math.random() - 0.5) * 40) + 'px';
            heart.style.position = 'fixed';
            heart.style.animation = 'heartFloat 2s ease-out forwards';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }

        setTimeout(() => message.remove(), 1500);
    });
});
