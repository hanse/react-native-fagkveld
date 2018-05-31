// @flow

import type { Event, User, Token } from '../models';

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
  id?: number,
  firstName?: string,
  lastName?: string,
  department?: string,
  connectedAccounts?: Array<string>
};

const mapUserToModel = (userDto: UserDto): User => ({
  id: userDto.id,
  firstName: userDto.firstName || 'Pure',
  lastName: userDto.lastName || 'Madness',
  department: userDto.department,
  connectedAccounts: Array.isArray(userDto.connectedAccounts)
    ? userDto.connectedAccounts
    : []
});

export async function fetchCurrentUser(token: string) {
  const result: HttpResult<UserDto> = await request('/users/me/', {
    headers: {
      Authorization: jwt(token)
    }
  });

  return mapUserToModel(result.body);
}

type EventDto = Event;
type PaginatedEventsDto = {
  count: number,
  next: ?string,
  previous: ?string,
  results: Array<EventDto>
};

const mapEventsToModel = (events: Array<EventDto>): Array<Event> => events;

export async function fetchEvents(token: ?string) {
  const result: HttpResult<PaginatedEventsDto> = await request('/events/', {
    headers: {
      Authorization: jwt(token)
    }
  });

  return mapEventsToModel(result.body.results);
}
