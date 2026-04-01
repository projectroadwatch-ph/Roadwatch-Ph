# Roadwatch PH Native App

This folder contains the **native mobile application** codebase for Roadwatch PH.

It is intentionally separated from the `website/` folder so mobile code and web code do not mix.

## Is this acceptable in Android Studio?

**Yes.** This Expo-based native app works with Android Studio for emulator/device testing.

You have two workflows:

1. **Expo Go workflow (fast start)**
   - Use `npm run start`
   - Launch an Android emulator from Android Studio
   - Press `a` in the Expo terminal

2. **Android Studio project workflow (full Android project)**
   - Run `npm run prebuild` once to generate the `android/` directory
   - Open `native-app/android` in Android Studio
   - Build/run like a standard Gradle Android project

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

## Folder structure

- `App.tsx` – app entry screen
- `package.json` – native app dependencies and scripts
- `tsconfig.json` – TypeScript configuration

## Notes

- Keep native/mobile-specific code here.
- Keep website code inside `website/`.
