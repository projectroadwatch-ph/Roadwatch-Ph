# Roadwatch PH Native App

This folder contains the **native mobile application** codebase for Roadwatch PH.

It is intentionally separated from the `website/` folder so mobile code and web code do not mix.

## Android Studio compatibility

**Yes — this app works with Android Studio.**

You can run it in two ways:

1. **Expo Go / Dev workflow (quickest for UI testing)**
   - `npm run start`
   - Start an Android emulator from Android Studio Device Manager
   - Press `a` in the Expo terminal

2. **Native Android Studio workflow (Gradle project)**
   - `npm run prebuild` (first time, or after native config changes)
   - Open `native-app/android` in Android Studio
   - Build/run from Android Studio, or use `npm run android:studio`

## Stack

- React Native (Expo)
- TypeScript

## Quick start

1. Go to this folder:
   ```bash
   cd native-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Expo:
   ```bash
   npm run start
   ```

## Android Studio setup checklist

- Android Studio installed
- Android SDK + emulator installed
- `ANDROID_HOME` configured
- Emulator running (or a physical Android device connected)

Then run:

```bash
npm run android
```

## Scripts

- `npm run start` – start Expo dev server
- `npm run android` – run on Android device/emulator
- `npm run prebuild` – generate native `android/` and `ios/` folders
- `npm run android:studio` – prebuild + run Android app

## UI updates in this starter screen

The current `App.tsx` now includes:

- A polished hero card with call-to-action buttons
- Quick action tiles for core Roadwatch user actions
- A built-in Android Studio setup checklist for onboarding/testing
- Scroll-safe layout for smaller Android devices

## Folder structure

- `App.tsx` – app entry screen
- `package.json` – native app dependencies and scripts
- `tsconfig.json` – TypeScript configuration

## Notes

- Keep native/mobile-specific code here.
- Keep website code inside `website/`.
