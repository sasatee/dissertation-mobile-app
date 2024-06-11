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
      "@react-native-google-signin/google-signin",
      [
        "expo-build-properties",
        {
          android: {
            minSdkVersion: 24,
            compileSdkVersion: 34,
            targetSdkVersion: 33,
            extraMavenRepos: [
              "../../node_modules/@notifee/react-native/android/libs",
            ],
          },
        },
      ],
      "@stream-io/video-react-native-sdk",
      [
        "@config-plugins/react-native-webrtc",
        {
          // optionally you can add your own explanations for permissions on iOS
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission:
            "Allow $(PRODUCT_NAME) to access your microphone",
        },
      ],
      [
        "expo-document-picker",
        {
          iCloudContainerEnvironment: "Production",
        },
      ],
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
