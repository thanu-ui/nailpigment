# Nail Pigment — Multi-page website

A responsive static website for Nail Pigment, styled with Rose Pink (`#E75480`) and Blush White (`#FFF5F7`), Playfair Display headings and Poppins body text.

## Pages
- `index.html` — Home Classic
- `home-premium.html` — Home Premium, including the existing interactive SVG nail customizer and premium inspiration sections
- `about.html` — story, mission, vision, values, nail-art philosophy, why choose us, team placeholder and appointment CTA
- `services.html` — manicure, gel extensions, nail art, care/repair, add-ons, pricing/duration placeholders and FAQs
- `gallery.html` — category filters, image gallery, featured inspiration and request-this-look links
- `contact.html` — appointment request form, contact/hour/location placeholders, policy notes and FAQs

## Shared features
- Header/footer injected from `js/site.js`
- Sticky navigation and Home Classic/Home Premium dropdown
- Dark/light mode and RTL/LTR layout toggles
- Responsive layouts and SVG interface icons
- Gallery filters and booking-form prefill from service/gallery links
- Home Premium customizer and previous interactive controls are retained

## Run locally
Open `index.html` or `home-premium.html` in a browser. For best behavior, use a local static server such as VS Code Live Server.

## Before publishing
- Replace all contact, address, hours, official social links and team placeholders with verified information.
- Confirm prices, service availability and durations before adding them to the service menu.
- The appointment form currently validates in the browser and displays demo feedback only. Connect it to a secure backend or booking provider to receive/store requests.
- Gallery images are remote Unsplash inspiration examples, not a verified portfolio. Replace them with licensed studio photos as appropriate.
- Google Fonts and gallery photos require an internet connection.
