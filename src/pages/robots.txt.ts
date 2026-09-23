import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ? site.toString().replace(/\/+$/, '') : '';
  const sitemapLine = siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : '';

  const robots = `# HEARTz Robots.txt
# Note: Allowing any crawler grants crawl permission only; it does not improve SEO, guarantee inclusion, or ensure citation in AI-generated answers.

# Standard Search Engine Crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

# OpenAI Crawlers
# OAI-SearchBot: Search and discovery crawler for ChatGPT Search
User-agent: OAI-SearchBot
Allow: /

# GPTBot: Potential AI model training crawler (does not affect search ranking or discovery)
User-agent: GPTBot
Allow: /

# Anthropic Crawlers
# Claude-SearchBot: Search and indexation crawler
User-agent: Claude-SearchBot
Allow: /

# Claude-User: User-directed retrieval when a user requests Claude to inspect a page
User-agent: Claude-User
Allow: /

# ClaudeBot: Potential AI model training crawler (does not affect search ranking or discovery)
User-agent: ClaudeBot
Allow: /

# Perplexity AI Crawlers
# PerplexityBot: Search and indexation crawler
User-agent: PerplexityBot
Allow: /

# Perplexity-User: User-directed retrieval for real-time citations
User-agent: Perplexity-User
Allow: /

# Model Training Control Tokens (Do NOT control search indexing or ranking)
# Google-Extended: Control token for Gemini/Vertex AI training and grounding; has no effect on Google Search indexing
User-agent: Google-Extended
Allow: /

# Applebot-Extended: Control token for Apple Intelligence foundation model training; has no effect on Siri/Spotlight search
User-agent: Applebot-Extended
Allow: /

# Default Rule for All Other Crawlers
User-agent: *
Allow: /${sitemapLine}`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
