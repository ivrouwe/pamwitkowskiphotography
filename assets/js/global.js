(function() {
	var galleryControls = (function() {
			galleryControls = document.createElement('section');
			galleryControls.classList.add('gallery-controls');
			galleryControls.id = 'gallery-controls';
			galleryControls.setAttribute('aria-labelledby', 'gallery-controls-heading');

			return galleryControls;
		}()),
		galleryControlsHeading = (function() {
			galleryControlsHeading = document.createElement('h3');
			galleryControlsHeading.classList.add('visually-hidden');
			galleryControlsHeading.id = 'gallery-controls-heading';
			galleryControlsHeading.appendChild(document.createTextNode('Gallery Controls'));

			return galleryControlsHeading;
		}()),
		galleryControlsList = document.createElement('ul'),
		buttonPreviousPhoto = (function() {
			var button = document.createElement('button'),
			svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
			use = document.createElementNS('http://www.w3.org/2000/svg', 'use'),
			span = document.createElement('span');

			// Add attributes and properties to the <button>
			button.setAttribute('type', 'button');
			button.setAttribute('data-action', 'back');
			button.disabled = true;

			// Add href values to the <use> element
			use.setAttribute('href', '#icon-previous');
			use.setAttribute('xlink:href', '#icon-previous');

			// Add attributes to the <svg> and append the <use> element to it
			svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
			svg.setAttribute('viewBox', '0 -256 1792 1792');
			svg.setAttribute('width', '16');
			svg.setAttribute('height', '16');
			svg.appendChild(use);
			
			// Add a class to the <span> and insert text inside it
			span.classList.add('visually-hidden');
			span.appendChild(document.createTextNode(' Previous Photo'));
			
			// Append child elements to the <button> and add an event listener to it
			button.appendChild(svg);
			button.appendChild(span);

			button.addEventListener('click', galleryHandler);

			return button;
		}()),
		buttonNextPhoto = (function() {
			var button = document.createElement('button'),
			svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
			use = document.createElementNS('http://www.w3.org/2000/svg', 'use'),
			span = document.createElement('span');

			// Add attributes to the <button>
			button.setAttribute('type', 'button');
			button.setAttribute('data-action', 'forward');

			// Add href values to the <use> element
			use.setAttribute('href', '#icon-next');
			use.setAttribute('xlink:href', '#icon-next');

			// Add attributes to the <svg> and append the <use> element to it
			svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
			svg.setAttribute('viewBox', '0 -256 1792 1792');
			svg.setAttribute('width', '16');
			svg.setAttribute('height', '16');
			svg.appendChild(use);
			
			// Add a class to the <span> and insert text inside it
			span.classList.add('visually-hidden');
			span.appendChild(document.createTextNode('Next Photo '));
			
			// Append child elements to the <button> and add an event listener to it
			button.appendChild(span);
			button.appendChild(svg);

			button.addEventListener('click', galleryHandler);

			return button;
		}()),
		buttons = [buttonPreviousPhoto, buttonNextPhoto],
		gallery = document.querySelector('.gallery'),
		galleryList = gallery.querySelector('ul'),
		photos = galleryList.querySelectorAll('.photo'),
		index;

	function galleryHandler(evt) {
		var galleryControls = evt.currentTarget.parentElement.parentElement.parentElement,
			gallery = galleryControls.parentElement,
			activePhoto = gallery.querySelector('.photo:not([hidden])'),
			buttonPreviousPhoto = galleryControls.querySelector('[type="button"][data-action="back"]'),
			buttonNextPhoto = galleryControls.querySelector('[type="button"][data-action="forward"]');
		
		if(evt.currentTarget.dataset.action === 'back') {
			gallery.dataset.action = 'back';

			if(activePhoto.previousElementSibling.previousElementSibling === null) {
				evt.currentTarget.disabled = true;
			} else {
				evt.currentTarget.disabled = false;
			}

			buttonNextPhoto.disabled = false;
			activePhoto.hidden = true;
			activePhoto.previousElementSibling.hidden = false;
			activePhoto.previousElementSibling.focus();
		} else if (evt.currentTarget.dataset.action === 'forward') {
			gallery.dataset.action = 'forward';
			
			if(!activePhoto.nextElementSibling.nextElementSibling.classList.contains('photo')) {
				evt.currentTarget.disabled = true;
			} else {
				evt.currentTarget.disabled = false;
			}

			buttonPreviousPhoto.disabled = false;
			activePhoto.hidden = true;
			activePhoto.nextElementSibling.hidden = false;
			activePhoto.nextElementSibling.focus();
		}
	}

	// Remove <ul>, then append photo <figure>s back into the gallery.
	galleryList.remove();

	for(index = 0; index < photos.length; index++) {
		if(index !== 0) {
			// Show first photo, but hide siblings
			photos[index].hidden = true;
		}

		// Make photos programatically focusable so that active photo can be focused
		photos[index].setAttribute('tabindex', '-1');
		gallery.querySelector('dd').appendChild(photos[index]);
	}

	// Loop through buttons and add them (inside of list items) to the gallery controls list
	for (index = 0; index < buttons.length; index++) {
		var listItem = document.createElement('li');

		listItem.appendChild(buttons[index]);
		galleryControlsList.appendChild(listItem);
	}

	// Finish building the Gallery Controls section and append it to the Gallery
	galleryControls.appendChild(galleryControlsHeading);
	galleryControls.appendChild(galleryControlsList);
	gallery.querySelector('dd').appendChild(galleryControls);

	// Add a custom attribute to the <html> element to indicate that this file has fully executed
	document.querySelector('html').dataset.js = 'true';
}());