import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideToastr } from 'ngx-toastr';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { errorsInterceptor } from './core/interceptors/errors-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay(),withIncrementalHydration()),
    provideHttpClient(withFetch(),withInterceptors([tokenInterceptor,errorsInterceptor])),
    provideAnimations(),
    provideAngularSvgIcon(),
    provideToastr({
      preventDuplicates:true,
    }),
  ],
};
