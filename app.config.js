import 'dotenv/config';

export default {
    name: "School Cafeteria",
    slug: "school-cafeteria",
    version: "1.0.0",
    orientation: "portrait",
      icon: "./assets/icon.png",
      ios: {
        bundleIdentifier: "com.shaycohen.schoolcafeteria",
        buildNumber: "1.0.0",
        supportsTablet: false
      },
      android: {
        package: "com.shaycohen.schoolcafeteria",
        versionCode: 1
      },
  };