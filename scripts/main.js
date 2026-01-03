window.addEventListener('load', () => {
    const main = document.querySelector('main')
    const nav = document.querySelector('main > nav')
    const hero = document.querySelector('#hero')

    const scrollPast = (hero) ? hero.clientHeight : 360

    main.addEventListener('scroll', () => {
          const t = Math.min(main.scrollTop / scrollPast, 1);

          nav.style.setProperty('--blur', `${t * 2}px`);
          nav.style.setProperty('--bg-alpha', 0.3 * t);

    });
})