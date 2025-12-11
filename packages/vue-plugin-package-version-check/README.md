# Vue Plugin Package Version Check

## 介绍

当 vue 项目重新构建后，通知用户有新版本。

## 安装

```bash
npm install vue-plugin-package-version-check
npm install vite-plugin-package-version-generator -D
```

## 使用

在 `vite.config.ts` 中添加插件：

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import packageVersionGenerator from 'vite-plugin-package-version-generator';

export default defineConfig({
  plugins: [vue(), packageVersionGenerator()]
});
```

在 `main.ts` 中添加插件：

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import packageVersionCheck from 'vue-plugin-package-version-check';
import { toast } from 'vue-sonner';
import 'vue-sonner/style.css';

const ToastId = 'version-check-toast';

createApp(App)
  .use(packageVersionCheck, {
    onVersionChange(version) {
      console.log('version :>> ', version);
      toast(`版本更新${version}，请刷新页面`, {
        id: ToastId,
        action: {
          label: '刷新',
          onClick: () => {
            updateVersion(version);
            window.location.reload();
          }
        }
      });
    }
  })
  .mount('#app');
```
