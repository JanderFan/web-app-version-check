import { createApp } from 'vue';
import { VuePluginPackageVersionCheck, updateVersion } from 'vue-plugin-package-version-check';
import { toast } from 'vue-sonner';
import 'vue-sonner/style.css';
import App from './App.vue';
import './style.css';

const ToastId = 'version-check-toast';

console.log('base', import.meta.env.BASE_URL);

const app = createApp(App);
app.use(VuePluginPackageVersionCheck, {
  enable: import.meta.env.PROD,
  resolveVersionFilePath: () => import.meta.env.BASE_URL + 'version.json',
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
});
app.mount('#app');
