import { Plugin } from 'vue';
import { recycleTimeout } from './uti';

export type VuePluginPackageVersionOptions = {
  enable: boolean;
  onVersionChange?: (version: string) => void;
  resolveVersionFilePath?: () => string;
  interval?: number;
};

const VuePluginPackageVersionCheckStorageKey = 'vue-plugin-version-check-key';

export function updateVersion(version: string) {
  localStorage.setItem(VuePluginPackageVersionCheckStorageKey, version);
}

export const VuePluginPackageVersionCheck: Plugin<VuePluginPackageVersionOptions> = {
  install(_, options: VuePluginPackageVersionOptions) {
    if (options.enable === true) {
      recycleTimeout(
        (next) => {
          // 获取本地版本
          const version = localStorage.getItem(VuePluginPackageVersionCheckStorageKey);
          fetch(options.resolveVersionFilePath?.() ?? '/package-version.json')
            .then((res) => res.json())
            .then((data) => {
              console.log('data :>> ', data.version);
              console.log('version :>> ', version);
              // 本地没有版本记录
              if (version === null) {
                if (data && data.version) {
                  options.onVersionChange?.(data.version);
                }
              }
              // 本地存在版本记录
              else {
                // 版本不一致
                if (version !== data.version) {
                  options.onVersionChange?.(data.version);
                }
              }
              next();
            })
            .catch((e) => {
              console.log('catch', e);
            });
        },
        options.interval ?? 3000,
        {
          immediate: true
        }
      );
    }
  }
};
