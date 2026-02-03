# HealthWise - GA4 Tracking Practice Project

A complete, modern health blog and booking service website designed to practice Google Analytics 4 (GA4) event tracking and measurement.

## 📋 Project Overview

This project is a fully functional multi-page website that demonstrates various GA4 tracking implementations including:

- Button click tracking
- Form submission tracking
- Scroll depth monitoring
- Outbound link tracking
- User engagement metrics

## 🗂️ Project Structure

```
GA4/
├── index.html              # Homepage with hero section and CTA
├── articles.html           # Articles listing page
├── article-diabetes.html   # Detailed article with share buttons
├── booking.html            # Consultation booking form
├── about.html              # About page with team information
├── styles.css              # Modern, responsive CSS styling
├── ga4-tracking.js         # GA4 initialization and custom event tracking
└── README.md               # This file
```

## 🎯 Features

### Pages

1. **Homepage (index.html)**
   - Hero section with call-to-action
   - Features grid
   - Latest articles preview
   - CTA section with booking link

2. **Articles Page (articles.html)**
   - Article grid with filters
   - Newsletter signup form
   - Featured article section

3. **Article Detail Page (article-diabetes.html)**
   - Comprehensive diabetes article
   - Share buttons (Facebook, Twitter, LinkedIn, Email)
   - Read more/show less functionality
   - Sidebar with resources
   - Related articles

4. **Booking Page (booking.html)**
   - Consultation booking form
   - Multiple service type options
   - Form validation
   - Success message display

5. **About Page (about.html)**
   - Team information
   - Mission and values
   - Statistics and credentials
   - Download CV/team information button

### GA4 Tracking Features

The `ga4-tracking.js` file implements comprehensive tracking for:

1. **Button Click Tracking**
   - "Download Health Guide" buttons
   - "Book Consultation" CTA buttons
   - Share buttons on articles

2. **Form Submission Tracking**
   - Booking form submissions
   - Newsletter signups
   - Lead generation events

3. **Scroll Depth Tracking**
   - Tracks scroll milestones (25%, 50%, 75%, 90%, 100%)
   - Tracks when users reach the end of articles
   - Monitors time on page

4. **Outbound Link Tracking**
   - Social media links (Facebook, Twitter, Instagram)
   - External resource links
   - Captures link text and destination

5. **Engagement Tracking**
   - Time on page
   - Page exit events
   - User engagement metrics

## 🚀 Setup Instructions

### Step 1: Replace GA4 Measurement ID

1. Open `ga4-tracking.js`
2. Find the configuration section at the top:
   ```javascript
   const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';
   ```
3. Replace `'G-XXXXXXXXXX'` with your actual GA4 Measurement ID

