// ==UserScript==
// @name         BetterGoG
// @namespace    https://github.com/Laxii-null/BetterGoG
// @version      1.3
// @description  UI improvements and some fixes for GoG
// @author       Laxii
// @match        https://www.gog.com/*
// @updateURL    https://github.com/Laxii-null/BetterGoG/raw/refs/heads/main/BetterGoG.user.js
// @downloadURL  https://github.com/Laxii-null/BetterGoG/raw/refs/heads/main/BetterGoG.user.js
// ==/UserScript==

(function() {
    'use strict';

    // dropdown_icon/arrow goodbye
    function removeSVG() {
        var style = document.createElement('style');
        style.innerHTML = '.menu-link__dropdown-icon { display: none !important; }';
        document.head.appendChild(style);
    }
    function removeIcon() {
        var style = document.createElement('style');
        style.innerHTML = '.ic.icon-dropdown-down.header__switch-icon { display: none !important; }';
        document.head.appendChild(style);
    }
    function removeMenuTriangleSpans() {
        var spans = document.querySelectorAll('span[class^="menu-triangle"]');
        spans.forEach(function(span) {
            span.remove();
        });
    }

    // goodbye galaxy button on library
    function removeSection() {
        var sections = document.querySelectorAll('.game-details__section[ng-if="details.simpleGalaxyInstallerPath && !details.isPreOrder"]');
        sections.forEach(function(section) {
            section.remove();
        });
    }
    function changeText() {
        var elements = document.querySelectorAll('.module-header2__element');
        elements.forEach(function(element) {
            if (element.textContent.includes('Pobierz zapasowe offline instalatory gry')) {
                element.textContent = 'Pobierz instalatory gry';
            } else if (element.textContent.includes('Download backup offline game installers')) {
                element.textContent = 'Download game installers';
            }
        });
    }

    // goodbye another galaxy button
    function removeDownloadButton() {
        var buttons = document.querySelectorAll('[class^="footer-microservice-download__button footer-microservice-download__button"]');
        buttons.forEach(function(button) {
            button.remove();
        });
    }

    // goodbye galaxy banner on main page
    function removeGalaxyBanner() {
        if (window.location.href.match(/^https:\/\/www\.gog\.com(\/[a-z]{2})?\/?$/)) {
            var galaxyBanner = document.querySelector('a.usp-banner-galaxy');
            if (galaxyBanner) {
                galaxyBanner.remove();
            }
        }
    }

    // goodbye big ass galaxy ad on order success screen
    function removeOrderDivs() {
        if (window.location.href.match(/^https:\/\/www\.gog\.com(\/[a-z]{2})?\/order\/?/)) {
            var downloadGalaxyDiv = document.querySelector('div[class^="download-galaxy"]');
            if (downloadGalaxyDiv) {
                var parentDiv = downloadGalaxyDiv.closest('div[bis_skin_checked="1"]');
                if (parentDiv) {
                    parentDiv.remove();
                }
            }
        }
    }

    // goodbye link to galaxy on navigation bar
    function removeGalaxyLink() {
        var galaxyLink = document.querySelector('a.menu-submenu-link[href="/galaxy"]');
        if (galaxyLink) {
            galaxyLink.remove();
        }
    }

    // goodbye technical "support" for movies
    function removeProductSupportLink() {
        var productSupportLink = document.querySelector('a.product-dropdown__item._dropdown__item._dropdown__item--contrast[hook-test="productToggleDropdownSupport"][ng-href^="/support/"]');
        if (productSupportLink) {
            productSupportLink.remove();
        }
    }

    // text fix
    function changeTextOnMoviesPage() {
        if (window.location.href.match(/^https:\/\/www\.gog\.com(\/[a-z]{2})?\/account\/movies\/?/)) {
            var elements = document.querySelectorAll('span.module-header2__element.module-header2__element--selected[ng-if="details.main.currentSystem !== \'linux\'"]');
            elements.forEach(function(element) {
                if (element.textContent.includes('Pobierz instalatory gry')) {
                    element.textContent = 'Pobierz film';
                } else if (element.textContent.includes('Download backup offline game installers')) {
                    element.textContent = 'Download the movie';
                }
            });

            // another goodbye for "support"
            var supportElement = document.querySelector('a._dropdown__item._dropdown__item--contrast[ng-show="details.url.support"][ng-href^="/support/"]');
            if (supportElement) {
                supportElement.remove();
            }

            // again another goodbye for "support"
            var productSupportElement = document.querySelector('a.product-dropdown__item._dropdown__item._dropdown__item--contrast[hook-test="productToggleDropdownSupport"][ng-href^="/support/"]');
            if (productSupportElement) {
                productSupportElement.remove();
            }

            // an another text fix
            var hideElements = document.querySelectorAll('span.product-dropdown__item._dropdown__item[hook-test="productToggleDropdownHideGame"]');
            hideElements.forEach(function(element) {
                if (element.textContent.includes('Ukryj grę')) {
                    element.textContent = 'Ukryj film';
                } else if (element.textContent.includes('Hide game')) {
                    element.textContent = 'Hide movie';
                }
            });

            // an another text fix!(because gog is forgetting sooo much about the movies)
            var unhideElements = document.querySelectorAll('span.product-dropdown__item._dropdown__item[hook-test="productToggleDropdownShowGame"]');
            unhideElements.forEach(function(element) {
                if (element.textContent.includes('Przestań ukrywać grę')) {
                    element.textContent = 'Przestań ukrywać film';
                } else if (element.textContent.includes('Unhide game')) {
                    element.textContent = 'Unhide movie';
                }
            });
        }
    }







    // start of all this
    removeBefore();
    removeSVG();
    removeIcon();
    removeSection();
    changeText();
    removeDownloadButton();
    removeMenuTriangleSpans();
    removeGalaxyBanner();
    removeOrderDivs();
    changeTextOnMoviesPage();
    if (window.location.href.includes('/account')) {
        removeSection();
        changeText();
        if (window.location.href.includes('/account/movies')) {
            removeProductSupportLink();
        }

        // monitoring changes + updating
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                removeSection();
                changeText();
                removeDownloadButton();
                removeMenuTriangleSpans();
                removeGalaxyBanner();
                removeOrderDivs();
                changeTextOnMoviesPage();
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // again start just to be sure yk
    window.addEventListener('load', function() {
        removeGalaxyBanner();
        removeOrderDivs();
        removeGalaxyLink();
        changeTextOnMoviesPage();
        if (window.location.href.includes('/account/movies')) {
            removeProductSupportLink();
        }
    });
})();
