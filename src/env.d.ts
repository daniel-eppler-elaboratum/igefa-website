/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly STORYBLOK_PREVIEW_TOKEN: string;
  readonly STORYBLOK_SPACE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
