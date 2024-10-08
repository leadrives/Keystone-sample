import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship, password, timestamp, file, select } from '@keystone-6/core/fields';
import { type Lists } from '.keystone/types'; // Import types (optional but useful when using TypeScript)

export const lists: Lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: 'Post.author', many: true }),
      createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    },
  }),

  Post: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      content: text({ ui: { displayMode: 'textarea' } }),
      author: relationship({ ref: 'User.posts', many: false }),
    },
  }),

  // Project Model for CMS
  Project: list({
    access: allowAll,
    fields: {
      // Title of the Project
      title: text({ validation: { isRequired: true } }),

      // Description or Overview
      description: text({ ui: { displayMode: 'textarea' } }),

      // Slug for custom URLs
      slug: text({ validation: { isRequired: true }, isIndexed: 'unique' }),

      // Header elements
      requestCallbackText: text({ defaultValue: 'Request Callback' }), // Button text
      // Allow uploading of the header logo from the admin panel
      // New field for the header logo
      headerLogo: file({
        storage: 'local_images', // Use the storage config for storing local files
      }),

      // Hero Image and Logos
      bannerImage: file({ storage: 'local_images' }), // Banner background image
      projectLogo: file({ storage: 'local_images' }), // Project logo
      developerLogo: file({ storage: 'local_images' }), // Developer logo

      // Pricing and Details
      startingPrice: text({ validation: { isRequired: true }, defaultValue: 'AED 4.48M' }), // Starting price text
      paymentPlan: text({ defaultValue: '80/20' }), // Payment plan
      area: text({ defaultValue: '4,016 sq. ft.' }), // Area size
      handoverDate: text({ defaultValue: 'Q4 2028' }), // Handover date

      // Project Tags
      projectTag1: text({ defaultValue: 'Townhouses' }), // First project tag
      projectTag2: text({ defaultValue: 'Villas' }), // Second project tag

      // Add new fields for the features section
      paymentStructure: text({ validation: { isRequired: false } }), // 80/20, for example
      downPayment: text({ validation: { isRequired: false } }), // 10%, for example
      developerName: text({ validation: { isRequired: false } }), // Developer name
      bedrooms: text({ validation: { isRequired: false } }), // 4-5, for example
      numberOfUnits: text({ validation: { isRequired: false } }), // 574, for example

      // New Fields for About Section
      aboutHeading: text({ validation: { isRequired: true } }), // For heading
      aboutDescription: text({ ui: { displayMode: 'textarea' } }), // Description
      featurePrice: text(), // Price Feature
      featureDownPayment: text(), // Down Payment Feature
      featureHandoverDate: text(), // Handover Date Feature
      availabilityButtonText: text(), // Text for the "Get Availability" button
      brochureButtonText: text(), // Text for the "Download Brochure" button

      // New fields for gallery and video URL
      galleryImages: relationship({
        ref: 'GalleryImage.project',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['image'],
          inlineEdit: { fields: ['image'] },
          inlineCreate: { fields: ['image'] },
        },
      }),
      videoUrl: text({ validation: { isRequired: false } }), // YouTube video URL

      // Dynamic fields for contact form
      agentName: text({ validation: { isRequired: true } }),
      agentOccupation: text(),
      agentPhone: text(),
      agentPhoto: file({ storage: 'local_images' }),

      contactFormHeaderText: text({ ui: { displayMode: 'textarea' } }),
      contactFormBoldText: text(),
      // Adding the new full-width image field
      fullwidthImage: file({
        storage: 'local_images', // Ensure proper storage config
      }),

      amenitiesImage: file({
        storage: 'local_images', // Reference to the storage config
      }),

      locationTitle: text({ validation: { isRequired: true } }),
      locationDescription: text({ ui: { displayMode: 'textarea' } }),
      locationItems: relationship({
        ref: 'LocationItem.project',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['image', 'distance', 'place'],
          inlineCreate: { fields: ['image', 'distance', 'place'] },
          inlineEdit: { fields: ['image', 'distance', 'place'] },
        },
      }),
      latitude: text({ validation: { isRequired: true } }), // Add this for latitude
      longitude: text({ validation: { isRequired: true } }), // Add this for longitude

      generalPlanTag: text({ validation: { isRequired: true } }),
      generalPlanTitle: text({ validation: { isRequired: true } }),
      generalPlanImage: file({
        storage: 'local_images', // File storage configuration for the general plan image
      }),

      // Relationship to the FloorPlan model
      floorPlans: relationship({
        ref: 'FloorPlan.project',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['title', 'type', 'measurement', 'image', 'floorPlanDocument'], // Added image and floorPlanDocument
          inlineCreate: { fields: ['title', 'type', 'measurement', 'image', 'floorPlanDocument'] },
          inlineEdit: { fields: ['title', 'type', 'measurement', 'image', 'floorPlanDocument'] },
        },
      }),
      // Add field for the Payment Plan Heading Text
      paymentPlanHeading: text({
        validation: { isRequired: true },
        defaultValue: 'Attractive Payment Plan', // Static text
      }),

      // Separate field for the Payment Plan value (e.g., 80/20)
      paymentPlanValue: text({
        validation: { isRequired: true },
        defaultValue: '80/20', // Default value
      }),

      // Fields for the Financial Section
      downPaymentFinancial: text({ validation: { isRequired: true }, defaultValue: '10%' }), // Down Payment
      installments: text({ validation: { isRequired: true }, defaultValue: '70%' }), // Installments
      completion: text({ validation: { isRequired: true }, defaultValue: '20%' }), // Completion

      // Developer Section Fields
      developerHeadingTag: text({ validation: { isRequired: true }, defaultValue: 'Developer' }),
      developerHeadingTitle: text({ validation: { isRequired: true }, defaultValue: 'About EMAAR Properties' }),
      developerContent1: text({ ui: { displayMode: 'textarea' }, validation: { isRequired: true }, defaultValue: 'With a net asset value of AED 177.5 Billion, Emaar Properties is among the most admired and valuable real estate development companies in the world.' }),
      developerContent2: text({ ui: { displayMode: 'textarea' }, validation: { isRequired: true }, defaultValue: 'Emaar, which has established competencies in real estate, retail and shopping malls, hospitality, and leisure, shapes new lifestyles through its commitment to design excellence, build quality, and timely delivery.' }),

      developerVideoUrl: text({ defaultValue: 'https://www.youtube.com/embed/mTaA2an7_us' }),
      materials: relationship({
        ref: 'Material.project',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['title', 'image'],
          inlineCreate: { fields: ['title', 'image', 'downloadLink'] },
          inlineEdit: { fields: ['title', 'image', 'downloadLink'] },
        },
      }),
      faqs: relationship({
        ref: 'FAQ.project',
        many: true,  // One-to-many relationship
        ui: {
          displayMode: 'cards',
          cardFields: ['question', 'answer'],
          inlineCreate: { fields: ['question', 'answer', 'order'] },
          inlineEdit: { fields: ['question', 'answer', 'order'] },
        },
      }),

      // Fields for the Second Contact Us Section
      contact2HeadingTag: text({
        validation: { isRequired: true },
        defaultValue: 'Contact Us',
      }),
      contact2Title: text({
        validation: { isRequired: true },
        defaultValue: 'Our expert will help you to buy the Best Property in Dubai',
      }),
      contact2Name: text({
        validation: { isRequired: true },
        defaultValue: 'Sharmeen Akhtar',
      }),
      contact2Occupation: text({
        validation: { isRequired: true },
        defaultValue: 'Sales Director',
      }),
      contact2PhoneNumber: text({
        validation: { isRequired: true },
        defaultValue: '+971 58 388 2908',
      }),
      contact2EmailAddress: text({
        validation: { isRequired: true },
        defaultValue: 'sharmeen@dubaidunes.ae',
      }),
      contact2Website: text({
        validation: { isRequired: true },
        defaultValue: 'dubaidunesproperties.com',
      }),
      contact2CompanyLogo: file({
        storage: 'local_images',
      }),
      contact2Image: file({
        storage: 'local_images',
      }),

      similarProjects: relationship({
        ref: 'SimilarProject.project',
        many: true,
        ui: {
          displayMode: 'cards', // Use cards for better visibility in the admin panel
          cardFields: ['similarProject_title', 'similarProject_developer', 'similarProject_handoverDate', 'similarProject_link'],
          inlineCreate: {
            fields: [
              'similarProject_title',
              'similarProject_developer',
              'similarProject_handoverDate',
              'similarProject_link',
              'similarProject_image',
            ], // Include all necessary fields for inline creation
          },
          inlineEdit: {
            fields: [
              'similarProject_title',
              'similarProject_developer',
              'similarProject_handoverDate',
              'similarProject_link',
              'similarProject_image',
            ], // Include all necessary fields for inline editing
          },
        },
      }),

      footerText: text({ validation: { isRequired: true }, defaultValue: '© 2024 Airbnb, Inc.' }), // Main footer text
      privacyLink: text({ validation: { isRequired: true }, defaultValue: '/terms/privacy_policy' }), // Privacy policy link
      termsLink: text({ validation: { isRequired: true }, defaultValue: '/terms' }), // Terms link
      sitemapLink: text({ validation: { isRequired: true }, defaultValue: '/sitemaps/v2' }), // Sitemap link
      companyDetailsLink: text({ validation: { isRequired: true }, defaultValue: '/about/company-details' }), // Company details link
      languageText: text({ validation: { isRequired: true }, defaultValue: 'English (IN)' }), // Language text
      currencyText: text({ validation: { isRequired: true }, defaultValue: '₹ INR' }), // Currency text

      // Social Media Links
      facebookLink: text({ validation: { isRequired: true }, defaultValue: 'https://www.facebook.com/AirbnbIndia' }),
      twitterLink: text({ validation: { isRequired: true }, defaultValue: 'https://twitter.com/airbnb_in' }),
      instagramLink: text({ validation: { isRequired: true }, defaultValue: 'https://instagram.com/airbnb' }),

      callbackRequests: relationship({
        ref: 'CallbackRequest.project',
        many: true,  // One project can have multiple callback requests
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email', 'phone'],
          inlineEdit: { fields: ['name', 'email', 'phone'] },
        },
      }),

    },
  }),

  // Gallery Image Model for project
  GalleryImage: list({
    access: allowAll,
    fields: {
      image: file({
        storage: 'local_images',
      }),
      project: relationship({ ref: 'Project.galleryImages' }),
    },
  }),

  LocationItem: list({
    access: allowAll,
    fields: {
      image: file({ storage: 'local_images' }),
      distance: text({ validation: { isRequired: true } }),
      place: text({ validation: { isRequired: true } }),
      project: relationship({ ref: 'Project.locationItems' }),
    },
  }),

  FloorPlan: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      type: select({
        options: [
          { label: 'Villa', value: 'villa' },
          { label: 'Penthouse', value: 'penthouse' },
          { label: 'Townhouse', value: 'townhouse' },
          { label: 'Shopping Mall', value: 'shoppingmall' },
        ],
        ui: {
          displayMode: 'segmented-control',
        },
        validation: { isRequired: true },
      }),
      measurement: text({ validation: { isRequired: true } }), // e.g., '4,043.36 sq. ft.'
      image: file({
        storage: 'local_images',
      }),
      floorPlanDocument: file({
        storage: 'local_images', // You can have a separate storage option for documents if needed.
      }),
      project: relationship({ ref: 'Project.floorPlans' }), // Added this field to link floor plans to projects
    },
  }),

  Material: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }), // e.g., "Brochure", "Price List"
      image: file({
        storage: 'local_images', // Storage configuration for images
      }),
      downloadLink: file({
        storage: 'local_documents', // Storage configuration for documents
      }),
      project: relationship({
        ref: 'Project.materials',
      }),
    },
  }),

  // Add FAQ Model
  FAQ: list({
    access: allowAll,
    fields: {
      question: text({ validation: { isRequired: true } }),  // FAQ Question
      answer: text({ ui: { displayMode: 'textarea' }, validation: { isRequired: true } }),  // FAQ Answer
      order: text({ defaultValue: '1' }),  // Optional order for sorting FAQs
      project: relationship({ ref: 'Project.faqs' }),  // Relationship to Project model
    },
  }),

  SimilarProject: list({
    access: allowAll,
    fields: {
      similarProject_title: text({ validation: { isRequired: true } }),
      similarProject_developer: text({ validation: { isRequired: true } }),
      similarProject_handoverDate: text({ validation: { isRequired: true } }),
      similarProject_link: text({ validation: { isRequired: true } }),
      similarProject_image: file({
        storage: 'local_images',
      }),
      project: relationship({
        ref: 'Project.similarProjects',
      }),
    },
    ui: {
      labelField: 'similarProject_title', // Display title in the admin UI
      listView: {
        initialColumns: ['similarProject_title', 'similarProject_developer', 'similarProject_handoverDate'],
      },
    },
  }),

  CallbackRequest: list({
    access: allowAll,  // You can later set specific access controls if needed
    fields: {
      name: text({ validation: { isRequired: true } }),  // Store the user's name
      email: text({ validation: { isRequired: true } }), // Store the user's email
      phone: text({ validation: { isRequired: true } }), // Store the user's phone number

      // Link each callback request to a specific project
      project: relationship({
        ref: 'Project.callbackRequests',
        ui: {
          displayMode: 'cards',
          cardFields: ['title'],  // Show project title in the card
          inlineEdit: { fields: ['title'] },
        },
      }),
      createdAt: timestamp({ defaultValue: { kind: 'now' } }), // Timestamp of the request
    },
    ui: {
      listView: {
        initialColumns: ['name', 'email', 'phone', 'project', 'createdAt'],  // Display columns in Admin UI
      },
    },
  }),

  

};
