export interface Repository {
    id: string;
    name: string;
    createdAt: string;
    description: string | null;
    stargazerCount: number;
    viewerHasStarred: boolean;
    url: string;
  }
  
  export interface SearchResult {
    nodes: Repository[];
    pageInfo: {
      endCursor: string | null;
      hasNextPage: boolean;
    };
  }
  
  export interface User {
    avatarUrl: string;
    bio: string | null;
    email: string | null;
    login: string;
    name: string | null;
  }
  