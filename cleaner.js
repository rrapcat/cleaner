// ==UserScript==
// @name         cleaner
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  cleans some annoying blocks on different websites
// @author       rrapcat
// @match        https://eft.su/*
// @grant        none
// ==/UserScript==


(function() {
	"use strict";
	let w = window;

	// EFT maps site which has rotating logo in the side menu
	if (/https:\/\/eft.su/.test(w.location.href)) {
		const observer = new MutationObserver(() => {
			destroyBlocks(
				"button[title=\"Свернуть меню\"]",
				"a[target=\"_blank\"]",
			);
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}
})();


function destroyBlocks(...selectors) {
	const selector = selectors.join(",");
	const blocks = document.querySelectorAll(selector);
	if (blocks) {
		blocks.forEach(block => block.remove());
	}
	else {
		console.log("No blocks found by selector:", selector);
	}
}