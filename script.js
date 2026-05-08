// smooth scrolling (safe version)
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");

      if (!href || href === "#" || href === "#work") return;

      const id = href.substring(1);
      const target = document.getElementById(id);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });
});
const companies = {
  plum: {
    src: 'plum.png',
    label: 'Plum Benefits'
  },

  lifestyle: {
    src: 'lifestyle.png',
    label: 'Lifestyle'
  },

  radio: {
    src: 'radiocity.png',
    label: 'Radio City'
  }
};

let activeCompany = null;

const box = document.getElementById('expBox');
const boxLabel = document.getElementById('expBoxLabel');
const boxImg = document.getElementById('expBoxImg');
const heading = document.getElementById('expHeading');
const hint = document.getElementById('expHint');
const closeBtn = document.getElementById('expClose');
const hotspots = document.querySelectorAll('.book-hotspot');
const logoButtons = document.querySelectorAll('.exp-logos img');

function openBox(company) {
  const data = companies[company];

  boxLabel.textContent = data.label;
  boxImg.src = data.src;
  boxImg.alt = data.label + ' experience';

  box.classList.add('visible');

  heading.classList.add('hidden');

  if (hint) {
    hint.classList.add('hidden');
  }

  activeCompany = company;

}
function closeBox() {
  box.classList.remove('visible');
  heading.classList.remove('hidden');
  hint.classList.remove('hidden');
  activeCompany = null;
  hotspots.forEach(h => h.classList.remove('active'));
}

hotspots.forEach(hotspot => {
  hotspot.addEventListener('click', () => {
    const company = hotspot.dataset.company;

    hotspots.forEach(h =>
      h.classList.remove('active')
    );

    hotspot.classList.add('active');

    if (activeCompany === company) {
      closeBox();
    } else {
      openBox(company);
    }
  });
});

/* LOGO BUTTONS */

logoButtons.forEach(logo => {
  logo.addEventListener('click', () => {
    const company = logo.dataset.company;

    openBox(company);
  });
});

closeBtn.addEventListener('click', closeBox);
document.addEventListener('click', (e) => {
  if (
    activeCompany &&
    !box.contains(e.target) &&
    !e.target.closest('[data-company]')
  ) {
    closeBox();
  }
});
(function () {
  const cards = document.querySelectorAll('.work-card');
  const panel = document.getElementById('workPanel');
  const panelTitle = document.getElementById('panelTitle');
  const panelBrand = document.getElementById('panelBrand');
  const panelSummary = document.getElementById('panelSummary');
  const panelLink = document.getElementById('panelLink');

  let activeIndex = null;

  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      if (activeIndex === i) {
        closePanel();
        return;
      }
      activeIndex = i;
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      panelTitle.innerHTML = card.dataset.title;
      panelBrand.textContent = card.dataset.brand;
      panelSummary.textContent = card.dataset.summary;
      panelLink.textContent = card.dataset.linktext;
      panelLink.href = card.dataset.link;

    panelBrand.style.color = card.dataset.brand === 'Notion' ? '#a78bdb' : '#ff89aa';

      panel.classList.add('open');
setTimeout(() => {
  panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}, 230);
    });
  });

  function closePanel() {
    activeIndex = null;
    panel.classList.remove('open');
    cards.forEach(c => c.classList.remove('active'));
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.work-card') && !e.target.closest('.work-panel')) {
      closePanel();
    }
  });

  // drag to scroll
  const wrapper = document.querySelector('.work-scroll-wrapper');
  if (!wrapper) return;
  let isDown = false, startX, scrollLeft;

  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });
  wrapper.addEventListener('mouseleave', () => { isDown = false; });
  wrapper.addEventListener('mouseup', () => { isDown = false; });
  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    wrapper.scrollLeft = scrollLeft - (x - startX) * 1.4;
  });
})();
// CONTACT PAGE RESUME DOWNLOAD

const resumeLink = document.querySelector('.resume-link');

if (resumeLink) {
  resumeLink.addEventListener('click', () => {
    console.log('Resume opened');
  });
}