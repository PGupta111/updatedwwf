// sitemap-generator.js
// Run this script to automatically generate sitemap.xml

const fs = require('fs');
const path = require('path');

// Your website's base URL (no trailing slash; paths below start with "/")
const BASE_URL = 'https://www.westwindsorforward.org'; // Replace with your actual domain

// Your project data (copy from your React code)
const projectsData = [
  {
    id: 1,
    slug: "candidate-forum-2025",
    title: "2025 Candidate Forum",
  },
  {
    id: 2,
    slug: "princeton-junction-station-improvement",
    title: "Princeton Junction Station Improvement",
  },
  // Add more projects here as you create them
];

// Static pages with their priorities and change frequencies
const staticPages = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly'
  },
  {
    path: '/about',
    priority: '0.8', 
    changefreq: 'monthly'
  },
  {
    path: '/projects',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    path: '/events', 
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    path: '/contact',
    priority: '0.7',
    changefreq: 'yearly'
  },
  {
    path: '/townshipbudget/',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    path: '/townshipbudget/data.html',
    priority: '0.7',
    changefreq: 'monthly'
  }
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add project pages
  projectsData.forEach(project => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/projects/${project.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// Generate and save sitemap
const sitemapContent = generateSitemap();
const outputPath = path.join(__dirname, 'public', 'sitemap.xml');

// Make sure public directory exists
if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
}

fs.writeFileSync(outputPath, sitemapContent);
console.log(`✅ Sitemap generated successfully at: ${outputPath}`);
console.log(`📊 Total URLs: ${staticPages.length + projectsData.length}`);
console.log(`🔗 Don't forget to update BASE_URL to your actual domain!`);

// Also create a robots.txt if it doesn't exist
const robotsPath = path.join(__dirname, 'public', 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml`;
  
  fs.writeFileSync(robotsPath, robotsContent);
  console.log(`🤖 robots.txt created at: ${robotsPath}`);
}
