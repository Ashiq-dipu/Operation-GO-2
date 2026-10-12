/**
 * OPERATION GO — Master Interactive Controller & GSAP 3 Animations
 * Adheres strictly to GSAP 3 modern syntax, ScrollTrigger lifecycle safety,
 * reduced motion accessibility, and dynamic modal/drawer workflows.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize GSAP & Plugins
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    initGSAPAnimations();
  }

  // 2. Interactive Components
  initMobileNav();
  initHeaderScroll();
  initModals();
  initJobBoard();
  initImpactCounters();
  initDonationCalculator();
  initThemeToggle();
  initHeroVideoFit();
  initAmbientMouseSpotlight();
});

/**
 * GSAP 3 Animations Suite
 */
function initGSAPAnimations() {
  const mm = gsap.matchMedia();

  // Standard animation suite (respecting user prefers-reduced-motion)
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const ctx = gsap.context(() => {
      // Hero / Page Header Timeline
      const heroHeadline = document.querySelector('.hero-headline');
      if (heroHeadline) {
        const heroTl = gsap.timeline({ 
          defaults: { ease: "power3.out", duration: 0.8 },
          onComplete: () => {
            gsap.set('.hero-badge-item, .hero-headline, .hero-lead, .hero-cta-group .btn, .hero-stat-card, .hero-feature-card, .hero-float-badge, .hero-instructor-callout', { clearProps: "opacity,transform" });
          }
        });

        if (document.querySelectorAll('.hero-badge-item').length) {
          heroTl.fromTo('.hero-badge-item', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 });
        }
        heroTl.fromTo(heroHeadline, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.4");
        
        if (document.querySelector('.hero-lead')) {
          heroTl.fromTo('.hero-lead', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5");
        }
        if (document.querySelectorAll('.hero-cta-group .btn').length) {
          heroTl.fromTo('.hero-cta-group .btn', { y: 15, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=0.4");
        }
        if (document.querySelectorAll('.hero-stat-card').length) {
          heroTl.fromTo('.hero-stat-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=0.3");
        }
        if (document.querySelector('.hero-feature-card')) {
          heroTl.fromTo('.hero-feature-card', { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9 }, "-=0.6");
        }
        if (document.querySelector('.hero-float-badge')) {
          heroTl.fromTo('.hero-float-badge', { x: 20, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.4");
        }
        if (document.querySelector('.hero-instructor-callout')) {
          heroTl.fromTo('.hero-instructor-callout', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.3");
        }
      }

      // Non-home sub-page title entrance
      const pageDisplayTitle = document.querySelector('.page-hero .display-title, .section-sm .display-title');
      if (pageDisplayTitle && !heroHeadline) {
        gsap.fromTo(pageDisplayTitle, 
          { y: 25, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "opacity,transform" }
        );
      }

      // ScrollTrigger: Section Headers
      gsap.utils.toArray('.section-header').forEach((header) => {
        if (header.children && header.children.length > 0) {
          gsap.fromTo(header.children, 
            { y: 25, opacity: 0 },
            {
              scrollTrigger: {
                trigger: header,
                start: "top 92%",
                once: true
              },
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power2.out",
              clearProps: "opacity,transform"
            }
          );
        }
      });

      // ScrollTrigger: Bento Cards
      if (document.querySelectorAll('.bento-card').length) {
        gsap.utils.toArray('.bento-programs-grid').forEach((grid) => {
          const cards = grid.querySelectorAll('.bento-card');
          if (cards.length) {
            gsap.fromTo(cards, 
              { y: 30, opacity: 0 },
              {
                scrollTrigger: {
                  trigger: grid,
                  start: "top 88%",
                  once: true
                },
                y: 0,
                opacity: 1,
                duration: 0.65,
                stagger: 0.08,
                ease: "power2.out",
                clearProps: "opacity,transform"
              }
            );
          }
        });
      }

      // ScrollTrigger: Dual Engine Cards
      if (document.querySelectorAll('.dual-engine-grid').length) {
        gsap.utils.toArray('.dual-engine-grid').forEach((grid) => {
          const cards = grid.querySelectorAll('.dual-card');
          if (cards.length) {
            gsap.fromTo(cards,
              { y: 30, opacity: 0 },
              {
                scrollTrigger: {
                  trigger: grid,
                  start: "top 88%",
                  once: true
                },
                y: 0,
                opacity: 1,
                stagger: 0.12,
                duration: 0.7,
                ease: "power3.out",
                clearProps: "opacity,transform"
              }
            );
          }
        });
      }

      // ScrollTrigger: Job Row Cards
      if (document.querySelectorAll('.job-row-card').length) {
        gsap.fromTo('.job-row-card',
          { y: 20, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.jobs-list',
              start: "top 90%",
              once: true
            },
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "opacity,transform"
          }
        );
      }

      // Founder / Split Portrait Reveal
      if (document.querySelector('.founder-portrait-frame')) {
        gsap.utils.toArray('.founder-portrait-frame').forEach((frame) => {
          gsap.fromTo(frame,
            { x: -25, opacity: 0 },
            {
              scrollTrigger: {
                trigger: frame,
                start: "top 88%",
                once: true
              },
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "opacity,transform"
            }
          );
        });
      }

      // Timeline Milestones Reveal
      if (document.querySelectorAll('.timeline-milestone').length) {
        gsap.fromTo('.timeline-milestone',
          { y: 25, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.timeline-track',
              start: "top 85%",
              once: true
            },
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "opacity,transform"
          }
        );
      }

      /* ======================================================================
         1. SCROLL EXPANDING / SHRINKING BACKGROUNDS (SCRUBBED)
         ====================================================================== */
      // Hero Backdrop Video Zoom & Content Lift on Scroll Down / Restore on Scroll Up
      const heroVideoWrap = document.querySelector('.hero-video-wrapper');
      const heroContent = document.querySelector('.hero-content');
      if (heroVideoWrap) {
        gsap.to(heroVideoWrap, {
          scale: 1.18,
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });
      }
      if (heroContent) {
        gsap.to(heroContent, {
          y: -40,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });
      }

      // Video Showcase Frame: Expands from compact rounded box to expansive widescreen on scroll
      const videoFrame = document.querySelector('.video-showcase-frame');
      if (videoFrame) {
        gsap.fromTo(videoFrame,
          { 
            scale: 0.88, 
            borderRadius: "36px",
            borderColor: "rgba(255, 230, 0, 0.2)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)"
          },
          {
            scale: 1.04,
            borderRadius: "14px",
            borderColor: "rgba(255, 230, 0, 0.95)",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(255, 230, 0, 0.4)",
            ease: "none",
            scrollTrigger: {
              trigger: ".video-showcase-section",
              start: "top 85%",
              end: "center center",
              scrub: 1
            }
          }
        );
      }

      // Bento Card Background Image Parallax Scale on Scroll
      gsap.utils.toArray('.bento-card').forEach((card) => {
        const img = card.querySelector('.bento-img-bg img');
        if (img) {
          gsap.fromTo(img,
            { scale: 1.18, yPercent: -8 },
            {
              scale: 1.02,
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            }
          );
        }
      });

      // Founder Image Subtle Parallax Depth
      const founderImg = document.querySelector('.founder-img');
      if (founderImg) {
        gsap.fromTo(founderImg,
          { scale: 1.12, yPercent: -6 },
          {
            scale: 1.0,
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: ".founder-story-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      }

      /* ======================================================================
         2. DYNAMIC BACKGROUND COLOR / AMBIENT GLOW MORPH ON SCROLL
         ====================================================================== */
      const ambientBackdrop = document.getElementById('scrollAmbientBackdrop');
      if (ambientBackdrop) {
        const sectionColorMap = [
          { selector: '.hero', color: 'rgba(255, 94, 0, 0.16)', x: '50%', y: '25%' },
          { selector: '.dual-engine-section', color: 'rgba(0, 200, 255, 0.15)', x: '25%', y: '50%' },
          { selector: '.job-board-section', color: 'rgba(255, 230, 0, 0.16)', x: '70%', y: '45%' },
          { selector: '.video-showcase-section', color: 'rgba(255, 140, 0, 0.20)', x: '50%', y: '50%' },
          { selector: '.programs-bento-section', color: 'rgba(11, 99, 246, 0.15)', x: '30%', y: '60%' },
          { selector: '.founder-story-section', color: 'rgba(234, 88, 12, 0.18)', x: '25%', y: '50%' },
          { selector: '.impact-section', color: 'rgba(255, 215, 0, 0.15)', x: '50%', y: '50%' },
          { selector: '.audience-cta-strip', color: 'rgba(255, 94, 0, 0.18)', x: '50%', y: '30%' }
        ];

        sectionColorMap.forEach(cfg => {
          const el = document.querySelector(cfg.selector);
          if (el) {
            ScrollTrigger.create({
              trigger: el,
              start: "top 60%",
              end: "bottom 40%",
              onEnter: () => {
                ambientBackdrop.style.setProperty('--ambient-color', cfg.color);
                ambientBackdrop.style.setProperty('--ambient-x', cfg.x);
                ambientBackdrop.style.setProperty('--ambient-y', cfg.y);
              },
              onEnterBack: () => {
                ambientBackdrop.style.setProperty('--ambient-color', cfg.color);
                ambientBackdrop.style.setProperty('--ambient-x', cfg.x);
                ambientBackdrop.style.setProperty('--ambient-y', cfg.y);
              }
            });
          }
        });
      }

      /* ======================================================================
         3. BORDER ON SCROLL (EXPANDING BEAMS & GLOW BLOOMS)
         ====================================================================== */
      // Header Scroll Progress Border
      const progressLine = document.getElementById('headerScrollProgress');
      if (progressLine) {
        gsap.to(progressLine, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: "top top",
            end: "max",
            scrub: 0.3
          }
        });
      }

      // Section Divider Luminous Beams: Expand from center on scroll into view
      gsap.utils.toArray('.section-divider-glow').forEach((divider) => {
        gsap.fromTo(divider,
          { scaleX: 0, opacity: 0.2 },
          {
            scaleX: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: divider,
              start: "top 95%",
              end: "top 65%",
              scrub: 0.8
            }
          }
        );
      });

      // Dual Engine Card Borders: Glow bloom on scroll into view
      const cardTraining = document.querySelector('.dual-card.card-training');
      const cardHiring = document.querySelector('.dual-card.card-hiring');
      if (cardTraining) {
        gsap.fromTo(cardTraining,
          { borderColor: "rgba(11, 99, 246, 0.2)", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.6)" },
          {
            borderColor: "rgba(0, 200, 255, 0.7)",
            boxShadow: "0 0 35px rgba(0, 200, 255, 0.22), 0 20px 45px rgba(0, 0, 0, 0.8)",
            ease: "none",
            scrollTrigger: {
              trigger: cardTraining,
              start: "top 85%",
              end: "center 50%",
              scrub: 0.8
            }
          }
        );
      }
      if (cardHiring) {
        gsap.fromTo(cardHiring,
          { borderColor: "rgba(255, 94, 0, 0.25)", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.6)" },
          {
            borderColor: "rgba(255, 140, 0, 0.85)",
            boxShadow: "0 0 35px rgba(255, 94, 0, 0.25), 0 20px 45px rgba(0, 0, 0, 0.8)",
            ease: "none",
            scrollTrigger: {
              trigger: cardHiring,
              start: "top 85%",
              end: "center 50%",
              scrub: 0.8
            }
          }
        );
      }

      // Featured Urgent Job Card: Brilliant neon gold border bloom on scroll
      const urgentCard = document.querySelector('.job-row-card.featured-urgent');
      if (urgentCard) {
        gsap.fromTo(urgentCard,
          { boxShadow: "0 4px 15px rgba(255, 230, 0, 0.15)", borderColor: "rgba(255, 230, 0, 0.4)" },
          {
            boxShadow: "0 0 45px rgba(255, 230, 0, 0.5), 0 15px 35px rgba(0, 0, 0, 0.8)",
            borderColor: "#FFE600",
            ease: "none",
            scrollTrigger: {
              trigger: urgentCard,
              start: "top 80%",
              end: "center 50%",
              scrub: 0.8
            }
          }
        );
      }

      // Founder Portrait Frame: Border bloom on scroll
      const founderFrame = document.querySelector('.founder-portrait-frame');
      if (founderFrame) {
        gsap.fromTo(founderFrame,
          { borderColor: "rgba(255, 255, 255, 0.16)", boxShadow: "0 15px 30px rgba(0, 0, 0, 0.6)" },
          {
            borderColor: "rgba(255, 94, 0, 0.75)",
            boxShadow: "0 0 45px rgba(255, 94, 0, 0.35), 0 25px 60px rgba(0, 0, 0, 0.9)",
            ease: "none",
            scrollTrigger: {
              trigger: founderFrame,
              start: "top 80%",
              end: "center 50%",
              scrub: 1
            }
          }
        );
      }

      /* ======================================================================
         4. GUIDING SCROLL BEACON LIGHT (VISIBLE ON ALL SECTIONS WITH INERTIA)
         ====================================================================== */
      const beacon = document.getElementById('scrollBeaconLight');
      if (beacon) {
        // Vertical fluid travel across the entire document scroll, ALWAYS visible on all sections
        gsap.fromTo(beacon,
          { y: window.innerHeight * 0.16, xPercent: -50, scale: 0.9, opacity: 1 },
          {
            y: window.innerHeight * 0.84,
            xPercent: -50,
            scale: 1.25,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              scrub: 1.4 // Silky fluid inertia lag
            }
          }
        );

        // Continuous color shifts as the beacon travels through every section
        const beaconSectionStages = [
          { selector: '.hero', glow1: 'rgba(255, 180, 0, 0.85)', glow2: 'rgba(255, 94, 0, 0.5)', glow3: 'rgba(255, 230, 0, 0.25)' },
          { selector: '.dual-engine-section', glow1: 'rgba(0, 240, 255, 0.85)', glow2: 'rgba(11, 99, 246, 0.5)', glow3: 'rgba(0, 200, 255, 0.25)' },
          { selector: '.job-board-section', glow1: 'rgba(255, 230, 0, 0.9)', glow2: 'rgba(255, 140, 0, 0.5)', glow3: 'rgba(255, 230, 0, 0.25)' },
          { selector: '.video-showcase-section', glow1: 'rgba(255, 140, 0, 0.9)', glow2: 'rgba(255, 94, 0, 0.55)', glow3: 'rgba(11, 99, 246, 0.25)' },
          { selector: '.programs-bento-section', glow1: 'rgba(0, 240, 255, 0.85)', glow2: 'rgba(11, 99, 246, 0.5)', glow3: 'rgba(255, 94, 0, 0.25)' },
          { selector: '.founder-story-section', glow1: 'rgba(255, 140, 0, 0.9)', glow2: 'rgba(234, 88, 12, 0.6)', glow3: 'rgba(255, 230, 0, 0.25)' },
          { selector: '.impact-section', glow1: 'rgba(255, 215, 0, 0.95)', glow2: 'rgba(255, 160, 0, 0.5)', glow3: 'rgba(255, 230, 0, 0.25)' },
          { selector: '.audience-cta-strip', glow1: 'rgba(255, 140, 0, 0.95)', glow2: 'rgba(255, 94, 0, 0.55)', glow3: 'rgba(0, 240, 255, 0.25)' }
        ];

        beaconSectionStages.forEach(st => {
          const el = document.querySelector(st.selector);
          if (el) {
            ScrollTrigger.create({
              trigger: el,
              start: "top 60%",
              end: "bottom 40%",
              onEnter: () => {
                beacon.style.setProperty('--beacon-glow-1', st.glow1);
                beacon.style.setProperty('--beacon-glow-2', st.glow2);
                beacon.style.setProperty('--beacon-glow-3', st.glow3);
              },
              onEnterBack: () => {
                beacon.style.setProperty('--beacon-glow-1', st.glow1);
                beacon.style.setProperty('--beacon-glow-2', st.glow2);
                beacon.style.setProperty('--beacon-glow-3', st.glow3);
              }
            });
          }
        });
      }

      /* ======================================================================
         5. SCROLL-FOLLOWING BACKDROP AMBIENT LIGHT (FOLLOWS SCROLL ON ALL PAGES)
         ====================================================================== */
      const backdropLight = document.getElementById('scrollBackdropGlow');
      if (backdropLight) {
        // Determine hero title center position so light aligns seamlessly at scroll = 0
        const heroTitle = document.querySelector('.page-hero .display-title, .hero-headline, .section-sm .display-title');
        let initialTop = 150;
        if (heroTitle) {
          const rect = heroTitle.getBoundingClientRect();
          initialTop = Math.round(rect.top + (rect.height * 0.45));
        }

        // Set initial starting coordinates centered behind title
        gsap.set(backdropLight, { y: initialTop, xPercent: -50, scale: 1 });

        // Physics-driven quickTo setters (hardware accelerated)
        const quickY = gsap.quickTo(backdropLight, "y", { duration: 0.85, ease: "power2.out" });
        const quickScale = gsap.quickTo(backdropLight, "scale", { duration: 0.55, ease: "power2.out" });

        let lastScrollY = window.scrollY;
        let isTicking = false;

        const handleScrollLight = () => {
          const scrollY = window.scrollY;
          const vh = window.innerHeight;
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
          const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

          let targetY;
          if (scrollY < 260) {
            // Smoothly glide from hero title down into viewport center as scroll starts
            const t = scrollY / 260;
            targetY = gsap.utils.interpolate(initialTop, vh * 0.44, t);
          } else {
            // Continues following scroll through every section with organic vertical wave
            const wave = Math.sin(progress * Math.PI * 4) * 45;
            targetY = (vh * 0.45) + wave;
          }

          // Subtle dynamic expansion during active scroll motion
          const velocity = Math.abs(scrollY - lastScrollY);
          const targetScale = gsap.utils.clamp(0.96, 1.15, 1 + (velocity * 0.0035));

          quickY(targetY);
          quickScale(targetScale);

          lastScrollY = scrollY;
          isTicking = false;
        };

        window.addEventListener('scroll', () => {
          if (!isTicking) {
            requestAnimationFrame(handleScrollLight);
            isTicking = true;
          }
        }, { passive: true });

        // Section-by-section dynamic temperature shifts as the light travels down
        const pageSections = document.querySelectorAll('section, footer');
        pageSections.forEach((sec, sIdx) => {
          ScrollTrigger.create({
            trigger: sec,
            start: "top 65%",
            end: "bottom 35%",
            onEnter: () => updateGlowTone(sec, sIdx),
            onEnterBack: () => updateGlowTone(sec, sIdx)
          });
        });

        function updateGlowTone(sec, sIdx) {
          if (sec.classList.contains('section-surface') || sec.id === 'founderBioSection') {
            // High-intensity warm radiant hearth glow that easily shines through surface sections
            backdropLight.style.setProperty('--backdrop-glow-core', 'rgba(255, 125, 0, 0.36)');
            backdropLight.style.setProperty('--backdrop-glow-mid', 'rgba(255, 175, 0, 0.18)');
            backdropLight.style.setProperty('--backdrop-glow-outer', 'rgba(255, 94, 0, 0.08)');
          } else if (sec.classList.contains('impact-section') || sec.id === 'students' || sec.classList.contains('impact-dashboard-grid')) {
            // Radiant Gold
            backdropLight.style.setProperty('--backdrop-glow-core', 'rgba(255, 195, 0, 0.30)');
            backdropLight.style.setProperty('--backdrop-glow-mid', 'rgba(255, 145, 0, 0.15)');
            backdropLight.style.setProperty('--backdrop-glow-outer', 'rgba(255, 94, 0, 0.05)');
          } else if (sec.classList.contains('dual-engine-section') || sec.classList.contains('programs-bento-section') || sec.id === 'contractors') {
            // Electric Cyan Amber
            backdropLight.style.setProperty('--backdrop-glow-core', 'rgba(255, 135, 0, 0.28)');
            backdropLight.style.setProperty('--backdrop-glow-mid', 'rgba(0, 220, 255, 0.09)');
            backdropLight.style.setProperty('--backdrop-glow-outer', 'rgba(255, 94, 0, 0.05)');
          } else if (sec.classList.contains('founder-story-section') || sec.classList.contains('video-showcase-section')) {
            // Deep Cinematic Hearth
            backdropLight.style.setProperty('--backdrop-glow-core', 'rgba(255, 95, 0, 0.32)');
            backdropLight.style.setProperty('--backdrop-glow-mid', 'rgba(234, 88, 12, 0.18)');
            backdropLight.style.setProperty('--backdrop-glow-outer', 'rgba(255, 94, 0, 0.06)');
          } else {
            // Signature Rochester Amber
            backdropLight.style.setProperty('--backdrop-glow-core', 'rgba(255, 115, 0, 0.28)');
            backdropLight.style.setProperty('--backdrop-glow-mid', 'rgba(255, 175, 0, 0.14)');
            backdropLight.style.setProperty('--backdrop-glow-outer', 'rgba(255, 94, 0, 0.05)');
          }
        }

        // Run once on load
        handleScrollLight();
      }

      /* ======================================================================
         6. SCROLL-DRIVEN BACKGROUND DARKENING & COLOR TRANSITIONS
         ====================================================================== */
      document.querySelectorAll('.section-surface').forEach((sec) => {
        // Dynamically darkens background and enriches border tones as user scrolls through
        gsap.fromTo(sec,
          { 
            backgroundColor: "rgba(18, 25, 38, 0.52)",
            borderTopColor: "rgba(255, 255, 255, 0.08)",
            borderBottomColor: "rgba(255, 255, 255, 0.08)"
          },
          {
            backgroundColor: "rgba(5, 7, 11, 0.90)",
            borderTopColor: "rgba(255, 115, 0, 0.30)",
            borderBottomColor: "rgba(255, 115, 0, 0.22)",
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top 72%",
              end: "bottom 28%",
              scrub: 1.2
            }
          }
        );
      });
    });

    return () => ctx.revert();
  });

  // Refresh ScrollTrigger after resources finish loading
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 400);
}