**How to find your GA4 Measurement ID:**
- Go to [Google Analytics](https://analytics.google.com/)
- Select your property
- Navigate to **Admin** > **Data Streams**
- Click on your web data stream
- Copy the **Measurement ID** (format: G-XXXXXXXXXX)

### Step 2: Host the Website

You can host this website using:

1. **Local Server (for testing):**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

2. **GitHub Pages:**
   - Push this project to a GitHub repository
   - Enable GitHub Pages in repository settings
   - Access via `https://yourusername.github.io/repository-name/`

3. **Other hosting options:**
   - Netlify (drag and drop)
   - Vercel
   - Firebase Hosting
   - Any web hosting service

### Step 3: Enable Debug Mode

For testing, debug mode is enabled by default in `ga4-tracking.js`:

```javascript
gtag('config', GA4_MEASUREMENT_ID, {
    'send_page_view': true,
    'debug_mode': true // Set to false in production
});
```

**For production:** Change `debug_mode: true` to `debug_mode: false`

## 🧪 Testing with GA4 DebugView

### Accessing DebugView

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your GA4 property
3. Navigate to **Configure** > **DebugView**

### Testing Events

With debug mode enabled, you can see events in real-time:

1. **Test Button Clicks:**
   - Click "Download Health Guide" button
   - Click "Book Consultation" CTA buttons
   - Look for `button_click` and `cta_click` events in DebugView

2. **Test Form Submissions:**
   - Fill out the booking form on `booking.html`
   - Submit the form
   - Look for `form_submit` and `generate_lead` events

3. **Test Scroll Depth:**
   - Open `article-diabetes.html`
   - Scroll down the article
   - Look for `scroll_depth` events at 25%, 50%, 75%, 90%, 100%
   - Scroll to the bottom for `article_read_complete` event

4. **Test Outbound Links:**
   - Click social media links in the footer
   - Look for `click` and `social_link_click` events

5. **Test Share Buttons:**
   - On `article-diabetes.html`, click share buttons
   - Look for `share` events with platform information

### Understanding Event Parameters

Each event includes relevant parameters:

**Button Click Event:**
```javascript
{
  button_name: 'download_health_guide',
  button_text: 'Download Health Guide',
  button_location: 'hero_section',
  page_path: '/index.html'
}
```

**Form Submit Event:**
```javascript
{
  form_name: 'booking_consultation',
  form_id: 'bookingForm',
  service_type: 'diabetes-management',
  page_path: '/booking.html'
}
```

**Scroll Depth Event:**
```javascript
{
  percent_scrolled: 75,
  page_path: '/article-diabetes.html',
  article_title: 'Understanding Diabetes...'
}
```

**Social Link Click Event:**
```javascript
{
  platform: 'facebook',
  link_location: 'footer',
  page_path: '/index.html'
}
```

## 📊 Custom Events Reference

### Events Tracked

| Event Name | Trigger | Key Parameters |
|------------|---------|----------------|
| `button_click` | Download Health Guide clicked | button_name, button_location |
| `cta_click` | Call-to-action button clicked | button_text, target_url |
| `share` | Article share button clicked | method, content_type, article_title |
| `form_submit` | Booking form submitted | form_name, service_type |
| `generate_lead` | Lead generated from form | form_type, service_type |
| `newsletter_signup` | Newsletter form submitted | form_name |
| `scroll_depth` | User scrolls to milestone | percent_scrolled, article_title |
| `article_read_complete` | User reaches article end | article_title, time_on_page |
| `click` | Outbound link clicked | link_domain, link_url, outbound |
| `social_link_click` | Social media link clicked | platform, link_location |
| `user_engagement` | User engaged for 10+ seconds | engagement_time_msec |
| `page_exit` | User leaves page | time_on_page_seconds |

## 🔧 Customization

### Adding New Events

To track additional events, use the `trackEvent` function:

```javascript
trackEvent('custom_event_name', {
    'parameter1': 'value1',
    'parameter2': 'value2',
    'page_path': window.location.pathname
});
```

### Modifying Tracking

Edit `ga4-tracking.js` to:
- Add new event listeners
- Change event parameters
- Adjust scroll depth thresholds
- Customize engagement metrics

## 📱 Browser Console

Open the browser console (F12) to see:
- GA4 initialization confirmation
- Event tracking logs
- Debug information

Example console output:
```
✅ GA4 initialized with ID: G-XXXXXXXXXX
🚀 Initializing GA4 tracking...
✅ Button tracking initialized
✅ Form tracking initialized
✅ Scroll tracking initialized
✅ Outbound link tracking initialized
✅ Engagement tracking initialized
✅ All GA4 tracking initialized successfully
💡 Tip: Open GA4 DebugView to see events in real-time
```

## 🎨 Styling

The project uses modern CSS with:
- CSS Variables for easy customization
- Responsive design for all screen sizes
- Smooth transitions and animations
- Professional gradient colors
- Clean, accessible layout

To customize colors, edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... more variables */
}
```

## ✅ Best Practices

1. **Debug Mode:** Keep enabled during testing, disable in production
2. **Event Naming:** Use clear, descriptive event names
3. **Parameters:** Include relevant context in event parameters
4. **Privacy:** Don't track PII (Personally Identifiable Information)
5. **Testing:** Always test in DebugView before deploying
6. **Documentation:** Keep track of custom events and parameters

## 🐛 Troubleshooting

### Events Not Appearing in DebugView

1. **Check Measurement ID:** Ensure you've replaced the placeholder ID
2. **Debug Mode:** Verify debug mode is enabled
3. **Console Errors:** Check browser console for JavaScript errors
4. **Ad Blockers:** Disable ad blockers that may block GA4
5. **HTTPS:** Some features require HTTPS in production

### Common Issues

**Problem:** Events not firing
- **Solution:** Check browser console for errors

**Problem:** Wrong Measurement ID format
- **Solution:** Ensure format is `G-XXXXXXXXXX` (not UA-XXXXXXXXX)

**Problem:** Can't see events immediately
- **Solution:** DebugView shows events in real-time, but standard reports may take 24-48 hours

## 📚 Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/9304153)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [DebugView Documentation](https://support.google.com/analytics/answer/7201382)
- [gtag.js Developer Guide](https://developers.google.com/analytics/devguides/collection/gtagjs)

## 📝 License

This project is created for educational purposes to practice GA4 implementation.

## 🙋 Support

For issues or questions about GA4 implementation:
1. Check the [GA4 Help Center](https://support.google.com/analytics)
2. Review browser console for error messages
3. Verify all setup steps have been completed

---

**Happy Tracking! 📊**

Remember: The goal of this project is to learn GA4 event tracking. Experiment with different events, parameters, and tracking scenarios to fully understand GA4's capabilities.