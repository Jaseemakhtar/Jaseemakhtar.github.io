window.addEventListener('load', () => {
    const main = document.querySelector('main')
    const nav = document.querySelector('main > nav')
    const hero = document.querySelector('#hero')
    const heroContent = document.querySelector('.hero-content')

    const scrollPast = (hero) ? hero.clientHeight : 360
    const heroHeightHalf = hero.clientHeight / 2

    main.addEventListener('scroll', () => {
          const t = Math.min(main.scrollTop / scrollPast, 1);
          const scrollScale = Math.min(main.scrollTop / heroHeightHalf, 1)

          nav.style.setProperty('--blur', `${t * 2}px`);
          nav.style.setProperty('--bg-alpha', 0.3 * t);

        heroContent.style.setProperty('--scroll-scale', 1 - 0.2 * scrollScale)
    });
})