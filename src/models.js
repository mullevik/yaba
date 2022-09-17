export const COLOR = {
    CYAN: "#41B882",
    BLUE: "#4F61B6",
    YELLOW: "#FFCF5A",
    RED: "#FF6A5A",
    ORANGE: "#FF875A",
    MAGENTA: "#674FB8",
    PINK: "#D84C91",
    GREEN: "#B3ED54",
    BROWN: "#FFA05A",
    GRAY: "#9A9A9A",
}

export const LABELS = [
    {name: "groceries", color: COLOR.MAGENTA},
    {name: "fuel", color: COLOR.BROWN},
    {name: "rent", color: COLOR.BLUE},
    {name: "restaurant", color: COLOR.RED},
    {name: "food", color: COLOR.YELLOW},
    {name: "alcohol", color: COLOR.MAGENTA},
    {name: "entertainment", color: COLOR.PINK},
    {name: "sport", color: COLOR.GREEN},
    {name: "drugstore", color: COLOR.BLUE},
    {name: "accommodation", color: COLOR.BLUE},
    {name: "pharmacy", color: COLOR.GREEN},
    {name: "public-transport", color: COLOR.BROWN},
    {name: "subscription", color: COLOR.CYAN},
    {name: "traveling", color: COLOR.MAGENTA},
    {name: "music", color: COLOR.PINK},
    {name: "clothes", color: COLOR.PINK},
    {name: "music", color: COLOR.PINK},
    {name: "home", color: COLOR.BLUE},
    {name: "fast-food", color: COLOR.RED},
    {name: "patisserie", color: COLOR.PINK},
    {name: "video-games", color: COLOR.ORANGE},
    {name: "technology", color: COLOR.CYAN},
    {name: "outdoor", color: COLOR.BROWN},
    {name: "new", color: COLOR.GREEN},
]

export const TMP_PAST_LOGS = [
    {
        unixTimestamp: Math.floor(new Date().getTime() / 1000),
        amount: 300,
        currency: "eur",
        labels: ["new", "food"],
        pending: true,
    },
    {
        unixTimestamp: Math.floor(new Date().getTime() / 1000),
        amount: 100,
        currency: "czk",
        labels: [],
        pending: false,
    },
    {
        unixTimestamp: Math.floor(new Date().getTime() / 1000),
        amount: 100,
        currency: "czk",
        labels: ["a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c", "a", "b", "c"],
        pending: true,
    }
]