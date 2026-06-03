"use server";
export async function getGithubContributions(username: string) {
    const headers = {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
    };

    const body = {
        query: `query {
            user(login: "${username}") {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                                weekday
                            }
                        }
                    }
                }
            }
        }`,
    };

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        next: { revalidate: 43200 },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch GitHub contributions");
    }

    const json = await response.json();
    return json.data.user.contributionsCollection.contributionCalendar;
}
