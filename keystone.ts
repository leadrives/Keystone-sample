import express from 'express';
import path from 'path';
import { config } from '@keystone-6/core';
import { lists } from './schema'; // Import your schema
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
        serverRoute: { path: '/uploads/images' },
        storagePath: path.join(process.cwd(), 'public/uploads/images'),
      },
      local_documents: {
        kind: 'local',
        type: 'file',
        generateUrl: (path) => `/uploads/documents/${path}`,
        serverRoute: { path: '/uploads/documents' },
        storagePath: path.join(process.cwd(), 'public/uploads/documents'),
      },
    },
    server: {
      extendExpressApp: (app, context) => {
        const publicDir = path.join(process.cwd(), 'public');
        app.use(express.static(publicDir));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.get('/api/settings', async (req, res) => {
          try {
            const settingsList = await context.query.SiteSetting.findMany({
              query: `logo { url }
                footerLogo { url }
                heroTwoLogo { url }
                footerSocialLinks { id name icon { url } url }
                footerCopyright`
            });
            const settings = settingsList[0];
            if (!settings) {
              return res.status(404).json({ error: 'Settings not found' });
            }
            res.json(settings);
          } catch (error) {
            console.error('Error fetching settings:', error);
            res.status(500).json({ error: 'Failed to fetch settings' });
          }
        });
        

        // Root: List projects
        app.get('/', async (req, res) => {
          try {
            const projects = await context.query.Project.findMany({
              query: 'mainHeading slug subHeading',
            });
            if (!projects || projects.length === 0) {
              throw new Error('No projects found.');
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
                  ${projects
                    .map(
                      (project) => `
                        <li class="project">
                          <a href="/projects/${project.slug}">
                            <h2>${project.mainHeading}</h2>
                            <p>${project.subHeading || 'No subheading available'}</p>
                          </a>
                        </li>
                      `
                    )
                    .join('')}
                </ul>
              </body>
              </html>
            `;
            res.send(projectListHtml);
          } catch (error) {
            res.status(500).send('Failed to load projects. Please try again later.');
          }
        });

        // API: All projects as JSON
        app.get('/api/projects', async (req, res) => {
          try {
            const projects = await context.query.Project.findMany({
              query: `
                mainHeading
                slug
                heroImage { url }
              `,
            });
            res.json(projects);
          } catch (error) {
            console.error('Error fetching projects:', error);
            res.status(500).json({ error: 'Failed to fetch projects' });
          }
        });

        // Serve static HTML for project pages
        app.get('/projects/:slug', async (req, res) => {
          const { slug } = req.params;
          try {
            const project = await context.query.Project.findOne({
              where: { slug },
              query: `mainHeading subHeading heroImage { url } agents { name photo { url } }`,
            });
            if (!project) {
              return res.status(404).send('Project not found');
            }
            res.sendFile(path.join(publicDir, 'index.html'));
          } catch (error) {
            res.status(500).json({ error: 'Failed to load project' });
          }
        });

        // API: Get project data (includes all sections)
        app.get('/api/project/:slug', async (req, res) => {
          const { slug } = req.params;
          try {
            const project = await context.query.Project.findOne({
              where: { slug },
              query: `
                mainHeading
                subHeading
                heroImage { url }
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
              `,
            });
            if (!project) {
              return res.status(404).json({ error: 'Project not found' });
            }
            res.json(project);
          } catch (error) {
            console.error('Error fetching project:', error);
            res.status(500).json({ error: 'Failed to fetch project' });
          }
        });
        app.post('/api/submit-callback', express.json(), async (req, res) => {
          const { name, email, phone, slug, pageUrl } = req.body;
          // Basic validations
          if (!name || !email || !phone || !slug || !pageUrl) {
            return res.status(400).json({ error: 'All fields are required.' });
          }
          // Optionally add additional validation (regex for email, etc.)
          // Retrieve the client IP address (supporting proxies)
          const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
          try {
            // Find the project by slug to associate with the lead
            const project = await context.query.Project.findOne({
              where: { slug },
              query: 'id mainHeading',
            });
            if (!project) {
              return res.status(404).json({ error: 'Project not found' });
            }
            // Create a new callback request (lead)
            const newCallbackRequest = await context.query.CallbackRequest.createOne({
              data: {
                name,
                email,
                phone,
                pageUrl,
                ipAddress: typeof ip === 'string' ? ip : Array.isArray(ip) ? ip[0] : '',
                project: { connect: { id: project.id } },
              },
              query: 'id name email phone pageUrl ipAddress project { mainHeading }',
            });
            res.json({ success: true, data: newCallbackRequest });
          } catch (error) {
            console.error('Error saving callback request:', error);
            res.status(500).json({ success: false, error: 'Failed to save callback request' });
          }
        });
        

        // [Other API routes remain unchanged...]
      },
    },
  })
);
