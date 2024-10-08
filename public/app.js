// Get the slug from the URL
const slug = window.location.pathname.split('/').pop();

// Fetch the landing page content from the API using the slug
fetch(`/api/project/${slug}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('API Response:', JSON.stringify(data, null, 2)); // Log the data to inspect the structure

    // Check if the response contains valid data
    if (data) {
      // Safely update the text content if elements exist
      const titleElement = document.getElementById('post-title');
      const descriptionElement = document.getElementById('post-description');
      const requestCallbackElement = document.getElementById('request-callback');
      const priceElement = document.getElementById('price');
      const paymentPlanElement = document.getElementById('payment-plan');
      const areaElement = document.getElementById('area');
      const handoverDateElement = document.getElementById('handover-date');
      const tag1Element = document.getElementById('tag1');
      const tag2Element = document.getElementById('tag2');
      const bannerImageElement = document.querySelector('.banner');
      const projectLogoElement = document.querySelector('.banner-project-logo img');
      const developerLogoElement = document.querySelector('.banner-developer-logo img');

      // Update title and description if elements exist
      if (titleElement) titleElement.textContent = data.title;
      if (descriptionElement) descriptionElement.textContent = data.description;
      if (requestCallbackElement) requestCallbackElement.textContent = data.requestCallbackText;
      if (priceElement) priceElement.textContent = data.startingPrice;
      if (paymentPlanElement) paymentPlanElement.textContent = data.paymentPlan;
      if (areaElement) areaElement.textContent = data.area;
      if (handoverDateElement) handoverDateElement.textContent = data.handoverDate;
      if (tag1Element) tag1Element.textContent = data.projectTag1;
      if (tag2Element) tag2Element.textContent = data.projectTag2;

      // Set the header logo dynamically if it exists
      if (data.headerLogo && data.headerLogo.url) {
        document.getElementById('header-logo').src = data.headerLogo.url;
      }

      // Update the banner background image
      if (bannerImageElement && data.bannerImage && data.bannerImage.url) {
        bannerImageElement.style.backgroundImage = `url(${data.bannerImage.url})`;
      }

      // Update the project and developer logos
      if (projectLogoElement && data.projectLogo && data.projectLogo.url) {
        projectLogoElement.src = data.projectLogo.url;
      }

      if (developerLogoElement && data.developerLogo && data.developerLogo.url) {
        developerLogoElement.src = data.developerLogo.url;
      }
      // Set the feature values dynamically
      document.getElementById('payment-structure').textContent = data.paymentStructure || 'N/A';
      document.getElementById('down-payment').textContent = data.downPayment || 'N/A';
      document.getElementById('developer-name').textContent = data.developerName || 'N/A';
      document.getElementById('bedrooms').textContent = data.bedrooms || 'N/A';
      document.getElementById('number-of-units').textContent = data.numberOfUnits || 'N/A';

      // About Section
      document.getElementById('about-heading').textContent = data.aboutHeading || 'N/A';
      document.getElementById('about-description').textContent = data.aboutDescription || 'N/A';

      // Features
      document.getElementById('feature-price').textContent = data.featurePrice || 'N/A';
      document.getElementById('feature-down-payment').textContent = data.featureDownPayment || 'N/A';
      document.getElementById('feature-handover-date').textContent = data.featureHandoverDate || 'N/A';

      // Buttons
      document.getElementById('btn-availability').textContent = data.availabilityButtonText || 'N/A';
      document.getElementById('btn-brochure').textContent = data.brochureButtonText || 'N/A';

      // Load gallery images
      if (data.galleryImages && data.galleryImages.length > 0) {
        const galleryContainer = document.getElementById('gallery-images');
        galleryContainer.innerHTML = ''; // Clear any existing content

        data.galleryImages.forEach((image, index) => {
          // Create a wrapper div for each image
          const wrapperDiv = document.createElement('div');
          wrapperDiv.classList.add('gallery-image-wrapper');

          // Add the 'large-image' class for the first image
          if (index === 0) {
            wrapperDiv.classList.add('large-image');
          }

          // Create the image element
          const imgElement = document.createElement('img');
          imgElement.src = image.image.url;
          imgElement.alt = `Gallery Image ${index + 1}`;
          imgElement.classList.add('gallery-image'); // Add class for styling

          // Append the image to the wrapper div
          wrapperDiv.appendChild(imgElement);

          // Append the wrapper div to the gallery container
          galleryContainer.appendChild(wrapperDiv);
        });
      }


      // Handle YouTube Video Embed
      if (data.videoUrl) {
        const videoUrl = data.videoUrl.replace("watch?v=", "embed/"); // Convert to embeddable URL
        const videoIframe = document.querySelector('.property-video-iframe');
        if (videoIframe) {
          videoIframe.src = videoUrl;
        } else {
          console.error('Video iframe not found');
        }
      } else {
        console.error('No video URL found');
      }

      // Populate Contact Section
      // document.getElementById('contact-header').innerHTML = data.contactFormHeaderText || 'Get Project materials and info on';
      //document.getElementById('contact-header-bold').innerHTML = data.contactFormBoldText || 'Available Units';

      document.getElementById('manager-name').textContent = data.agentName || 'Not Available';
      document.getElementById('manager-occupation').textContent = data.agentOccupation || 'Not Available';
      document.getElementById('manager-phone').href = `tel:${data.agentPhone || ''}`;
      document.getElementById('manager-phone').textContent = data.agentPhone || '+971 50 123 4567';

      // Assign the agent photo URL correctly
      const agentPhotoElement = document.getElementById('agent-photo');
      console.log('Agent Photo URL:', data.agentPhoto ? data.agentPhoto.url : 'No Photo URL provided'); // Log to check if the URL exists
      if (data.agentPhoto && data.agentPhoto.url) {
        agentPhotoElement.src = data.agentPhoto.url;
      } else {
        agentPhotoElement.src = '/path/to/default-picture.jpg';  // Fallback in case no image is provided
      }

      // Check and update the full-width image
      const fullwidthImageElement = document.getElementById('fullwidth-image');
      if (data.fullwidthImage && data.fullwidthImage.url) {
        fullwidthImageElement.src = data.fullwidthImage.url;
      } else {
        fullwidthImageElement.src = '/path/to/default-fullwidth-image.jpg'; // Fallback image
      }

      // Assuming the API response contains `amenitiesImage`
      if (data.amenitiesImage && data.amenitiesImage.url) {
        document.getElementById('amenities-image').src = data.amenitiesImage.url;
      } else {
        document.getElementById('amenities-image').src = '/path/to/default-amenities-image.jpg'; // Default image fallback
      }

      // Update location title
      document.getElementById('location-title').textContent = data.locationTitle || 'Location';

      // Update location description (split into two paragraphs if needed)
      const locationDescription = data.locationDescription || 'Loading description...';
      const paragraphs = locationDescription.split('\n\n'); // Assuming paragraphs are split by double newlines
      const locationDescriptionElement = document.getElementById('location-description');

      // Clear existing content
      locationDescriptionElement.innerHTML = '';

      // Add paragraphs
      paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        locationDescriptionElement.appendChild(p);
      });

      // Populate location items
      const locationItemsContainer = document.getElementById('location-items');
      locationItemsContainer.innerHTML = ''; // Clear any existing content

      if (data.locationItems && data.locationItems.length > 0) {
        data.locationItems.forEach(item => {
          const locationItem = document.createElement('div');
          locationItem.classList.add('location-item');
          locationItem.innerHTML = `
          <img src="${item.image ? item.image.url : '/path/to/default-image.jpg'}" 
               alt="${item.place}" class="location-image">
          <div class="location-item-wrapper">
            ${item.distance} <br> to ${item.place}
          </div>
        `;
          locationItemsContainer.appendChild(locationItem);
        });
      }
      // Store latitude and longitude for map initialization
      projectLatitude = parseFloat(data.latitude) || -25.363;
      projectLongitude = parseFloat(data.longitude) || 131.044;

      // Fetching the Google Maps script and ensuring callback to initMap
      var script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCvfYNuZy5x4nYFZI0t3rCY6ePdU2ss9nk&callback=initMap";
      script.defer = true;
      document.head.appendChild(script);

    } else {
      console.error('No project data found');
    }

    // Update General Plan Section
    document.getElementById('generalPlanTag').textContent = data.generalPlanTag || 'Cluster';
    document.getElementById('generalPlanTitle').textContent = data.generalPlanTitle || 'General Plan';

    const generalPlanImageElement = document.getElementById('generalPlanImage');
    if (data.generalPlanImage && data.generalPlanImage.url) {
      generalPlanImageElement.src = data.generalPlanImage.url;
    } else {
      generalPlanImageElement.src = '/path/to/default-image.jpg';  // Fallback in case no image is provided
    }

    // Ensure floorPlans exists and is an array
    const floorPlans = data.floorPlans || [];

    if (!Array.isArray(floorPlans) || floorPlans.length === 0) {
      console.error('No floor plans found or invalid format');
      return; // Exit early if there's no valid floor plan data
    }

    // Unique types (for filtering)
    const types = [...new Set(floorPlans.map(plan => plan.type))];

    // Populate filters dynamically
    const filtersContainer = document.getElementById('unit-filters');
    filtersContainer.innerHTML = ''; // Clear existing content

    types.forEach((type, index) => {
      const filterElement = document.createElement('div');
      filterElement.classList.add('unit-filter');
      if (index === 0) filterElement.classList.add('active'); // Make the first filter active
      filterElement.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      filterElement.dataset.type = type;

      filterElement.addEventListener('click', () => {
        // Remove 'active' class from all filters
        document.querySelectorAll('.unit-filter').forEach(el => el.classList.remove('active'));
        // Add 'active' to the clicked filter
        filterElement.classList.add('active');
        // Show units of the selected type
        showUnitsOfType(type);
      });

      filtersContainer.appendChild(filterElement);
    });

    // Show the first type of units by default
    showUnitsOfType(types[0]);

    function showUnitsOfType(type) {
      const unitsBody = document.getElementById('units-body');
      unitsBody.innerHTML = ''; // Clear existing content

      floorPlans
        .filter(plan => plan.type === type)
        .forEach((plan, index) => {
          const unitCard = document.createElement('div');
          unitCard.classList.add('unit-card');
          unitCard.id = `unit-${index + 1}`;

          unitCard.innerHTML = `
  <div class="d-flex align-items-center">
    <span>
      <div class="unit-title">${plan.title}</div>
      <div class="unit-size">
        <div class="unit-icon">
          <img src="images/ruler_icon.svg" alt="">
        </div>
        <div class="unit-size-description">Total square:<br> ${plan.measurement}</div>
      </div>
      <div class="unit-button-wrapper">
        <a href="${plan.floorPlanDocument?.url || '#'}" class="download-brochure-button black-border-btn" download>
          Download Brochure
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download"
            class="download-icon" viewBox="0 0 512 512">
            <path fill="currentColor"
              d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3
              0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5
              12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64
              28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-
              64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-
              48z"></path>
          </svg>
        </a>
      </div>
    </span>
  </div>
  <div id="unit-image-${index + 1}" class="unit-right"
    style="background-image: url('${plan.image?.url || '/path/to/default-image.jpg'}');"></div>
`;


          unitsBody.appendChild(unitCard);
        });
    }




    // Update the Financial Section Header
    document.getElementById('headingTitle').textContent = 'Financial Information';
    document.getElementById('headingTag').textContent = 'Financial';

    // Update the Payment Plan Heading
    const paymentPlanHeadingElement = document.getElementById('paymentPlan');
    if (paymentPlanHeadingElement && data.paymentPlanHeading && data.paymentPlanValue) {
      paymentPlanHeadingElement.innerHTML = `${data.paymentPlanHeading} <span id="paymentPlanValue" class="text-danger">${data.paymentPlanValue}</span> Payment Plan`;
    }

    // Update the Features (Down Payment, Installments, Completion)
    document.getElementById('featureValue1').textContent = data.downPaymentFinancial || '10%';
    document.getElementById('featureDescription1').textContent = 'Down Payment';

    document.getElementById('featureValue2').textContent = data.installments || '70%';
    document.getElementById('featureDescription2').textContent = 'Installments';

    document.getElementById('featureValue3').textContent = data.completion || '20%';
    document.getElementById('featureDescription3').textContent = 'Completion';

    // Developer Section
    document.getElementById('headingTagDeveloperSection').textContent = data.developerHeadingTag || 'Developer';
    document.getElementById('headingTitleDeveloperSection').textContent = data.developerHeadingTitle || 'About EMAAR Properties';
    document.getElementById('developerContent').innerHTML = `
        <p>${data.developerContent1}</p>
        <p>${data.developerContent2}</p>
      `;


    // Update the Developer Video URL
    const developerVideo = document.getElementById('developerVideo');
    if (developerVideo && data.developerVideoUrl) {
      developerVideo.src = data.developerVideoUrl;
    }


    // Reference to the materials container
    const materialsContainer = document.getElementById('materialsBoxes');

    // Clear existing content
    materialsContainer.innerHTML = '';

    // Check if materials data is available
    if (data.materials && Array.isArray(data.materials)) {
      data.materials.forEach((material) => {
        const materialBox = document.createElement('div');
        materialBox.classList.add('col-md-4', 'mb-4');

        materialBox.innerHTML = `
      <div class="card h-100 project-met shadow material-box">
        <div class="material-image-container position-relative">
          <img
            src="${material.image.url}"
            alt="${material.title}"
            class="card-img-top"
            style="height: 350px; object-fit: cover;"
          />
        </div>
        <div class="card-body d-flex justify-content-center align-items-center">
          <a href="${material.downloadLink.url}" class="btn-request-callback">
            Download ${material.title}
            <i class="fas fa-download ms-3"></i>
          </a>
        </div>
      </div>
    `;

        materialsContainer.appendChild(materialBox);
      });
    } else {
      // Handle the case where materials data is not available
      materialsContainer.innerHTML = '<p>No materials available at this time.</p>';
    }


    // Handle FAQ Section
    if (data.faqs && data.faqs.length > 0) {
      const faqAccordion = document.getElementById('faqAccordion');
      faqAccordion.innerHTML = ''; // Clear existing content

      // Loop through each FAQ item in the data
      data.faqs.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('accordion-item', 'mb-3');

        const faqHeadingId = `question${index + 1}Heading`;
        const faqAnswerId = `faqAnswer${index + 1}`;

        faqItem.innerHTML = `
      <h2 id="${faqHeadingId}" class="accordion-header">
        <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse"
          data-bs-target="#${faqAnswerId}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="${faqAnswerId}">
          ${faq.question}
        </button>
      </h2>
      <div id="${faqAnswerId}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="${faqHeadingId}" data-bs-parent="#faqAccordion">
        <div class="accordion-body">
          ${faq.answer}
        </div>
      </div>
    `;

        faqAccordion.appendChild(faqItem);
      });
    } else {
      console.warn('No FAQs found for this project.');
    }

    // Contact Section 2 Header
    document.getElementById('contact2HeadingTag').textContent = data.contact2HeadingTag || 'Contact Us';
    document.getElementById('contact2Title').textContent = data.contact2Title || 'Our expert will help you to buy the Best Property in Dubai';

    // Contact Section 2 Details
    document.getElementById('contact2Name').textContent = data.contact2Name || 'Sharmeen Akhtar';
    document.getElementById('contact2Occupation').textContent = data.contact2Occupation || 'Sales Director';
    document.getElementById('contact2PhoneNumber').textContent = data.contact2PhoneNumber || '+971 58 388 2908';
    document.getElementById('contact2EmailAddress').textContent = data.contact2EmailAddress || 'sharmeen@dubaidunes.ae';
    document.getElementById('contact2Website').textContent = data.contact2Website || 'dubaidunesproperties.com';

    // Set the company logo if exists
    if (data.contact2CompanyLogo && data.contact2CompanyLogo.url) {
      document.getElementById('contact2CompanyLogoimg').src = data.contact2CompanyLogo.url;
    }

    // Set the contact image if exists
    const contactImageElement = document.getElementById('contact2ImageImg');
    if (data.contact2Image && data.contact2Image.url) {
      contactImageElement.src = data.contact2Image.url;
    } else {
      contactImageElement.src = '/path/to/default-image.jpg'; // Fallback image
    }


    // Clear the grid before rendering new data
    similarProjectsGrid.innerHTML = '';

    // Loop through each similar project and create the HTML structure dynamically
    data.similarProjects.forEach((project, index) => {
      // Create the HTML elements for each similar project
      const projectBox = document.createElement('a');
      projectBox.setAttribute('id', `similarProject${index + 1}`);
      projectBox.setAttribute('class', 'similarProjectBox');
      projectBox.setAttribute('href', project.similarProject_link);

      const imageContainer = document.createElement('div');
      imageContainer.setAttribute('id', `similarProjectImageContainer${index + 1}`);
      imageContainer.setAttribute('class', 'similarProjectImageContainer');

      const img = document.createElement('img');
      img.setAttribute('id', `similarProjectImage${index + 1}`);
      img.setAttribute('alt', project.similarProject_title);
      img.setAttribute('src', project.similarProject_image.url || 'path_to_default_image.jpg');

      const tagsContainer = document.createElement('div');
      tagsContainer.setAttribute('id', `similarProjectTagsContainer${index + 1}`);
      tagsContainer.setAttribute('class', 'similarProjectTagsContainer');

      const developerTag = document.createElement('div');
      developerTag.setAttribute('id', `similarProjectTagDeveloper${index + 1}`);
      developerTag.setAttribute('class', 'similarProjectTag');
      developerTag.textContent = `By ${project.similarProject_developer}`;

      const handoverTag = document.createElement('div');
      handoverTag.setAttribute('id', `similarProjectTagHandover${index + 1}`);
      handoverTag.setAttribute('class', 'similarProjectTag');
      handoverTag.textContent = `Handover ${project.similarProject_handoverDate}`;

      // Append tags to tags container
      tagsContainer.appendChild(developerTag);
      tagsContainer.appendChild(handoverTag);

      // Append image and tags container to image container
      imageContainer.appendChild(img);
      imageContainer.appendChild(tagsContainer);

      const textContainer = document.createElement('div');
      textContainer.setAttribute('id', `similarProjectTextContainer${index + 1}`);
      textContainer.setAttribute('class', 'similarProjectTextContainer');

      const projectName = document.createElement('div');
      projectName.setAttribute('id', `similarProjectName${index + 1}`);
      projectName.setAttribute('class', 'similarProjectName');
      projectName.textContent = project.similarProject_title;

      // Append the project name to the text container
      textContainer.appendChild(projectName);

      // Append image container and text container to the project box
      projectBox.appendChild(imageContainer);
      projectBox.appendChild(textContainer);

      // Finally, append the project box to the grid
      similarProjectsGrid.appendChild(projectBox);
    });


    // Update Footer Text and Links
    const footer = data;  // Use data (API response) for footer

    if (footer) {
      document.querySelector('.footer-left p').textContent = footer.footerText || '© 2024 Your Company';
      document.querySelector('.footer-left a[href="/terms/privacy_policy"]').setAttribute('href', footer.privacyLink || '/terms/privacy_policy');
      document.querySelector('.footer-left a[href="/terms"]').setAttribute('href', footer.termsLink || '/terms');
      document.querySelector('.footer-left a[href="/sitemaps/v2"]').setAttribute('href', footer.sitemapLink || '/sitemaps/v2');
      document.querySelector('.footer-left a[href="/about/company-details"]').setAttribute('href', footer.companyDetailsLink || '/about/company-details');

      // Update Language and Currency
      document.querySelector('.footer-button .button-text').textContent = footer.languageText || 'English (IN)';
      document.querySelector('.footer-right .footer-button:nth-of-type(2) .button-text').textContent = footer.currencyText || '₹ INR';

      // Update Social Media Links (with fallback)
      const facebookLinkElement = document.querySelector('.social-media-links a[href="https://www.facebook.com/AirbnbIndia"]');
      if (footer.facebookLink) {
        facebookLinkElement.setAttribute('href', footer.facebookLink);
      } else {
        facebookLinkElement.style.display = 'none'; // Hide if no link
      }

      const twitterLinkElement = document.querySelector('.social-media-links a[href="https://twitter.com/airbnb_in"]');
      if (footer.twitterLink) {
        twitterLinkElement.setAttribute('href', footer.twitterLink);
      } else {
        twitterLinkElement.style.display = 'none'; // Hide if no link
      }

      const instagramLinkElement = document.querySelector('.social-media-links a[href="https://instagram.com/airbnb"]');
      if (footer.instagramLink) {
        instagramLinkElement.setAttribute('href', footer.instagramLink);
      } else {
        instagramLinkElement.style.display = 'none'; // Hide if no link
      }
    } else {
      console.error('No footer data found');
    }

    /* document.getElementById('callback-form').addEventListener('click', async function (event) {
       event.preventDefault(); // Prevent default form submission behavior
       alert(1);
       // Gather form data from the updated IDs
       const name = document.getElementById('callback-name').value.trim();
       const email = document.getElementById('callback-email').value.trim();
       const phone = iti.getNumber(); // Use intlTelInput to get the formatted phone number
       const slug = window.location.pathname.split('/').pop(); // Extract the slug from the current URL
     
       console.log({ name, email, phone }); // Check what values are being captured
     
       // Check if all fields are filled
       if (!name || !email || !phone) {
         alert('Please fill out all fields.');
         return; // Stop the form from submitting if validation fails
       }
     
       // Prepare form data for submission
       const formData = {
         name,
         email,
         phone,
         slug,
       };
     
       try {
         console.log("Submitting form data:", formData); // Add logging to inspect the data
         // Send a POST request to the API
         const response = await fetch('/api/submit-callback', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(formData),
         });
     
         const result = await response.json();
         console.log("API response:", result); // Log the API response
     
         if (result.success) {
           alert('Callback request submitted successfully!');
           // Optionally reset the form or close the modal
           document.getElementById('callback-form').reset(); // Reset the form
           hidePopup(); // Close the modal after successful submission
         } else {
           alert('Error submitting request: ' + result.error);
         }
       } catch (error) {
         console.error('Error submitting callback request:', error);
         alert('Failed to submit request. Please try again.');
       }
     });*/

    


  })
  .catch(error => {
    console.error('Error fetching project data:', error);
  });

// Initialize Google Map with dynamic location
function initMap() {
  const location = { lat: projectLatitude, lng: projectLongitude };
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: location,
    mapTypeId: 'roadmap'
  });

  const marker = new google.maps.Marker({
    position: location,
    map: map
  });
}