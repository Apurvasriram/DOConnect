import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Red Hat Display,sans-serif",
    body: "Red Hat Display,sans-serif",
  },
  colors: {
    title: {
      form: "rgba(151, 160, 240, 1)",
      filterTab: "#D9D9D9",
    },
    background: {
      profile: "#CDD3F5",
      gray: "#E9E5E5",
      transparentViolet: "rgba(205, 211, 245, 0.5)",
    },
    border: {
      gray: "#D7D7D7",
    },
  },

  zIndices: {
    navBar: 1,
    overlayImage: 2,
    chatBot: 3,
  },

  borders: {
    navBar: `1px solid #D7D7D7`,
    input: "1px solid black",
  },

  borderRadius: {
    input: "20px",
  },

  components: {
    Container: {
      variants: {
        responsive: {
          maxW: [
            "full",
            "full",
            "full",
            "container.lg",
            "container.xl",
            "container.2xl",
          ],
          px: ["24px", "24px", "24px", "36px", "36px", "74px"],
        },
      },
    },
    Heading: {
      variants: {
        h1: {
          color: "black",
          fontSize: ["36px", "36px", "42px", "42px", "46px", "54px"],
          fontWeight: ["thin"],
        },
        h2: {
          color: "black",
          fontSize: ["28px", "28px", "36px", "36px", "38px", "42px"],
          fontWeight: ["thin"],
        },
        h3: {
          color: "black",
          fontSize: ["22px", "22px", "28px", "28px", "32px", "36px"],
          fontWeight: ["normal"],
        },
        h4: {
          color: "black",
          fontSize: ["18px", "18px", "22px", "22px", "24px", "24px"],
          fontWeight: ["semibold", "semibold", "medium", "medium", "medium"],
        },
        h5: {
          color: "black",
          fontSize: ["14px", "14px", "18px", "18px", "18px", "18px"],
          fontWeight: ["semibold"],
        },
      },
    },

    Text: {
      variants: {
        heading1: {
          fontSize: ["36px", "36px", "42px", "42px", "46px", "54px"],
          fontWeight: ["thin"],
        },

        heading2: {
          fontSize: ["28px", "28px", "36px", "36px", "38px", "42px"],
          fontWeight: ["thin"],
        },
        heading3: {
          fontSize: ["22px", "22px", "28px", "28px", "32px", "36px"],
          fontWeight: ["normal"],
        },
        heading4: {
          fontSize: ["18px", "18px", "22px", "22px", "22px"],
          fontWeight: ["semibold", "semibold", "medium", "medium", "medium"],
        },
        heading5: {
          fontSize: ["14px", "14px", "16px"],
          fontWeight: ["thin"],
        },
      },
    },

    Button: {
      variants: {
        navCardBtn: {
          background: "#D7DCF7",
          borderRadius: "20px",
        },
      },
    },
  },
});

export default theme;
