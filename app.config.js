export default {
  expo: {
    name: "Chat app",
    slug: "Tinder",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    plugins: [
      [
        "expo-av",
        {
          microphonePermission: "Allow Chat app to access your microphone.",
        },
      ],
      "@react-native-google-signin/google-signin"
    ],
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.sarvamsetto.Tinder",
      infoPlist: {
        CFBundleURlTypes: {
          CFBundleURlSchemes: [
            "com.googleusercontent.apps.745932678832-ocfh7rkvkpfhotvro16tqp50vf3e1j4i",
          ],
        },
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.sarvamsetto.Tinder",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
    },
    extra: {
      eas: {
        projectId: "70a2c101-12a8-4379-ac13-c589159680fa",
      },
    },
  },
};


