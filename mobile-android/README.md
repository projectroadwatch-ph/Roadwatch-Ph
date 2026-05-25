# Roadwatch PH Mobile (Android)

This directory contains the **native Android** app scaffold for Roadwatch PH.

## Scope guard

Changes in this folder are for the mobile application only. Existing web files in the repository root (`index.html`, `script.js`, etc.) are intentionally untouched by this scaffold.

## Stack

- Kotlin
- Jetpack Compose
- Material 3
- Min SDK 26
- Target/Compile SDK 35

## Run locally

1. Install Android Studio (latest stable).
2. Open the `mobile-android` directory as a project.
3. Let Gradle sync.
4. Run the `app` configuration on an emulator/device.

## Next implementation tasks

1. Add map support and incident pins.
2. Add report submission flow (photo, location, issue type).
3. Add account/authentication flow.
4. Connect to backend APIs used by Roadwatch PH.
