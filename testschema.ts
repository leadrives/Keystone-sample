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
          cardFields: ['title', 'type', 'measurement'],
          inlineCreate: { fields: ['title', 'type', 'measurement'] },
          inlineEdit: { fields: ['title', 'type', 'measurement'] },
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
    },
  }),
};
