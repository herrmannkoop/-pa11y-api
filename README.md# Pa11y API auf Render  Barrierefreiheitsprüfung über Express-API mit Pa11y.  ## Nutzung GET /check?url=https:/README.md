# Pa11y API auf Render

Barrierefreiheitsprüfung über Express-API mit Pa11y.

## Nutzung
GET /check?url=https://example.com

Antwort:
{
  "url": "...",
  "totalIssues": 5,
  "errors": 2,
  "warnings": 2,
  "notices": 1
}
