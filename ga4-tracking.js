/**
 * ============================================
 * HealthWise - Google Analytics 4 Tracking
 * ============================================
 * 
 * This file initializes GA4 and tracks custom events including:
 * - Button clicks (Download CV, Download Health Guide, CTA buttons)
 * - Form submissions (Booking form)
 * - Scroll depth (Article pages)
 * - Outbound links (Social media links)
 */

// ============================================
// CONFIGURATION
// ============================================
const GA4_MEASUREMENT_ID = 'G-L55F6BLETP'; // Replace with your actual GA4 Measurement ID

// ============================================
// INITIALIZE GA4
// ============================================
(function() {
    'use strict';
    
    // Load GA4 gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    window.gtag = gtag;
    
    // Configure GA4
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
        'send_page_view': true,
        'debug_mode': true // Set to false in production
    });
    
    console.log('✅ GA4 initialized with ID:', GA4_MEASUREMENT_ID);
})();

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Send custom event to GA4
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Event parameters
 */
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
        console.log('📊 GA4 Event:', eventName, eventParams);
    } else {
        console.warn('⚠️ GA4 not initialized. Event not sent:', eventName);
    }
}

// ============================================
// 1. BUTTON CLICK TRACKING
// ============================================

/**
 * Track button clicks for specific buttons
 */
function setupButtonTracking() {
    // Track "Download Health Guide" buttons
    document.querySelectorAll('.download-guide').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonLocation = getButtonLocation(this);
            
            trackEvent('button_click', {
                'button_name': 'download_health_guide',
                'button_text': buttonText,
                'button_location': buttonLocation,
                'page_path': window.location.pathname
            });
            
            // Simulate download (in production, this would trigger actual download)
            console.log('📥 Download Health Guide clicked');
        });
    });
    
    // Track "CTA" (Call to Action) buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonLocation = getButtonLocation(this);
            const targetUrl = this.href || 'N/A';
            
            trackEvent('cta_click', {
                'button_name': 'call_to_action',
                'button_text': buttonText,
                'button_location': buttonLocation,
                'target_url': targetUrl,
                'page_path': window.location.pathname
            });
        });
    });
    
    // Track "Share" buttons on article pages
    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform') || 'unknown';
            const articleTitle = document.querySelector('.article-title')?.textContent || 'Unknown Article';
            
            trackEvent('share', {
                'method': platform,
                'content_type': 'article',
                'item_id': window.location.pathname,
                'article_title': articleTitle
            });
            
            console.log(`📤 Share button clicked: ${platform}`);
        });
    });
    
    console.log('✅ Button tracking initialized');
}

/**
 * Get button location context
 * @param {HTMLElement} button - Button element
 * @returns {string} Location description
 */
function getButtonLocation(button) {
    if (button.closest('.hero')) return 'hero_section';
    if (button.closest('.cta-section')) return 'cta_section';
    if (button.closest('.article-sidebar')) return 'article_sidebar';
    if (button.closest('.download-section')) return 'download_section';
    if (button.closest('footer')) return 'footer';
    return 'other';
}

// ============================================
// 2. FORM SUBMISSION TRACKING
// ============================================

/**
 * Track booking form submissions
 */
function setupFormTracking() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const serviceType = formData.get('serviceType') || 'not_specified';
            const email = formData.get('email') || '';
            
            // Track form submission
            trackEvent('form_submit', {
                'form_name': 'booking_consultation',
                'form_id': 'bookingForm',
                'service_type': serviceType,
                'page_path': window.location.pathname
            });
            
            // Track as conversion
            trackEvent('generate_lead', {
                'currency': 'USD',
                'value': 0,
                'form_type': 'consultation_booking',
                'service_type': serviceType
            });
            
            // Show success message
            showSuccessMessage(email);
            
            console.log('✅ Form submitted successfully');
        });
        
        console.log('✅ Form tracking initialized');
    }
    
    // Track newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            trackEvent('newsletter_signup', {
                'form_name': 'newsletter',
                'page_path': window.location.pathname
            });
            
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
}

/**
 * Show success message after form submission
 * @param {string} email - User's email address
 */
function showSuccessMessage(email) {
    const form = document.getElementById('bookingForm');
    const successMessage = document.getElementById('successMessage');
    const confirmedEmail = document.getElementById('confirmedEmail');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        if (confirmedEmail) {
            confirmedEmail.textContent = email;
        }
    }
}

// ============================================
// 3. SCROLL DEPTH TRACKING
// ============================================

/**
 * Track scroll depth on article pages
 */
