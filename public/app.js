document.addEventListener('DOMContentLoaded', () => {
  // --- Fetch global settings (for header and footer) ---
  fetch('/api/settings')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Settings fetch error: ${response.status}`);
      }
      return response.json();
    })
    .then(settingsData => {
      console.log('Settings:', settingsData);
      // Update header logo
      const headerLogoImg = document.getElementById('dynamic_img_logo');
      if (headerLogoImg && settingsData.logo && settingsData.logo.url) {
        headerLogoImg.src = settingsData.logo.url;
      }
      // Update hero section logo (new)
      const heroTwoLogoImg = document.getElementById('dynamic_img_hero-two');
      if (heroTwoLogoImg && settingsData.heroTwoLogo && settingsData.heroTwoLogo.url) {
        heroTwoLogoImg.src = settingsData.heroTwoLogo.url;
      }
      // Update footer logo
      const footerLogoImg = document.getElementById('dynamic_img_footer-logo');
      if (footerLogoImg && settingsData.footerLogo && settingsData.footerLogo.url) {
        footerLogoImg.src = settingsData.footerLogo.url;
      }
      // Update footer social links (iterate over the relationship array)
      const footerSocialContainer = document.getElementById('dynamic_div_footer-social-links');
      if (footerSocialContainer && settingsData.footerSocialLinks) {
        footerSocialContainer.innerHTML = '';
        settingsData.footerSocialLinks.forEach(link => {
          const a = document.createElement('a');
          a.href = link.url || '#';
          a.setAttribute('aria-label', link.name || 'Social Link');
          const img = document.createElement('img');
          img.src = link.icon?.url || '';
          img.alt = link.name || '';
          a.appendChild(img);
          footerSocialContainer.appendChild(a);
        });
      }
      // Update footer copyright
      const footerCopyrightEl = document.getElementById('dynamic_p_copyright');
      if (footerCopyrightEl) {
        footerCopyrightEl.textContent =
          settingsData.footerCopyright || '© 2025 SMY Real Estate. All rights reserved.';
      }
    })
    .catch(error => {
      console.error('Error fetching site settings:', error);
    });

  // --- Modal: Open/Close Logic and Callback Submission (Callback Modal) ---
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModal");
  const modal = document.getElementById("callbackModal");
  const overlay = document.getElementById("overlay");

  if (openModalBtn) {
    openModalBtn.addEventListener("click", () => {
      modal.style.display = "block";
      overlay.style.display = "block";
      // Save the actionFrom value from the button that launched the modal
      modal.dataset.actionFrom = openModalBtn.textContent.trim();
    });
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
      overlay.style.display = "none";
    });
  }
  if (overlay) {
    overlay.addEventListener("click", () => {
      modal.style.display = "none";
      overlay.style.display = "none";
    });
  }

  // NEW: Attach listeners to other callback launcher buttons
  const callbackLaunchers = document.querySelectorAll(
    '.check-availability, .explore-units, .check-availability-btn, .enquiry-btn, .payment-button'
  );
  if (callbackLaunchers.length > 0) {
    callbackLaunchers.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.style.display = "block";
        overlay.style.display = "block";
        // Save the actionFrom value from the clicked button
        modal.dataset.actionFrom = btn.textContent.trim();
      });
    });
  }

  // Initialize intl-tel-input for callback modal phone field
  const phoneInput = document.getElementById("phone");
  intlTelInput(phoneInput, {
    initialCountry: "ae",  // Default to UAE
    separateDialCode: true,
    preferredCountries: ["ae", "sa", "us", "gb"]
  });

  // Callback form submission event listener (for callback modal)
  const modalSubmitBtn = document.querySelector('#callbackModal .modal-btn');
  if (modalSubmitBtn) {
    modalSubmitBtn.addEventListener('click', () => {
      const nameInput = document.querySelector('#callbackModal input[type="text"]');
      const emailInput = document.querySelector('#callbackModal input[type="email"]');
      if (!nameInput || !emailInput || !phoneInput) {
        console.error("Missing input fields in the callback modal");
        return;
      }
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const pageUrl = window.location.href;
      const parts = window.location.pathname.split('/').filter(Boolean);
      const slug = parts.pop();
      // Get project name from hero heading and actionFrom from modal dataset
      const projectName = document.getElementById('dynamic_h1_main-heading').textContent.trim();
      const actionFrom = modal.dataset.actionFrom || "";
      
      // Basic validations
      if (!name || !email || !phone) {
        alert("Please fill in all fields.");
        return;
      }
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      
      const payload = { name, email, phone, slug, pageUrl, projectName, actionFrom };

      fetch('/api/submit-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then(result => {
          console.log("Callback request saved:", result);
          // Redirect to thankyou.html after successful submission
          window.location.href = '/thankyou.html';
        })
        .catch(err => {
          console.error("Error submitting callback:", err);
          alert("There was an error submitting your callback request.");
        });
    });
  }

  // --- Initialize Download Modal Phone Field with intl-tel-input ---
  const downloadPhoneInput = document.querySelector('#downloadModal input[name="phone"]');
  if (downloadPhoneInput) {
    intlTelInput(downloadPhoneInput, {
      initialCountry: "ae",
      separateDialCode: true,
      preferredCountries: ["ae", "sa", "us", "gb"]
    });
  }

  // --- Fetch project data (existing dynamic sections) ---
  const parts2 = window.location.pathname.split('/').filter(Boolean);
  const projectSlug = parts2.pop();

  fetch(`/api/project/${projectSlug}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('API Response:', JSON.stringify(data, null, 2));

      if (data) {
        // === HERO SECTION ===
        const heroImageElement = document.getElementById('dynamic_img_hero-image');
        if (heroImageElement && data.heroImage && data.heroImage.url) {
          heroImageElement.src = data.heroImage.url;
        } else if (heroImageElement) {
          heroImageElement.src = '/path/to/default-hero-image.jpg';
        }
        const mainHeadingElement = document.getElementById('dynamic_h1_main-heading');
        if (mainHeadingElement) {
          mainHeadingElement.textContent = data.mainHeading || 'Default Main Heading';
        }
        const subHeadingElement = document.getElementById('dynamic_h2_sub-heading');
        if (subHeadingElement) {
          subHeadingElement.textContent = data.subHeading || 'Default Sub Heading';
        }
        // NEW: Update hero two logo from project data
        const heroTwoLogoImg = document.getElementById('dynamic_img_hero-two');
        if (heroTwoLogoImg && data.heroTwoLogo && data.heroTwoLogo.url) {
          heroTwoLogoImg.src = data.heroTwoLogo.url;
        }

        // === AGENTS SECTION ===
        const agentPhotoContainer = document.getElementById('dynamic_div_agentPhoto');
        if (agentPhotoContainer && data.agents && data.agents.length > 0) {
          agentPhotoContainer.innerHTML = '';
          const agentsToShow = data.agents.slice(0, 5);
          agentsToShow.forEach(agent => {
            const imgElement = document.createElement('img');
            imgElement.src = agent.photo?.url || '/path/to/default-agent-photo.jpg';
            imgElement.alt = agent.name || 'Agent Photo';
            agentPhotoContainer.appendChild(imgElement);
          });
          // Create and append the manager count span dynamically
          const agentCountSpan = document.createElement('span');
          agentCountSpan.id = 'dynamic_span_agent_count';
          agentCountSpan.className = 'manager-count';
          if (data.agentCount && data.agentCount > 0) {
            agentCountSpan.textContent = `+${data.agentCount}`;
          } else if (data.agents.length > 5) {
            agentCountSpan.textContent = `+${data.agents.length - 5}`;
          } else {
            agentCountSpan.textContent = "";
          }
          agentPhotoContainer.appendChild(agentCountSpan);
        }

        // === PARALLAX SECTION ===
        const parallaxImg = document.getElementById('dynamic_img_parallax');
        if (parallaxImg && data.parallaxImage && data.parallaxImage.url) {
          parallaxImg.src = data.parallaxImage.url;
        } else if (parallaxImg) {
          parallaxImg.src = '/assets/images/section-wide.jpg'; // fallback image
        }

        // === PANORAMIC IMAGE SECTION ===
        const panoramicImg = document.getElementById('dynamic_img_PanoramicImage');
        if (panoramicImg && data.panoramicImage && data.panoramicImage.url) {
          panoramicImg.src = data.panoramicImage.url;
        } else if (panoramicImg) {
          panoramicImg.src = '/assets/images/section-wide2.jpg'; // fallback image
        }

        // === GALLERY SECTION ===
        const galleryMainHeading = document.getElementById('dynamic_h2_gallery-main-heading');
        if (galleryMainHeading) {
          galleryMainHeading.textContent = data.galleryMainHeading || galleryMainHeading.textContent;
        }
        const galleryTitle = document.getElementById('dynamic_h3_gallery-title');
        if (galleryTitle) {
          galleryTitle.textContent = data.galleryTitle || galleryTitle.textContent;
        }
        const galleryParagraph = document.getElementById('dynamic_p_gallery-paragraph');
        if (galleryParagraph) {
          galleryParagraph.textContent = data.galleryParagraph || galleryParagraph.textContent;
        }
        const amenitiesListElement = document.getElementById('dynamic_ul_amenities-list');
        if (amenitiesListElement && data.amenitiesList) {
          const items = data.amenitiesList.split('\n').map(item => item.trim()).filter(item => item);
          amenitiesListElement.innerHTML = items.map(item => `<li>${item}</li>`).join('');
        }
        let sliderImages = [];
        if (data.galleryImages && data.galleryImages.length > 0) {
          sliderImages = data.galleryImages
            .map(item => item.image?.url)
            .filter(url => !!url);
        } else {
          sliderImages = [
            '/assets/images/projectsGalary/slide1.jpg',
            '/assets/images/projectsGalary/slide2.jpg',
            '/assets/images/projectsGalary/slide3.jpg'
          ];
        }
        let currentIndex = 0;
        const galleryImageElement = document.getElementById('dynamic_img_galary-slider');
        function showImage(index) {
          if (galleryImageElement) {
            galleryImageElement.src = sliderImages[index];
          }
        }
        showImage(currentIndex);
        const prevBtn = document.querySelector('.arrow-left');
        const nextBtn = document.querySelector('.arrow-right');
        function nextImage() {
          currentIndex = (currentIndex + 1) % sliderImages.length;
          showImage(currentIndex);
        }
        function prevImage() {
          currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
          showImage(currentIndex);
        }
        if (prevBtn && nextBtn) {
          prevBtn.addEventListener('click', prevImage);
          nextBtn.addEventListener('click', nextImage);
        }

        // === PAYMENT PLAN SECTION ===
        const paymentPlanHeadingEl = document.getElementById('dynamic_h2_payment-plan-heading');
        if (paymentPlanHeadingEl) {
          paymentPlanHeadingEl.textContent = data.paymentPlanHeading || paymentPlanHeadingEl.textContent;
        }
        const paymentPlanImageEl = document.getElementById('dynamic_img_payment-image');
        if (paymentPlanImageEl && data.paymentPlanImage && data.paymentPlanImage.url) {
          paymentPlanImageEl.src = data.paymentPlanImage.url;
        }
        const paymentPlanTitleEl = document.getElementById('dynamic_h3_payment-title');
        if (paymentPlanTitleEl) {
          const title = data.paymentPlanTitle || "";
          const number = data.paymentPlanNumber || "";
          const suffix = data.paymentPlanSuffix || "";
          paymentPlanTitleEl.innerHTML = `${title} <span id="dynamic_span_payment-number">${number}</span><br/>${suffix}`;
        }
        const paymentPlanDescriptionEl = document.getElementById('dynamic_p_payment-description');
        if (paymentPlanDescriptionEl) {
          paymentPlanDescriptionEl.textContent = data.paymentPlanDescription || paymentPlanDescriptionEl.textContent;
        }
        const paymentPlanBulletsEl = document.getElementById('dynamic_ul_payment-bullets');
        if (paymentPlanBulletsEl && data.paymentPlanBullets) {
          const bullets = data.paymentPlanBullets.split('\n').map(item => item.trim()).filter(item => item);
          paymentPlanBulletsEl.innerHTML = bullets.map(item => `<li>${item}</li>`).join('');
        }

        // === LOCATION SECTION ===
        const locationHeadingEl = document.getElementById('dynamic_h2_location-heading');
        if (locationHeadingEl) {
          locationHeadingEl.textContent = data.locationHeading || locationHeadingEl.textContent;
        }
        const locationSubheadingEl = document.getElementById('dynamic_p_location-subheading');
        if (locationSubheadingEl) {
          locationSubheadingEl.textContent = data.locationSubheading || locationSubheadingEl.textContent;
        }
        const locationTitleEl = document.getElementById('dynamic_h3_location-title');
        if (locationTitleEl) {
          locationTitleEl.textContent = data.locationTitle || locationTitleEl.textContent;
        }
        const locationDescriptionEl = document.getElementById('dynamic_p_location-description');
        if (locationDescriptionEl) {
          locationDescriptionEl.textContent = data.locationDescription || locationDescriptionEl.textContent;
        }
        const locationDescription2El = document.getElementById('dynamic_p_location-description-paragraph2');
        if (locationDescription2El) {
          locationDescription2El.textContent = data.locationDescription2 || locationDescription2El.textContent;
        }
        const locationBulletsEl = document.getElementById('dynamic_ul_location-bullets');
        if (locationBulletsEl && data.locationBullets) {
          const locationBullets = data.locationBullets.split('\n').map(item => item.trim()).filter(item => item);
          locationBulletsEl.innerHTML = locationBullets.map(item => `<li>${item}</li>`).join('');
        }
        const locationMapImageEl = document.getElementById('dynamic_img_location-map-image');
        if (locationMapImageEl && data.locationMapImage && data.locationMapImage.url) {
          locationMapImageEl.src = data.locationMapImage.url;
        }

        // === DEVELOPER SECTION ===
        const developerTitleEl = document.getElementById('dynamic_h2_About-title');
        if (developerTitleEl) {
          developerTitleEl.textContent = data.developerTitle || developerTitleEl.textContent;
        }
        const developerParagraph1El = document.getElementById('dynamic_p_About-description-paragraph1');
        if (developerParagraph1El) {
          developerParagraph1El.textContent = data.developerParagraph1 || developerParagraph1El.textContent;
        }
        const developerParagraph2El = document.getElementById('dynamic_p_description-paragraph2');
        if (developerParagraph2El) {
          developerParagraph2El.textContent = data.developerParagraph2 || developerParagraph2El.textContent;
        }
        const developerRedParagraphEl = document.getElementById('dynamic_p_red-paragraph3');
        if (developerRedParagraphEl) {
          const strongEl = developerRedParagraphEl.querySelector('#dynamic_strong_red-paragraph-bold-text');
          if (strongEl) {
            strongEl.textContent = data.developerRedBoldText || strongEl.textContent;
          }
        }
        const developerImage1El = document.getElementById('dynamic_img_Developer-first-image');
        if (developerImage1El && data.developerImage1 && data.developerImage1.url) {
          developerImage1El.src = data.developerImage1.url;
        }
        const developerImage2El = document.getElementById('dynamic_img_Developer-second-image');
        if (developerImage2El && data.developerImage2 && data.developerImage2.url) {
          developerImage2El.src = data.developerImage2.url;
        }

        // === CONTACT SECTION ===
        const contactHeadingEl = document.getElementById('dynamic_h2_contactUs-heading');
        if (contactHeadingEl) {
          contactHeadingEl.textContent = data.contactHeading || contactHeadingEl.textContent;
        }
        const contactProfilePicEl = document.getElementById('dynamic_img_contact-profile-pic');
        if (contactProfilePicEl && data.contactProfilePic && data.contactProfilePic.url) {
          contactProfilePicEl.src = data.contactProfilePic.url;
        }
        const contactProfileNameEl = document.getElementById('dynamic_h3_contact-profile-name');
        if (contactProfileNameEl) {
          contactProfileNameEl.textContent = data.contactProfileName || contactProfileNameEl.textContent;
        }
        const contactProfileDescriptionEl = document.getElementById('dynamic_p_profile-description');
        if (contactProfileDescriptionEl) {
          contactProfileDescriptionEl.textContent = data.contactProfileDescription || contactProfileDescriptionEl.textContent;
        }
        const contactBulletsEl = document.getElementById('dynamic_ul_contact-bullets');
        if (contactBulletsEl && data.contactBullets) {
          const contactBullets = data.contactBullets.split('\n').map(item => item.trim()).filter(item => item);
          contactBulletsEl.innerHTML = contactBullets.map(item => `<li>${item}</li>`).join('');
        }
        const contactMapEl = document.getElementById('dynamic_img_contact-map');
        if (contactMapEl && data.contactMap && data.contactMap.url) {
          contactMapEl.src = data.contactMap.url;
        }

        // === FAQ SECTION ===
        const faqContainer = document.querySelector('.faq-container');
        if (faqContainer) {
          faqContainer.innerHTML = '';
          if (data.faq && data.faq.length > 0) {
            data.faq.forEach(faq => {
              const faqItem = document.createElement('div');
              faqItem.className = 'faq-item';
              faqItem.setAttribute('data-open', 'false');
              faqItem.innerHTML = `
                <div class="faq-question">
                  <span class="question-text">${faq.question}</span>
                  <button class="toggle-btn" aria-label="Expand FAQ" data-icon="+"></button>
                </div>
                <div class="faq-answer" style="display: none;">
                  <p>${faq.answer}</p>
                </div>
              `;
              faqContainer.appendChild(faqItem);
            });
            const faqItems = faqContainer.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
              const toggleBtn = item.querySelector('.toggle-btn');
              toggleBtn.addEventListener('click', () => {
                const isOpen = item.getAttribute('data-open') === 'true';
                item.setAttribute('data-open', (!isOpen).toString());
                toggleBtn.setAttribute('data-icon', isOpen ? '+' : 'x');
                const answerDiv = item.querySelector('.faq-answer');
                answerDiv.style.display = isOpen ? 'none' : 'block';
              });
            });
          }
        }

        // === AMENITIES SECTION (Cards with Filter Buttons) ===
        const amenitiesHeadingEl = document.getElementById('dynamic_h2_amenities-heading');
        if (amenitiesHeadingEl) {
          amenitiesHeadingEl.textContent = data.amenitiesSectionHeading || amenitiesHeadingEl.textContent;
        }
        const filtersContainer = document.getElementById('dynamic_div_amenities-filters');
        if (filtersContainer) {
          filtersContainer.innerHTML = '';
          const allBtn = document.createElement('button');
          allBtn.className = 'filter-btn active';
          allBtn.setAttribute('data-filter', 'All');
          allBtn.textContent = 'All';
          filtersContainer.appendChild(allBtn);
          if (data.amenityFilters && data.amenityFilters.length > 0) {
            data.amenityFilters.forEach(filter => {
              const btn = document.createElement('button');
              btn.className = 'filter-btn';
              btn.setAttribute('data-filter', filter.name);
              btn.textContent = filter.name;
              filtersContainer.appendChild(btn);
            });
          }
        }
        const cardsContainer = document.getElementById('amenities-cards');
        if (!cardsContainer) {
          console.error('Amenities cards container not found');
        } else {
          const amenitiesCardsData = (data.amenitiesCards && data.amenitiesCards.length > 0)
            ? data.amenitiesCards.map(card => {
              let cats = [];
              if (card.categories) {
                cats = card.categories.split(',').map(c => c.trim());
              }
              return { ...card, categories: cats };
            })
            : [];
          let selectedFilters = ['All'];
          let currentPage = 1;
          const pageSize = 5;
          function cardMatchesFilters(card) {
            if (selectedFilters.includes('All')) return true;
            return card.categories.some(cat => selectedFilters.includes(cat));
          }
          function renderCards() {
            if (!cardsContainer) return;
            const filtered = amenitiesCardsData.filter(cardMatchesFilters);
            const totalPages = Math.ceil(filtered.length / pageSize);
            if (currentPage > totalPages) currentPage = totalPages;
            if (currentPage < 1) currentPage = 1;
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const pageItems = filtered.slice(startIndex, endIndex);
            cardsContainer.innerHTML = '';
            pageItems.forEach(item => {
              const card = document.createElement('div');
              card.classList.add('amenity-card');
              // Attach file URL as data attribute for download action
              card.dataset.fileUrl = item.document?.url || '';
              card.innerHTML = `
                <img src="${item.image?.url || ''}" alt="${item.title}" class="amenity-card-image" />
                <div class="amenity-card-content">
                  <h3 class="amenity-title">${item.title}</h3>
                  <p class="amenity-description">${item.description}</p>
                </div>
              `;
              cardsContainer.appendChild(card);
              // Make the entire card clickable to open download modal.
              // Also store the action from as the card's title text.
              card.addEventListener('click', () => {
                const fileUrl = card.dataset.fileUrl;
                if (fileUrl) {
                  const actionFrom = card.querySelector('.amenity-title').textContent.trim();
                  openDownloadModal(fileUrl, actionFrom);
                }
              });
            });
            const prevBtn2 = document.getElementById('prev-btn');
            const nextBtn2 = document.getElementById('next-btn');
            if (prevBtn2) prevBtn2.disabled = (currentPage <= 1);
            if (nextBtn2) nextBtn2.disabled = (currentPage >= totalPages);
          }
          const prevBtn2 = document.getElementById('prev-btn');
          const nextBtn2 = document.getElementById('next-btn');
          if (prevBtn2 && nextBtn2) {
            prevBtn2.addEventListener('click', () => {
              currentPage--;
              renderCards();
            });
            nextBtn2.addEventListener('click', () => {
              currentPage++;
              renderCards();
            });
          }
          const filterBtns = document.querySelectorAll('#dynamic_div_amenities-filters .filter-btn');
          filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
              const filterName = btn.dataset.filter;
              if (selectedFilters.includes(filterName)) {
                selectedFilters = selectedFilters.filter(f => f !== filterName);
                btn.classList.remove('active');
              } else {
                selectedFilters.push(filterName);
                btn.classList.add('active');
              }
              if (filterName === 'All' && selectedFilters.includes('All')) {
                selectedFilters = ['All'];
                filterBtns.forEach(b => {
                  if (b.dataset.filter !== 'All') {
                    b.classList.remove('active');
                  }
                });
              } else {
                if (selectedFilters.includes('All') && selectedFilters.length > 1) {
                  selectedFilters = selectedFilters.filter(f => f !== 'All');
                  const allBtn = document.querySelector('#dynamic_div_amenities-filters .filter-btn[data-filter="All"]');
                  if (allBtn) allBtn.classList.remove('active');
                }
              }
              currentPage = 1;
              renderCards();
            });
          });
          renderCards();
        }

        // === UNITS SECTION ===
        const unitsFiltersContainer = document.getElementById('dynamic_div_units-filters');
        const unitsCarousel = document.getElementById('units-carousel');
        if (unitsFiltersContainer) {
          unitsFiltersContainer.innerHTML = '';
          const allUnitBtn = document.createElement('button');
          allUnitBtn.className = 'filter-btn active';
          allUnitBtn.setAttribute('data-filter', 'All');
          allUnitBtn.textContent = 'All';
          unitsFiltersContainer.appendChild(allUnitBtn);
          if (data.unitFilters && data.unitFilters.length > 0) {
            data.unitFilters.forEach(filter => {
              const btn = document.createElement('button');
              btn.className = 'filter-btn';
              btn.setAttribute('data-filter', filter.name);
              btn.textContent = filter.name;
              unitsFiltersContainer.appendChild(btn);
            });
          } else {
            const defaultFilters = ['One Bedroom', 'Two Bedroom', 'Three Bedroom', 'Four Bedroom', 'Penthouse'];
            defaultFilters.forEach(f => {
              const btn = document.createElement('button');
              btn.className = 'filter-btn';
              btn.setAttribute('data-filter', f);
              btn.textContent = f;
              unitsFiltersContainer.appendChild(btn);
            });
          }
        }
        let selectedUnitFilters = ['All'];
        function renderUnits() {
          let unitsData = [];
          if (data.units && data.units.length > 0) {
            unitsData = data.units;
          } else {
            unitsData = [
              {
                id: 1,
                type: 'One Bedroom',
                title: 'Dubai Harbour One Bedroom Apartments',
                price: 'from AED 2.6m',
                image: 'assets/images/units/plan1.jpg',
                tag: 'ONE',
                cityView: true,
                sqft: '2,412 sqft'
              },
              {
                id: 2,
                type: 'One Bedroom',
                title: 'Dubai Harbour One Bedroom Apartments',
                price: 'from AED 3.4m',
                image: 'assets/images/units/plan2.jpg',
                tag: 'TWO',
                cityView: true,
                sqft: '3,620 sqft'
              },
              {
                id: 3,
                type: 'One Bedroom',
                title: 'Dubai Harbour One Bedroom Apartments',
                price: 'from AED 4.5m',
                image: 'assets/images/units/plan3.png',
                tag: 'THREE',
                cityView: true,
                sqft: '4,500 sqft'
              },
              {
                id: 4,
                type: 'Penthouse',
                title: 'Dubai Harbour Penthouse',
                price: 'from AED 12m',
                image: 'assets/images/units/plan1.png',
                tag: 'PENT',
                cityView: true,
                sqft: '8,000 sqft'
              }
            ];
          }
          let filteredUnits = [];
          if (selectedUnitFilters.includes('All')) {
            filteredUnits = unitsData;
          } else {
            filteredUnits = unitsData.filter(u => selectedUnitFilters.includes(u.type));
          }
          if (unitsCarousel) {
            unitsCarousel.innerHTML = '';
            filteredUnits.forEach(unit => {
              const card = document.createElement('div');
              card.classList.add('unit-card');
              card.innerHTML = `
                <div class="unit-image-wrapper">
                  <img src="${unit.image?.url || unit.image}" alt="${unit.title}" class="unit-image" />
                  <div class="tag-badge">${unit.tag}</div>
                </div>
                <div class="unit-content">
                  <h3 class="unit-title">${unit.title}</h3>
                  <p class="unit-price">${unit.price}</p>
                  <div class="unit-icons">
                    ${unit.cityView ? '<div class="icon-item"><i class="icon-city"></i> City View</div>' : ''}
                    <div class="icon-item"><i class="icon-size"></i> ${unit.sqft}</div>
                  </div>
                </div>
              `;
              unitsCarousel.appendChild(card);
            });
          }
        }
        const unitFilterBtns = document.querySelectorAll('#dynamic_div_units-filters .filter-btn');
        unitFilterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const filterName = btn.dataset.filter;
            if (filterName === 'All') {
              selectedUnitFilters = ['All'];
              unitFilterBtns.forEach(b => {
                if (b.dataset.filter !== 'All') {
                  b.classList.remove('active');
                } else {
                  b.classList.add('active');
                }
              });
            } else {
              if (selectedUnitFilters.includes('All')) {
                selectedUnitFilters = [];
                unitFilterBtns.forEach(b => {
                  if (b.dataset.filter === 'All') b.classList.remove('active');
                });
              }
              if (selectedUnitFilters.includes(filterName)) {
                selectedUnitFilters = selectedUnitFilters.filter(f => f !== filterName);
                btn.classList.remove('active');
              } else {
                selectedUnitFilters.push(filterName);
                btn.classList.add('active');
              }
              if (selectedUnitFilters.length === 0) {
                selectedUnitFilters = ['All'];
                const allBtn = document.querySelector('#dynamic_div_units-filters .filter-btn[data-filter="All"]');
                if (allBtn) {
                  allBtn.classList.add('active');
                }
              }
            }
            renderUnits();
          });
        });
        const leftArrowUnits = document.querySelector('.left-arrow');
        const rightArrowUnits = document.querySelector('.right-arrow');
        if (leftArrowUnits) {
          leftArrowUnits.addEventListener('click', () => {
            unitsCarousel.scrollBy({ left: -300, behavior: 'smooth' });
          });
        }
        if (rightArrowUnits) {
          rightArrowUnits.addEventListener('click', () => {
            unitsCarousel.scrollBy({ left: 300, behavior: 'smooth' });
          });
        }
        renderUnits();

        // === MATERIALS SECTION ===
        const materialsGrid = document.querySelector('.materials-grid');
        if (materialsGrid && data.materials && data.materials.length > 0) {
          materialsGrid.innerHTML = '';
          data.materials.forEach(material => {
            const card = document.createElement('div');
            card.className = 'material-card';
            // Store the document file URL on the card for use on click
            card.dataset.fileUrl = material.document?.url || '';
            card.innerHTML = `
              <div class="material-image-wrapper">
                <img src="${material.image?.url || ''}" alt="${material.title}" class="material-image" />
              </div>
              <div class="material-content">
                <h3 class="material-title">
                  ${material.title}
                  <span class="arrow-icon">↗</span>
                </h3>
                <p class="material-description">
                  ${material.description}
                </p>
              </div>
            `;
            materialsGrid.appendChild(card);
            // Make the entire card clickable to open the download modal.
            // Also store the action from as the card's title text.
            card.addEventListener('click', () => {
              const fileUrl = card.dataset.fileUrl;
              if (fileUrl) {
                const actionFrom = card.querySelector('.material-title').textContent.trim();
                openDownloadModal(fileUrl, actionFrom);
              }
            });
          });
        } else {
          console.warn('No materials found');
        }

        // --- New Download Modal Handling Code ---
        function openDownloadModal(fileUrl, actionFrom) {
          const downloadModal = document.getElementById("downloadModal");
          const downloadOverlay = document.getElementById("downloadOverlay");
          if (downloadModal && downloadOverlay) {
            downloadModal.style.display = "block";
            downloadOverlay.style.display = "block";
            // Store fileUrl and actionFrom on the modal for later use
            downloadModal.dataset.fileUrl = fileUrl;
            downloadModal.dataset.actionFrom = actionFrom || "Download";
          }
        }
        const downloadSubmitBtn = document.querySelector('#downloadModal .modal-btn');
        if (downloadSubmitBtn) {
          downloadSubmitBtn.addEventListener('click', () => {
            // Updated: Include phone input field in download modal and use intlTelInput
            const modalNameInput = document.querySelector('#downloadModal input[name="name"]');
            const modalEmailInput = document.querySelector('#downloadModal input[name="email"]');
            const modalPhoneInput = document.querySelector('#downloadModal input[name="phone"]');
            if (!modalNameInput || !modalEmailInput || !modalPhoneInput) {
              console.error("Missing input fields in the download modal");
              return;
            }
            if (!modalNameInput.value.trim() || !modalEmailInput.value.trim() || !modalPhoneInput.value.trim()) {
              alert("Please fill in all fields.");
              return;
            }
            // Build payload similar to the callback modal, plus extra fields
            const name = modalNameInput.value.trim();
            const email = modalEmailInput.value.trim();
            const phone = modalPhoneInput.value.trim();
            const pageUrl = window.location.href;
            const parts = window.location.pathname.split('/').filter(Boolean);
            const slug = parts.pop();
            const projectName = document.getElementById('dynamic_h1_main-heading').textContent.trim();
            const actionFrom = document.getElementById("downloadModal").dataset.actionFrom || "";
            const payload = { name, email, phone, slug, pageUrl, projectName, actionFrom };

            // Submit the download request to the callback endpoint
            fetch('/api/submit-callback', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
              })
              .then(result => {
                console.log("Download callback saved:", result);
                // Redirect to thankyou.html after successful submission
                window.location.href = '/thankyou.html';
              })
              .catch(err => {
                console.error("Error submitting download callback:", err);
                alert("There was an error submitting your download request.");
              });
          });
        }
      } else {
        console.error('No project data found');
      }
    })
    .catch(error => {
      console.error('Error fetching project data:', error);
    });

  // --- Navigation Link Handler ---
  document.querySelectorAll('nav a[href^="#"], footer.footer-dark a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      const hash = this.getAttribute('href'); // Get the hash (e.g., "#gallery")
      window.location.hash = hash; // Update the URL hash without changing the path
      // Smooth scroll to the target section
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
