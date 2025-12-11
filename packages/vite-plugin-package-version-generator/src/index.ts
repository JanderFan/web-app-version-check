import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import type { Plugin } from 'vite';

const pluginName = 'vite-plugin-pkg-version';
let outDir = 'dist';
let root = cwd();

export function VitePluginPackageVersionGenerator(): Plugin {
  return {
    name: pluginName,
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
      root = config.root;
    },

    closeBundle(err) {
      if (err) {
        return;
      }
      const pkgFilePath = resolve(cwd(), 'package.json');
      const pkgContent = readFileSync(pkgFilePath, 'utf-8');
      const pkgJson = JSON.parse(pkgContent);
      const version = pkgJson.version;
      const versionFileContent = {
        version: `v${version}`
      };
      const versionFilePath = resolve(root, outDir, 'package-version.json');

      writeFileSync(versionFilePath, JSON.stringify(versionFileContent, null, 2), {
        encoding: 'utf-8'
      });
    }
  };
}
