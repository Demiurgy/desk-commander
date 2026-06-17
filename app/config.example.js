// Copy this file to app/config.js and put your own n8n webhook URL.
// config.js is gitignored, so your URL/key never lands in the repo.
window.DESK_CONFIG = {
  // Single n8n workflow webhook (production URL). Leave empty to use the Cowork runtime.
  url: "https://YOUR-N8N-INSTANCE/webhook/your-webhook-id",
  // Only if your n8n webhook has auth enabled:
  apiKey: ""
};
