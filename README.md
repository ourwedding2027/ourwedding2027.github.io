# Simple Wedding Website

A beautiful, accessible, and performant static wedding website with bilingual support (EN/HU).

## What you get

- One editable homepage: [index.html](index.html)
- One stylesheet entrypoint: [styles.css](styles.css)
- Section-based CSS files in [styles/](styles/)
- One JavaScript entrypoint: [app.js](app.js)
- Feature modules in [js/](js/)
- EN/HU language switch in the page
- RSVP form that opens Gmail via `mailto:`
- Added sections inspired by the landing project: Venue, Stay, and Itinerary
- Progressive Web App (PWA) support with manifest.json
- Optimized performance with lazy loading images
- SEO-optimized with Open Graph and Twitter Card meta tags
- Accessibility features including skip navigation
- Security headers configuration

## CSS structure

`styles.css` now imports smaller files in this order:

- [styles/01-base.css](styles/01-base.css): tokens, theme values, global resets/body
- [styles/02-layout.css](styles/02-layout.css): header, nav, hero, generic section layout
- [styles/03-core-sections.css](styles/03-core-sections.css): countdown, venue hero, shared grids/cards
- [styles/04-timeline.css](styles/04-timeline.css): timeline section styles
- [styles/05-registry-reception-travel.css](styles/05-registry-reception-travel.css): travel styles
- [styles/06-faq.css](styles/06-faq.css): FAQ section styles
- [styles/07-rsvp.css](styles/07-rsvp.css): RSVP section styles
- [styles/08-responsive.css](styles/08-responsive.css): mobile overrides (`@media (max-width: 700px)`)

## Edit your Gmail RSVP destination

Open [js/config.js](js/config.js) and set:

```js
export const RSVP_GMAIL = "yourweddingrsvp@gmail.com";
```

Replace with your real Gmail address.

## JavaScript structure

`app.js` initializes the app and imports feature modules:

- [js/config.js](js/config.js): app constants (`RSVP_GMAIL`, `WEDDING_DATE_ISO`, default language)
- [js/translations.js](js/translations.js): EN/HU translation content
- [js/i18n.js](js/i18n.js): language switching + translation helpers
- [js/features/languageSwitch.js](js/features/languageSwitch.js): EN/HU toggle button events
- [js/features/rsvpChoices.js](js/features/rsvpChoices.js): attendance card selection state
- [js/features/faqAccordion.js](js/features/faqAccordion.js): FAQ expand/collapse behavior
- [js/features/countdown.js](js/features/countdown.js): countdown timer updates
- [js/features/rsvpForm.js](js/features/rsvpForm.js): RSVP validation and `mailto:` submission

## How to preview

Option 1 (fastest):
- Open [index.html](index.html) directly in your browser.

Option 2 (local server, recommended):

```bash
python -m http.server 8080
```

Then open:
- http://localhost:8080/

## Check external website links

With an internet connection, run `npm run test:links` to check external links and embedded map URLs in [index.html](index.html).

## How RSVP works

- Guest fills the form.
- Clicking "Send RSVP via Gmail" opens an email draft to your Gmail address.
- The draft includes guest name, email, attendance, and message.

## Setup Checklist

Before going live, complete these steps:

1. **Configure Email**: Update `RSVP_GMAIL` in [`js/config.js`](js/config.js) with your real Gmail address
2. **Create Icons**: Follow [`ICONS-README.md`](ICONS-README.md) to create favicon and touch icons
3. **Update URLs**: In [`index.html`](index.html), replace `https://yourweddingsite.com/` with your actual domain in Open Graph meta tags
4. **Test Forms**: Verify the RSVP mailto functionality works with your email client
5. **Optimize Images**: Consider compressing images in the `assets/` folder (30MB total - recommended to reduce to <10MB)
6. **Check Dates**: Verify `WEDDING_DATE_ISO` in [`js/config.js`](js/config.js) is correct

## Performance Features

- **Lazy Loading**: All below-the-fold images load on demand
- **Font Optimization**: Google Fonts preconnected and loaded with `display=swap`
- **Caching**: `.htaccess` includes browser caching rules (for Apache servers)
- **PWA Ready**: Installable as a mobile app via `manifest.json`
- **Skip Navigation**: Keyboard-accessible skip-to-content link for screen readers

## SEO & Social Sharing

The site includes comprehensive meta tags for:
- Search engine optimization
- Facebook/Open Graph preview cards
- Twitter Card previews
- Mobile theme color

## Accessibility

- ARIA labels on navigation and interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatible
- 91+ ARIA attributes throughout

## Security

`.htaccess` file includes headers for:
- Clickjacking protection (X-Frame-Options)
- MIME sniffing prevention
- XSS protection
- Content Security Policy
- GZIP compression
- Browser caching

## Notes

- No backend, database, or admin panel
- Pure static HTML/CSS/JS - works on any web host
- No build step required (though you can add one for optimization)
