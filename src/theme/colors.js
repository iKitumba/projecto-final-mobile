const selectTheme = ({ theme = "light" }) => {
  switch (theme) {
    case "dark":
      return {
        primary: "#142A3B",
        grey: "#1F3C53",
        text: "#AAB2C8",
        accent: "#097FFA",
        accentLowOpacity: "#CBE1F6",
        completary: "#F35298",
        danger: "#FD1818",
        green: "#18FD2E",
        yellow: "#E0FD18",
        border: "rgba(255, 255, 255, 0.09)",
        white: "#1F3C53",
      };

    default:
      return {
        primary: "#E7EBEF",
        grey: "#C8D5E3",
        text: "#61768D",
        accent: "#097FFA",
        accentLowOpacity: "#CBE1F6",
        completary: "#F35298",
        danger: "#FD1818",
        green: "#18FD2E",
        yellow: "#E0FD18",
        border: "rgba(255, 255, 255, 0.09)",
        white: "#F5FAFF",
      };
  }
};

export const colors = selectTheme({ theme: "light" });
