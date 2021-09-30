const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.getElementById('side-menu-toggle');

// function backdropClickHandler() {
//     backdrop.style.display = 'none';
//     sideDrawer.classList.remove('open');
// }

// function menuToggleClickHandler() {
//     backdrop.style.display = 'block';
//     console.log('clicked');
//     sideDrawer.classList.add('open');
// }

backdrop.addEventListener('click', () => {
    backdrop.style.display = 'none';
    sideDrawer.classList.remove('open');
});

menuToggle.addEventListener('click', () => {
    backdrop.style.display = 'block';
    sideDrawer.classList.add('open');
});