import express from 'express';
import path from 'path';
import { config } from '@keystone-6/core';
import { lists } from './schema'; // Import your schema (lists)
import { withAuth, session } from './auth'; // Authentication and session

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    session,
    storage: {
      local_images: {
        kind: 'local',
        type: 'file',
        generateUrl: (pathString) => `/uploads/images/${pathString}`,
        serverRoute: {
          path: '/uploads/images',
        },
        storagePath: path.join(process.cwd(), 'public/uploads/images'),
      },
      local_documents: {
        kind: 'local',
        type: 'file',
        generateUrl: path => `/uploads/documents/${path}`,
        serverRoute: {
          path: '/uploads/documents',
        },
        storagePath: path.join(process.cwd(), 'public/uploads/documents'),

      },
    },
    server: {
      extendExpressApp: (app, context) => {
        const publicDir = path.join(process.cwd(), 'public');
        app.use(express.static(publicDir)); // Serve static files from public folder
        // Middleware to parse JSON data
        app.use(express.json());

        // Middleware to parse URL-encoded form data (optional)
        app.use(express.urlencoded({ extended: true }));
        // Dynamic route for fetching project content by slug
        app.get('/projects/:slug', async (req, res) => {
          const { slug } = req.params;
          try {
            const project = await context.query.Project.findOne({
              where: { slug },
              query: `title description requestCallbackText startingPrice paymentPlan area handoverDate projectTag1 projectTag2
                      bannerImage { filename url } projectLogo { filename url } developerLogo { filename url } headerLogo { filename url }`,
            });
            if (!project) {
              return res.status(404).send('Project not found');
            }
            res.sendFile(path.join(publicDir, 'index.html')); // Render the static page
          } catch (error) {
            res.status(500).json({ error: 'Failed to load project' });
          }
        });

        // API route to fetch project content dynamically
        app.get('/api/project/:slug', async (req, res) => {
          const { slug } = req.params;
          try {
            const project = await context.query.Project.findOne({
              where: { slug },
              query: `
                title description requestCallbackText startingPrice paymentPlan area handoverDate projectTag1 projectTag2
                bannerImage { filename url } projectLogo { filename url } developerLogo { filename url } headerLogo { filename url }
                paymentStructure downPayment developerName bedrooms numberOfUnits aboutHeading aboutDescription
                featurePrice featureDownPayment featureHandoverDate availabilityButtonText brochureButtonText
                galleryImages { image { filename url } } videoUrl agentName agentOccupation agentPhone agentPhoto { filename url }
                contactFormHeaderText contactFormBoldText fullwidthImage { filename url } amenitiesImage { filename url }
                locationTitle locationDescription locationItems { image { filename url }, distance, place }
                latitude longitude generalPlanTag generalPlanTitle generalPlanImage { filename url }
                floorPlans { title type measurement image { filename url } floorPlanDocument { filename url } }
                paymentPlanHeading paymentPlanValue downPaymentFinancial installments completion
                developerHeadingTag developerHeadingTitle developerContent1 developerContent2 developerVideoUrl 
                materials { title image { url } downloadLink { url } } 
                faqs(orderBy: { order: asc }) { question answer order }
                contact2HeadingTag contact2Title contact2Name contact2Occupation
                contact2PhoneNumber contact2EmailAddress contact2Website contact2CompanyLogo { url }
                contact2Image { url }
                similarProjects { similarProject_title similarProject_developer similarProject_handoverDate similarProject_link similarProject_image { url } }
                footerText privacyLink termsLink sitemapLink companyDetailsLink languageText currencyText facebookLink twitterLink instagramLink`, // <-- Correct closing backtick here
            });

            if (!project) {
              return res.status(404).json({ error: 'Project not found' });
            }

            res.json(project); // Return project details as JSON
          } catch (error) {
            console.error('Error fetching project:', error); // Log the error

            res.status(500).json({ error: 'Failed to fetch project' });
          }

        });

        // API route for form submissions
        app.post('/api/submit-callback', express.json(), async (req, res) => {
          const { name, email, phone, slug } = req.body;

          try {
            // Find the project by slug
            const project = await context.query.Project.findOne({
              where: { slug },
              query: 'id title',
            });

            if (!project) {
              return res.status(404).json({ error: 'Project not found' });
            }

            // Create a new callback request
            const newCallbackRequest = await context.query.CallbackRequest.createOne({
              data: {
                name,
                email,
                phone,
                project: { connect: { id: project.id } }, // Associate with the project
              },
              query: 'id name email phone project { title }',
            });

            // Return the newly created callback request
            res.json({ success: true, data: newCallbackRequest });
          } catch (error) {
            console.error('Error saving callback request:', error);
            res.status(500).json({ success: false, error: 'Failed to save callback request' });
          }
        });

        app.post('/api/submit-unit-info-request', async (req, res) => {
          try {
            const { unitType, details, contactMethod, name, phone, email, slug } = req.body;
        
            if (!unitType || !contactMethod || !name || (!phone && !email) || !slug) {
              return res.status(400).json({ success: false, error: 'Missing required fields' });
            }
        
            const project = await context.query.Project.findOne({
              where: { slug },
              query: 'id',
            });
        
            if (!project) {
              return res.status(404).json({ success: false, error: 'Project not found' });
            }
        
            await context.query.UnitInfoRequest.createOne({
              data: {
                unitType,
                details,
                contactMethod,
                name,
                phone,
                email,
                project: { connect: { id: project.id } },
              },
            });
        
            return res.json({ success: true });
          } catch (error) {
            console.error('Error submitting unit info request:', error);
            return res.status(500).json({ success: false, error: 'Failed to submit request' });
          }
        });
        

      },

    },

  })
);
