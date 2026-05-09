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

// =========================
// SCROLL REVEAL
// =========================
(function () {
  const targets = [
    '.about',
    '.experience-section',
    '.work-section',
    '.contact-section'
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08
  });

  targets.forEach(sel => {
    const el = document.querySelector(sel);
    if (el) {
      el.classList.add('scroll-reveal');
      observer.observe(el);
    }
  });
})();

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

  if (hint) {
    hint.classList.remove('hidden');
  }

  hotspots.forEach(h =>
    h.classList.remove('active')
  );

  activeCompany = null;
}

hotspots.forEach(hotspot => {
  hotspot.addEventListener('click', (e) => {
    e.stopPropagation();

    const company = hotspot.dataset.company;

    if (activeCompany === company) {
      closeBox();
    } else {
      hotspots.forEach(h =>
        h.classList.remove('active')
      );

      hotspot.classList.add('active');

      openBox(company);
    }
  });
});

/* LOGO BUTTONS */

logoButtons.forEach(logo => {
  logo.addEventListener('click', (e) => {
    e.stopPropagation();

    const company = logo.dataset.company;

    hotspots.forEach(h =>
      h.classList.remove('active')
    );

    const matchingHotspot = document.querySelector(
      `.book-hotspot[data-company="${company}"]`
    );

    if (matchingHotspot) {
      matchingHotspot.classList.add('active');
    }

    openBox(company);
  });
});

closeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  closeBox();
});

document.addEventListener('click', (e) => {
  if (
    activeCompany &&
    !box.contains(e.target) &&
    !e.target.closest('.book-hotspot') &&
    !e.target.closest('.exp-logos img')
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
    card.addEventListener('click', (e) => {
      e.stopPropagation(); // prevents the document click from firing immediately

      if (activeIndex === i) {
        closePanel();
        return;
      }

      activeIndex = i;
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      panelTitle.innerHTML = card.dataset.title;

      // long-title for cards at index 2 and 3
    panel.classList.remove('long-title');
const idx = parseInt(card.dataset.index);
console.log('idx is:', idx);
if (idx === 2 || idx === 3) {
  panel.classList.add('long-title');
  console.log('long-title added');
}

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
    panel.classList.remove('long-title');
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