// @flow

class HttpError extends Error {
  result: HttpResult<*>;
}

type HttpResult<T> = {
  body: T,
  response: Response
};

const MAD_URL = 'https://mad.itera.no/api';

async function parseResponseBody(response) {
  const textString = await response.text();

  if (response.status === 204) {
    return {};
  }

  try {
    return JSON.parse(textString);
  } catch (error) {
    throw new Error(`Could not parse response as JSON: ${textString}`);
  }
}

async function request<T>(path, options = {}): Promise<HttpResult<T>> {
  const response = await fetch(`${MAD_URL}${path}`, options);
  const body: any = await parseResponseBody(response);
  const result = {
    response,
    body
  };

  if (!response.ok) {
    const error = new HttpError('Request failed');
    error.result = result;
    throw error;
  }

  return result;
}

function jwt(token: ?string): ?string {
  return token ? `JWT ${token}` : undefined;
}

type TokenDto = {
  token: string
};

type Token = string;

export async function fetchAuthToken(
  email: string,
  password: string
): Promise<Token> {
  const result: HttpResult<TokenDto> = await request('/auth/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  return result.body.token;
}

type UserDto = {
  id: number,
  isStaff: boolean,
  department: string,
  email: string,
  firstName: string,
  lastName: string
};

export async function fetchCurrentUser(token: string): Promise<UserDto> {
  const result: HttpResult<UserDto> = await request('/users/me/', {
    headers: {
      Authorization: jwt(token)
    }
  });

  return result.body;
}

type EventDto = Object;
type PaginatedEventsDto = {
  count: number,
  next: ?string,
  previous: ?string,
  results: Array<EventDto>
};

export async function fetchEvents(token: ?string): Promise<Array<EventDto>> {
  const result: HttpResult<PaginatedEventsDto> = await request('/events/', {
    headers: {
      Authorization: jwt(token)
    }
  });
  return result.body.results;
}
