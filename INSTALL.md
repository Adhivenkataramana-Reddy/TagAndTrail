# TagAndTrail — SDK 54 Setup Guide (Windows)

## Why SDK 54?
Expo SDK 54 is the latest version supported by the current Expo Go app on
Play Store / App Store. It ships with React 19.1.0 + React Native 0.81.4.

---

## Step 1 — Install Node.js (if not installed)
Download from https://nodejs.org — use the LTS version (20 or 22).

## Step 2 — Install Expo CLI globally
```powershell
npm install -g expo-cli
```

## Step 3 — Install project dependencies

```powershell
cd TagAndTrail
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is REQUIRED for all React Native / Expo projects on npm v7+.
> It tells npm to skip strict peer dependency conflict resolution.

## Step 4 — Start the dev server

```powershell
npx expo start --clear
```

The `--clear` flag clears the Metro bundler cache on first run.

## Step 5 — Open on your device

| Method | Steps |
|--------|-------|
| **Expo Go (easiest)** | Install "Expo Go" from Play Store / App Store → scan QR code |
| **Android emulator** | Install Android Studio → create AVD → press `a` |
| **iOS simulator** | macOS only → press `i` |

---

## Connecting to FastAPI backend

Edit `src/api/index.ts` — change `BASE_URL`:

```typescript
// Android emulator (most common):
export const BASE_URL = 'http://10.0.2.2:8000';

// Physical Android/iOS device on same WiFi:
export const BASE_URL = 'http://192.168.1.X:8000';  // your PC's local IP

// iOS simulator:
export const BASE_URL = 'http://localhost:8000';
```

### FastAPI CORS setup (add to your main.py):
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Required FastAPI endpoints:
```
GET  /stats                               → Stats object
GET  /documents?category=&type=&search=  → List[Document]
GET  /documents/recent                    → List[Document] (last 5)
GET  /documents/{id}                      → Document
DELETE /documents/{id}                    → move to trash
PATCH  /documents/{id}/restore            → restore from trash
GET  /logs                                → List[LogEntry]
```

> If the API is unreachable, the app automatically shows mock data so
> you can develop and test the UI without a running backend.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `ERESOLVE` npm error | Run `npm install --legacy-peer-deps` |
| Metro bundler cache | Run `npx expo start --clear` |
| `Unable to resolve module` | Delete `node_modules` → `npm install --legacy-peer-deps` |
| App shows mock data | API unreachable — update `BASE_URL` in `src/api/index.ts` |
| Drawer not sliding | `GestureHandlerRootView` wraps App.tsx — already configured |
| Black screen on Android | Normal on first load — Metro is bundling JS |

---

## SDK 54 Key Versions (do NOT change these)

```json
"expo":                      "~54.0.9"
"react":                     "19.1.0"
"react-native":              "0.81.4"
"react-native-reanimated":   "~4.1.0"
"react-native-worklets":     "~0.5.0"
"react-native-gesture-handler": "~2.28.0"
"react-native-safe-area-context": "~5.6.0"
"react-native-screens":      "~4.16.0"
"@react-navigation/native":  "^7.0.14"
"@react-navigation/drawer":  "^7.1.1"
"@react-navigation/native-stack": "^7.2.0"
```
