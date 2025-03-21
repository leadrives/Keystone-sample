import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship, password, timestamp, file, checkbox, json, integer } from '@keystone-6/core/fields';
import { type Lists } from '.keystone/types';
import { virtual } from '@keystone-6/core/fields';
import { graphql } from '@keystone-6/core';




export const lists: Lists = {
  // User list remains unchanged
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

  // Post list remains unchanged
  Post: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      content: text({ ui: { displayMode: 'textarea' } }),
      author: relationship({ ref: 'User.posts', many: false }),
    },
  }),

  // Updated Project list with fields for all sections including Units
  Project: list({
    access: allowAll,
    fields: {
      slug: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      heroImage: file({ storage: 'local_images' }),
      heroTwoLogo: file({ 
        storage: 'local_images', 
        ui: { description: "Logo for the Hero section (Hero Two)" } 
      }),
      mainHeading: text({ validation: { isRequired: true } }),
      subHeading: text({ validation: { isRequired: true } }),
      agents: relationship({
        ref: 'Agent.project',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'photo'],
          inlineCreate: { fields: ['name', 'photo'] },
          inlineEdit: { fields: ['name', 'photo'] },
        },
      }),
      // New field for manager count
      agentCount: integer({
        validation: { isRequired: false },
        defaultValue: 0,
        ui: {
          description: "Manager count to display (if set, overrides computed count)",
        },
      }),

      // Gallery fields
      galleryMainHeading: text({ validation: { isRequired: false } }),
      galleryTitle: text({ validation: { isRequired: false } }),
      galleryParagraph: text({ ui: { displayMode: 'textarea' } }),
      galleryImages: relationship({
        ref: 'GalleryImage.project',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['image'],
          inlineCreate: { fields: ['image'] },
          inlineEdit: { fields: ['image'] },
        },
      }),
      amenitiesList: text({ ui: { displayMode: 'textarea' } }),

      // Payment Plan fields
      paymentPlanHeading: text({ validation: { isRequired: false } }),
      paymentPlanImage: file({ storage: 'local_images' }),
      paymentPlanTitle: text({ validation: { isRequired: false } }),
      paymentPlanNumber: text({ validation: { isRequired: false } }),
      paymentPlanSuffix: text({ validation: { isRequired: false } }),
      paymentPlanDescription: text({ ui: { displayMode: 'textarea' } }),
      paymentPlanBullets: text({ ui: { displayMode: 'textarea' } }),

      // Location fields
      locationHeading: text({ validation: { isRequired: false } }),
      locationSubheading: text({ validation: { isRequired: false } }),
      locationTitle: text({ validation: { isRequired: false } }),
      locationDescription: text({ ui: { displayMode: 'textarea' } }),
      locationDescription2: text({ ui: { displayMode: 'textarea' } }),
      locationBullets: text({ ui: { displayMode: 'textarea' } }),
      locationMapImage: file({ storage: 'local_images' }),

      // Developer fields
      developerTitle: text({ validation: { isRequired: false } }),
      developerParagraph1: text({ ui: { displayMode: 'textarea' } }),
      developerParagraph2: text({ ui: { displayMode: 'textarea' } }),
      developerRedParagraph: text({ ui: { displayMode: 'textarea' } }),
      developerRedBoldText: text({ validation: { isRequired: false } }),
      developerImage1: file({ storage: 'local_images' }),
      developerImage2: file({ storage: 'local_images' }),

      // Contact fields
      contactHeading: text({ validation: { isRequired: false } }),
      contactProfilePic: file({ storage: 'local_images' }),
      contactProfileName: text({ validation: { isRequired: false } }),
      contactProfileDescription: text({ ui: { displayMode: 'textarea' } }),
      contactBullets: text({ ui: { displayMode: 'textarea' } }),
      contactMap: file({ storage: 'local_images' }),

      // FAQ field (relationship to many FAQ items)
      faq: relationship({
        ref: 'FAQ.project',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['question', 'answer'],
          inlineCreate: { fields: ['question', 'answer'] },
          inlineEdit: { fields: ['question', 'answer'] },
        },
      }),
      // New fields for the parallax and panoramic images
      parallaxImage: file({ 
        storage: 'local_images', 
        ui: { description: "Image for the full parallax section" } 
      }),
      panoramicImage: file({ 
        storage: 'local_images', 
        ui: { description: "Image for the panoramic image section" } 
      }),

      // Amenities Section fields
      amenitiesSectionHeading: text({ validation: { isRequired: false } }),
      amenitiesCards: relationship({
        ref: 'AmenityCard.project',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['title', 'description', 'image', 'categories'],
          inlineCreate: { fields: ['title', 'description', 'image', 'categories'] },
          inlineEdit: { fields: ['title', 'description', 'image', 'categories'] },
        },
      }),
      amenityFilters: relationship({
        ref: 'AmenityFilter.project',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineCreate: { fields: ['name'] },
          inlineEdit: { fields: ['name'] },
        },
      }),

      // UNITS SECTION fields
      units: relationship({
        ref: 'Unit.project',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['type', 'title', 'price', 'tag', 'cityView', 'sqft', 'image'],
          inlineCreate: { fields: ['type', 'title', 'price', 'tag', 'cityView', 'sqft', 'image'] },
          inlineEdit: { fields: ['type', 'title', 'price', 'tag', 'cityView', 'sqft', 'image'] },
        },
      }),
      unitFilters: relationship({
        ref: 'UnitFilter.project',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineCreate: { fields: ['name'] },
          inlineEdit: { fields: ['name'] },
        },
      }),
      // MATERIALS SECTION fields
      materials: relationship({
        ref: 'MaterialCard.project',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['title', 'description', 'image', 'document'],
          inlineCreate: { fields: ['title', 'description', 'image', 'document'] },
          inlineEdit: { fields: ['title', 'description', 'image', 'document'] },
        },
      }),

      viewPage: virtual({
        field: graphql.field({
          type: graphql.String,
          resolve(item) {
            const baseUrl =
              process.env.NODE_ENV === 'production'
                ? 'https://properties.smylivings.com'
                : 'http://localhost:3000';
            return `${baseUrl}/projects/${item.slug}`;
          },
        }),
        ui: {
          listView: ({
            fieldMode: 'read',
            cell: async () => {
              const { CustomLinkCell } = await import('./admin-ui/components/CustomLinkCell');
              return CustomLinkCell;
            },
          } as any),
        },
      }),
      
   

    },
    
    ui: {
      listView: {
        initialColumns: ['mainHeading', 'subHeading', 'slug', 'viewPage'],
      },
    },
  }),

  // New Agent list
  Agent: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      photo: file({ storage: 'local_images' }),
      project: relationship({ ref: 'Project.agents', many: false }),
    },
  }),

  // New GalleryImage list
  GalleryImage: list({
    access: allowAll,
    fields: {
      image: file({ storage: 'local_images' }),
      project: relationship({ ref: 'Project.galleryImages', many: false }),
    },
  }),

  // New FAQ list
  FAQ: list({
    access: allowAll,
    fields: {
      question: text({ validation: { isRequired: true } }),
      answer: text({ ui: { displayMode: 'textarea' } }),
      project: relationship({ ref: 'Project.faq', many: false }),
    },
  }),

  // New AmenityCard list
  AmenityCard: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: 'textarea' } }),
      image: file({ storage: 'local_images' }),
      // Categories stored as a comma-separated string
      categories: text({ validation: { isRequired: false } }),
      project: relationship({ ref: 'Project.amenitiesCards', many: false }),
    },
  }),

  // New AmenityFilter list
  AmenityFilter: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      project: relationship({ ref: 'Project.amenityFilters', many: false }),
    },
  }),

  // New Unit list for Units Section
  Unit: list({
    access: allowAll,
    fields: {
      type: text({ validation: { isRequired: true } }),
      title: text({ validation: { isRequired: true } }),
      price: text({ validation: { isRequired: true } }),
      image: file({ storage: 'local_images' }),
      tag: text({ validation: { isRequired: false } }),
      cityView: checkbox({ defaultValue: false }),
      sqft: text({ validation: { isRequired: false } }),
      project: relationship({ ref: 'Project.units', many: false }),
    },
  }),

  // New UnitFilter list for Units Section
  UnitFilter: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      project: relationship({ ref: 'Project.unitFilters', many: false }),
    },
  }),
  // New MaterialCard list for Materials Section
  MaterialCard: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: 'textarea' } }),
      image: file({ storage: 'local_images' }),
      document: file({ storage: 'local_documents' }),
      project: relationship({ ref: 'Project.materials', many: false }),
    },
  }),
  // Updated SiteSetting list for global settings (header/footer)
  SiteSetting: list({
    access: allowAll,
    fields: {
      logo: file({ storage: 'local_images' }),
      footerLogo: file({ storage: 'local_images' }),
      // Replace JSON field with a relationship to SocialLink
      footerSocialLinks: relationship({
        ref: 'SocialLink.siteSetting',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'icon', 'url'],
          inlineCreate: { fields: ['name', 'icon', 'url'] },
          inlineEdit: { fields: ['name', 'icon', 'url'] },
        },
      }),
      footerCopyright: text({ validation: { isRequired: false } }),
    },
  }),

  // New SocialLink list for managing footer social links
  SocialLink: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      icon: file({ storage: 'local_images' }),
      url: text({ validation: { isRequired: true } }),

      // Reverse relationship (optional)
      siteSetting: relationship({ ref: 'SiteSetting.footerSocialLinks', many: false }),
    },
  }),
  // ... other list definitions

CallbackRequest: list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true } }),
    phone: text({ validation: { isRequired: true } }),
    pageUrl: text({ validation: { isRequired: true } }),
    ipAddress: text({ validation: { isRequired: true } }),
    project: relationship({ ref: 'Project', many: false }), // Connect to the project by slug
    // NEW FIELDS:
    projectName: text({ validation: { isRequired: false } }),
    actionFrom: text({ validation: { isRequired: false } }),
  },
}),

};
