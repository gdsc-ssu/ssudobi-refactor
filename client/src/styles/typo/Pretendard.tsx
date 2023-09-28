import localFont from "next/font/local";

const bold = localFont({
  src: "./PretendardVariable.woff2",
  weight: "700",
  display: "fallback",
  style: "normal",
  variable: "--pretendard-bold",
  fallback: ["system-ui"],
});

const semibold = localFont({
  src: "./PretendardVariable.woff2",
  weight: "600",
  display: "fallback",
  style: "normal",
  variable: "--pretendard-bold",
  fallback: ["system-ui"],
});

const medium = localFont({
  src: "./PretendardVariable.woff2",
  weight: "500",
  display: "fallback",
  style: "normal",
  variable: "--pretendard-bold",
  fallback: ["system-ui"],
});

const regular = localFont({
  src: "./PretendardVariable.woff2",
  weight: "400",
  display: "fallback",
  style: "normal",
  variable: "--pretendard-bold",
  fallback: ["system-ui"],
});

export {
  bold as pretendardBold,
  semibold as pretendardSemibold,
  medium as pretendardMedium,
  regular as pretendardRegular,
};
