const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// kontakt
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Hvala na poruci! (zbog malog budzeta, ova poruka nije stvarno poslata vec samo mogu da fleksam svoj JS skill >:)');
    contactForm.reset();
  });
}