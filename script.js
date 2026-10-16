const dialog = document.querySelector('dialog');
const image = dialog.querySelector('.full-image');
document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    image.src = button.dataset.image;
    image.alt = button.querySelector('img').alt;
    document.querySelector('#image-title').textContent = button.dataset.title;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
document.querySelector('.print').addEventListener('click', () => window.print());
const links = [...document.querySelectorAll('aside nav a')];
const shortLabels = ['Idee', 'Bild', 'Folien', 'Vortrag'];
links.forEach((link, index) => { link.dataset.short = shortLabels[index]; });
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      });
    }
  });
}, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
document.querySelectorAll('.step').forEach(section => observer.observe(section));
