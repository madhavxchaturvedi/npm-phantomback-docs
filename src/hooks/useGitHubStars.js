import { useState, useEffect } from 'react';

let cachedStars = null;

export function useGitHubStars(repo = 'madhavxchaturvedi/npm-phantomback') {
  const [stars, setStars] = useState(cachedStars);

  useEffect(() => {
    if (cachedStars !== null) return;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          cachedStars = data.stargazers_count;
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, [repo]);

  return stars;
}
