import { Yew } from "./yew";

const resultsKey = {
    yew: <Yew />,
}

export const getResultById = (id: keyof typeof resultsKey) => {
    return resultsKey[id] ? resultsKey[id] : null
}