/**
 * Mobile Navigation Toggle & Drawer Controller
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    // If mobile CTA buttons don't exist inside nav-menu, create them
    if (!navMenu.querySelector('.mobile-nav-cta')) {
      const ctaDiv = document.createElement('div');
      ctaDiv.className = 'mobile-nav-cta';
      ctaDiv.innerHTML = `
        <button class="btn btn-outline-amber btn-lg" data-open-modal="studentApplyModal" style="width: 100%; justify-content: center;">Student Apply</button>
        <a href="careers.html" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center;">Teach A Trade (Hiring)</a>
      `;
      navMenu.appendChild(ctaDiv);

      // Re-attach modal trigger for the newly added student apply button
      const newModalBtn = ctaDiv.querySelector('[data-open-modal]');
      if (newModalBtn) {
        newModalBtn.addEventListener('click', (e) => {
          e.preventDefault();
          closeMenu();
          const modalId = newModalBtn.getAttribute('data-open-modal');
          const modal = document.getElementById(modalId);
          if (modal) {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
          }
        });
      }
    }

    function openMenu() {
      navMenu.classList.add('open');
      toggleBtn.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when clicking nav links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1120 && navMenu.classList.contains('open')) {
        closeMenu();
      }
    }, { passive: true });
  }
}

/**
 * Sticky Header Scroll State
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * Interactive Modals (Student Application, Job Apply, Donation)
 */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn, [data-close-modal]');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(targetModalId);
      if (targetModal) {
        openModal(targetModal);
      }
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeModal = btn.closest('.modal-overlay');
      if (activeModal) {
        closeModal(activeModal);
      }
    });
  });

  // Close modal when clicking outside of window
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
      const drawer = document.querySelector('.drawer-overlay.open');
      if (drawer) closeDrawer(drawer);
    }
  });

  // Intercept standard form submissions with simulated interactive success feedback
  document.querySelectorAll('.interactive-submit-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `Submitting...`;
      submitBtn.disabled = true;

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align: center; padding: 40px 10px;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(255, 94, 0, 0.15); border: 2px solid var(--accent-amber); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; color: var(--accent-amber); font-size: 24px;">✓</div>
            <h3 style="font-family: var(--font-display); font-size: 2rem; color: #FFF; margin-bottom: 8px;">APPLICATION RECEIVED</h3>
            <p style="color: var(--text-secondary); max-width: 440px; margin: 0 auto 24px;">Thank you for stepping up with Operation GO! Our admissions & talent team in Rochester, NY will review your submission and contact you within 2 business days.</p>
            <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').classList.remove('open')">Close Window</button>
          </div>
        `;
      }, 1000);
    });
  });
}

function openModal(modalEl) {
  modalEl.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  modalEl.classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Interactive Job Board Filter & Job Detail Drawer
 */
const jobDatabase = {
  'detention-carpentry': {
    title: 'Construction Teacher — Children’s Detention Center',
    department: 'Trades & Secure Youth Facility Division',
    type: 'Immediate Defined Contract (40 Hours)',
    compensation: '$100.00 / hr ($4,000 Flat)',
    location: 'Rochester Children’s Detention Center, Rochester, NY',
    hours: '40 Hours Total (Flexible Scheduling Around Afterschool)',
    description: 'Operation GO is urgently seeking an experienced tradesperson or carpenter to lead a hands-on construction block for youth inside the Monroe County Children’s Detention Center. This is a defined, temporary assignment paying $4,000 for 40 hours ($100/hr) with immediate start and high potential for recurring year-round contracts with Operation GO.',
    responsibilities: [
      'Teach the fundamentals: Deliver hands-on lessons in framing, measuring, tool use, and woodwork finishing to a small group of motivated students.',
      'Run a safe shop: Set the tone on personal protective equipment (PPE), tool handling, and jobsite safety habits in a secure institutional setting.',
      'Show them the career: Talk honestly with students about apprenticeships, wages, and what a life in the trades actually looks like.',
      'Maintain calm, firm shop presence with dedicated on-site Operation GO staff support.'
    ],
    requirements: [
      'Real field experience in construction, carpentry, or a skilled trade (No teaching license required).',
      'Comfortable working with troubled or justice-involved youth.',
      'Patience and steady leadership in a secure facility setting.',
      'Able to start immediately and commit to the full 40 hours.',
      'Clears standard New York State background check.'
    ],
    externalApplyUrl: 'https://link.fostio.com/widget/form/VYgyRcgrcGFfWr5uoKNy'
  },
  'lead-carpentry': {
    title: 'Lead Construction & Carpentry Instructor',
    department: 'Vocational Trades Division',
    type: 'Full-Time / W2 or 1099 Contract',
    compensation: '$45 – $65 / hr',
    location: 'Rochester, NY (On-Site Vocational Lab & Community Build Sites)',
    hours: '25 – 35 hrs/week (Day & Afterschool Blocks)',
    description: 'We are seeking a master tradesperson or seasoned carpentry professional passionate about training Rochester youth ages 12–18. You will lead practical, hands-on framing, tool safety, blueprint reading, and structural woodwork exercises, mentoring young people toward direct apprenticeships.',
    responsibilities: [
      'Deliver hands-on instruction in OSHA-10 safety, hand/power tool mastery, and wood framing structures.',
      'Supervise build projects for the Summer Youth Employment Culminating Showcase.',
      'Foster a culture of professional discipline, craftsmanship pride, and job-site dignity.',
      'Maintain shop safety protocols and tool inventory.'
    ],
    requirements: [
      '5+ years demonstrable field experience in carpentry, residential framing, or general construction.',
      'Ability to pass mandatory New York State background checks and vetting for youth-serving facilities.',
      'Patience, strong communication skills, and commitment to youth mentorship.',
      'OSHA-30 or prior vocational training experience is a strong plus.'
    ]
  },
  'electrical-mentor': {
    title: 'Electrical & Hand Tools Mentor',
    department: 'Vocational Trades Division',
    type: 'Part-Time Contract',
    compensation: '$40 – $55 / hr',
    location: 'Rochester, NY (Training Hub)',
    hours: '15 – 20 hrs/week (Afterschool)',
    description: 'Guide youth through basic residential wiring, circuit theory, electrical safety, switch & outlet installation, and multimeter diagnostic basics in our structured workshop.',
    responsibilities: [
      'Teach foundational electrical fundamentals and safe wiring techniques.',
      'Supervise hands-on demo boards and test installations.',
      'Provide 1-on-1 coaching and career pathway advice.'
    ],
    requirements: [
      'Journey-level or master electrician experience.',
      'Clear NYS youth background check.',
      'Passion for opening doors for underrepresented young tradespeople.'
    ]
  },
  'summer-superintendent': {
    title: 'Summer Showcase Project Superintendent',
    department: 'Summer Youth Employment Program',
    type: 'Seasonal Full-Time (June – August)',
    compensation: '$1,800 – $2,200 / week',
    location: 'Rochester, NY (Multiple City Build Sites)',
    hours: '40 hrs/week',
    description: 'Direct our hallmark Summer Youth Employment Program build projects that culminate in the city-wide public showcase event. Manage student crews, coordinate materials, and collaborate with city inspectors.',
    responsibilities: [
      'Direct on-site student construction crews building community gazebos and park structures.',
      'Coordinate material delivery and safety enforcement on active sites.',
      'Lead student presentation preparation for the public graduation showcase.'
    ],
    requirements: [
      'Proven general contracting or site superintendent leadership.',
      'Valid NYS driver license and clear background check.',
      'Prior youth development experience preferred.'
    ]
  },
  'sneaker-instructor': {
    title: 'Sneaker Lab & Apparel Production Lead',
    department: 'Creative & Manufacturing Track',
    type: 'Part-Time',
    compensation: '$35 – $48 / hr',
    location: 'Rochester, NY (Design Studio)',
    hours: '12 – 18 hrs/week',
    description: 'Lead our innovative Sneaker Production & Apparel Lab. Teach students footwear reconstruction, pattern cutting, sewing machine operation, screenprinting, and urban streetwear brand building.',
    responsibilities: [
      'Instruct youth in deconstruction, stitching, dyeing, and custom shoe construction.',
      'Guide students in drafting manufacturing specs and merchandise branding.',
      'Prepare student designs for pop-up showcase exhibitions.'
    ],
    requirements: [
      'Demonstrated portfolio in industrial sewing, cordwaining, or apparel design.',
      'Clear youth background check clearance.'
    ]
  },
  'media-specialist': {
    title: 'Video Production & Media Lab Director',
    department: 'Digital Media & Storytelling',
    type: 'Part-Time / Contract',
    compensation: '$35 – $50 / hr',
    location: 'Rochester, NY',
    hours: '15 – 20 hrs/week',
    description: 'Instruct youth on cinema camera operation, lighting, audio capture, and Premiere/DaVinci video editing, documenting Operation GO student builds and community narratives.',
    responsibilities: [
      'Train students in documentary storytelling and technical camera operation.',
      'Oversee video coverage of Summer Showcase and press media releases.',
      'Manage studio cameras, audio gear, and editing suites.'
    ],
    requirements: [
      'Professional videography/editing background with commercial portfolio.',
      'NYS youth vetting clearance.'
    ]
  }
};

function initJobBoard() {
  const filterBtns = document.querySelectorAll('.job-filter-btn');
  const jobCards = document.querySelectorAll('.job-row-card');
  const drawerOverlay = document.getElementById('jobDrawerOverlay');
  const drawerContent = document.getElementById('jobDrawerContent');
  const closeDrawerBtn = document.getElementById('closeJobDrawer');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      jobCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.style.display = 'grid';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open Drawer on Job Card Click
  jobCards.forEach(card => {
    card.addEventListener('click', () => {
      const jobId = card.getAttribute('data-job-id');
      const jobData = jobDatabase[jobId];

      if (jobData && drawerOverlay && drawerContent) {
        renderJobDrawer(jobData, jobId);
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeDrawerBtn && drawerOverlay) {
    closeDrawerBtn.addEventListener('click', () => closeDrawer(drawerOverlay));
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeDrawer(drawerOverlay);
    });
  }
}

function renderJobDrawer(job, jobId) {
  const drawerContent = document.getElementById('jobDrawerContent');
  if (!drawerContent) return;

  drawerContent.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div class="mono-tag" style="align-self: flex-start;">
        <span class="tag-dot"></span> [ ACTIVE OPENING: ${job.type} ]
      </div>
      
      <h2 style="font-family: var(--font-display); font-size: 2.4rem; color: #FFF; line-height: 1;">${job.title}</h2>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; padding: 18px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.82rem;">
        <div><strong style="color: var(--text-muted); display: block;">COMPENSATION:</strong> <span style="color: var(--accent-amber); font-weight: 700;">${job.compensation}</span></div>
        <div><strong style="color: var(--text-muted); display: block;">HOURS:</strong> ${job.hours}</div>
        <div><strong style="color: var(--text-muted); display: block;">LOCATION:</strong> ${job.location}</div>
        <div><strong style="color: var(--text-muted); display: block;">CLEARANCE:</strong> NYS Youth Vetted</div>
      </div>

      <div>
        <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: #FFF; margin-bottom: 8px;">Role Overview</h4>
        <p style="color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem;">${job.description}</p>
      </div>

      <div>
        <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: #FFF; margin-bottom: 8px;">Key Responsibilities</h4>
        <ul style="display: flex; flex-direction: column; gap: 8px; color: var(--text-secondary); font-size: 0.92rem;">
          ${job.responsibilities.map(r => `<li style="display: flex; gap: 10px;"><span style="color: var(--accent-amber);">▸</span> ${r}</li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 style="font-family: var(--font-heading); font-size: 1.1rem; color: #FFF; margin-bottom: 8px;">Candidate Requirements</h4>
        <ul style="display: flex; flex-direction: column; gap: 8px; color: var(--text-secondary); font-size: 0.92rem;">
          ${job.requirements.map(req => `<li style="display: flex; gap: 10px;"><span style="color: var(--accent-cyan);">✓</span> ${req}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-top: 10px; padding-top: 24px; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 12px;">
        ${job.externalApplyUrl ? `
          <a href="${job.externalApplyUrl}" target="_blank" rel="noopener" class="btn btn-primary" style="background: #FFE600; color: #080B10; font-weight: 800; font-size: 1.05rem; text-align: center; justify-content: center; box-shadow: 0 4px 20px rgba(255, 230, 0, 0.4); text-decoration: none;">
            ⚡ Apply Via Direct Form (Instant Review) →
          </a>
        ` : ''}
        <div style="display: flex; gap: 12px;">
          <button class="btn ${job.externalApplyUrl ? 'btn-secondary' : 'btn-primary'}" onclick="openApplyModalWithJob('${job.title}')" style="flex: 1;">${job.externalApplyUrl ? 'Fast Apply (Standard Portal)' : 'Apply For This Position'}</button>
          <button class="btn btn-secondary" onclick="document.getElementById('jobDrawerOverlay').classList.remove('open'); document.body.style.overflow = '';">Back to Board</button>
        </div>
      </div>
    </div>
  `;
}

function closeDrawer(drawerOverlay) {
  drawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

window.openApplyModalWithJob = function(jobTitle) {
  const drawerOverlay = document.getElementById('jobDrawerOverlay');
  if (drawerOverlay) closeDrawer(drawerOverlay);

  const instructorModal = document.getElementById('instructorApplyModal');
  if (instructorModal) {
    const jobInput = instructorModal.querySelector('input[name="preferred_role"]');
    if (jobInput) jobInput.value = jobTitle;
    openModal(instructorModal);
  } else {
    window.location.href = 'careers.html';
  }
};

/**
 * Animated Numbers / Impact Counters
 */
function initImpactCounters() {
  const statNumbers = document.querySelectorAll('[data-target-count]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target-count'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;

        let start = 0;
        const duration = 2000;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            el.textContent = prefix + (isDecimal ? target.toFixed(1) : Math.floor(target)) + suffix;
            clearInterval(timer);
          } else {
            el.textContent = prefix + (isDecimal ? start.toFixed(1) : Math.floor(start)) + suffix;
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));
}

/**
 * Donation & Sponsorship Interactive Calculator
 */
function initDonationCalculator() {
  const donateButtons = document.querySelectorAll('.donate-preset-btn');
  const customAmountInput = document.getElementById('customDonateAmount');
  const impactSummaryText = document.getElementById('donationImpactSummary');

  const impactTiers = {
    50: "Funds 1 set of certified OSHA steel-toe boots & safety PPE for a new student trainee.",
    150: "Provides an apprentice-grade personal hand tool kit (tape measure, hammer, speed square, level).",
    350: "Covers OSHA-10 and industry-recognized tool safety certification fees for 3 students.",
    750: "Sponsors 1 full student stipend for 3 weeks in the Summer Youth Employment program.",
    1500: "Funds raw framing materials and architectural lumber for an entire student showcase build."
  };

  if (donateButtons.length && impactSummaryText) {
    donateButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        donateButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const amount = parseInt(btn.getAttribute('data-amount'));
        if (customAmountInput) customAmountInput.value = amount;

        if (impactTiers[amount]) {
          impactSummaryText.innerHTML = `<strong>Impact:</strong> ${impactTiers[amount]}`;
        } else {
          impactSummaryText.innerHTML = `<strong>Impact:</strong> Every dollar directly finances youth stipends, certified tool kits, and master contractor mentorship in Rochester.`;
        }
      });
    });

    if (customAmountInput) {
      customAmountInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        donateButtons.forEach(b => b.classList.remove('active'));
        if (impactTiers[val]) {
          impactSummaryText.innerHTML = `<strong>Impact:</strong> ${impactTiers[val]}`;
        } else if (val > 0) {
          impactSummaryText.innerHTML = `<strong>Impact:</strong> Every dollar directly finances youth stipends, certified tool kits, and master contractor mentorship in Rochester.`;
        }
      });
    }
  }
}

