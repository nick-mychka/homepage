const avatar = document.querySelector('.avatar');
const avatarContainer = document.querySelector('.avatar-container');
const appreciateMessage = document.querySelector('.appreciate-message');

avatar.addEventListener('mousemove', startRotate);
avatar.addEventListener('mouseout', stopRotate);

function startRotate(event) {
    const halfHeight = avatar.offsetHeight / 2;
    const halfWidth = avatar.offsetWidth / 2;
    avatarContainer.classList.remove('avatar-fix-me');
    appreciateMessage.classList.add('show-appreciate-message');
    
    avatar.style.transform = `rotateX(${(event.offsetY - halfHeight) / 10}deg) rotateY(${(event.offsetX - halfWidth) / 10}deg)`;
}

function stopRotate() {  
    avatar.style.transform = 'rotateX(0)';
}