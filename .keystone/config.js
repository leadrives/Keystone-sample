"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_express = __toESM(require("express"));
var import_path = __toESM(require("path"));
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var lists = {
  // User list remains unchanged
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
      createdAt: (0, import_fields.timestamp)({ defaultValue: { kind: "now" } })
    }
  }),
  // Post list remains unchanged
  Post: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      content: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      author: (0, import_fields.relationship)({ ref: "User.posts", many: false })
    }
  }),
  // Updated Project list with fields for all sections including Units
  Project: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      slug: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
      heroImage: (0, import_fields.file)({ storage: "local_images" }),
      heroTwoLogo: (0, import_fields.file)({
        storage: "local_images",
        ui: { description: "Logo for the Hero section (Hero Two)" }
      }),
      mainHeading: (0, import_fields.text)({ validation: { isRequired: true } }),
      subHeading: (0, import_fields.text)({ validation: { isRequired: true } }),
      agents: (0, import_fields.relationship)({
        ref: "Agent.project",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name", "photo"],
          inlineCreate: { fields: ["name", "photo"] },
          inlineEdit: { fields: ["name", "photo"] }
        }
      }),
      // New field for manager count
      agentCount: (0, import_fields.integer)({
        validation: { isRequired: false },
        defaultValue: 0,
        ui: {
          description: "Manager count to display (if set, overrides computed count)"
        }
      }),
      // Gallery fields
      galleryMainHeading: (0, import_fields.text)({ validation: { isRequired: false } }),
      galleryTitle: (0, import_fields.text)({ validation: { isRequired: false } }),
      galleryParagraph: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      galleryImages: (0, import_fields.relationship)({
        ref: "GalleryImage.project",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["image"],
          inlineCreate: { fields: ["image"] },
          inlineEdit: { fields: ["image"] }
        }
      }),
      amenitiesList: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      // Payment Plan fields
      paymentPlanHeading: (0, import_fields.text)({ validation: { isRequired: false } }),
      paymentPlanImage: (0, import_fields.file)({ storage: "local_images" }),
      paymentPlanTitle: (0, import_fields.text)({ validation: { isRequired: false } }),
      paymentPlanNumber: (0, import_fields.text)({ validation: { isRequired: false } }),
      paymentPlanSuffix: (0, import_fields.text)({ validation: { isRequired: false } }),
      paymentPlanDescription: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      paymentPlanBullets: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      // Location fields
      locationHeading: (0, import_fields.text)({ validation: { isRequired: false } }),
      locationSubheading: (0, import_fields.text)({ validation: { isRequired: false } }),
      locationTitle: (0, import_fields.text)({ validation: { isRequired: false } }),
      locationDescription: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      locationDescription2: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      locationBullets: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      locationMapImage: (0, import_fields.file)({ storage: "local_images" }),
      // Developer fields
      developerTitle: (0, import_fields.text)({ validation: { isRequired: false } }),
      developerParagraph1: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      developerParagraph2: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      developerRedParagraph: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      developerRedBoldText: (0, import_fields.text)({ validation: { isRequired: false } }),
      developerImage1: (0, import_fields.file)({ storage: "local_images" }),
      developerImage2: (0, import_fields.file)({ storage: "local_images" }),
      // Contact fields
      contactHeading: (0, import_fields.text)({ validation: { isRequired: false } }),
      contactProfilePic: (0, import_fields.file)({ storage: "local_images" }),
      contactProfileName: (0, import_fields.text)({ validation: { isRequired: false } }),
      contactProfileDescription: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      contactBullets: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      contactMap: (0, import_fields.file)({ storage: "local_images" }),
      // FAQ field (relationship to many FAQ items)
      faq: (0, import_fields.relationship)({
        ref: "FAQ.project",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["question", "answer"],
          inlineCreate: { fields: ["question", "answer"] },
          inlineEdit: { fields: ["question", "answer"] }
        }
      }),
      // New fields for the parallax and panoramic images
      parallaxImage: (0, import_fields.file)({
        storage: "local_images",
        ui: { description: "Image for the full parallax section" }
      }),
      panoramicImage: (0, import_fields.file)({
        storage: "local_images",
        ui: { description: "Image for the panoramic image section" }
      }),
      // Amenities Section fields
      amenitiesSectionHeading: (0, import_fields.text)({ validation: { isRequired: false } }),
      amenitiesCards: (0, import_fields.relationship)({
        ref: "AmenityCard.project",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["title", "description", "image", "categories"],
          inlineCreate: { fields: ["title", "description", "image", "categories"] },
          inlineEdit: { fields: ["title", "description", "image", "categories"] }
        }
      }),
      amenityFilters: (0, import_fields.relationship)({
        ref: "AmenityFilter.project",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineCreate: { fields: ["name"] },
          inlineEdit: { fields: ["name"] }
        }
      }),
      // UNITS SECTION fields
      units: (0, import_fields.relationship)({
        ref: "Unit.project",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["type", "title", "price", "tag", "cityView", "sqft", "image"],
          inlineCreate: { fields: ["type", "title", "price", "tag", "cityView", "sqft", "image"] },
          inlineEdit: { fields: ["type", "title", "price", "tag", "cityView", "sqft", "image"] }
        }
      }),
      unitFilters: (0, import_fields.relationship)({
        ref: "UnitFilter.project",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineCreate: { fields: ["name"] },
          inlineEdit: { fields: ["name"] }
        }
      }),
      // MATERIALS SECTION fields
      materials: (0, import_fields.relationship)({
        ref: "MaterialCard.project",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["title", "description", "image", "document"],
          inlineCreate: { fields: ["title", "description", "image", "document"] },
          inlineEdit: { fields: ["title", "description", "image", "document"] }
        }
      })
    }
  }),
  // New Agent list
  Agent: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      photo: (0, import_fields.file)({ storage: "local_images" }),
      project: (0, import_fields.relationship)({ ref: "Project.agents", many: false })
    }
  }),
  // New GalleryImage list
  GalleryImage: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      image: (0, import_fields.file)({ storage: "local_images" }),
      project: (0, import_fields.relationship)({ ref: "Project.galleryImages", many: false })
    }
  }),
  // New FAQ list
  FAQ: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      question: (0, import_fields.text)({ validation: { isRequired: true } }),
      answer: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      project: (0, import_fields.relationship)({ ref: "Project.faq", many: false })
    }
  }),
  // New AmenityCard list
  AmenityCard: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      description: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      image: (0, import_fields.file)({ storage: "local_images" }),
      // Categories stored as a comma-separated string
      categories: (0, import_fields.text)({ validation: { isRequired: false } }),
      project: (0, import_fields.relationship)({ ref: "Project.amenitiesCards", many: false })
    }
  }),
  // New AmenityFilter list
  AmenityFilter: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      project: (0, import_fields.relationship)({ ref: "Project.amenityFilters", many: false })
    }
  }),
  // New Unit list for Units Section
  Unit: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      type: (0, import_fields.text)({ validation: { isRequired: true } }),
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      price: (0, import_fields.text)({ validation: { isRequired: true } }),
      image: (0, import_fields.file)({ storage: "local_images" }),
      tag: (0, import_fields.text)({ validation: { isRequired: false } }),
      cityView: (0, import_fields.checkbox)({ defaultValue: false }),
      sqft: (0, import_fields.text)({ validation: { isRequired: false } }),
      project: (0, import_fields.relationship)({ ref: "Project.units", many: false })
    }
  }),
  // New UnitFilter list for Units Section
  UnitFilter: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      project: (0, import_fields.relationship)({ ref: "Project.unitFilters", many: false })
    }
  }),
  // New MaterialCard list for Materials Section
  MaterialCard: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      description: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      image: (0, import_fields.file)({ storage: "local_images" }),
      document: (0, import_fields.file)({ storage: "local_documents" }),
      project: (0, import_fields.relationship)({ ref: "Project.materials", many: false })
    }
  }),
  // Updated SiteSetting list for global settings (header/footer)
  SiteSetting: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      logo: (0, import_fields.file)({ storage: "local_images" }),
      footerLogo: (0, import_fields.file)({ storage: "local_images" }),
      // Replace JSON field with a relationship to SocialLink
      footerSocialLinks: (0, import_fields.relationship)({
        ref: "SocialLink.siteSetting",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name", "icon", "url"],
          inlineCreate: { fields: ["name", "icon", "url"] },
          inlineEdit: { fields: ["name", "icon", "url"] }
        }
      }),
      footerCopyright: (0, import_fields.text)({ validation: { isRequired: false } })
    }
  }),
  // New SocialLink list for managing footer social links
  SocialLink: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      icon: (0, import_fields.file)({ storage: "local_images" }),
      url: (0, import_fields.text)({ validation: { isRequired: true } }),
      // Reverse relationship (optional)
      siteSetting: (0, import_fields.relationship)({ ref: "SiteSetting.footerSocialLinks", many: false })
    }
  }),
  // ... other list definitions
  CallbackRequest: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({ validation: { isRequired: true } }),
      phone: (0, import_fields.text)({ validation: { isRequired: true } }),
      pageUrl: (0, import_fields.text)({ validation: { isRequired: true } }),
      ipAddress: (0, import_fields.text)({ validation: { isRequired: true } }),
      project: (0, import_fields.relationship)({ ref: "Project", many: false }),
      // Connect to the project by slug
      // NEW FIELDS:
      projectName: (0, import_fields.text)({ validation: { isRequired: false } }),
      actionFrom: (0, import_fields.text)({ validation: { isRequired: false } })
    }
  })
};

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: process.env.SESSION_SECRET
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    session,
    storage: {
      local_images: {
        kind: "local",
        type: "file",
        generateUrl: (pathString) => `/uploads/images/${pathString}`,
        serverRoute: { path: "/uploads/images" },
        storagePath: import_path.default.join(process.cwd(), "public/uploads/images")
      },
      local_documents: {
        kind: "local",
        type: "file",
        generateUrl: (path2) => `/uploads/documents/${path2}`,
        serverRoute: { path: "/uploads/documents" },
        storagePath: import_path.default.join(process.cwd(), "public/uploads/documents")
      }
    },
    server: {
      extendExpressApp: (app, context) => {
        const publicDir = import_path.default.join(process.cwd(), "public");
        app.use(import_express.default.static(publicDir));
        app.use(import_express.default.json());
        app.use(import_express.default.urlencoded({ extended: true }));
        app.get("/api/settings", async (req, res) => {
          try {
            const settingsList = await context.query.SiteSetting.findMany({
              query: `logo { url }
                footerLogo { url }
               
                footerSocialLinks { id name icon { url } url }
                footerCopyright`
            });
            const settings = settingsList[0];
            if (!settings) {
              return res.status(404).json({ error: "Settings not found" });
            }
            res.json(settings);
          } catch (error) {
            console.error("Error fetching settings:", error);
            res.status(500).json({ error: "Failed to fetch settings" });
          }
        });
        app.get("/", async (req, res) => {
          try {
            const projects = await context.query.Project.findMany({
              query: "mainHeading slug subHeading"
            });
            if (!projects || projects.length === 0) {
              throw new Error("No projects found.");
            }
            let projectListHtml = `
              <html>
              <head>
                <title>All Projects</title>
                <style>
                  body { font-family: Arial, sans-serif; }
                  .project { padding: 10px; border-bottom: 1px solid #ccc; }
                  a { text-decoration: none; color: #333; }
                </style>
              </head>
              <body>
                <h1>All Projects</h1>
                <ul>
                  ${projects.map(
              (project) => `
                        <li class="project">
                          <a href="/projects/${project.slug}">
                            <h2>${project.mainHeading}</h2>
                            <p>${project.subHeading || "No subheading available"}</p>
                          </a>
                        </li>
                      `
            ).join("")}
                </ul>
              </body>
              </html>
            `;
            res.send(projectListHtml);
          } catch (error) {
            res.status(500).send("Failed to load projects. Please try again later.");
          }
        });
        app.get("/api/projects", async (req, res) => {
          try {
            const projects = await context.query.Project.findMany({
              query: `
                mainHeading
                slug
                heroImage { url }
              `
            });
            res.json(projects);
          } catch (error) {
            console.error("Error fetching projects:", error);
            res.status(500).json({ error: "Failed to fetch projects" });
          }
        });
        app.get("/projects/:slug", async (req, res) => {
          const { slug } = req.params;
          try {
            const project = await context.query.Project.findOne({
              where: { slug },
              query: `mainHeading subHeading heroImage { url } agents { name photo { url } }`
            });
            if (!project) {
              return res.status(404).send("Project not found");
            }
            res.sendFile(import_path.default.join(publicDir, "index.html"));
          } catch (error) {
            res.status(500).json({ error: "Failed to load project" });
          }
        });
        app.get("/api/project/:slug", async (req, res) => {
          const { slug } = req.params;
          try {
            const project = await context.query.Project.findOne({
              where: { slug },
              query: `
                mainHeading
                subHeading
                heroImage { url }
                heroTwoLogo { url }
                agents { name photo { url } }
                agentCount
                galleryMainHeading
                galleryTitle
                galleryParagraph
                galleryImages { id image { url } }
                amenitiesList
                paymentPlanHeading
                parallaxImage { url }
                panoramicImage { url }
                paymentPlanImage { url }
                paymentPlanTitle
                paymentPlanNumber
                paymentPlanSuffix
                paymentPlanDescription
                paymentPlanBullets
                locationHeading
                locationSubheading
                locationTitle
                locationDescription
                locationDescription2
                locationBullets
                locationMapImage { url }
                developerTitle
                developerParagraph1
                developerParagraph2
                developerRedParagraph
                developerRedBoldText
                developerImage1 { url }
                developerImage2 { url }
                contactHeading
                contactProfilePic { url }
                contactProfileName
                contactProfileDescription
                contactBullets
                contactMap { url }
                faq { id question answer }
                amenitiesSectionHeading
                amenitiesCards { id title description categories, image { url } }
                amenityFilters { id name }
                units { id type title price tag cityView sqft, image { url } }
                unitFilters { id name }
                materials { id title description, image { url }, document { url } }
              `
            });
            if (!project) {
              return res.status(404).json({ error: "Project not found" });
            }
            res.json(project);
          } catch (error) {
            console.error("Error fetching project:", error);
            res.status(500).json({ error: "Failed to fetch project" });
          }
        });
        app.post("/api/submit-callback", import_express.default.json(), async (req, res) => {
          const { name, email, phone, slug, pageUrl, projectName, actionFrom } = req.body;
          if (!name || !email || !phone || !slug || !pageUrl) {
            return res.status(400).json({ error: "All fields are required." });
          }
          const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
          try {
            const project = await context.query.Project.findOne({
              where: { slug },
              query: "id mainHeading"
            });
            if (!project) {
              return res.status(404).json({ error: "Project not found" });
            }
            const newCallbackRequest = await context.query.CallbackRequest.createOne({
              data: {
                name,
                email,
                phone,
                pageUrl,
                projectName,
                // NEW FIELD
                actionFrom,
                // NEW FIELD
                ipAddress: typeof ip === "string" ? ip : Array.isArray(ip) ? ip[0] : "",
                project: { connect: { id: project.id } }
              },
              query: "id name email phone pageUrl ipAddress project { mainHeading }"
            });
            res.json({ success: true, data: newCallbackRequest });
          } catch (error) {
            console.error("Error saving callback request:", error);
            res.status(500).json({ success: false, error: "Failed to save callback request" });
          }
        });
      }
    }
  })
);
//# sourceMappingURL=config.js.map