/**
 * Dual Theme Toggle (Sleek Dark Foundry vs Calm High-Contrast Light)
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      const label = toggleBtn.querySelector('.theme-toggle-label');
      if (label) label.textContent = 'Dark';
      toggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      const label = toggleBtn.querySelector('.theme-toggle-label');
      if (label) label.textContent = 'Light';
      toggleBtn.setAttribute('title', 'Switch to Calm Light Mode');
    }
  }

  // Read current theme state
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyLight = document.documentElement.getAttribute('data-theme') === 'light';
    const nextTheme = isCurrentlyLight ? 'dark' : 'light';
    localStorage.setItem('opgo_theme', nextTheme);
    applyTheme(nextTheme);
  });
}

/**
 * Hero Background Video Dynamic Fit
 * Dynamically computes 16:9 aspect ratio to guarantee complete coverage
 * without letterbox black bars or header-junction gaps on any viewport.
 */
function initHeroVideoFit() {
  const backdrop = document.querySelector('.hero-backdrop');
  const wrapper = document.querySelector('.hero-video-wrapper');
  if (!backdrop || !wrapper) return;

  function fitVideo() {
    const bw = backdrop.offsetWidth;
    const bh = backdrop.offsetHeight;
    if (!bw || !bh) return;

    const ratio = 16 / 9;
    let w = bw;
    let h = bw / ratio;

    if (h < bh) {
      h = bh;
      w = bh * ratio;
    }

    // 25% overscan cushion to guarantee complete coverage & conceal YouTube black letterbox bars
    w = Math.ceil(w * 1.25);
    h = Math.ceil(h * 1.25);

    wrapper.style.width = `${w}px`;
    wrapper.style.height = `${h}px`;
  }

  fitVideo();
  window.addEventListener('resize', fitVideo, { passive: true });
  window.addEventListener('orientationchange', fitVideo, { passive: true });
}

/**
 * Interactive Ambient Mouse Spotlight
 * Tracks cursor position relative to cards to cast dynamic glowing highlights
 */
function initAmbientMouseSpotlight() {
  const cards = document.querySelectorAll('.dual-card, .bento-card, .job-row-card, .audience-pillar-card, .hero-glass-hub');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

