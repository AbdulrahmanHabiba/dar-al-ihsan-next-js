interface ApiResponse<T> {
  data: T;
}

interface ApiError {
  error: {
    message: string;
    code: string;
  };
}

export async function apiClient<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
        ...options,
        headers: {
            "content-type": "application/json",
            ...options?.headers,
        }
    })
    const json = await response.json();
    if (!response.ok) {
        const error = json as ApiError;
        throw new Error(error.error.message || 'An error occurred');
    }

    const result = json as ApiResponse<T>;

    return result.data;
}

  /* try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return {
        error: {
          message: data.message || 'An error occurred',
          code: data.code || 'unknown_error',
        },
      };
    }

    return { data };
  } catch (error) {
    return {
      error: {
        message: (error as Error).message || 'Network error',
        code: 'network_error',
      },
    };
  }
    */