function setupScrollTracking() {
    // Only track on article detail pages
    if (!document.querySelector('.article-detail')) {
        return;
    }
    
    let scrollThresholds = {
        25: false,
        50: false,
        75: false,
        90: false,
        100: false
    };
    
    let articleBottom = false;
    
    function calculateScrollPercentage() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        return Math.min(Math.round(scrollPercentage), 100);
    }
    
    function checkScrollDepth() {
        const scrollPercentage = calculateScrollPercentage();
        
        // Track scroll depth milestones
        Object.keys(scrollThresholds).forEach(threshold => {
            if (scrollPercentage >= threshold && !scrollThresholds[threshold]) {
                scrollThresholds[threshold] = true;
                
                trackEvent('scroll_depth', {
                    'percent_scrolled': parseInt(threshold),
                    'page_path': window.location.pathname,
                    'article_title': document.querySelector('.article-title')?.textContent || 'Unknown'
                });
            }
        });
        
        // Track when user reaches the bottom of the article
        const articleContent = document.querySelector('.article-main-content');
        if (articleContent && !articleBottom) {
            const articleRect = articleContent.getBoundingClientRect();
            const articleBottomPosition = articleRect.bottom;
            
            if (articleBottomPosition <= window.innerHeight + 100) {
                articleBottom = true;
                
                trackEvent('article_read_complete', {
                    'page_path': window.location.pathname,
                    'article_title': document.querySelector('.article-title')?.textContent || 'Unknown',
                    'time_on_page': Math.round((Date.now() - pageLoadTime) / 1000) // seconds
                });
                
                console.log('📖 User reached the bottom of the article');
            }
        }
    }
    
    // Track page load time
    const pageLoadTime = Date.now();
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(checkScrollDepth, 100);
    });
    
    console.log('✅ Scroll tracking initialized');
}

// ============================================
// 4. OUTBOUND LINK TRACKING
// ============================================

/**
 * Track clicks on external/outbound links
 */
function setupOutboundLinkTracking() {
    // Track all social media links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('data-social') || 'unknown';
            const url = this.href;
            
            trackEvent('click', {
                'link_domain': new URL(url).hostname,
                'link_url': url,
                'link_text': this.textContent.trim(),
                'outbound': true,
                'social_platform': platform
            });
            
            trackEvent('social_link_click', {
                'platform': platform,
                'link_location': getButtonLocation(this),
                'page_path': window.location.pathname
            });
        });
    });
    
    // Track all external links (links that open in new tab or go to external domains)
    document.querySelectorAll('a[target="_blank"], a[rel*="noopener"]').forEach(link => {
        // Skip if already tracked as social link
        if (link.classList.contains('social-link')) {
            return;
        }
        
        link.addEventListener('click', function(e) {
            const url = this.href;
            
            try {
                const linkDomain = new URL(url).hostname;
                const currentDomain = window.location.hostname;
                
                if (linkDomain !== currentDomain) {
                    trackEvent('click', {
                        'link_domain': linkDomain,
                        'link_url': url,
                        'link_text': this.textContent.trim(),
                        'outbound': true,
                        'page_path': window.location.pathname
                    });
                }
            } catch (e) {
                console.warn('Invalid URL:', url);
            }
        });
    });
    
    console.log('✅ Outbound link tracking initialized');
}

// ============================================
// 5. ENGAGEMENT TRACKING
// ============================================

/**
 * Track user engagement metrics
 */
function setupEngagementTracking() {
    // Track time on page
    const startTime = Date.now();
    let engagementTracked = false;
    
    // Track engaged time (10 seconds on page)
    setTimeout(() => {
        if (!engagementTracked) {
            engagementTracked = true;
            trackEvent('user_engagement', {
                'engagement_time_msec': 10000,
                'page_path': window.location.pathname
            });
        }
    }, 10000);
    
    // Track before user leaves
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Date.now() - startTime;
        
        trackEvent('page_exit', {
            'time_on_page_seconds': Math.round(timeOnPage / 1000),
            'page_path': window.location.pathname
        });
    });
    
    // Track video/media engagement if present
    document.querySelectorAll('video, audio').forEach(media => {
        media.addEventListener('play', function() {
            trackEvent('media_play', {
                'media_type': this.tagName.toLowerCase(),
                'page_path': window.location.pathname
            });
        });
    });
    
    console.log('✅ Engagement tracking initialized');
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all tracking when DOM is ready
 */
function initializeTracking() {
    console.log('🚀 Initializing GA4 tracking...');
    
    // Setup all tracking modules
    setupButtonTracking();
    setupFormTracking();
    setupScrollTracking();
    setupOutboundLinkTracking();
    setupEngagementTracking();
    
    console.log('✅ All GA4 tracking initialized successfully');
    console.log('💡 Tip: Open GA4 DebugView to see events in real-time');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTracking);
} else {
    initializeTracking();
}

// ============================================
// EXPORT FOR TESTING (Optional)
// ============================================
window.GA4Tracking = {
    trackEvent,
    GA4_MEASUREMENT_ID
};