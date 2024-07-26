import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run restore-photo:serve:development',
        production: 'nx run restore-photo:serve:production',
      },
      ciWebServerCommand: 'nx run restore-photo:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
