<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>GrantCare XML Sitemap</title>
        <style>
          body {
            margin: 0;
            background: #f6f0e2;
            color: #18241f;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }
          .shell {
            width: min(1120px, calc(100% - 32px));
            margin: 32px auto;
          }
          .card {
            background: #fffaf0;
            border: 1px solid #d7cab0;
            border-radius: 24px;
            box-shadow: 0 18px 42px -28px rgba(24, 36, 31, 0.08);
            overflow: hidden;
          }
          .header {
            padding: 28px 28px 20px;
            border-bottom: 1px solid #d7cab0;
            background: linear-gradient(180deg, rgba(23, 76, 60, 0.06), rgba(255, 250, 240, 0.96));
          }
          .eyebrow {
            margin: 0 0 8px;
            color: #174c3c;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
          }
          h1 {
            margin: 0;
            font-size: 34px;
            line-height: 1.15;
          }
          .subtext {
            margin: 12px 0 0;
            color: #5d685f;
            font-size: 16px;
            line-height: 1.7;
          }
          .table-wrap {
            overflow: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 16px 20px;
            border-bottom: 1px solid #e7dcc7;
            text-align: left;
            vertical-align: top;
            font-size: 15px;
            line-height: 1.6;
          }
          th {
            position: sticky;
            top: 0;
            background: #f1eadc;
            color: #5d685f;
            font-size: 13px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          tr:last-child td {
            border-bottom: 0;
          }
          a {
            color: #174c3c;
            font-weight: 600;
            text-decoration: none;
            word-break: break-word;
          }
          a:hover {
            text-decoration: underline;
          }
          .muted {
            color: #5d685f;
          }
          .alt-links a {
            display: inline-block;
            margin: 0 12px 6px 0;
            padding: 6px 10px;
            border: 1px solid #d7cab0;
            border-radius: 999px;
            background: #efe2c7;
            font-size: 13px;
          }
          @media (max-width: 720px) {
            .shell {
              width: calc(100% - 20px);
              margin: 16px auto;
            }
            .header {
              padding: 20px 18px 16px;
            }
            h1 {
              font-size: 28px;
            }
            th, td {
              padding: 14px 14px;
              font-size: 14px;
            }
          }
        </style>
      </head>
      <body>
        <div class="shell">
          <div class="card">
            <div class="header">
              <p class="eyebrow">GrantCare</p>
              <h1>XML Sitemap</h1>
              <p class="subtext">
                This page lists the URLs included in the GrantCare sitemap. Search engines read the XML data directly.
              </p>
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Last Modified</th>
                    <th>Change</th>
                    <th>Priority</th>
                    <th>Languages</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td>
                        <a href="{sitemap:loc}">
                          <xsl:value-of select="sitemap:loc" />
                        </a>
                      </td>
                      <td class="muted">
                        <xsl:value-of select="sitemap:lastmod" />
                      </td>
                      <td class="muted">
                        <xsl:value-of select="sitemap:changefreq" />
                      </td>
                      <td class="muted">
                        <xsl:value-of select="sitemap:priority" />
                      </td>
                      <td class="alt-links">
                        <xsl:for-each select="xhtml:link">
                          <a href="{@href}">
                            <xsl:value-of select="@hreflang" />
                          </a>
                        </xsl:for-each>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
