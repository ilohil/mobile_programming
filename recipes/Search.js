export const fetchRecipes = (keyword) => {
    return fetch(`${process.env.EXPO_PUBLIC_API_URL}?i=${keyword}`)
    .then(response => {
        if (!response.ok)
            throw new Error("Something went wrong: " + response.statusText)

        return response.json()
    })
}