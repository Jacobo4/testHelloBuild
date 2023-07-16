/**
 * Function to make a GitHub GraphQL API request
 * @param query GraphQL query
 * @param token GitHub access token
 */
export async function gitHubGraphQLRequest(query: string, token: string): Promise<any> {
    try {
        const url = 'https://api.github.com/graphql';
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query}),
        };

        const response = await fetch(url, options);
        const data: unknown = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}
