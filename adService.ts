
import { AdMob, BannerAdSize, BannerAdPosition, AdOptions, AdLoadInfo } from '@capacitor-community/admob';
import { ADMOB_CONFIG } from '../constants';
import { Capacitor } from '@capacitor/core';

class AdService {
  private static instance: AdService;
  private isInitialized = false;
  private bannerVisible = false;
  private retryCount = 0;
  private maxRetries = 5;

  private constructor() {}

  static getInstance() {
    if (!AdService.instance) AdService.instance = new AdService();
    return AdService.instance;
  }

  async initialize() {
    if (this.isInitialized || !Capacitor.isNativePlatform()) return;
    try {
      await AdMob.initialize({ requestTrackingAuthorization: true });
      this.isInitialized = true;
      console.log('AdMob Production Ready');
      this.prepareInterstitial();
    } catch (e) {
      console.warn('AdMob Init Error:', e);
    }
  }

  async showBanner() {
    if (!Capacitor.isNativePlatform() || this.bannerVisible) return;
    try {
      await AdMob.showBanner({
        adId: ADMOB_CONFIG.BANNER_ID,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: false // تم الضبط على الإنتاج (حقيقي)
      });
      this.bannerVisible = true;
    } catch (e) {
      console.error('Banner failed to load, retrying...');
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        setTimeout(() => this.showBanner(), 10000); // إعادة المحاولة بعد 10 ثوانٍ
      }
    }
  }

  async prepareInterstitial() {
    if (!Capacitor.isNativePlatform()) return;
    try {
      await AdMob.prepareInterstitial({
        adId: ADMOB_CONFIG.INTERSTITIAL_ID,
        isTesting: false // تم الضبط على الإنتاج (حقيقي)
      });
    } catch (e) {
      console.log('Interstitial not ready yet');
    }
  }

  async showInterstitial() {
    if (!Capacitor.isNativePlatform()) return;
    try {
      // محاولة إظهار الإعلان
      await AdMob.showInterstitial();
      // تحضير الإعلان التالي مباشرة لضمان الجاهزية
      setTimeout(() => this.prepareInterstitial(), 2000);
    } catch (e) {
      console.log('Could not show interstitial, preparing for next time');
      this.prepareInterstitial();
    }
  }
}

export const adService = AdService.getInstance();
