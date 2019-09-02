import $ from 'jquery';
import '../vendor/jquery.waypoints.min';
import 'jquery-scrollify';
import lastURLWord from './LastURLWord';

import {
	heroSection,
	countersSection,
	storySection,
	settoriSection,
	testimonialsSection,
	ctaSection
} from './UiElements';

/*************
 * SCROLLIFY
 ************/

const scrollify = () => {
	if (lastURLWord() !== 'privacy' || lastURLWord() !== 'thank-you' || lastURLWord() !== 'thank-you-lead') {
		const sidebar = $('.progressive-sidebar__container');
		const firstSection = $('.progressive-sidebar__section-1');
		const secondSection = $('.progressive-sidebar__section-2');
		const thirdSection = $('.progressive-sidebar__section-3');
		const fourthSection = $('.progressive-sidebar__section-4');
		const fifthSection = $('.progressive-sidebar__section-5');
		const sixthSection = $('.progressive-sidebar__section-6');

		const activeSidebar = 'progressive-sidebar__section--active';

		function removeSidebarActive() {
			sidebar.children().removeClass('progressive-sidebar__section--active');
		}

		function scrollToSection(section) {
			$('html, body').animate(
				{
					scrollTop: section.offset().top
				},
				1100
			);
		}

		firstSection.on('click', () => scrollToSection(heroSection));
		secondSection.on('click', () => scrollToSection(countersSection));
		thirdSection.on('click', () => scrollToSection(storySection));
		fourthSection.on('click', () => scrollToSection(settoriSection));
		fifthSection.on('click', () => scrollToSection(testimonialsSection));
		sixthSection.on('click', () => scrollToSection(ctaSection));

		$(function() {
			//if()
			$.scrollify({
				section: '#section-hero, #counters, #story, #settori, #testimonials, #cta, #footer',
				sectionName: false,
				interstitialSection: '#footer',
				easing: 'easeOutExpo',
				scrollSpeed: 1100,
				offset: 0,
				scrollbars: true,
				standardScrollElements: '#cta, #privacy',
				setHeights: true,
				overflowScroll: true,
				updateHash: false,
				touchScroll: true,
				before: function(section) {
					if (section === 0) {
						removeSidebarActive();
						firstSection.addClass(activeSidebar);
					} else if (section === 1) {
						removeSidebarActive();
						secondSection.addClass(activeSidebar);
					} else if (section === 2) {
						removeSidebarActive();
						thirdSection.addClass(activeSidebar);
					} else if (section === 3) {
						removeSidebarActive();
						fourthSection.addClass(activeSidebar);
					} else if (section === 4) {
						removeSidebarActive();
						fifthSection.addClass(activeSidebar);
					} else if (section === 5) {
						removeSidebarActive();
						sixthSection.addClass(activeSidebar);
					}
				},
				after: function() {},
				afterResize: function() {},
				afterRender: function() {}
			});
		});
	}
};

export default scrollify;
